import { Button, Card, Table, TableColumnsType } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { BasicModelTravis } from '../../model/travis/TravisMethewModel';
import { AccountOrder } from '../../model/CartOrder/CartModel';
import {useSelector} from "react-redux";
import BrandLogo from "../../../../../public/media/logos/travis-white.png";
import { getCurrentUser, getUserProfile } from '../../../slice/UserSlice/UserSlice';
import {RetailerModel} from "../../model/AccountType/retailer/RetailerModel"

// import BrandLogo from "../../../../../../../BrandLogopublic/media/logos/logo-white.png"
type Props={
    recordPdf:AccountOrder;
    resetTravisPdf:()=>void;
}
const TravisPdfPrintOrder = ({recordPdf,resetTravisPdf}:Props) => {
   const [managerName, setmanagerName]= useState<string>("")
   const [orderDate, setOrderdate]= useState<string>("")
  const[alldata, setAllData]= useState<BasicModelTravis[]>([])
  const[retailerDetail, setRetailerDetail]= useState<RetailerModel>()
   const getCurrentUsers = useSelector(getCurrentUser)
  const getUserProfiles = useSelector(getUserProfile)
         useEffect(()=>{
        if(getCurrentUsers && getCurrentUsers.role==="Manager" && getCurrentUsers.name){
          setmanagerName(getCurrentUsers.name) 
        } 
       },[getCurrentUsers,getUserProfiles])

   useEffect(()=>{
    if(recordPdf &&recordPdf.items && recordPdf.retailer_details &&recordPdf.created_at &&recordPdf.manager_id){
      const orderData= JSON.parse(recordPdf.items)
      setAllData(orderData)
      const retailer= JSON.parse(recordPdf.retailer_details)
      setRetailerDetail(retailer)

    //    if (getCurrentUsers && getCurrentUsers.role==="Admin"){
    //     if(getUserProfiles && getUserProfiles.length>0){
    //       getUserProfiles.map(item=>{
    //         if(item.id==recordPdf.manager_id)
    //       })
    //     }
    // }
    }
   },[recordPdf,getCurrentUsers])
    const columns: TableColumnsType<BasicModelTravis> = [

        {
          title: "SKU",
          dataIndex: "sku",
          width: 100,
          fixed: "left",
    
    
        },
        {
          title: "Size",
          dataIndex: "size",
          key: "size",
          width: 150,
    
        },
    
    
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
            width: 100,
      
      
          },
    
    
        {
          title: "MRP",
          dataIndex: "mrp",
          key: "mrp",
          width: 120,
    
    
    
        },
        {
          title: "QTY",
          dataIndex: "mrp",
          key: "mrp",
          width: 120,
          render:(value, record)=>{
             
            const total= (record.stock_88?record.stock_88:0)+(record.stock_90?record.stock_90:0);
            return(
              <div>
                {total}
              </div>
            )
          }
    
    
    
        },
    
  
    
        {
          title: "MRP",
          dataIndex: "mrp",
          key: "mrp",
          width: 100,
          fixed: 'right'
    
        },
        {
          title: "Discount",
          dataIndex: "LessDiscountAmount",
          key: "LessDiscountAmount",
          width: 100,
          fixed: 'right'
    
        },
    
        {
          title: "Amount",
          dataIndex: "Amount",
          key: "Amount",
          width: 70,
          fixed: 'right'
    
        },
    
    
      ];
    
      const contentToPrint = useRef(null);
      const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => resetTravisPdf(),
    
    
      });

      useEffect(()=>{
        if(alldata && alldata.length > 0){
          handlePrint(null, () => contentToPrint.current);
        }
      },[alldata])
  return (
   
    <div>
    <Button className="mt-12"
      onClick={() => {
        handlePrint(null, () => contentToPrint.current);
      }}

    >Download PDF</Button>

    <Card className="padf" style={{ marginTop: "10px", backgroundColor: "#f8f8f8" }}>

      <div className=" ant-card ant-card-bordered gx-card mt-6" 
      ref={contentToPrint}
       >
        <div className="ant-card-body">
         
       
        <div className="bg-black  py-12  row" style={{ borderRadius: "5px" }}>
          <div className="col-7 text-end ">
            {/* <img className="pdf-image" width={200} src={BrandLogo}></img> */}
          </div>
          <div className="col-5 text-end px-6">
            <h2 className="text-white pdf-title">ORDER PDF</h2>
          </div>
          </div>

      <div className="row px-10 mt-8 mb-18" >
        <div className="col-8">
          <h1 className=" d-flex font-gray-800 fw-light my-1 fs-1  fw-bold pt-3 pb-2" >
            {recordPdf.retailer_name} 
            </h1>

          <div className="d-flex">
            <span className="gx-mb-0  font-weight-800 fw-semibold fs-5">GSTIN: </span>
            <p className='text-gray-600 font-weight-800 fw-semibold fs-5 m-0 mx-1'> 
            {recordPdf.retailer_gstin}
             <i className="bi bi-copy text-gray-600 text-hover-dark cursor-pointer"></i></p>
          </div>

          <div className="user-address pt-2 d-flex">
            <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Phone:
            
             </span>
            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mx-1">
          {recordPdf.retailer_phone}
              
            </p>
          </div>

          <div className="user-address pt-2 ">
            <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Address:</span>
            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">
              {recordPdf.retailer_address}  
            </p>
          </div>
        </div>



        <div className="col-4 user-details-pdf" >
          <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Date:</span> 16/01/2024 </p>

          <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Company:</span> Callaway Golf India</p>

          <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Brand:</span> Travis Mathew</p>
          <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Manager:</span>
        {managerName}
           </p>
          <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Sales Rep:</span>  
         {recordPdf.salesrep_name}
          </p>
        </div>
      </div>


       

          <Table
            className='cart-table-profile project-table-profile mx-7'

            style={{ border: "1px solid #f0f0f0", borderRadius: "8px 8px 0 0px" }}

            columns={columns}
           dataSource={alldata?.map((item) => ({ ...item, key: item.sku }))}

            size="middle"
            pagination={false} />



          <div className="mx-7" style={{ width: "237px", float: "right", paddingTop: "20px", backgroundColor: "#fff" }}>

            <h4 style={{ color: "#545454", display: "flex", borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
              {" "}
              <a style={{ color: "#545454", paddingRight: "88px", paddingLeft: "10px", }}>Sub Total:</a>
              ₹{recordPdf.total_val_pre_discount}
            </h4>
            {/* ₹ */}
            <h4 style={{ color: "#545454", display: "flex", borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
              {" "}
              <a style={{ color: "#545454", paddingRight: "90px", paddingLeft: "10px", }}>Discount:</a> 
              ₹{recordPdf.discount_amount}
            </h4>



            {/* <h4 style={{color:"#545454", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
              {" "}
              <a style={{color:"#545454",  paddingRight:"123px",paddingLeft:"10px", }}>Tax:</a> ₹50
            </h4> */}



            <h4 style={{ color: "#545454", padding: "8px 0px", backgroundColor: "#ddd", fontSize: "14px" }}>
              <a style={{ color: "#545454", paddingRight: "109px", paddingLeft: "10px", }}>Total : </a>
              ₹{recordPdf.total_value}
            </h4>
          </div>
        </div>

      </div>

    </Card>

  </div>
  )
}

export default TravisPdfPrintOrder