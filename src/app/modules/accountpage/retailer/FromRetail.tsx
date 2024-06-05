import React, { useState } from 'react';
import { KTIcon, KTSVG } from '../../../../_metronic/helpers'; // Ensure KTSVG is imported correctly
import { left } from '@popperjs/core';
import  "./FromRetail.css"

const FromRetail = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div >
            {/* <button type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_1"
            >
                Launch demo modal
            </button> */}
            <div
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_1"
            >
                <KTIcon iconName='pencil' className='fs-3' />
            </div>

            <div className="modal fade" tabIndex={-1} id="kt_modal_1">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ width: "600px" }}>
                        <div className="modal-header">
                            <h5 className="modal-title fs-3">Added Retailer</h5>
                            <div className="btn btn-icon btn-sm btn-active-light-secomdary ms-2" data-bs-dismiss="modal" aria-label="Close">
                                <i className="ki-duotone ki-cross fs-1"><span className="path1"></span><span className="path2"></span></i>
                            </div>
                        </div>
                        <div className="modal-body" style={{ textAlign: "left" }}>
                            <form>

                                <div className='row mb-2'>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="name" className="form-label">Email</label>
                                        <input type="text" className="form-control" id="name" />
                                    </div>
                                </div>

                                <div className='row mb-2'>
                                    <div className="mb-3 col-6">
                                        <label htmlFor="gstin" className="form-label">Code</label>
                                        <input type="text" className="form-control" id="gstin" />
                                    </div>


                                    <div className="mb-3 col-6">
                                        <label htmlFor="gstin" className="form-label">GSTIN</label>
                                        <input type="text" className="form-control" id="gstin" />
                                    </div>



                                </div>

                                <div className='row mb-2'>


                                    <div className="mb-3 col-6">
                                        <label htmlFor="manager-name" className="form-label">Phone</label>
                                        <input type="text" className="form-control" id="manager-name" />
                                    </div>

                                    <div className="mb-3 col-6">
                                        <label htmlFor="name" className="form-label">Phone2</label>
                                        <input type="text" className="form-control " id="name" />
                                    </div>

                                </div>


                                <div className="mb-3 col-12">
                                        <label htmlFor="manager-name" className="form-label">Manager</label>
                                        <select className="form-select" aria-label="Select example">

                                            <option value="1">Shashi Kiran Shetty</option>
                                            <option value="2">Ashutosh Dayal</option>

                                        </select>
                                    </div>


                                <div className='row mb-2'>


                             

                                     <div className="mb-5 col-12 ">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" />
                                    </div>

                                    <hr className='underline-from mb-2' style={{background:"#000", height:"2px"}}></hr>


                                    
                                    <div className="form-check  mx-3 mb-5 ">
                                        <input
                                            className="form-check-input mt-2 cursor-pointer"
                                            type="checkbox"
                                            id="show-password"
                                            onChange={togglePasswordVisibility}
                                        />

                                        <label className="form-check-label mt-4" htmlFor="show-password">
                                            Reset Password
                                        </label>
                                    </div>

                                    
                                    <div className="mb-3 col-6">
                                    <label htmlFor="name" className="form-label">Password</label>

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control invalid"
                                        id="manager-name"
                                    
                                    />

                                </div>

                                <div className="mb-3 col-6">
                                    <label htmlFor="name" className="form-label">Confirm Password</label>
                                    
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control invalid"
                                        id="manager-name"
                                    
                                    />
                                    </div>
                        




                                </div>




                              



                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-light"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-dark">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FromRetail;
