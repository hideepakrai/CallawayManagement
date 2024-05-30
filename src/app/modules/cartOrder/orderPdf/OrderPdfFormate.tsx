
import React ,{useEffect, useRef, useState} from 'react'
import { Button, Card, Table, TableColumnsType } from 'antd'
import { AccountOrder, CartModel, ItemModel } from '../../model/CartOrder/CartModel'
import { PdfModel } from '../../model/pdf/PdfModel'
import { useReactToPrint } from 'react-to-print'


type Props={
    recordPdf:AccountOrder
   resetSelectedRow:()=>void,
}

const OrderPdfFormate = ({recordPdf,resetSelectedRow}:Props) => {
    const contentToPrint = useRef(null);
    const [orderItem, setOrderItem]= useState<ItemModel[]>([])
    const [orderId, setOrderId]= useState<string|undefined>()
    const [orderDate, setOrderDate]= useState<string>()
    const [retailerName, setRetailerName]= useState<string>()
    const [retailerEmail, setRetailerEmail]= useState<string>()
    const [retailerAddress, setRetailerAddress]= useState<string>()
    const [retailerGstin, setRetailerGstin]= useState<string>()
    const [retailerphone, setRetailerphone]= useState<number>()
    useEffect(() => {
      if (recordPdf && recordPdf.items) {
        const parsedItems = JSON.parse(recordPdf.items);
        setOrderItem(parsedItems);
        setOrderId(recordPdf.id?.toString());
        if (recordPdf.created_at) {
          const date = new Date(recordPdf.created_at);
          const readableDate = date.toUTCString();
          setOrderDate(readableDate);
        } 
        if(recordPdf.retailer_details){
          const retailerDetail=JSON.parse(recordPdf.retailer_details);
          setRetailerName(retailerDetail.name)
          setRetailerAddress(retailerDetail.address)
          setRetailerEmail(retailerDetail.email)
          setRetailerphone(retailerDetail.phone)
        }
      }
    }, [recordPdf])


    const handlePrint = useReactToPrint({
      documentTitle: orderId,
      onBeforePrint: () => console.log("before printing..."),
      onAfterPrint: () => resetSelectedRow(),
      removeAfterPrint: true,
  
    });

    useEffect(()=>{
      if(orderItem && orderItem.length>0){
        handlePrint(null, () => contentToPrint.current); 
      }
    },[orderItem])

    const columns: TableColumnsType<ItemModel>= [
   

      {
        title: "SKU",
        dataIndex: "sku",
        width: 100,
        fixed: "left",
  
       
      },

  
        
            { title: " Qty",
            dataIndex: "stock_88+stock_90",
            key: "stock_90", 
            width: 150,
    
          },

          {
            title: "Discount",
            dataIndex: "discount_amount",
            width: 100,
            fixed: "left",      
          },

          //   { title: " Qty90",
          //   dataIndex: "stock_88",
          //   key: "stock_88", 
          //   width: 150,
    
          // },

          {
            title: "MRP",
            dataIndex: "mrp",
            key: "mrp", 
            width: 100,
            fixed:'right'
           
          },

          {
            title: "Amount",
            dataIndex: "amount",
            width: 100,
            fixed: "left",      
          },
      
         
    
    ];


  return (
    <div>
         <div>

            
      <Card style={{marginLeft:"20px", marginTop:"30px", marginRight:"20px", paddingRight:"30px", paddingLeft:"30px"}}>
        <Button 
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}
        
        >Download PDF</Button>
       
      <div className=" ant-card ant-card-bordered gx-card" style={{marginTop:"40px", paddingLeft:"20px", paddingRight:"20px", }} ref={contentToPrint}>
        <div className="ant-card-body"> 
       <div><img width={150} src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/callaway_logo_da080f1136_e19022b0ce.png"></img></div>
       <div style={{textAlign:"right", }}>
        <h1 style={{fontSize:"60px", color:"#038fde"}}>ORDER PDF </h1> 
        </div>
      

       <div style={{display:"flex", marginBottom:"40px"}}> 

       <div style={{width:"78%"}}>
         <h4>Retailer Details:</h4>
         <h1>{retailerName}</h1>
         
         
         {/* <p>{recordPdf.retailer_phone}</p> */}

         <div className="user-address pt-2 d-flex">
            <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Phone:</span>
             <p  className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mx-1">
            {retailerphone}
           </p>
           </div>

         
         <div  className="user-address pt-2 ">
         <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Address:</span>
         <p  className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">
          {retailerAddress}
           </p> 
       </div>

       </div>



       <div style={{float:"left", width:"29%"}}>
       <p>{orderDate}</p>
        <p className='text-black font-weight-800 text-gray-600 fw-semibold fs-5'><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Company:</span> Callaway Golf India</p>
        <p className='text-black font-weight-800 text-gray-600 fw-semibold fs-5'> <span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Brand:</span> {recordPdf.brand_id===3?"Travismathew":(recordPdf.brand_id===4)?"Ogio":"callaway Goods"}</p>
        <p className='text-black font-weight-800 text-gray-600 fw-semibold fs-5'> <span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Manager:</span> {recordPdf.manager_name} </p>
        <p className='text-black font-weight-800 text-gray-600 fw-semibold fs-5'> <span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Sales Rep:</span> {recordPdf.salesrep_name}</p>
        </div>
       </div>

       <Table  
       columns={columns} 
      dataSource={orderItem?.map((item) => ({ ...item, key: item.sku }))}
          
       size="middle" 
       pagination={false} />
       
   

       <div style={{width:"237px", float:"right", paddingTop:"20px"}}>
            
            <h4 style={{ color:"#545454", display:"flex", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
               
                <a style={{color:"#545454", paddingRight:"88px",paddingLeft:"10px", }}>Sub Total:</a> ₹ {recordPdf.total_val_pre_discount}
              </h4>
             
              <h4 style={{ color:"#545454", display:"flex", borderBottom:"1px solid #ddd", paddingBottom:"5px", fontSize:"14px"}}>
          
                <a style={{color:"#545454", paddingRight:"90px", paddingLeft:"10px",}}>Discount:</a> ₹ {recordPdf.discount_amount}
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