import React, { useEffect, useState, useRef } from 'react';
import { KTIcon, KTSVG } from '../../../../_metronic/helpers'; // Ensure KTSVG is imported correctly
import { left } from '@popperjs/core';
import "./FromRetail.css"
import { RetailerModel } from '../../model/AccountType/retailer/RetailerModel';
import { useSelector } from 'react-redux';
import { getUserRetailer } from '../../../slice/UserSlice/UserSlice';
import { Modal, Button, Form, Input, Checkbox, Select, Row, Col } from 'antd';
const { Option } = Select;

type Props = {
  retailerupdate: RetailerModel
  isEdit: boolean
  resetIsEdit: () => void
}
const FromRetail = ({ retailerupdate, isEdit, resetIsEdit }: Props) => {

  const [showPassword, setShowPassword] = useState(false);
  const [retailerName, setRetailerName] = useState<string>(retailerupdate.name || "");
  const [retailerEmail, setRetailerEmail] = useState<string>(retailerupdate.email || "");
  const [retailerAddress, setRetailerAddress] = useState<string>(retailerupdate.address || "");
  const [retailerCode, setRetailerCode] = useState<string>(retailerupdate.code || "");
  const [retailerGstin, setRetailerGstin] = useState<string>(retailerupdate.gstin || "");
  const [retailerPhone2, setRetailerPhone2] = useState<number>(retailerupdate.phone2 || 0);
  const [retailerPhone, setRetailerPhone] = useState<number>(retailerupdate.phone || 0);
  const [manager_id, setManager_id] = useState<number>(retailerupdate.manager_id || 0);
  const getRetailer = useSelector(getUserRetailer);
  const [allManager, setAllManager] = useState<RetailerModel[]>([]);
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false)!
  const [password, setPassword] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>("")

  useEffect(() => {

    if (getRetailer &&
      getRetailer.length > 0) {
      const allretdata: RetailerModel[] = []
      getRetailer.map((item: RetailerModel) => {
        if (item.role === "Manager") {
          allretdata.push(item)
        }
      })
      setAllManager(allretdata);
    }
  }, [getRetailer]);

  const togglePasswordVisibility = () => {
    setIsResetPassword(!isResetPassword)
  };

  const handleCancel = () => {
    resetIsEdit()
  }


  const handleSave = () => {
    resetIsEdit()
  }

  useEffect(() => {
    if (password && confirmPassword && isResetPassword) {
      if (password === confirmPassword) {
        setPasswordError("")
      } else {
        setPasswordError("password not matched")
      }
    }
  }, [password, confirmPassword, isResetPassword])

  return (
    <>
      <Modal
        title="Added Retailer"
        className='from-manager'
        visible={isEdit}
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

            <Form layout="vertical">

              <div className='row'>
                <div className="mb-3 col-6">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name"
                    value={retailerName}
                    onChange={(e) => setRetailerName(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label htmlFor="name" className="form-label">Email</label>
                  <input type="text" className="form-control" id="name"
                    value={retailerEmail}
                    onChange={(e) => setRetailerEmail(e.target.value)} />
                </div>
              </div>

              <div className='row '>
                <div className="mb-3 col-6">
                  <label htmlFor="gstin" className="form-label">Code</label>
                  <input type="text" className="form-control" id="gstin"
                    value={retailerCode}
                    onChange={(e) => setRetailerCode(e.target.value)}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label htmlFor="gstin" className="form-label">GSTIN</label>
                  <input type="text" className="form-control" id="gstin"
                    value={retailerGstin}
                    onChange={(e) => setRetailerGstin(e.target.value)}
                  />
                </div>
              </div>

              <div className='row'>
                <div className="mb-3 col-6">
                  <label htmlFor="manager-name" className="form-label">Phone</label>
                  <input type="text" className="form-control" id="manager-name"

                    value={retailerPhone}
                    onChange={(e) => {
                      const ret = e.target.value
                      setRetailerPhone(parseInt(ret));
                    }}
                  />
                </div>

                <div className="mb-3 col-6">
                  <label htmlFor="name" className="form-label">Phone2</label>
                  <input type="text" className="form-control " id="name"

                    value={retailerPhone2}
                    onChange={(e) => {
                      const ret = e.target.value

                      setRetailerPhone2(parseInt(ret))
                    }} />
                </div>

              </div>


              <div className="mb-3 col-12">
                <label htmlFor="manager-name" className="form-label">Manager</label>
                {/* <select className="form-select" aria-label="Select example">

                  {allManager &&
                    allManager.length > 0 &&
                    allManager.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}

                </select> */}
                <Select className=" w-100 select-option">
                  {allManager &&
                    allManager.length > 0 &&
                    allManager.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                </Select>
              </div>

              <div className="mb-5 col-12 ">
                <label htmlFor="address" className="form-label">Address</label>
                <input type="text" className="form-control" id="address"

                  value={retailerAddress}
                  onChange={(e) => setRetailerAddress(e.target.value)} />
              </div>

              <hr className='underline-from mb-2' style={{ background: "#000", height: "1px" }}></hr>

              <div className="form-check  mx-0 mb-4 mt-3">
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




            </Form>
          </div>
        </div>


      </Modal>
    </>
  );
};

export default FromRetail;
