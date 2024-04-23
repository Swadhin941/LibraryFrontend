import React from 'react';
import "./ServiceCards.css";

const ServiceCards = () => {
    const service = [
        {
            id: 1,
            name: "Secure payment",
            icon: "bi bi-lock-fill",
            description: "100% secure payment"
        },
        {
            id: 2, 
            name : "Easy returns",
            icon: "bi bi-arrow-clockwise",
            description: "10 days return",
        },
        {
            id: 3,
            name: "24/7 Support",
            icon: "bi bi-headset",
            description: "Call us anytime"
        }
    ]
    return (
        <div className='container-fluid mt-3'>
            <div className="row">
                {
                    service.map((item, index)=><div className='col-12 col-sm-6 col-md-4 col-lg-4' style={{cursor:"pointer"}} key={index}>
                        <div className="card" style={{borderRight:"1px solid gray", borderBottom:"1px solid gray", borderLeft:"0px", borderTop:"0px"}}>
                            <div className="card-body">
                                <div className='d-flex'>
                                    <div className='serviceCardIconDiv'>
                                        <i className={item?.icon+" fs-2 text-success fw-bold"}></i>
                                    </div>
                                    <div className='ms-4'>
                                        <h5 className='my-0'>{item.name}</h5>
                                        <h6 className='my-0 text-muted'>{item.description}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default ServiceCards;