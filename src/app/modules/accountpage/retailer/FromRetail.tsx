import React, { useEffect, useState, useRef } from 'react';
import { KTIcon, KTSVG } from '../../../../_metronic/helpers'; // Ensure KTSVG is imported correctly
import { left } from '@popperjs/core';
import  "./FromRetail.css"
import { RetailerModel } from '../../model/AccountType/retailer/RetailerModel';
import { useSelector } from 'react-redux';
import { getUserRetailer } from '../../../slice/UserSlice/UserSlice';
import { Modal , Button, Form, Input, Checkbox, Select, Row, Col} from 'antd';
const { Option } = Select;

type Props={
    retailerupdate:RetailerModel
    isEdit:boolean
    resetIsEdit:()=>void
}
const FromRetail = ({retailerupdate,isEdit,resetIsEdit}:Props) => {

    const [showPassword, setShowPassword] = useState(false);
    const [retailerName, setRetailerName] =    useState<string>(retailerupdate.name||"");
    const [retailerEmail, setRetailerEmail] =  useState<string>(retailerupdate.email||"");
    const [retailerAddress, setRetailerAddress] =  useState<string>(retailerupdate.address||"");
    const [retailerCode, setRetailerCode] =    useState<string>(retailerupdate.code||"");
    const [retailerGstin, setRetailerGstin] =  useState<string>(retailerupdate.gstin||"");
    const [retailerPhone2, setRetailerPhone2] =  useState<number>( retailerupdate.phone2|| 0);
    const [retailerPhone, setRetailerPhone] =  useState<number>( retailerupdate.phone||0);
    const [manager_id, setManager_id] =  useState<number>( retailerupdate.manager_id||0);
    const getRetailer = useSelector(getUserRetailer);
    const [allManager, setAllManager] = useState<RetailerModel[]>([]);
   const [isResetPassword, setIsResetPassword]= useState<boolean>(false)!
   const [password, setPassword]= useState<string>()
   const [confirmPassword, setConfirmPassword]= useState<string>()
   const [passwordError, setPasswordError]= useState<string>("")

  useEffect(() => {

    if (getRetailer &&
        getRetailer.length>0) {
        const allretdata:RetailerModel[]=[]
            getRetailer.map((item:RetailerModel)=>{
              if(item.role==="Manager"){
                allretdata.push(item)
              }
            })
            setAllManager(allretdata);
    }
  }, [getRetailer]);
  
    const togglePasswordVisibility = () => {
        setIsResetPassword(!isResetPassword)
    };

  const handleCancel=()=>{
   resetIsEdit()
  }


  const handleSave=()=>{
    resetIsEdit()
  }

  useEffect(()=>{
    if(password&&confirmPassword&&isResetPassword){
        if(password ===confirmPassword){
            setPasswordError("")
        } else{
            setPasswordError("password not matched")
        }
    }
  },[password,confirmPassword,isResetPassword])
  
    return (
     <>
     <Modal
        title="Added Retailer"
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
        <Form layout="vertical">
          <Form.Item label="Name">
            <Input
              value={retailerName}
              onChange={(e) => setRetailerName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              value={retailerEmail}
              onChange={(e) => setRetailerEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Code">
            <Input
              value={retailerCode}
              onChange={(e) => setRetailerCode(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="GSTIN">
            <Input
              value={retailerGstin}
              onChange={(e) => setRetailerGstin(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Phone">
            <Input
              value={retailerPhone}
            onChange={(e) => {
                const ret= e.target.value
                setRetailerPhone(parseInt(ret));
            }}  
            />
          </Form.Item>
          <Form.Item label="Phone2">
            <Input
              value={retailerPhone2}
             onChange={(e) =>{
                const ret= e.target.value
               
                 setRetailerPhone2(parseInt(ret))}}
            />
          </Form.Item>
          <Form.Item label="Manager">
            <Select>
              {allManager &&
                allManager.length > 0 &&
                allManager.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item label="Address">
            <Input
              value={retailerAddress}
              onChange={(e) => setRetailerAddress(e.target.value)}
            />
          </Form.Item>
          <Checkbox onChange={togglePasswordVisibility}>
            Reset Password
          </Checkbox>
          {isResetPassword &&
         <Row>
         <Col span={12}>
           <Form.Item label="Password"
           
           >
             <Input
             value={password}
               type={showPassword ? 'text' : 'password'}
               onChange={(e)=>setPassword(e.target.value)}
              
             />
           </Form.Item>
         </Col>
       </Row>}
          {isResetPassword &&
          <Row>
          <Col span={12}>
            <Form.Item label="Confirm Password"
            
            >
              <Input
              value={confirmPassword}
                type={showPassword ? 'text' : 'password'}
                onChange={(e)=>{setConfirmPassword(e.target.value)}}
                
              />
            </Form.Item>
          </Col>
        </Row>}
        </Form>
      </Modal>
     </>
    );
};

export default FromRetail;
