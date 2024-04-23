import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AllCategory = () => {
    const [allCategory, setAllCategory]= useState([]);
    const [limit, setLimit]= useState(true);
    const [allData, setAllData]= useState([]);
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_SERVER}/allCategory`)
        .then(res=>res.json())
        .then(data=>{
            if(data.length!==0){
                setAllCategory(data);
                setAllData(data);
            }
        })
        .catch(error=>{
            toast.error(error.message);
        })
    },[])
    useEffect(()=>{
        if(limit){
            if(allCategory.length!==0){
                const temp = allData.slice(0, 6);
                setAllCategory([...temp]);
            }
        }
        else{
            const temp = [...allData];
            setAllCategory([...temp]);
        }
    },[limit, allData])
    return (
        <div className='container-fluid mt-3'>
            <div className="row g-2">
                <div className="col-12 col-md-12 col-lg-12">
                    <h4 className='my-0'>All Categories</h4>
                    <hr />
                </div>
                {
                    allCategory.map((item, index)=><div className='col-6 col-sm-4 col-md-3 col-lg-2' key={index}>
                        <div className="card" style={{cursor:"pointer"}}>
                            <div className="card-body">
                                <h6 style={{fontSize: item?.name.length <=15?"17px": "15px"}}>{item?.name}</h6>
                            </div>
                        </div>
                    </div>)
                }
                <div className='mt-2'>
                    <div className='d-flex justify-content-center'>
                        {
                            limit ?<button className='btn btn-sm btn-primary'onClick={()=>setLimit(false)}>See more</button> :<button className='btn btn-sm btn-success' onClick={()=>setLimit(true)}>See less</button>
                        }
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCategory;