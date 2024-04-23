import React, { useContext } from 'react';
import { SharedData } from '../SharedData/SharedContext';

const Profile = () => {
    const { user } = useContext(SharedData);
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <div className='d-flex justify-content-center'>
                        <div style={{ height: "70px", width: "70px" }}>
                            <img src={user?.img || "https://i.ibb.co/bmVqbdY/empty-person.jpg"} style={{ height: "100%", width: "100%", borderRadius: "50%" }} alt="" />
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <h6 style={{ fontWeight: "600" }}>{user?.fullname}</h6>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <h6>Email: {user?.email}</h6>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;