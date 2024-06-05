import React, { useState } from 'react';

import { Modal, Form, Input } from "antd";
import "./ManagerFrom.css"
type Props = {
    isModalVisible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};


const ManagerForm = ({ isModalVisible, handleOk, handleCancel }: Props) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };



    return (
        <Modal title="Added Manager " className='from-manager' visible={isModalVisible} >
          
                <div className="modal-content" >
                  
                    <div className="modal-body " style={{ textAlign: "left" }}>
                        <form>

                            <div className='row'>
                                <div className="mb-3 col-6">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="name" className="form-label">Email</label>
                                    <input type="text" className="form-control" id="name" />
                                </div>
                            </div>

                            <div className='row '>
                                <div className="mb-3 col-6">
                                    <label htmlFor="gstin" className="form-label">Code</label>
                                    <input type="text" className="form-control" id="gstin" />
                                </div>


                                <div className="mb-3 col-6">
                                    <label htmlFor="gstin" className="form-label">GSTIN</label>
                                    <input type="text" className="form-control" id="gstin" />
                                </div>



                            </div>

                            <div className='row'>


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
                                <label htmlFor="manager-name" className="form-label">Retailer</label>
                                <select className="form-select" aria-label="Select example">

                                    <option value="1">Shashi Kiran Shetty</option>
                                    <option value="2">Ashutosh Dayal</option>

                                </select>
                            </div>


                            <div className='row '>
                                <div className="mb-5 col-12 ">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" className="form-control" id="address" />
                                </div>

                                <hr className='underline-from mb-2' style={{ background: "#000", height: "1px" }}></hr>

                                <div className="form-check  mx-3 mb-5 ">
                                    <input
                                        className="form-check-input mt-2 cursor-pointer"
                                        type="checkbox"
                                        id="show-password"
                                        onChange={togglePasswordVisibility}
                                    />

                                    <label className="form-check-label mt-2" htmlFor="show-password">
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
                            className="btn btn-light mx-6"
                            data-bs-dismiss="modal"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button onClick={handleOk} type="button" className="btn btn-dark">
                            Save
                        </button>
                    </div>
                </div> 
  
        </Modal>
    );
};

export default ManagerForm;
