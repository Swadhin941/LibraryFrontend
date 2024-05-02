import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import Logo from '../CustomComponents/Logo/Logo';
import "./Navbar.css";
import NavLinks from '../CustomComponents/NavLinks/NavLinks';
import { SharedData } from '../SharedData/SharedContext';
import MiniProfileModal from '../Modals/MiniProfileModal/MiniProfileModal';

const Navbar = () => {
    const navLinks = NavLinks();
    const { navButton, setNavButton, user } = useContext(SharedData);
    return (
        <div className='container-fluid ps-0 pe-0' style={{ marginTop: "-10px" }}>
            <nav className="navbar navbar-expand-lg bg-body-tertiary pb-0" style={{ backgroundColor: "teal" }}>
                <div className="container-fluid" style={{ backgroundColor: "teal", color: "white" }}>
                    <Link className="navbar-brand"><Logo></Logo></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setNavButton(!navButton)}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-lg-0 mb-2">

                            {
                                navLinks.map((links) => {
                                    if(user?.role==="admin" && links?.name==='Add-Books'){
                                        return (
                                            <li className='nav-item' key={links.name}>
                                                <Link className="nav-link" aria-current="page" key={links?.name} to={links?.path}>{links.name}</Link>
                                            </li>
                                        )
                                    }
                                    else if (links?.name !== "Add-Books"){
                                        return (
                                            <li className='nav-item' key={links.name}>
                                                <Link className="nav-link" aria-current="page" key={links?.name} to={links?.path}>{links.name}</Link>
                                            </li>
                                        )
                                    }                                    
                                })
                            }

                        </ul>
                        <div className='d-flex'>
                            <Link to={'/cart'} className='nav-item mx-2' title='cart'><i className="bi bi-cart-fill nav-link fs-4"></i></Link>
                        </div>
                        <div className="d-flex">
                            <Link to={'/wishlist'} className='nav-item mx-2' title='wishlist'><i className="bi bi-bag-heart-fill nav-link fs-4"></i></Link>
                        </div>
                        <div className="d-flex">
                            {
                                user ? <div className='mx-2' style={{ height: "30px", width: "30px" }} data-bs-target="#MiniProfileModal" data-bs-toggle="modal"> <img src={user?.img || "https://i.ibb.co/bmVqbdY/empty-person.jpg"} style={{ height: "100%", width: "100%", borderRadius: "50%" }} alt="" /> </div> : <Link className='nav-item mx-2' to={'/login'}><i className="bi bi-person-fill nav-link fs-4"></i></Link>
                            }

                        </div>
                    </div>

                </div>
                <MiniProfileModal></MiniProfileModal>
            </nav>
        </div>
    );
};

export default Navbar;