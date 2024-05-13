import React, { useContext, useEffect, useState } from "react";
import { SharedData } from "../SharedData/SharedContext";
import BlogModal from "../Modals/BlogModal/BlogModal";
import { useNavigate } from "react-router-dom";
import useTitle from "../CustomHook/useTitle/useTitle";

const Blogs = () => {
    useTitle("Blog- library")
    const { user } = useContext(SharedData);
    const [allBlog, setAllBlog] = useState([]);
    const navigate = useNavigate();
    const [dataLoad, setDataLoad] = useState(false);

    useEffect(() => {
        
            fetch(`${process.env.REACT_APP_SERVER}/allBlog`)
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setAllBlog(data);
                    setDataLoad(false);
                });

    }, []);

    return (
        <div className="container-fluid ps-0 pe-0" style={{}}>
            {user?.role === "admin" && (
                <div className="card mt-3">
                    <div className="card-body">
                        <div className="d-flex justify-content-center">
                            <h5 className="my-auto">
                                Do you want to add a blog?
                            </h5>{" "}
                            <button
                                className=" ms-3 btn btn-outline-secondary"
                                data-bs-target="#BlogModal"
                                data-bs-toggle="modal"
                            >
                                Click Here
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="row g-2 ms-2">
                {allBlog.length === 0 ? (
                    <div
                        className="col-12 col-md-12 col-lg-12 mt-3"
                        style={{ marginTop: "auto" }}
                    >
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{
                                height: "350px",
                                width: "100%",
                                backgroundColor: "#C9CCCE",
                            }}
                        >
                            <h3 className="text-white fw-bold">
                                No Book found
                            </h3>
                        </div>
                    </div>
                ) : (
                    allBlog.map((item, index) => (
                        <div
                            className="col-12 col-md-4 col-lg-3 mt-3"
                            key={index}
                        >
                            <div className="card">
                                <div style={{ height: "120px" }}>
                                    <img
                                        src={item?.image}
                                        alt=""
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                        }}
                                    />
                                </div>
                                <div className="card-body">
                                    <h5>{item?.title}</h5>
                                    <button className="btn btn-primary" onClick={()=>navigate(`/blog-details?id=${item?._id}`)}>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <BlogModal dataLoad={setDataLoad}></BlogModal>
        </div>
    );
};

export default Blogs;
