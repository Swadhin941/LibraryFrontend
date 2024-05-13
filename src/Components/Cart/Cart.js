import React, { useContext, useEffect, useState } from "react";
import { SharedData } from "../SharedData/SharedContext";
import useAxiosSecure from "../CustomHook/useAxiosSecure/useAxiosSecure";
import toast from "react-hot-toast";
import useTitle from "../CustomHook/useTitle/useTitle";
import ConfirmModal from "../Modals/ConfirmModal/ConfirmModal";

const Cart = () => {
  const [allData, setAllData] = useState([]);
  useTitle(
    `Cart (${
      allData?.length > 0 ? allData.length.toString() + ")" : ""
    }- Library`
  );
  const { user } = useContext(SharedData);
  const [axiosSecure] = useAxiosSecure();
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedToDelete, setSelectedToDelete] = useState("");
  const [deleteData, setDeleteData] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/allCartData?user=${user?.email}`)
        .then((res) => res.data)
        .then((data) => {
          setAllData(data);
        });
    }
  }, [user]);

  useEffect(() => {
    if (allData.length !== 0) {
      let total = 0;
      allData.forEach((data) => {
        total += data.price * data.quantity;
      });
      setTotalAmount(total);
    }
  }, [allData]);

  const handleIncrement = (item) => {
    console.log(item);
    if (item.quantity === parseInt(item?.quantities)) {
      toast.error("Out of stock");
      return;
    } else {
      axiosSecure
        .put(`/increCart?user=${user?.email}`, { ...item })
        .then((res) => res.data)
        .then((increData) => {
          console.log(increData);
          if (increData?.modifiedCount >= 1) {
            const temp = [...allData];
            temp.forEach((data) => {
              if (data?._id === item._id) {
                data.quantity = data?.quantity + 1;
              }
            });
            setAllData([...temp]);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const handleDecrement = (item) => {
    if (item?.quantity === 1) {
      toast.error("Quantity can't be less than 1");
      return;
    }
    axiosSecure
      .put(`/decreCart?user=${user?.email}`, { ...item })
      .then((res) => res.data)
      .then((decreData) => {
        if (decreData?.modifiedCount >= 1) {
          const temp = [...allData];
          temp.forEach((data) => {
            if (data?._id === item?._id) {
              data.quantity = data?.quantity - 1;
            }
          });
          setAllData([...temp]);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (deleteData && selectedToDelete !== "") {
      console.log(deleteData, selectedToDelete);
      axiosSecure
        .delete(`deleteFromCart?user=${user?.email}`, {
          data: { id: selectedToDelete },
        })
        .then((res) => res.data)
        .then((data) => {
          if (data?.deletedCount >= 1) {
            let temp = [...allData];
            temp = temp.filter((id) => id._id !== selectedToDelete);
            setAllData([...temp]);
            setSelectedToDelete("");
            setDeleteData(false);
            toast.error("Removed from cart");
            return;
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [deleteData, selectedToDelete]);

  const handlePayment = () => {
    axiosSecure
      .post(`/payment-init?user=${user?.email}`, {
        email: user?.email,
        products: [...allData],
        totalAmount: totalAmount,
      })
      .then((res) => res.data)
      .then((data) => {
        if(data?.url){
          window.location.replace(data?.url);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="container-fluid p-2">
      {allData?.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "300px", width: "100%", backgroundColor: "#CACCCE" }}
        >
          <h1 className="text-white fw-bold">No data found</h1>
        </div>
      ) : (
        <div>
          <div
            style={{
              height: "60vh",
              overflow: "auto",
              overflowX: "hidden",
              overflowY: "auto",
            }}
          >
            <div className="row g-2">
              {allData.map((item, index) => (
                <div className="col-12 col-md-12 col-lg-12" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6 col-sm-6 col-md-3 col-lg-2">
                          <img src={item?.image} alt="" className="img-fluid" />
                        </div>
                        <div className="col-6 col-sm-6 col-md-9 col-lg-10">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6>{item.title}</h6>
                              <p className="my-0">Edition: {item.edition}</p>
                              <p className="my-0">
                                Price: {item.price + " Taka"}
                              </p>
                              <div className="mt-1">
                                <button
                                  className="btn btn-light"
                                  title="Delete"
                                  onClick={() => setSelectedToDelete(item?._id)}
                                  data-bs-target="#ConfirmModal"
                                  data-bs-toggle="modal"
                                >
                                  <i className="bi bi-trash-fill"></i>
                                </button>
                                <button
                                  className="btn btn-light ms-2"
                                  title="Details"
                                >
                                  <i className="bi bi-ticket-detailed-fill"></i>
                                </button>
                              </div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                              <div>
                                <button
                                  className="btn btn-light me-1"
                                  onClick={() => handleDecrement(item)}
                                >
                                  <i className="bi bi-dash"></i>
                                </button>
                                <span>{item?.quantity}</span>
                                <button
                                  className="btn btn-light ms-1"
                                  onClick={() => handleIncrement(item)}
                                >
                                  <i className="bi bi-plus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <div>
              <div className="d-flex">
                <h5>Total: {totalAmount} Taka</h5>
              </div>
              <div>
                <button
                  className="btn btn-primary w-100"
                  onClick={handlePayment}
                >
                  Continue payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal deleteData={setDeleteData}></ConfirmModal>
    </div>
  );
};

export default Cart;
