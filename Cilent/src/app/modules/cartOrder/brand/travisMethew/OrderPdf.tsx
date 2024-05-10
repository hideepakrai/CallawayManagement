import React, { useEffect, useState, useRef } from "react";
import { Card, Table, Input, Button, Select } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../../../model/travis/TravisMethewModel.ts"
import {useDispatch, useSelector,} from "react-redux"
import {getTravisOrder} from "../../../../slice/orderSlice/travis/CartOrder.tsx"
import { useReactToPrint } from 'react-to-print';
import {getRetailerDetails} from "../../../../slice/orderSlice/travis/Orderdetails.tsx"

type Props={
  // totalAmount:number,
  // discountAmount:number,
  // totalNetBillAmount:number,
  // retailerName:string,
  // retailerAddres:string,
  // retailerCity:string,
 
}

const OrderPdf = () => {
      
const getTravisOrderDetailss= useSelector(getRetailerDetails)

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
    const columns: TableColumnsType<BasicModelTravis>= [
        {
          // title: "Image",
          dataIndex: "Gallery",
          // fixed: "left",
          width: 50,
          render: (value) => {
            // Check if value and value.data[0] exist before accessing properties
            if (value && value.data[0] && value.data[0].attributes && value.data[0].attributes.formats && value.data[0].attributes.formats.thumbnail && value.data[0].attributes.formats.thumbnail.url) {
              console.log("image: " + value.data[0].attributes.formats.thumbnail.url);
              return (
                <span>
                  <img
                    src={`https://admin.callawayindiaoms.com${value.data[0].attributes.formats.thumbnail.url}`}
                    alt="Primary Image"
                    style={{ maxWidth: "30px", marginRight: "5px" }}
                  />
                </span>
              );
            } else {
              return (
                <span>
                  <img
                    src="/media/icons/icon-callway.png"
                    alt="Primary Image"
                    style={{ maxWidth: "30px", marginRight: "5px" }}
                  />
                </span>
              ); // Return a placeholder image if thumbnail url is null or undefined
            }
          },

        },

       
    
    
        {
          title: "SKU",
          dataIndex: "SKU",
          width: 100,
          fixed: "left",
        

         
        },

        {
          title: "Description ",
          dataIndex: "Description",
          key: "Description", 
          width: 150,
         
        },

        
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "name",
          width: 90 ,
           fixed: "left",
          

        },
    
        
        
        {
          title: "Category",
          dataIndex: "TravisAttributes",
          key: "Category", 
          width: 110,
          render: (value) => <span>{value && value[0] && value[0].Category}</span>,
         
        },
       
       


        {
          title: "Season",
          dataIndex: "TravisAttributes",
          key: "Season", 
          width: 100,
          render: (value) => <span>{value && value[0] && value[0].Season}</span>,
        
        },



      {
        title: "Style",
        dataIndex: "TravisAttributes",
        key: "StyleCode", 
        width: 85,
        render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
       
      },
      



        {
          title: "Color",
          dataIndex: "TravisAttributes",
          key: "Color", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Color}</span>,
          
        },
        {
          title: "Size",
          dataIndex: "TravisAttributes",
          key: "Size", 
          width: 65,
          render: (value) => <span>{value && value[0] && value[0].Size}</span>,
         
        },
       
        
           { title: "Qty88",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 100,
            fixed:'right',
            render: (value,record) => (
              <Input 
              addonBefore={value[0]?.Stock88} 
              type='number'
             
              value={record.Quantity88?.toString()}
             // onChange={(e) => handleQuantity88(e.target.value, record)}
              disabled={value[0]?.Stock88 === 0} 
              />
             
            ),
          },
            {
              title: "Qty90",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 100,
            fixed:'right',
            render: (value,record) => (
              <Input addonBefore={value[0]?.Stock90||0} 
              type='number'
              
              value={record.Quantity90?.toString()}
             // onChange={(e) => handleQuantity90(e.target.value, record)} 
              disabled={value[0]?.Stock90 === 0} 
              />
             
            ),
            },
           
        
        {
          title: "Qty",
          dataIndex: "TotalQty",
          key: "TotalQty", 
          width: 50,
          fixed:'right'
        },


        {
          title: "MRP",
          dataIndex: "MRP",
          key: "MRP", 
          width: 80,
          fixed:'right'
        },


        {
          title: "Amount",
          dataIndex: "Amount",
          key: "Amount", 
          width: 100,
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
       dataSource={getAllTravisOrder?.map((item) => ({ ...item, key: item.id }))}
          
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

export default OrderPdf