import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {BasicModelTravis} from "../model/travis/TravisMethewModel"
import {getRetailers} from "../../slice/retailer/RetailerSlice"
import {RetailerModel,Retailer}  from "../model/AccountType/retailer/RetailerModel"
import {getUserAccount,getUserInfo} from "../.../../../slice/UserSlice/UserSlice"
import {RetailerData,UserAccountModel,RetailerModels,retailerData } from "../../modules/model/useAccount/UserAccountModel"
import "./CartHeader.css"

import {addTravisOrderDetails} from "../../slice/orderSlice/travis/Orderdetails"
type Props={
    CreateOrder: (
        retailerId:number, 
        retailerUserId:number

    )=>void,
   
    
   
    
}
const CartHeader = ({CreateOrder}:Props) => {
    const dispatch= useDispatch()
    const [isNote, setIsNote] = useState(false);
    const handleNote = () => {
      setIsNote(true);
    };

  const [retailerName, setRetailerName]= useState<string>()
  const [retailerAddres, setRetailerAddress]= useState<string>()
  const [retailerId, setRetailerId]= useState<number>(0)
  const [retailerCity, setRetailerCity]= useState<string>()
  const [retailerUserId, setRetailerUserId]= useState<number>(0)
  const [GST, setGST]= useState<string>()

    const handleSubmit=()=>{
        // eslint-disable-next-line no-debugger
        debugger
        if(retailerId!==0 && retailerUserId!==0){
            CreateOrder(retailerId,retailerUserId)
        }
        else{
            alert("Please select retailer")
        }
       
    }

    const getRetailer= useSelector(getRetailers);
    const getUserInfos= useSelector(getUserInfo) as RetailerData;
     console.log("getUserInfo",getUserInfos)
    const getUserAccounts= useSelector(getUserAccount) 
    console.log("getUserAccount",getUserAccounts)
     const handleChange=(value:number)=>{
        const allData= getUserInfos?.retailers?.data?.filter(retailer=>retailer.id==value)
        console.log(allData)
        if (allData && allData.length>0)  { 
           
            setRetailerAddress(allData[0]?.attributes?.Address ?? ''); 
            setRetailerCity(allData[0]?.attributes?.Location ?? '');
            setGST(allData[0]?.attributes?.GST ?? "");
            setRetailerId(allData[0]?.id ??0)
            setRetailerName(allData[0]?.attributes?.Name ??"")
            dispatch(addTravisOrderDetails({

                retailerAddres: allData[0]?.attributes?.Address,
                retailerCity: allData[0]?.attributes?.Location,
                retailerName: allData[0]?.attributes?.Name ??""
              }))

              if(allData[0]?.attributes?.users_permissions_user?.data?.id)
                setRetailerUserId(allData[0]?.attributes?.users_permissions_user?.data?.id)
        } else {
            
            setRetailerAddress('');
            setRetailerCity('');
            setGST("");
            setRetailerId(0)
            setRetailerName("")
        }
       
        // if( allData.length>0 &&allData[0]?.attributes?.users_permissions_user?.data?.id)
        //  sendRetailerData(allData[0]?.attributes?.users_permissions_user?.data?.id
        // )
     }

     
  return (
    <div>
      <div className='row'>
            <div className='col-3 d-flex'>
                <h4 className='mx-3 pt-3 fs-6'>
                    <a>Select Retailer</a>
                </h4>

                <Select
                    showSearch
                    placeholder="Select retailer"
                    optionFilterProp="children"
                    style={{ width: "70%", marginBottom: 10 }} 
                    onChange={handleChange}
                    options={getUserInfos?.retailers?.data?.map((item:RetailerModel) => (
                        { label: item.attributes?.Name ??"",
                             value: item.id}))}

                  

   
                    />
                    
    
                
            </div>
            <div className='col-9'>
                <span style={{ marginRight: 10 }}>
                    {" "}
                    <a style={{ color: "#000", fontSize:"14px"}}> <span style={{fontWeight:600, }}>Address City :</span> {retailerAddres} </a>
                </span>
                <span style={{ width: 100, marginRight: 20, borderRight: "1px solid #ddd", paddingRight: "10px", }}>{retailerCity}</span>
                <span>
                    <a style={{ color: "#000", fontSize:"14px" }}> <span style={{fontWeight:600}}> GSTIN NO. :</span> </a> {GST}
                </span>
            </div>



            <div className='col-12 mb-3'style={{textAlign:"end"}}>
                <span className='mx-3'  >
                    <Button  className="select-btn"> <i style={{ paddingRight: "6px", verticalAlign: "inherit",}}  className="bi bi-bag travis-icon"></i>View Pdf</Button>
                  
                </span>
                <span  className='mx-3' 
                onClick={handleSubmit}
                >
                    <Button className="select-btn"> <i style={{ paddingRight: "6px", verticalAlign: "inherit", }}  className="bi bi-file-earmark-text travis-icon"></i>Submit for Review</Button>
                </span>


                <span className='mx-3' 
                 onClick={handleNote}
                >
          
                    
                    <Button className="select-btn"> <i style={{ paddingRight: "6px", verticalAlign: "inherit", }}  className="bi bi-bag-check travis-icon"></i>Approve Order</Button>
                    
              
              
                </span>

                <span className='mx-3'
                 onClick={handleNote}
                >

                    <Button className="select-btn"> <i style={{ paddingRight: "6px", verticalAlign: "inherit", }} className="bi bi-cart travis-icon"></i>      Reject Order</Button>
                  

              
                </span>

                <span className='mx-3'
                onClick={handleNote}
                >
                    <Button className="select-btn"> <i style={{paddingRight:"6px", verticalAlign:"inherit",}} className="bi bi-pencil-square travis-icon"></i>Add Note</Button>
                </span>
            </div>

            </div>
    </div>
  )
}

export default CartHeader