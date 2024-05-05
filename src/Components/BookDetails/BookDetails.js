import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./BookDetails.css";
import { SharedData } from '../SharedData/SharedContext';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import toast from 'react-hot-toast';
import BookEditModal from '../Modals/BookEditModal/BookEditModal';
import ConfirmModal from '../Modals/ConfirmModal/ConfirmModal';
import useTitle from '../CustomHook/useTitle/useTitle';

const BookDetails = () => {
    useTitle("Book details- Library");
    const { user } = useContext(SharedData);
    const [searchParams, setSearchParams] = useSearchParams();
    const [bookData, setBookData] = useState(null);
    const [axiosSecure] = useAxiosSecure();
    const [dataLoad, setDataLoad] = useState(false);
    const [deleteData, setDeleteData] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/bookDetails/${searchParams.get("id")}?user=${user?.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setBookData(data);
                setDataLoad(false);
            })
            .catch(error => {
                toast.error(error.message);
            })
    }, [searchParams, dataLoad, user])

    useEffect(() => {
        if (deleteData && selectedToDelete !== "") {
            axiosSecure.delete(`/deleteBook?id=${selectedToDelete}`)
                .then(res => res.data)
                .then(data => {
                    if (data.deletedCount >= 1) {
                        toast.success("Deleted successfully");
                        setSelectedToDelete('');
                        setDeleteData(false);
                        navigate(-1);
                    }
                })
        }
    }, [deleteData, selectedToDelete])

    const handleAddWish = (item) => {
        axiosSecure.post(`/add-to-wish?user=${user?.email}`, { ...item })
            .then(res => res.data)
            .then(data => {
                if (data?.acknowledged) {
                    let temp = { ...bookData };
                    temp.wishlist = true;
                    setBookData({ ...temp });
                    toast.success("Added to wishlist");
                    return;
                }
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const handleRemoveWish = (item) => {
        axiosSecure.post(`/delete-wish?user=${user?.email}`, { ...item })
            .then(res => res.data)
            .then(data => {
                if (data.deletedCount >= 1) {
                    let temp = { ...bookData };
                    temp.wishlist = false;
                    setBookData({ ...temp });
                    toast.error("Remove from the wishlist");
                    return
                }
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const handleAddToCart = () => {
        const data = { ...bookData }
        data.bookId = bookData?._id;
        delete data._id;
        delete data.cartChecked;
        delete data.wishlist;
        axiosSecure.post('/addToCart', { ...data, quantity: 1, email: user?.email })
            .then(res => res.data)
            .then(data => {
                if (data.acknowledged) {
                    const temp = { ...bookData };
                    temp.cartChecked = true;
                    setBookData({ ...temp });
                }
            })
            .catch(error => {
                toast.error(error.message);
            })
    }

    const handleRemoveFromCart = ()=>{
        axiosSecure.post(`/removeFromCart?user=${user?.email}`,{bookId: bookData?._id})
        .then(res=>res.data)
        .then(data=>{
            if(data.deletedCount>=1){
                const temp = {...bookData};
                temp.cartChecked = false;
                setBookData({...temp});
                toast.success("Removed from cart");
            }
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
                    <h6 className=''>Price: {!bookData?.isPremium ? "Free" : bookData?.price + "Taka"}</h6>
                    {
                        bookData?.isPremium && <h6>Available: {bookData?.quantities === "1" ? bookData?.quantities + " piece" : bookData?.quantities + " pieces"}</h6>
                    }
                    <p className='my-0 mb-1'>Description:{bookData?.description}</p>
                    {
                        user?.role === "admin" && <div className='mt-1 d-flex'>
                            <div className='mx-2 bg-light p-1' style={{ cursor: "pointer" }} title='Edit' data-bs-target="#BookEditModal" data-bs-toggle="modal">
                                <i className='bi bi-box-arrow-in-down-left'></i>
                            </div>
                            <div className='bg-light mx-3 p-1' style={{ cursor: "pointer" }} title="Trash" data-bs-target="#ConfirmModal" data-bs-toggle="modal" onClick={() => setSelectedToDelete(bookData?._id)}>
                                <i className='bi bi-trash-fill'></i>
                            </div>
                        </div>
                    }

                    {
                        !bookData?.isPremium ? <a href={bookData?.pdf} className='btn btn-primary' download>Download</a> : user?.email && (bookData?.cartChecked ? <button className='btn btn-outline-danger' onClick={handleRemoveFromCart}>Remove from cart</button> : <button className='btn btn-outline-warning' onClick={handleAddToCart}>Add to Cart</button>)
                    }
                    {
                        user?.email && (bookData?.wishlist ? <button className='btn btn-outline-danger ms-2' onClick={() => handleRemoveWish(bookData)}>Remove from wishlist</button> : <button className='btn btn-outline-danger ms-2' onClick={() => handleAddWish(bookData)}> <i className='bi bi-heart' ></i> Add to wish list</button>)
                    }

                </div>
            </div>
            <BookEditModal bookData={bookData} dataLoad={setDataLoad}></BookEditModal>
            <ConfirmModal deleteData={setDeleteData}></ConfirmModal>
        </div>
    );
};

export default BookDetails;