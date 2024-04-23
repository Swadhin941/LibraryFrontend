import React, { useEffect, useState } from 'react';
import useTitle from '../CustomHook/useTitle/useTitle';
import toast from 'react-hot-toast';
import ClockLoader from 'react-spinners/ClockLoader';

const AddBooks = () => {
    useTitle('AddBooks- Library');
    const [allCategory, setAllCategory] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [tempImg, setTempImg] = useState(null);
    const [tempFile, setTempFile] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/allCategory`)
            .then(res => res.json())
            .then(data => {
                if (data.length !== 0) {
                    setAllCategory(data);
                }
            })
            .catch(error => {
                toast.error(error.message);
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const writer = form.writer.value;
        const isbn = form.isbn.value;
        const category = form.category.value;
        if(category==="default"){
            toast.error("Please select a category");
            return;
        }
        const edition = form.edition.value;
        const quantities = form.availableQuantities.value;
        
        
    }

    const handleImageChange = e => {
        const imgType = e.target.files[0].type.split("/")[1];
        if (imgType.toLowerCase() === 'png' || imgType.toLowerCase() === "jpg" || imgType.toLowerCase() === "jpeg") {
            setTempImg(e.target.files[0]);
        }
        else {
            toast.error("Image file should be in png, jpg or jpeg format only");
            return;
        }
        
    }

    const handlePdfChange = (e) => {
        setTempFile(null);
        const pdfType = e.target.files[0].type.split('/')[1]
        // console.log(pdfType);
        if (pdfType.toLowerCase() === "pdf") {
            setTempFile(e.target.files[0]);

        }
        else {
            console.log(document.querySelector(".pdfUpload"))
            toast.error("File type not supported");
        }
    }

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: "150vh" }}>
            <div className="card" style={{ width: "40%" }}>
                <div className="card-body">
                    <h2 className='text-center fw-bold'>Add Book</h2>
                    <form className='form' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <div className='input-group'>
                                <input type="text" className='form-control' name='title' placeholder='Enter your book title' required />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="writer_name">Writer name:</label>
                            <div className='input-group'>
                                <input type="text" className='form-control' name='writer' placeholder='Enter your book writer name' required />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="isbn">ISBN:</label>
                            <div className='input-group'>
                                <input type="text" className='form-control' name='isbn' placeholder='Enter your book ISBN' required />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="isbn">Category:</label>
                            <div className='input-group'>
                                <select name="category" id="category" className='form-select' defaultValue={'default'}>
                                    <option value="default" disabled>---Select a category---</option>
                                    {
                                        allCategory.map((item, index) => <option key={index} value={item?.name}>{item?.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="edition">Edition:</label>
                            <div className="input-group">
                                <input type="text" className='form-control' name='edition' placeholder='Enter books edition' />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="availableQuantities">Available Quantities:</label>
                            <div className="input-group">
                                <input type="text" className='form-control' name='availableQuantities' placeholder='Enter books available quantities' />
                            </div>
                        </div>
                        {
                            tempImg ? <div className='mt-2'>
                                <div style={{ height: "100px", width: "100%", cursor: "pointer" }} onClick={() => document.querySelector(".uploadImg").click()}>
                                    <img src={URL.createObjectURL(tempImg)} alt="" style={{ height: "100%", width: "100%" }} />
                                </div>
                            </div> : <div className='mt-2' >
                                <label htmlFor="uploadImage">Upload a book image:</label>
                                <div className='mt-2 d-flex justify-content-center align-items-center' style={{ border: "1px dashed black", height: "100px", width: "100%", cursor: "pointer" }} onClick={() => document.querySelector(".uploadImg").click()} >
                                    <div>
                                        <i className='bi bi-plus fs-4'></i>
                                    </div>
                                </div>

                            </div>
                        }
                        <input type="file" name='uploadImg' className='uploadImg' hidden onChange={handleImageChange} />
                        <div className='mt-2'>
                            <label htmlFor="Premium">Book status:</label>
                            <div className='input-group'>
                                <input type="checkbox" name='status' className='status form-checkbox' />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="pdfUpload">Upload pdf:</label>
                            <div className='mt-1'>
                                <input type="file" name='pdfUpload' id='pdfUpload' className='form-control' onChange={handlePdfChange} />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <button className='btn btn-primary w-100'>{dataLoading ? <ClockLoader size={24} color='white' /> : "Upload book"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBooks;