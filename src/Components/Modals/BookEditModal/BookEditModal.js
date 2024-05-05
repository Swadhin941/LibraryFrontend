import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../CustomHook/useAxiosSecure/useAxiosSecure';

const BookEditModal = ({bookData, dataLoad}) => {
    const [axiosSecure]= useAxiosSecure();

    const handleSubmit= (e)=>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const edition = form.edition.value;
        const quantities = form.quantities.value;
        if(bookData?.isPremium){
            const price = form.price.value;
            axiosSecure.patch("/updateBook", {_id: bookData?._id, title: title, edition: edition, price: price})
            .then(res=>res.data)
            .then(data=>{
                if(data.modifiedCount>=1){
                    toast.success("Updated successfully");
                    dataLoad(true);
                }
            })
        }
        else{
            console.log(title, edition);
            axiosSecure.patch('/updateBook', {_id: bookData?._id, title: title, edition: edition, quantities: quantities})
            .then(res=>res.data)
            .then(data=>{
                if (data.modifiedCount >= 1) {
                    toast.success("Updated successfully");
                    dataLoad(true);
                }
            })
        }

    }
    
    return (
        <div className='modal fade' id='BookEditModal' data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-centered">
                <div className="modal-content">
                    <div className="modal-header" style={{ borderBottom: "0px" }}>
                        <button className='btn btn-close btn-sm' data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form className='form' onSubmit={handleSubmit}>
                            <div >
                                <label htmlFor="title">Title:</label>
                                <div className='input-group'>
                                    <input type="text" className='form-control' name='title' required placeholder='Enter updated title' />
                                </div>
                            </div>
                            <div className='mt-2'>
                                <label htmlFor="quantities">Quantity:</label>
                                <div className="input-group">
                                    <input type="text" className='form-control' name='quantities' required placeholder='Enter updated quantity' />
                                </div>
                            </div>
                            
                            <div className='mt-2'>
                                <label htmlFor="edition">Edition:</label>
                                <div className="input-group">
                                    <input type="text" className='form-control' name='edition' required placeholder='Enter updated edition' />
                                </div>
                            </div>
                            {
                                bookData?.isPremium && <div className='mt-2'>
                                    <label htmlFor="price">Price:</label>
                                    <div className="input-group">
                                        <input type="text" name='price' className='form-control' required placeholder='Enter updated price' />
                                    </div>
                                </div>
                            }

                                
                            <div className='d-flex justify-content-center mt-2'>
                                <button type='submit' className='btn btn-primary' >Update</button>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookEditModal;