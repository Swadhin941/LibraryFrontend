import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import "./BookDetails.css";
import { SharedData } from '../SharedData/SharedContext';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';

const BookDetails = () => {
    const { user } = useContext(SharedData);
    const [searchParams, setSearchParams] = useSearchParams();
    const [bookData, setBookData] = useState(null);
    const [axiosSecure] = useAxiosSecure();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/bookDetails/${searchParams.get("id")}?user=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setBookData(data);
            })
            .catch(error=>{
                toast.error(error.message);
            })
    }, [searchParams])

    const handleAddWish= (item)=>{
        axiosSecure.post(`/add-to-wish?user=${user?.email}`, {...item})
        .then(res=>res.data)
        .then(data=>{
            if(data?.acknowledged){
                let temp = {...bookData};
                temp.wishlist= true;
                setBookData({...temp});
                toast.success("Added to wishlist");
                return;
            }
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    const handleRemoveWish= (item)=>{
        axiosSecure.post(`/delete-wish?user=${user?.email}`,{...item})
        .then(res=>res.data)
        .then(data=>{
            if(data.deletedCount>=1){
                let temp = {...bookData};
                temp.wishlist = false;
                setBookData({...temp});
                toast.error("Remove from the wishlist");
                return
            }
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

    return (
        <div className='container-fluid mt-3'>
            <div className="detailsClass">
                <div className='detailsImgDiv'>
                    <img src={bookData?.image} alt="" style={{ height: "100%", width: "100%" }} />
                </div>
                <div className='ms-3'>
                    <h4>{bookData?.title}</h4>
                    <h6 className=''>Writer: {bookData?.writer}</h6>
                    <h6 className=''>Category: {bookData?.category}</h6>
                    <h6 className=''>edition: {bookData?.edition}</h6>
                    <h6 className=''>Price: {!bookData?.isPremium ? "Free" : bookData?.price}</h6>
                    <p className='my-0'>Description:{bookData?.description}</p>
                    {
                        !bookData?.isPremium ? <a href={bookData?.pdf} className='btn btn-primary' download>Download</a> : <button className='btn btn-outline-warning'>Add to Cart</button>
                    }
                    {
                        bookData?.wishlist ? <button className='btn btn-outline-danger ms-2' onClick={()=>handleRemoveWish(bookData)}>Remove from wishlist</button> : <button className='btn btn-outline-danger ms-2' onClick={() => handleAddWish(bookData)}> <i className='bi bi-heart' ></i> Add to wish list</button>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default BookDetails;