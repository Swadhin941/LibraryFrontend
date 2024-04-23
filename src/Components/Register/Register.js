import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import useTitle from '../CustomHook/useTitle/useTitle';
import { SharedData } from '../SharedData/SharedContext';
import ClockLoader from "react-spinners/ClockLoader";

const Register = () => {
    useTitle("Signup- Library");
    const { register, setLoading, setUser, user } = useContext(SharedData);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[user])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const fullName = form.firstName.value + " " + form.lastName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const role = "user";
        if (password.length < 6 || confirmPassword.length < 6) {
            toast.error("Password must be at least 6 characters or more");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords are not same");
            return;
        }
        setDataLoading(true);
        register(fullName, email, password, role)
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged){
                    fetch(`${process.env.REACT_APP_SERVER}/jwt?user=${email}`)
                    .then(res=>res.json())
                    .then(jwtResponse=>{
                        localStorage.setItem("token", jwtResponse.token)
                        setUser({
                            email: email,
                            fullName: fullName,
                            password: password,
                            role: role
                        })
                        setLoading(false);
                    })
                    
                }
                else{
                    toast.error("Email already exists");
                    return
                }
                setDataLoading(false);
            })
            .catch(error => {
                setDataLoading(false);
            })
    }
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div className="card border border-0 shadow shadow-lg" style={{ width: "350px" }}>
                <div className="card-body">
                    <h2 className='text-center' style={{ fontWeight: "600" }}>Sign up</h2>
                    <form className='form mt-3' onSubmit={handleSubmit}>
                        <div className='d-flex justify-content-between ps-0 pe-0'>
                            <div className='mx-2'>
                                <label htmlFor="firstName">First Name:</label>
                                <div className="input-group">
                                    <span className='input-group-text'><i className='bi bi-person'></i></span>
                                    <input type="text" className='form-control' name='firstName' required placeholder='First Name' />
                                </div>
                            </div>
                            <div className='mx-2'>
                                <label htmlFor="lastName">Last Name:</label>
                                <div className="input-group">
                                    <span className='input-group-text'><i className='bi bi-person'></i></span>
                                    <input type="text" className='form-control' name='lastName' required placeholder='Last Name' />
                                </div>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="email">Email:</label>
                            <div className='input-group'>
                                <span className='input-group-text'><i className='bi bi-envelope'></i></span>
                                <input type="email" name='email' className='form-control' required placeholder='Email' />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="password">Password:</label>
                            <div className='input-group'>
                                <span className='input-group-text'><i className='bi bi-key'></i></span>
                                <input type={showPassword ? "text" : "password"} name='password' className='form-control' required placeholder='Password' />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <div className='input-group'>
                                <span className='input-group-text'><i className='bi bi-key'></i></span>
                                <input type={showPassword ? "text" : "password"} name='confirmPassword' className='form-control' required placeholder='Confirm Password' style={{ borderRight: "0px" }} />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <input type="checkbox" className='form-check-input me-2' onClick={() => setShowPassword(!showPassword)} /><label htmlFor="label" >Show Password</label>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Link to={'/login'}>Already have an account?</Link>
                        </div>
                        <div className='mt-2'>
                            <button className='btn btn-primary w-100' disabled={dataLoading}>{dataLoading ? <ClockLoader size="24" color="white" /> : "Register"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;