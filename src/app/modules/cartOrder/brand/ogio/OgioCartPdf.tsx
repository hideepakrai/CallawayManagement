import React, { useEffect, useState, useRef } from "react";
import { Card, Table, Input, Button, Select, InputNumber, Tooltip } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../../../model/travis/TravisMethewModel.ts"
import {useDispatch, useSelector,} from "react-redux"
import {getTravisOrder} from "../../../../slice/orderSlice/travis/CartOrder.tsx"
import { useReactToPrint } from 'react-to-print';
import {getRetailerDetails} from "../../../../slice/orderSlice/travis/Orderdetails.tsx"
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

  const getOgioProduct: OgioBasicModel[]= useSelector(getOgioProducts)
  const [ allOgioOrders, setGetAllOgioOrders]= useState<OgioBasicModel[]>([])
  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
  useEffect(()=>{
    let tAmount: number = 0;
  let totalBillAmount: number = 0;
    const ogio:OgioBasicModel[]=[];
    if(getOgioProduct &&getOgioProduct.length>0){
      getOgioProduct.map((item)=>{
        if(item.ordered){
          ogio.push(item)
        }
        if (item.Amount) {
      
          tAmount =parseFloat(( item.Amount + tAmount).toFixed(2))
        }
        if (item.FinalBillValue) {
  
          totalBillAmount =parseFloat ((totalBillAmount + item.FinalBillValue).toFixed(2))
        }
      })
     

       setGetAllOgioOrders(ogio)
       setTotalAmount(tAmount)
    setTotalNetBillAmount(totalBillAmount)
    setDiscountAmount(parseFloat((tAmount - totalBillAmount).toFixed(2)));
    }
  },[getOgioProduct]);
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
      dataIndex: "sku",
      width: 100,
      fixed: "left",

     
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
        fixed: "left",
      
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description", 
      width: 150,
      
    },
    
    //product Type
    {
      title: "ProductType",
      dataIndex: "product_type",
      key: "product_type",
      width: 150,
      

    

    },


    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      
      
     
    },


      {
        title: "ProductModel",
        dataIndex: "product_model",
        key: "product_model", 
        width: 150,
        
      },
     
      
      
          { title: " Qty90",
          dataIndex: "Quantity90",
          key: "Quantity90", 
          width: 150,
          fixed:'right',
          
       
           
             
      
        },
        {
          title: "MRP",
          dataIndex: "mrp",
          key: "mrp", 
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
      <Card style={{marginLeft:"20px", marginTop:"30px", marginRight:"20px", paddingLeft:"30px"}}>
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
       dataSource={allOgioOrders?.map((item) => ({ ...item, key: item.sku }))}
          
       size="middle" 
       pagination={false} />
       
   

       <div style={{width:"237px", float:"right", paddingTop:"20px"}}>
            
            <h4 style={{ color:"#545454", display:"flex", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
                {" "}
                <a style={{color:"#545454", paddingRight:"88px",paddingLeft:"10px", }}>Sub Total:</a>₹{totalAmount}
              </h4>
              {/* ₹ */}
              <h4 style={{ color:"#545454", display:"flex", borderBottom:"1px solid #ddd", paddingBottom:"5px", fontSize:"14px"}}>
                {" "}
                <a style={{color:"#545454", paddingRight:"90px", paddingLeft:"10px",}}>Discount:</a> ₹{discountAmount}
              </h4>
              
             

              {/* <h4 style={{color:"#545454", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
                {" "}
                <a style={{color:"#545454",  paddingRight:"123px",paddingLeft:"10px", }}>Tax:</a> ₹50
              </h4> */}

             

              <h4 style={{color:"#545454",  padding:"8px 0px", backgroundColor:"#ddd",fontSize:"14px"}}>
                <a style={{ color:"#545454", paddingRight:"109px", paddingLeft:"10px",}}>Total : </a>{totalNetBillAmount}
              </h4>
            </div>
            </div>

       </div>

      </Card>
      
    </div>
    
  )
}

export default OgioCartPdf