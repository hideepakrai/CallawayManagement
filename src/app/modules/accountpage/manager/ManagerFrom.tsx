import React, { useState } from 'react';

import { Modal, Form, Input } from "antd";
import "./ManagerFrom.css"
import { CurentUser } from '../../model/useAccount/CurrentUser';
import { getUserRetailer } from '../../../slice/UserSlice/UserSlice';
import { useSelector } from 'react-redux';
import { RetailerModel } from '../../model/AccountType/retailer/RetailerModel';
import { Button, Checkbox, Select, Row, Col } from 'antd';
const { Option } = Select;

type Props = {
    isModalVisible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    managerdata: CurentUser;
    resetIsEdit: () => void
};


const handleCancel = () => {
    resetIsEdit()
  }

const handleSave = () => {
    resetIsEdit()
  }



const ManagerForm = ({ isModalVisible, managerdata }: Props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [managerName, setmanagerName] = useState<string>(managerdata.name || "");
    const [managerEmail, setmanagerEmail] = useState<string>(managerdata.email || "");
    const [managerAddress, setmanagerAddress] = useState<string>(managerdata.address || "");
    const [managerCode, setmanagerCode] = useState<string>(managerdata.code || "");
    const [managerGstin, setmanagerGstin] = useState<string>(managerdata.gstin || "");
    const [managerPhone2, setmanagerPhone2] = useState<number>(managerdata.phone2 || 0);
    const [managerPhone, setmanagerPhone] = useState<number>(managerdata.phone || 0);
    const [manager_id, setManager_id] = useState<number>(managerdata.manager_id || 0);
    const getmanager = useSelector(getUserRetailer);
    const [allRetailer, setAllRetailer] = useState<RetailerModel[]>([]);
    const [isResetPassword, setIsResetPassword] = useState<boolean>(false)!
    const [password, setPassword] = useState<string>()
    const [confirmPassword, setConfirmPassword] = useState<string>()
    const [passwordError, setPasswordError] = useState<string>("")

    // const togglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const togglePassword = () => {
        setIsResetPassword(!isResetPassword)
      };
    

    return (
        <Modal title="Added Manager " className='from-manager' visible={isModalVisible} 
        
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
                                    value={managerName}
                                    onChange={(e) => setmanagerName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="name" className="form-label">Email</label>
                                <input type="text" className="form-control"
                                    value={managerEmail}
                                    onChange={(e) => setmanagerEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='row '>
                            <div className="mb-3 col-6">
                                <label htmlFor="gstin" className="form-label">Code</label>
                                <input type="text" className="form-control"
                                    value={managerCode}
                                    onChange={(e) => setmanagerCode(e.target.value)}
                                />
                            </div>


                            <div className="mb-3 col-6">
                                <label htmlFor="gstin" className="form-label">GSTIN</label>
                                <input type="text" className="form-control"
                                    value={managerGstin}
                                    onChange={(e) => setmanagerGstin(e.target.value)}
                                />
                            </div>



                        </div>

                        <div className='row'>



                            <div className="mb-3 col-6">
                                <label htmlFor="manager-name" className="form-label">Phone</label>
                                <input type="text" className="form-control"
                                    value={managerPhone}
                                    onChange={(e) => {
                                        const ret = e.target.value
                                        setmanagerPhone(parseInt(ret));
                                    }}
                                />
                            </div>

                            <div className="mb-3 col-6">
                                <label htmlFor="name" className="form-label">Phone2</label>
                                <input type="text" className="form-control "
                                    value={managerPhone2}

                                    onChange={(e) => {
                                        const ret = e.target.value
                                        setmanagerPhone2(parseInt(ret))
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
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" className="form-control"

                                    value={managerAddress}
                                    onChange={(e) => setmanagerAddress(e.target.value)} />
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

export default ManagerForm;
function resetIsEdit() {
    throw new Error('Function not implemented.');
}

