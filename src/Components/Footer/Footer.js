import React from 'react';
import "./Footer.css";
import NavLinks from '../CustomComponents/NavLinks/NavLinks';
import { Link } from 'react-router-dom';

const Footer = () => {
    const navLinks = NavLinks();
    const locations = [
        {
            name: "Sylhet"
        },
        {
            name: "Dhaka"
        },
        {
            name: "Dinajpur"
        },
        {
            name: "Barisal"
        },
        {
            name: "Chittagong"
        },
        {
            name: "Comilla"
        }
    ]
    return (
        <div className='container-fluid ps-0 pe-0 mt-3' style={{ backgroundColor: "#e5e5e5" }}>

            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <div className='footerContent'>
                        <div>
                            <h5 className='fw-bold'>Quick Links</h5>
                            {
                                navLinks.map((item, index) => <div className='my-3' key={index}>
                                    <i className='bi bi-arrow-right text-success me-2 fw-bold'></i>
                                    <Link to={item.path} style={{ textDecoration: "none", color: "black", fontWeight: "600" }}>{item.name}</Link>
                                </div>)
                            }
                        </div>
                        <div>
                            <h5 className='fw-bold'>Our Location</h5>
                            {
                                locations.map((item, index) => <div className='my-3 d-flex' key={index}>
                                    <i className='bi bi-geo-alt-fill text-success fw-bold me-3 fs-4'></i>
                                    <h6 className='mt-2' style={{fontWeight:"600", cursor:"pointer"}}>{item.name}</h6>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;