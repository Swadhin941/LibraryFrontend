import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import useTitle from '../CustomHook/useTitle/useTitle';

const SpecificCategory = () => {
    useTitle("Specific category- Library");
    const [searchParams, setSearchParams] = useSearchParams();
    const [allBook, setAllBook] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/specific-category/${searchParams.get("category")}`)
            .then(res => res.json())
            .then(data => {
                setAllBook(data);
            })
    }, [searchParams])
    return (
        <div className='container-fluid mt-3'>
            <div className="row">
                {
                    allBook.length === 0 ? <div className='d-flex justify-content-center align-items-center' style={{ height: "300px", width: "100%", backgroundColor:"#C9CCCE"}}>
                        <h3 className='text-white fw-bold'>No Book found</h3>
                    </div>: allBook.map((item, index)=><div className='col-12 col-sm-6 col-md-4 col-lg-3' key={index}>
                        <div className="card">
                            <div className="card-body">
                                <div style={{height:"120px", width:"100%"}}>
                                    <img src={item.image} alt="" style={{height:"100%", width:"100%"}} />
                                </div>
                                <div className='mt-2'>
                                    <h5 className='my-0' style={{fontWeight:"600"}}>{item.title}</h5>
                                    <p className='text-muted my-0'>Writer: {item.writer}</p>
                                    <p className='text-muted my-0'>Category: {item.category}</p>
                                    <p className='text-muted my-0'>Edition: {item.edition}</p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button className='btn btn-primary w-100' onClick={()=>navigate(`/book-details?id=${item._id}`)}>View Details</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default SpecificCategory;