import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../CustomHook/useAxiosSecure/useAxiosSecure";
import { SharedData } from "../../SharedData/SharedContext";

const BlogModal = ({dataLoad}) => {
    const { user } = useContext(SharedData);
    const [tempImg, setTempImg] = useState(null);
    const [axiosSecure] = useAxiosSecure();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (
            file?.type.split("/")[1].toLowerCase() === "png" ||
            file?.type.split("/")[1].toLowerCase() === "jpg" ||
            file?.type.split("/")[1].toLowerCase() === "jpeg"
        ) {
            setTempImg(file);
        } else {
            toast.error("File extension must be a png, jpg or jpeg");
            return;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const formData = new FormData();
        formData.append("image", tempImg);
        
        fetch(
            `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgBB}`,
            {
                method: "POST",
                body: formData,
            }
        )
            .then((res) => res.json())
            .then((imgData) => {
                console.log(imgData);
                if (imgData?.success) {
                    axiosSecure.post(`/blogPost?user=${user?.email}`,{title, description, image: imgData?.data?.url, localeDate: new Date().toLocaleDateString(), localeTime: new Date().toLocaleTimeString(), time: Date.now() })
                    .then(res=>res.data)
                    .then(data=>{
                        if(data.acknowledged){
                            form.reset();
                            setTempImg(null);
                            dataLoad(true);
                            toast.success("Blog Posted Successfully");
                        }
                    })
                    .catch(error=>{
                        toast.error(error.message);
                    })
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div
            className="modal fade"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            id="BlogModal"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div
                        className="modal-header"
                        style={{ borderBottom: "0px" }}
                    >
                        <button
                            className="btn btn-close"
                            data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form className="form" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="title">Title:</label>
                                <div className="input-group mt-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <label htmlFor="uploadImage">
                                    Upload a banner image for blog:
                                </label>
                                {tempImg ? (
                                    <div className="mt-2">
                                        <div
                                            style={{
                                                height: "100px",
                                                width: "100%",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                document
                                                    .querySelector(".uploadImg")
                                                    .click()
                                            }
                                        >
                                            <img
                                                src={URL.createObjectURL(
                                                    tempImg
                                                )}
                                                alt=""
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-2">
                                        <div
                                            className="mt-2 d-flex justify-content-center align-items-center"
                                            style={{
                                                border: "1px dashed black",
                                                height: "100px",
                                                width: "100%",
                                                cursor: "pointer",
                                            }}
                                            onClick={() =>
                                                document
                                                    .querySelector(".uploadImg")
                                                    .click()
                                            }
                                        >
                                            <div>
                                                <i className="bi bi-plus fs-4"></i>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="uploadImg"
                                    className="uploadImg"
                                    hidden
                                    onChange={handleImageChange}
                                />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="description">
                                    Description:
                                </label>
                                <textarea
                                    name="description"
                                    id=""
                                    style={{ resize: "none" }}
                                    className="form-control"
                                    required
                                ></textarea>
                            </div>
                            <div className="mt-2">
                                <button className="btn btn-success w-100" type="submit">
                                    Upload a Blog
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogModal;
