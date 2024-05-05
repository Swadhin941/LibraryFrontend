import React from 'react';

const ConfirmModal = ({deleteData}) => {
    return (
        <div className="modal fade" id="ConfirmModal" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body">
                        <p className='text-center'>Are you sure want to delete it?</p>
                        <div className='mt-1 d-flex justify-content-between'>
                            <button className='btn btn-sm btn-success' onClick={()=>deleteData(true)} data-bs-dismiss="modal">Yes</button>
                            <button className='btn btn-sm btn-danger' data-bs-dismiss="modal">No</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;