import React, { useContext } from 'react';
import { SharedData } from '../../SharedData/SharedContext';
import { useNavigate } from 'react-router-dom';

const MiniProfileModal = () => {
    const {user, logout}= useContext(SharedData);
    const navigate = useNavigate();
    return (
        <div className='modal fade' data-bs-backdrop="static" data-bs-keyboard="false" id='MiniProfileModal'>
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header" style={{borderBottom:"0px"}}>
                        <button className='btn btn-close' data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className='d-flex justify-content-center'>
                            <div style={{height:"70px", width:"70px"}}>
                                <img src={user?.img || "https://i.ibb.co/bmVqbdY/empty-person.jpg"} style={{ height: "100%", width: "100%", borderRadius: "50%" }} alt="" />
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <h6 style={{fontWeight:"600"}}>{user?.fullname}</h6>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <h6>Email: {user?.email}</h6>
                        </div>
                        <div>
                            <button className='btn btn-outline-primary w-100 mt-2' onClick={()=>navigate('/profile')} data-bs-dismiss="modal">View details</button>
                            <button className='btn btn-outline-danger w-100 my-2' onClick={()=>logout()} data-bs-dismiss="modal">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MiniProfileModal;