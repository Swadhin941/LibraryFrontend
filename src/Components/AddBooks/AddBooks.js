import React, { useContext, useEffect, useState } from 'react';
import useTitle from '../CustomHook/useTitle/useTitle';
import toast from 'react-hot-toast';
import ClockLoader from 'react-spinners/ClockLoader';
import useAxiosSecure from '../CustomHook/useAxiosSecure/useAxiosSecure';
import { SharedData } from '../SharedData/SharedContext';

const AddBooks = () => {
    useTitle('AddBooks- Library');
    const {user}= useContext(SharedData);
    const [allCategory, setAllCategory] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const [tempImg, setTempImg] = useState(null);
    const [isPremium, setIsPremium] = useState("Free");
    const [tempFile, setTempFile] = useState(null);
    const [axiosSecure] = useAxiosSecure();


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
        if (category === "default") {
            toast.error("Please select a category");
            return;
        }
        const edition = form.edition.value;
        const quantities = form.availableQuantities.value;
        const description = form.description.value;
        let price;
        let uploadPost = {};
        if (isPremium === "Free") {
            console.log("Without price");
            uploadPost= {
                title, edition, writer, isbn, category, quantities, isPremium: false
            };

        }
        else {
            price = form.price.value;
            uploadPost = {
                title, edition, writer, isbn, category, quantities, isPremium: true,
                price: price
            };
        }
        

        setDataLoading(true);
        const formData1 = new FormData();
        formData1.append("image", tempImg)
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgBB}`, {
            method: "POST",
            body: formData1
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if(imgData.success){
                    const formData2 = new FormData();
                    formData2.append("file", tempFile);
                    formData2.append("upload_preset", process.env.REACT_APP_upload_preset);
                    formData2.append("cloud_name", process.env.REACT_APP_cloud_name);
                    fetch(`https://api-eu.cloudinary.com/v1_1/${process.env.REACT_APP_cloud_name}/image/upload`, {
                        method: "POST",
                        body: formData2
                    })
                    .then(res=>res.json())
                    .then(fileData=>{
                        if(fileData?.url){
                            uploadPost= {...uploadPost, image: imgData?.data?.url, pdf: fileData?.url, description}
                            axiosSecure.post(`/uploadBook?user=${user?.email}`, uploadPost)
                            .then(res=>res.data)
                            .then(data=>{
                                if(data.acknowledged===true){
                                    // form.reset();
                                    toast.success("Book added successfully");
                                    setDataLoading(false);
                                    return;
                                }
                                else{
                                    setDataLoading(false);
                                    toast.error(data.message);
                                }
                            })
                            .catch(error=>{
                                setDataLoading(false);
                                toast.error(error.message);
                            })
                        }
                    })
                }
            })
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

    const handleStatus = value => {
        setIsPremium(value);
    }

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{ height: "170vh" }}>
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
                            <div className="d-flex">
                                <input type="radio" name="status" className='form-check-input' id="status" onClick={() => handleStatus("Free")} defaultChecked />
                                <div className='ms-2'>
                                    <label htmlFor="status">Free</label>
                                </div>
                            </div>
                            <div className="d-flex">
                                <input type="radio" name="status" className='form-check-input' id="status" onClick={() => handleStatus("Premium")} />
                                <div className='ms-2'>
                                    <label htmlFor="status">Premium</label>
                                </div>
                            </div>

                        </div>
                        {
                            isPremium === "Premium" && <div className='mt-2'>
                                <label htmlFor="price">Price:</label>
                                <div className="input-group">
                                    <input type="text" className='form-control' name='price' id="price" placeholder='Enter book price' required />
                                </div>
                            </div>
                        }
                        <div className='mt-2'>
                            <label htmlFor="pdfUpload">Upload pdf:</label>
                            <div className='mt-1'>
                                <input type="file" name='pdfUpload' id='pdfUpload' className='form-control' onChange={handlePdfChange} />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="description">Description:</label>
                            <div className="input-group">
                                <textarea name="description" id="description" className='form-control' style={{resize:"none"}} required placeholder='Enter book description'>

                                </textarea>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <button className='btn btn-primary w-100' disabled={dataLoading}>{dataLoading ? <ClockLoader size={24} color='white' /> : "Upload book"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBooks;