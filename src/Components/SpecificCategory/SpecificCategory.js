import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import useTitle from "../CustomHook/useTitle/useTitle";
import toast from "react-hot-toast";

const SpecificCategory = () => {
    useTitle("Specific category- Library");
    const [searchParams, setSearchParams] = useSearchParams();
    const [allBook, setAllBook] = useState([]);
    const [copyAll, setCopyAll] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            `${
                process.env.REACT_APP_SERVER
            }/specific-category/${searchParams.get("category")}`
        )
            .then((res) => res.json())
            .then((data) => {
                setAllBook(data);
                setCopyAll(data);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }, [searchParams]);


    const handleChange= (e)=>{
        const text = e.target.value.trim();
        if(text.length >=3){
            setAllBook(copyAll.filter((item)=>{
                return item.title.toLowerCase().includes(text.toLowerCase());
            }));
        }
        else{
            setAllBook([...copyAll])
        }
        
        
    };

    const handleSearch = ()=>{
        if(document.querySelector(".search").value.length>=3){
            setAllBook(copyAll.filter((item)=>{
                return item.title.toLowerCase().includes(document.querySelector(".search").value.toLowerCase());
            }));
        }
        else{
            toast.error("Please write at least 3 characters");
            return;
        }
    }

    return (
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <div className="my-3 d-flex justify-content-center">
                        <div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="search"
                                    className="form-control search"
                                    style={{ width: "350px" }}
                                    placeholder="Search by book name"
                                    onChange={handleChange}
                                />
                                <span className="input-group-text" onClick={handleSearch}>
                                    <i className="bi bi-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {allBook.length === 0 ? (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{
                            height: "300px",
                            width: "100%",
                            backgroundColor: "#C9CCCE",
                        }}
                    >
                        <h3 className="text-white fw-bold">No Book found</h3>
                    </div>
                ) : (
                    <div className="col-12 col-md-12 col-lg-12">
                        <div className="row">
                            {allBook.map((item, index) => (
                                <div
                                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                                    key={index}
                                >
                                    <div className="card">
                                        <div className="card-body">
                                            <div
                                                style={{
                                                    height: "120px",
                                                    width: "100%",
                                                }}
                                            >
                                                <img
                                                    src={item.image}
                                                    alt=""
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                />
                                            </div>
                                            <div className="mt-2">
                                                <h5
                                                    className="my-0"
                                                    style={{
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    {item.title}
                                                </h5>
                                                <p className="text-muted my-0">
                                                    Writer: {item.writer}
                                                </p>
                                                <p className="text-muted my-0">
                                                    Category: {item.category}
                                                </p>
                                                <p className="text-muted my-0">
                                                    Edition: {item.edition}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button
                                                className="btn btn-primary w-100"
                                                onClick={() =>
                                                    navigate(
                                                        `/book-details?id=${item._id}`
                                                    )
                                                }
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpecificCategory;
