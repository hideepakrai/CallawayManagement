
import React ,{useEffect, useRef, useState} from 'react'
import { Button, Card, Table, TableColumnsType } from 'antd'
import { AccountOrder, CartModel, ItemModel } from '../../model/CartOrder/CartModel'
import { PdfModel } from '../../model/pdf/PdfModel'


type Props={
    recordPdf:AccountOrder
  // discountAmount:number,
}

const OrderPdfFormate = ({recordPdf}:Props) => {
    const contentToPrint = useRef(null);
    const [orderItem, setOrderItem]= useState<ItemModel[]>([])
    useEffect(()=>{
        if(recordPdf && recordPdf.items ){
            const parsedItems= JSON.parse(recordPdf.items);
            setOrderItem(parsedItems)
        }
    },[recordPdf])

    const columns: TableColumnsType<ItemModel>= [
   

      {
        title: "SKU",
        dataIndex: "sku",
        width: 100,
        fixed: "left",
  
       
      },

  
        
            { title: " Qty90",
            dataIndex: "stock_90",
            key: "stock_90", 
            width: 150,
    
          },
            { title: " Qty90",
            dataIndex: "stock_88",
            key: "stock_88", 
            width: 150,
    
          },
          {
            title: "MRP",
            dataIndex: "mrp",
            key: "mrp", 
            width: 100,
            fixed:'right'
           
          },
      
         
    
    ];
  return (
    <div>
         <div>

            
      <Card style={{marginLeft:"20px", marginTop:"30px", marginRight:"20px", paddingLeft:"30px"}}>
        <Button 
        // onClick={() => {
        //   handlePrint(null, () => contentToPrint.current);
        // }}
        
        >Download PDF</Button>
       
      <div className=" ant-card ant-card-bordered gx-card" style={{marginTop:"40px"}} ref={contentToPrint}>
        <div className="ant-card-body"> 
       <div><img width={150} src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/callaway_logo_da080f1136_e19022b0ce.png"></img></div>
       <div style={{textAlign:"right", }}>
        <h1 style={{fontSize:"60px", color:"#038fde"}}>ORDER PDF</h1> 
        </div>
      

       <div style={{display:"flex", marginBottom:"40px"}}> 

       <div style={{width:"81%"}}>
         <h4>Retailer Details:</h4>
         <h1>{recordPdf.retailer_name}</h1>
         <p>{recordPdf.retailer_address}</p>
         <p>{recordPdf.retailer_phone}</p>
       </div>
       <div style={{float:"left"}}>
       <p>{recordPdf.created_at}</p>
        <p>Company: Callaway Golf India</p>
        <p>Brand: {recordPdf.brand_id===3?"Travismathew":(recordPdf.brand_id===4)?"Ogio":"callaway Goods"}</p>
        <p>Manager: {recordPdf.manager_name} </p>
        <p>Sales Rep: {recordPdf.salesrep_name}</p>
        </div>
       </div>

       <Table  
       columns={columns} 
      dataSource={orderItem?.map((item) => ({ ...item, key: item.sku }))}
          
       size="middle" 
       pagination={false} />
       
   

       <div style={{width:"237px", float:"right", paddingTop:"20px"}}>
            
            <h4 style={{ color:"#545454", display:"flex", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
                {" "}
                <a style={{color:"#545454", paddingRight:"88px",paddingLeft:"10px", }}>Sub Total:</a>₹{recordPdf.total_val_pre_discount}
              </h4>
              {/* ₹ */}
              <h4 style={{ color:"#545454", display:"flex", borderBottom:"1px solid #ddd", paddingBottom:"5px", fontSize:"14px"}}>
                {" "}
                <a style={{color:"#545454", paddingRight:"90px", paddingLeft:"10px",}}>Discount:</a> ₹{recordPdf.discount_amount}
              </h4>
              
             

              {/* <h4 style={{color:"#545454", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
                {" "}
                <a style={{color:"#545454",  paddingRight:"123px",paddingLeft:"10px", }}>Tax:</a> ₹50
              </h4> */}

             

              <h4 style={{color:"#545454",  padding:"8px 0px", backgroundColor:"#ddd",fontSize:"14px"}}>
                <a style={{ color:"#545454", paddingRight:"109px", paddingLeft:"10px",}}>Total : </a>{recordPdf.total_value}
              </h4>
            </div>
            </div>

       </div>

      </Card>
      
    </div>
    </div>
  )
}

export default OrderPdfFormate