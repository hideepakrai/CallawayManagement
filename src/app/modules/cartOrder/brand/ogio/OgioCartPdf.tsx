import React, { useEffect, useState, useRef } from "react";
import { Card, Table, Input, Button, Select, InputNumber, Tooltip } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../../../model/travis/TravisMethewModel.ts"
import {useDispatch, useSelector,} from "react-redux"
import {getTravisOrder} from "../../../../slice/orderSlice/travis/CartOrder.tsx"
import { useReactToPrint } from 'react-to-print';
import {getTravisOrderDetails} from "../../../../slice/orderSlice/travis/Orderdetails.tsx"
import OgioGallery from "../../../brands/ogio/table/column/OgioGallery.tsx";
import { OgioBasicModel } from "../../../model/ogio/OgioBrandModel.ts";
import { getOgioProducts } from "../../../../slice/allProducts/OgioSlice.tsx";
import { getOgioOrder } from "../../../../slice/orderSlice/ogio/OgioCartOrderSlice.tsx";

type Props={
  // totalAmount:number,
  // discountAmount:number,
  // totalNetBillAmount:number,
  // retailerName:string,
  // retailerAddres:string,
  // retailerCity:string,
 
}

const OgioCartPdf = () => {
      
const getTravisOrderDetailss= useSelector(getTravisOrderDetails)

const [retailerName, setRetailerName]= useState<string>()
const [retailerAddres, setRetailerAddress]= useState<string>()
const [retailerId, setRetailerId]= useState<number>(0)
const [retailerCty, setRetailerCity]= useState<string>()
  


  const getAllTravisOrder= useSelector(getTravisOrder)

  useEffect(()=>{
    if(getTravisOrderDetailss.retailerName &&
      getTravisOrderDetailss.retailerAddres &&
      getTravisOrderDetailss.retailerCity
      
    ){
      setRetailerName(getTravisOrderDetailss.retailerName)
      setRetailerAddress(getTravisOrderDetailss.retailerAddres)
      setRetailerCity(getTravisOrderDetailss.retailerCity)
     
    }
  }
  
  ,[
    getTravisOrderDetailss
  ])

  const getOgioOrders: OgioBasicModel[]= useSelector(getOgioOrder)
  const [ allOgioOrders, setGetAllOgioOrders]= useState<OgioBasicModel[]>([])
 
  useEffect(()=>{
    if(getOgioOrders){
      //console.log("Ogio order",getOgioOrders)
      setGetAllOgioOrders(getOgioOrders)
    }
  },[getOgioOrders]);
  const columns: TableColumnsType<OgioBasicModel>= [
    // {
    //   // title: "Image",
    //   dataIndex: "PrimaryImage",
    //   // fixed: "left",
    //   width: 50,
    //   render: (value) => <OgioGallery value={value} />,
    // },

    {
      title: "SKU",
      dataIndex: "SKU",
      width: 100,
      fixed: "left",

     
    },

    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
      width: 150,
        fixed: "left",
      
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description", 
      width: 150,
      
    },
    
    //product Type
    {
      title: "ProductType",
      dataIndex: "OgiAttributes",
      key: "ProductType",
      width: 150,
      render: (value) => <span>{value && value[0] && value[0].ProductType}</span>,

    

    },


    {
      title: "Category",
      dataIndex: "OgiAttributes",
      key: "Category",
      width: 120,
      render: (value) => <span>{value && value[0] && value[0].Category}</span>,
      
     
    },


      {
        title: "ProductModel",
        dataIndex: "OgiAttributes",
        key: "ProductModel", 
        width: 150,
        render: (value) => <span>{value && value[0] && value[0].ProductModel}</span>,
    
      },
     
      
      
          { title: " Qty90",
          dataIndex: "Quantity90",
          key: "Quantity90", 
          width: 150,
          fixed:'right',
          
        //   render: (value,record) => (
        //     <Tooltip  placement="top">
        //     <InputNumber
            
        //     className='mx-3 number-input'
        //     addonBefore={value[0]?.Stock90} 
        //     value={record.Quantity90?.toString()}
        //     style={{ width: 100 }}
        //     onChange={(value) => {
        //       if (value !== null) {
        //        // handleQuantity90(value, record)
        //       }

        //     }}
           
             
        //     disabled={value[0]?.Stock90 === 0} 
        //   />
        //   </Tooltip>
           
        //   ),
        },
        {
          title: "MRP",
          dataIndex: "MRP",
          key: "MRP", 
          width: 100,
          fixed:'right'
         
        },
     
      {
        title: "Amount",
        dataIndex: "Amount",
        key: "Amount", 
        width: 70,
        fixed:'right'
       
      },
       
  
  ];

      const contentToPrint = useRef(null);
      const handlePrint = useReactToPrint({
        documentTitle: "Print This Document",
        onBeforePrint: () => console.log("before printing..."),
        onAfterPrint: () => console.log("after printing .."),
        
        
      });
  return (
    <div>
      <Card style={{marginLeft:"20px", marginRight:"20px", paddingLeft:"30px"}}>
        <Button 
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}
        
        >Download PDF</Button>
       
      <div className=" ant-card ant-card-bordered gx-card" style={{marginTop:"40px"}} ref={contentToPrint}>
        <div className="ant-card-body"> 
       <div><img width={150} src="https://admin.callawayindiaoms.com/uploads/callaway_logo_da080f1136_e19022b0ce.png"></img></div>
       <div style={{textAlign:"right", }}>
        <h1 style={{fontSize:"60px", color:"#038fde"}}>ORDER PDF</h1> 
        </div>
      

       <div style={{display:"flex", marginBottom:"40px"}}> 

       <div style={{width:"81%"}}>
         <h4>Retailer Details:</h4>
         <h1>{retailerName}</h1>
         <p>{retailerAddres}</p>
         <p>+123-456-789</p>
       </div>
       <div style={{float:"left"}}>
       <p>Date: 16/01/2024 </p>
        <p>Company: Callaway Golf India</p>
        <p>Brand: Ogio</p>
        <p>Manager: Manish Sharma </p>
        <p>Sales Rep: Mukesh Kumar</p>
        </div>
       </div>

       <Table  
       columns={columns} 
       dataSource={allOgioOrders?.map((item) => ({ ...item, key: item.id }))}
          
       size="middle" 
       pagination={false} />
       
   

       <div style={{width:"237px", float:"right", paddingTop:"20px"}}>
            
            <h4 style={{ color:"#545454", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
                {" "}
                <a style={{color:"#545454", paddingRight:"88px",paddingLeft:"10px", }}>Sub Total:</a>₹{getTravisOrderDetailss?.totalAmount}
              </h4>
              {/* ₹ */}
              <h4 style={{ color:"#545454", borderBottom:"1px solid #ddd", paddingBottom:"5px", fontSize:"14px"}}>
                {" "}
                <a style={{color:"#545454", paddingRight:"90px", paddingLeft:"10px",}}>Discount:</a> ₹{getTravisOrderDetailss?.discountAmount}
              </h4>
              
             

              {/* <h4 style={{color:"#545454", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
                {" "}
                <a style={{color:"#545454",  paddingRight:"123px",paddingLeft:"10px", }}>Tax:</a> ₹50
              </h4> */}

             

              <h4 style={{color:"#545454", padding:"8px 0px", backgroundColor:"#ddd",fontSize:"14px"}}>
                <a style={{ color:"#545454", paddingRight:"109px", paddingLeft:"10px",}}>Total : </a>{getTravisOrderDetailss?.totalNetBillAmount}
              </h4>
            </div>
            </div>

       </div>

      </Card>
      
    </div>
  )
}

export default OgioCartPdf