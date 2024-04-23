import React from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";

const Spinner = () => {
    return (
        <div className='container-fluid d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
            <PacmanLoader color="#36d7b7" />
        </div>
    );
};

export default Spinner;