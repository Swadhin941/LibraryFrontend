import React, { useContext, useEffect, useState } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const WishList = () => {
    const { user } = useContext(SharedData);
    const [allData, setAllData] = useState([]);
    const [axiosSecure] = useAxiosSecure();
    const navigate= useNavigate();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/wishlist?user=${user?.email}`)
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
                    allData.length === 0 ? <div className='d-flex justify-content-center align-items-center' style={{ height: "300px", width: "100%", backgroundColor: "#C9CCCE" }}>
                        <h3 className='text-white fw-bold'>No Data</h3>
                    </div> : allData.map((item, index) => <div className='col-12 col-md-12 col-lg-12' key={index}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12 col-sm-4 col-md-3 col-lg-3">
                                        <div style={{ height: "120px", width: "100%" }}>
                                            <img src={item.image} alt="" style={{ height: "100%", width: "100%" }} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-8 col-md-9 col-lg-9">
                                        <div className='d-flex justify-content-between ms-2'>
                                            <div>
                                                <h3 className='my-0'>{item?.title}</h3>
                                                <h6 className='my-0'>Category: {item?.category}</h6>
                                                <h6 className='my-0'>Writer: {item?.writer}</h6>

                                            </div>
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <div>
                                                    <button className='btn btn-primary' onClick={() => navigate(`/book-details?id=${item?.bookId}`)}>View Details</button>
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

export default WishList;