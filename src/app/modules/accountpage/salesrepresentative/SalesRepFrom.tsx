import React, { useState } from 'react';

import { Modal, Form, Input } from "antd";
import "../manager/ManagerFrom.css"
import { CurentUser } from '../../model/useAccount/CurrentUser';
import { RetailerModel } from '../../model/AccountType/retailer/RetailerModel';
import { getUserRetailer } from '../../../slice/UserSlice/UserSlice';
import { useSelector } from 'react-redux';
import { Button, Checkbox, Select, Row, Col } from 'antd';
const { Option } = Select;

type Props = {
    isModalVisible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    salesRepdata: CurentUser;
    resetIsEdit: () => void
};



const handleCancel = () => {
    resetIsEdit()
  }

const handleSave = () => {
    resetIsEdit()
  }


const SalesRepFrom = ({ isModalVisible, handleOk, handleCancel, salesRepdata, resetIsEdit }: Props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [salesRepName, setsalesRepName] = useState<string>(salesRepdata.name || "");
    const [salesRepEmail, setsalesRepEmail] = useState<string>(salesRepdata.email || "");
    const [salesRepAddress, setsalesRepAddress] = useState<string>(salesRepdata.address || "");
    const [salesRepCode, setsalesRepCode] = useState<string>(salesRepdata.code || "");
    const [salesRepGstin, setsalesRepGstin] = useState<string>(salesRepdata.gstin || "");
    const [salesRepPhone2, setsalesRepPhone2] = useState<number>(salesRepdata.phone2 || 0);
    const [salesRepPhone, setsalesRepPhone] = useState<number>(salesRepdata.phone || 0);
    const [salesRep_id, setsalesRep_id] = useState<number>(salesRepdata.manager_id || 0);
    const getmanager = useSelector(getUserRetailer);
    const [allRetailer, setAllRetailer] = useState<RetailerModel[]>([]);
    const [isResetPassword, setIsResetPassword] = useState<boolean>(false)!
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [passwordError, setPasswordError] = useState<string>("")





    // const togglePassword = () => {
    //     setShowPassword(!showPassword);
    // };


    const togglePassword = () => {
        setIsResetPassword(!isResetPassword)
      };
    
    return (
        <Modal title="Added Sales Representative" className='from-manager' visible={isModalVisible} 
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            Save
          </Button>,
        ]}
        
        >
          
                <div className="modal-content" >
                  
                    <div className="modal-body " style={{ textAlign: "left" }}>
                        <form>

                            <div className='row'>
                                <div className="mb-3 col-6">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" 
                                         value={salesRepName}
                                         onChange={(e) => setsalesRepName(e.target.value)}
                                        />
                                </div>
                                <div className="mb-3 col-6">
                                    <label htmlFor="name" className="form-label">Email</label>
                                    <input type="text" className="form-control"
                                       value={salesRepEmail}
                                       onChange={(e) => setsalesRepEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className='row '>
                                <div className="mb-3 col-6">
                                    <label htmlFor="gstin" className="form-label">Code</label>
                                    <input type="text" className="form-control" 
                                        value={salesRepCode}
                                        onChange={(e) => setsalesRepCode(e.target.value)}
                                    />
                                </div>


                                <div className="mb-3 col-6">
                                    <label htmlFor="gstin" className="form-label">GSTIN</label>
                                    <input type="text" className="form-control"
                                        value={salesRepGstin}
                                        onChange={(e) => setsalesRepGstin(e.target.value)}
                                    />
                                </div>



                            </div>

                            <div className='row'>
                                <div className="mb-3 col-6">
                                    <label htmlFor="manager-name" className="form-label">Phone</label>
                                    <input type="text" className="form-control" 
                                     value={salesRepPhone}
                                     onChange={(e) => {
                                         const ret = e.target.value
                                         setsalesRepPhone(parseInt(ret));

                                     }}
                                    />
                                </div>

                                <div className="mb-3 col-6">
                                    <label htmlFor="name" className="form-label">Phone2</label>
                                    <input type="text" className="form-control "
                                    value={salesRepPhone2}
                                    onChange={(e) => {
                                        const ret = e.target.value
                                        setsalesRepPhone2(parseInt(ret))
                                    }}
                                    />
                                </div>

                            </div>


                            <div className="mb-3 col-12">
                                <label htmlFor="manager-name" className="form-label">Retailer</label>
                                <Select className=" w-100 select-option">
                                {allRetailer &&
                                    allRetailer.length > 0 &&
                                    allRetailer.map((item) => (
                                        <Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Option>
                                    ))}
                            </Select>
                            </div>


                            <div className='row '>
                                <div className="mb-5 col-12 ">
                                    <label htmlFor="address" className="form-label ">Address</label>
                                    <input type="text" className="form-control"
                                     value={salesRepAddress}
                                     onChange={(e) => setsalesRepAddress(e.target.value)}
                                    />
                                </div>

                                <hr className='underline-from mb-2' style={{ background: "#000", height: "1px" }}></hr>



                                <div className="form-check  mx-3 mb-4 mt-3">
                                <input
                                    className="form-check-input mt-2 cursor-pointer"
                                    type="checkbox"
                                    id="show-password"
                                    onChange={togglePassword}
                                />

                                <label className="form-check-label mt-2" htmlFor="show-password">
                                    Reset Password
                                </label>
                            </div>


                            <div className='row'>
                                
                                {isResetPassword &&
                                    <div className="mb-3 col-6">
                                        <label htmlFor="name" className="form-label">Password</label>

                                        <input

                                            className="form-control invalid"

                                            value={password}
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={(e) => setPassword(e.target.value)}


                                        />

                                    </div>}


                                {isResetPassword &&
                                    <div className="mb-3 col-6">
                                        <label htmlFor="name" className="form-label">Confirm Password</label>

                                        <input

                                            className="form-control invalid"

                                            value={confirmPassword}
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={(e) => { setConfirmPassword(e.target.value) }}

                                        />
                                    </div>}
                            </div>


                            </div>








                        </form>
                    </div>

                    {/* <div className="modal-footer">
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
                    </div> */}
                </div> 
  
        </Modal>
    );
};

export default SalesRepFrom;
function resetIsEdit() {
    throw new Error('Function not implemented.');
}

