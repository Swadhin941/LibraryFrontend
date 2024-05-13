import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';

const BlogDetails = () => {
    const [blogData, setBlogData]= useState(null);
    const [searchParams, setSearchParams]= useSearchParams();
    console.log();

    useEffect(()=>{
        fetch(
            `${process.env.REACT_APP_SERVER}/blog/${searchParams.get("id")}`)
            .then(res=>res.json())
            .then(data=>{
                setBlogData(data);
            })
            .catch(error=>{
                toast.error(error.message);
            })
    },[])

    return (
        <div className="container-fluid ps-0 pe-0">
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <h4 className="text-center my-0">{blogData?.title}</h4>
                    <p className="text-center text-muted my-0">
                        {blogData?.localeDate + " " + blogData?.localeTime}
                    </p>
                </div>
                <div className="col-12 col-md-12 col-lg-12 mt-3">
                    <div className='d-flex justify-content-center'> 
                        <div style={{ height: "280px", width: "auto" }}>
                            <img
                                src={blogData?.image}
                                alt=""
                                style={{ height: "100%", width: "auto", borderRadius:"10px" }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12 mt-3">
                    <p>{blogData?.description}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;