import React, { useContext, useEffect, useState } from "react";
import { SharedData } from "../SharedData/SharedContext";
import useTitle from "../CustomHook/useTitle/useTitle";
import toast from "react-hot-toast";
import useAxiosSecure from "../CustomHook/useAxiosSecure/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    useTitle("Profile- Library");
    const { user, setUser } = useContext(SharedData);
    const [tempImg, setTempImg] = useState(null);
    const [axiosSecure] = useAxiosSecure();
    const [allActivity, setAllActivity] = useState([]);
    const navigate = useNavigate();

    const handleImgChange = (e) => {
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

    const handleSave = () => {
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
                if (imgData.success) {
                    axiosSecure
                        .put(`/updateUser?user=${user?.email}`, {
                            img: imgData?.data?.url,
                        })
                        .then((res) => res.data)
                        .then((data) => {
                            if (data?.modifiedCount >= 1) {
                                const temp = {
                                    ...user,
                                    img: imgData?.data?.url,
                                };
                                setUser(temp);
                                setTempImg(null);
                            }
                        })
                        .catch((error) => {
                            toast.error(error.message);
                        });
                }
            });
    };

    const handleCancel = () => {
        setTempImg(null);
    };

    useEffect(() => {
        if (user) {
            axiosSecure
                .get(`/allActivity?user=${user?.email}`)
                .then((res) => res.data)
                .then((data) => {
                    setAllActivity(data);
                })
                .catch((error) => {
                    toast.error(error.message);
                });
        }
    }, [user]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <div className="d-flex justify-content-center">
                        <div
                            style={{ height: "70px", width: "70px" }}
                            onClick={() =>
                                document.querySelector(".uploadImg").click()
                            }
                        >
                            <img
                                src={
                                    tempImg
                                        ? URL.createObjectURL(tempImg)
                                        : user?.img ||
                                          "https://i.ibb.co/bmVqbdY/empty-person.jpg"
                                }
                                style={{
                                    height: "100%",
                                    width: "100%",
                                    borderRadius: "50%",
                                }}
                                alt=""
                            />
                        </div>
                        <input
                            type="file"
                            className="uploadImg"
                            id="uploadImg"
                            onChange={handleImgChange}
                            hidden
                        />
                    </div>
                    {tempImg && (
                        <div className="d-flex justify-content-center my-2">
                            <button
                                className="btn btn-sm btn-success"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-sm btn-danger ms-1"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                    <div className="d-flex justify-content-center">
                        <h6 style={{ fontWeight: "600" }}>{user?.fullname}</h6>
                    </div>
                    <div className="d-flex justify-content-center">
                        <h6>Email: {user?.email}</h6>
                    </div>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                    <h5>History</h5>
                    <hr />
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                    {allActivity.length === 0 ? (
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                height: "300px",
                                width: "100%",
                                backgroundColor: "#C9CCCE",
                            }}
                        >
                            <h3 className="text-white fw-bold">No Data</h3>
                        </div>
                    ) : (
                        allActivity.map((item, index) => (
                            <div key={index}>
                                <div className="d-flex justify-content-between">
                                    <h6>Date: {item?.localDate}</h6>
                                    <h6>
                                        Total Amount: {item?.totalAmount} Taka
                                    </h6>
                                </div>
                                <div className="row g-2">
                                    {item?.products.map((item2, index2) => (
                                        <div
                                            className="col-12 col-md-12 col-lg-12"
                                            key={index2}
                                        >
                                            <div
                                                className="card card-body"
                                                style={{
                                                    border: "1px solid #1789d6",
                                                    backgroundColor: "#badbf2",
                                                }}
                                            >
                                                <div className="row">
                                                    <div className="col-4 col-sm-3 col-md-2 col-lg-2">
                                                        <img
                                                            src={item2?.image}
                                                            alt=""
                                                            style={{
                                                                height: "auto",
                                                                width: "100%",
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="col-8 col-sm-9 col-md-10 col-lg-10">
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                <h5>
                                                                    {
                                                                        item2?.title
                                                                    }
                                                                </h5>
                                                                <h6 className="text-muted">
                                                                    Author:{" "}
                                                                    {
                                                                        item2?.writer
                                                                    }
                                                                </h6>
                                                                <h6 className="text-muted">
                                                                    Purchase
                                                                    Quantity:{" "}
                                                                    {
                                                                        item2?.quantity
                                                                    }
                                                                </h6>
                                                            </div>
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() =>
                                                                        navigate(
                                                                            `/book-details?id=${item2?.bookId}`
                                                                        )
                                                                    }
                                                                >
                                                                    View Details
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
