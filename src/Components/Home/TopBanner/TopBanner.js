import React, { useContext } from 'react';
import "./TopBanner.css";
import { SharedData } from '../../SharedData/SharedContext';

const TopBanner = () => {
    const { navButton } = useContext(SharedData);
    return (
        <div className='container-fluid ps-0 pe-0'>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <div className='bannerImgDiv w-100' style={{ height: "400px" }}>
                        <img src="https://i.ibb.co/Df7YgTm/banner.jpg" alt="" className='img-fluid w-100' style={{ height: "100%" }} />
                        <div className={navButton ? "topBannerTextAfterClick" : "topBannerText"}>
                            <h1>Nothing is pleasanter than exploring a library</h1>
                            <h6>Walter Savage Landor</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBanner;