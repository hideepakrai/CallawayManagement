
import React ,{useRef} from 'react'
import { Button, Card, Table } from 'antd'


const OrderPdfFormate = () => {
    const contentToPrint = useRef(null);
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
         {/* <h1>{retailerName}</h1> */}
         {/* <p>{retailerAddres}</p> */}
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
       //columns={columns} 
      /// dataSource={allOgioOrders?.map((item) => ({ ...item, key: item.sku }))}
          
       size="middle" 
       pagination={false} />
       
   

       <div style={{width:"237px", float:"right", paddingTop:"20px"}}>
            
            <h4 style={{ color:"#545454", display:"flex", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
                {" "}
                {/* <a style={{color:"#545454", paddingRight:"88px",paddingLeft:"10px", }}>Sub Total:</a>₹{totalAmount} */}
              </h4>
              {/* ₹ */}
              <h4 style={{ color:"#545454", display:"flex", borderBottom:"1px solid #ddd", paddingBottom:"5px", fontSize:"14px"}}>
                {" "}
                {/* <a style={{color:"#545454", paddingRight:"90px", paddingLeft:"10px",}}>Discount:</a> ₹{discountAmount} */}
              </h4>
              
             

              {/* <h4 style={{color:"#545454", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
                {" "}
                <a style={{color:"#545454",  paddingRight:"123px",paddingLeft:"10px", }}>Tax:</a> ₹50
              </h4> */}

             

              <h4 style={{color:"#545454",  padding:"8px 0px", backgroundColor:"#ddd",fontSize:"14px"}}>
                {/* <a style={{ color:"#545454", paddingRight:"109px", paddingLeft:"10px",}}>Total : </a>{totalNetBillAmount} */}
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