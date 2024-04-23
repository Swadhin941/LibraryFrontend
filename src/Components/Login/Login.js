import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useTitle from '../CustomHook/useTitle/useTitle';
import { SharedData } from '../SharedData/SharedContext';
import toast from 'react-hot-toast';
import ClockLoader from 'react-spinners/ClockLoader';

const Login = () => {
    useTitle('Sign in- Library');
    const { user, setUser, login, setLoading } = useContext(SharedData);
    const [showPassword, setShowPassword] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            return navigate(from, { replace: true });
        }
    },[user])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setDataLoading(true);
        login(email, password)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    fetch(`${process.env.REACT_APP_SERVER}/jwt?user=${data?.email}`)
                        .then(res => res.json())
                        .then(jwtResponse => {
                            if (jwtResponse.token) {
                                localStorage.setItem('token', jwtResponse.token);
                                setUser(data);
                            }
                        })
                }
                else {
                    setLoading(false);
                    setDataLoading(false);
                }
                setLoading(false);
                setDataLoading(false);
            })
            .catch(error => {
                toast.error(error.message);
                setDataLoading(false);
            })

    }
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: "100vh" }}>
            <div className="card shadow shadow-lg border border-0" style={{ width: "360px" }}>
                <div className="card-body">
                    <h2 className='text-center' style={{ fontWeight: "600" }}>Login</h2>
                    <form className='form' onSubmit={handleSubmit}>
                        <div className='mt-2'>
                            <label htmlFor="email">Email:</label>
                            <div className='input-group'>
                                <span className='input-group-text'><i className='bi bi-envelope'></i></span>
                                <input type="email" className='form-control' name='email' placeholder='Enter your email' required />
                            </div>

                        </div>
                        <div className='mt-2'>
                            <label htmlFor="password">Password:</label>
                            <div className='input-group'>
                                <span className='input-group-text'><i className='bi bi-key'></i></span>
                                <input type={showPassword ? "text" : "password"} name='password' className='form-control' style={{ borderRight: "0px" }} placeholder='Enter your password' required />
                                <span className='input-group-text' style={{ backgroundColor: "white", cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                                    <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"}`}></i>
                                </span>
                            </div>
                        </div>
                        <Link to={'/forget-password'}>Forget password?</Link>
                        <div className='mt-3'>
                            <button className='btn btn-success w-100' disabled={dataLoading}>{dataLoading ? <ClockLoader size={24} color='white' /> : "Sign in"}</button>
                        </div>
                    </form>
                    <div className='mt-2 d-flex justify-content-center'>
                        <Link to={'/register'}>Click here to Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;