import React from 'react';
import TopBanner from '../TopBanner/TopBanner';
import ServiceCards from '../ServiceCards/ServiceCards';
import useTitle from '../../CustomHook/useTitle/useTitle';
import AllCategory from '../AllCategory/AllCategory';

const Home = () => {
    useTitle("Home- Library");
    return (
        <div className='container-fluid ps-0 pe-0'>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-12">
                    <TopBanner></TopBanner>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                    <ServiceCards></ServiceCards>
                </div>
                <div className="col-12 col-md-12 col-lg-12">
                    <AllCategory></AllCategory>
                </div>
            </div>
        </div>
    );
};

export default Home;