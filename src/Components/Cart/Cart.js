import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';

const Cart = () => {
    const [allData, setAllData] = useState([]);
    const { user } = useContext(SharedData);
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/allCartData?user=${user?.email}`)
                .then(res => res.data)
                .then(data => {
                    setAllData(data);
                })
        }
    }, [user])

    return (
        <div className='container-fluid p-2'>
            <div className="row">
                {
                    allData.map((item, index) => <div className='col-12 col-md-12 col-lg-12' key={index}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6 col-sm-6 col-md-3 col-lg-2">
                                        <img src={item?.image} alt="" className='img-fluid' />
                                    </div>
                                    <div className="col-6 col-sm-6 col-md-9 col-lg-10">
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <h6>{item.title}</h6>
                                                <p className='my-0'>Edition: {item.edition}</p>
                                                <p className='my-0'>Price: {item.price + " Taka"}</p>
                                                <div className='mt-1'>
                                                    <button className='btn btn-light' title='Delete'><i className='bi bi-trash-fill'></i></button>
                                                    <button className='btn btn-light ms-2' title="Details"><i className='bi bi-ticket-detailed-fill'></i></button>
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <div>
                                                    <button className='btn btn-light me-1'><i className='bi bi-dash'></i></button>
                                                    <span>{item?.quantity}</span>
                                                    <button className='btn btn-light ms-1'><i className='bi bi-plus'></i></button>
                                                </div>
                                            </div>

                                        </div>
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

export default Cart;