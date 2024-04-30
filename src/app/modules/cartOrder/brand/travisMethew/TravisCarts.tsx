
import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button,Select } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../../../model/travis/TravisMethewModel.ts"
import {useDispatch, useSelector} from "react-redux"
import {getTravisOrder} from "../../../../slice/orderSlice/CartOrder.tsx"
import {updateQuantity90,updateQuantity88} from "../../../../slice/allProducts/TravisMethewSlice.tsx"
import {addTravisOrder,resetTravisOrder} from "../../../../slice/orderSlice/CartOrder.tsx"
import CartHeader from '../../CartHeader.tsx';
import {CartModel,ProductDetails} from "../../../model/CartOrder/CartModel.ts";
import {CreateOrder} from "../../orderApi/OrderAPi.ts"
import UpdateOrder from "./UpdateOrder.tsx"
import "./TravisCarts.css";

import {getCurrentUser} from "../../../../slice/UserSlice/UserSlice.tsx"
import {CurentUser} from "../../../model/useAccount/CurrentUser.ts"
import {LoadingStart,LoadingStop,getLoading} from "../../../../slice/loading/LoadingSlice.tsx"
import Loading from '../../../loading/Loading.tsx';
const TravisCart = () => {
    const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
    const [isUpdateOrder, setIsUpdateOrder] = useState(false);
    const [orderId, setOrderId] = useState();
    const [userId, setUserId] = useState<number>();
   
    const dispatch= useDispatch()
 
  const getCurrentUsers= useSelector(getCurrentUser) as CurentUser 
   const getProduct:BasicModelTravis[]=useSelector(getTravisOrder)
     const[amount, setAmount]=useState<number>()
     
  console.log("userAccount",getCurrentUsers)
     // update user Id
     useEffect(()=>{
      if(getCurrentUsers ){
        
        console.log("hello", getCurrentUsers?.user?.id);
        setUserId(getCurrentUsers?.user?.id)
      }
     },[getCurrentUsers])
     const columns: TableColumnsType<BasicModelTravis>= [
        {
          // title: "Image",
          dataIndex: "gallery",
          // fixed: "left",
          width: 25,
          render: (value) => (
            <span>
               <img
            src={value ? `https://admin.callawayindiaoms.com${value}` : "/media/icons/icon-callway.png"}
             alt="Primary Image"
           style={{ maxWidth: "30px", marginRight: "5px" }}
            />
            </span>
          ),
        },
    
        {
          title: "SKU",
          dataIndex: "SKU",
          width: 130,
          fixed: "left",
          // render: (value) => <span>{String(value.Name)}</span>,
         
        },
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "name",
          width: 70 ,
           fixed: "left",
        },
    
        
        
        {
          title: "Category",
          dataIndex: "TravisAttributes",
          key: "Description", 
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].Category}</span>,
          sorter: (a, b) => {
            const categoryA = a.TravisAttributes?.[0]?.Category ?? "";
            const categoryB = b.TravisAttributes?.[0]?.Category ?? "";

          return categoryA.localeCompare(categoryB);
          },
         
        },
        {
            title: "Season",
            dataIndex: "TravisAttributes",
            key: "Season", 
            width: 85,
            render: (value) => <span>{value && value[0] && value[0].Season}</span>,
            sorter: (a, b) => {
              // Extract and compare Season values, handling null or undefined cases
              const seasonA = a.TravisAttributes?.[0]?.Season ?? "";
              const seasonB = b.TravisAttributes?.[0]?.Season ?? "";
          
              return seasonA.localeCompare(seasonB);
            },
           
          },
        {
          title: "StyleCode",
          dataIndex: "TravisAttributes",
          key: "StyleCode", 
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.StyleCode ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.StyleCode ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title: "Color",
          dataIndex: "TravisAttributes",
          key: "Color", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Color}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Color ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Color ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title: "Size",
          dataIndex: "TravisAttributes",
          key: "Size", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Size}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Size ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Size ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title: "Description",
          dataIndex: "Description",
          key: "Description", 
          width: 115,
         
        },

      
        {
          title:"Order Quantity",
          children:[
           { title: "88    QTY",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 130,
            fixed:'right',
            render: (value, record) => (
              <Input addonBefore={value[0].Stock88} 
              type='number'
             
              value={record.Quantity88?.toString()}
              onChange={(e) => handleQuantity88(e.target.value, record)} 
              />
             
            ),
          },
            {
              title: "90  QTY",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 130,
            fixed:'right',
            render: (value, record) => (
              <Input addonBefore={value[0].Stock90} 
              type='number'
              
              value={record.Quantity90?.toString()}
              
              onChange={(e) => handleQuantity90(e.target.value, record)} 
              />
             
            ),
            }
           
          ],
          
        },
        // {
        //   title:"Quantity",
        //   children:[
        //     {
        //       title: "88",
        //       dataIndex: "quantity88",
        //       key: "quantity88", 
        //       width: 100, 
        //       fixed:'right',
        //       render: (text, record) => (
        //         <Input 
        //          type='number'
        //          value={record.Quantity88?.toString()}
        //           onChange={(e) => handleQuantity88(e.target.value, record)}
        //         />
               
        //       ),
              
        //     },
        //     { title: "90",
        //     dataIndex: "quantity90",
        //     key: "quantity90", 
        //     width: 100,
        //     fixed:'right',
        //     render: (text, record) => (
        //       <Input 
        //        type='number'
        //        value={record.Quantity90?.toString()}
        //         onChange={(e) => handleQuantity90(e.target.value, record)}
        //       />
        //     ),
        //    }
        //   ],
         
          
         
        // },
        {
          title: "Total Qty",
          dataIndex: "TotalQty",
          key: "TotalQty", 
          width: 100,
          fixed:'right'
        },
        {
          title: "MRP",
          dataIndex: "SalePrice",
          key: "SalePrice", 
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


      const handleQuantity90 = (value: string, record: BasicModelTravis) => {

        const intValue = parseInt(value, 10);
    
        if ( record?.TravisAttributes&&record?.TravisAttributes[0].Stock90 && record.TravisAttributes[0].Stock90 >= intValue) {
          
          // Dispatch an action to update the quantity for the SKU
          
          dispatch(updateQuantity90({
            sku: record.SKU,
            qty90: intValue,
            MRP: record.SalePrice,
            
          }));
          record.Quantity90=intValue;
          dispatch(addTravisOrder({
            travisOrder:record,
            qty90: intValue,
            qty88:record.Quantity88
          }))
        }
        else{
          alert("Quantity is not available")
          //setQuantity90(0)
          dispatch(updateQuantity90({
            sku: record.SKU,
            qty90: 0,
          
           
          }));
          record.Quantity90=0;
          
        }
      
        // Log the record for debugging or tracking purposes
        console.log(record);
      };
      const handleQuantity88 = (value: string, record: BasicModelTravis) => {
           console.log("record",record)
        const intValue = parseInt(value, 10);
    
         if ( record?.TravisAttributes&&record?.TravisAttributes[0].Stock88&& record.TravisAttributes[0].Stock88 >= intValue) {
          // Dispatch an action to update the quantity for the SKU
          dispatch(updateQuantity88({
            sku: record.SKU,
            qty88: intValue,
            MRP: record.SalePrice,
          }));
          record.Quantity88=intValue;
         // setQuantity88(intValue)
         dispatch(addTravisOrder({
          travisOrder:record,
            qty88: intValue,
            qty90:record.Quantity90
            
        }))
        }
        else if ( record?.TravisAttributes && record?.TravisAttributes[0].Stock88 && record.TravisAttributes[0].Stock88 <intValue) {
          alert("Quantity is not available")
         // setQuantity88(0)
         dispatch(updateQuantity88({
          sku: record.SKU,
          qty88: 0,
        }));
        record.Quantity90=0;
        }
      
      };
   const [totalAmount, setTotalAmount]= useState<number>()
      useEffect(()=>{
        let tAmount:number=0;
        if(getProduct && getProduct.length>0){
          getProduct.map((item:BasicModelTravis)=>{
            if(item.Amount){
              tAmount=item.Amount+tAmount
            }
            
          })
            setTotalAmount(tAmount)
        }
      },[getProduct])

      // save order

    const handleCreateOrder=(retailerId:number)=>{
      dispatch(LoadingStart())
      if (Array.isArray(getProduct)) {
          
          const orderId= generateUniqueNumeric();
           let brand;
          const ProductDetail:ProductDetails[]=[];
          getProduct.forEach((item: BasicModelTravis) => {
          brand= item.SetType;
              ProductDetail.push({
                  product: item.id,
                  Quantity: item.TotalQty,
                  TotalPrice: item.Amount,
                  UnitPrice: item.SalePrice
              });

              
          });

          const data={
              OrderId:orderId,
              Status:"Pending",
              ProductDetails:ProductDetail,
              retailer:retailerId,
              users :userId,
              Brand:brand,
              Amount:totalAmount
          }

          createOrder(data)
      }
  }


  const createOrder=async(data:CartModel)=>{
      try{
          const response=await CreateOrder(data);
          console.log("order update",response);
            if(response?.data.id){
              dispatch(LoadingStop())
              alert("your order has been created")

              dispatch(resetTravisOrder({
                travis:"true"
              }))
            }
         
      }
        catch(err){
            console.log(err);
        }
  }

//   function generateUniqueAlphanumeric(): string {
//     const timestamp = new Date().getTime().toString(36); // Convert timestamp to base 36
//     const randomChars = Math.random().toString(36).substr(2, 5); // Generate random characters
//     const uniqueId = timestamp + randomChars; // Combine timestamp and random characters
//     return uniqueId;
// }
  
function generateUniqueNumeric(): string {
  const timestamp = new Date().getTime().toString().substr(-5); // Get last 5 digits of timestamp
  const randomDigits = Math.floor(Math.random() * 100000); // Generate random 5-digit number
  const paddedRandomDigits = String(randomDigits).padStart(5, '0'); // Pad random number with leading zeros if necessary
  const uniqueId = timestamp + paddedRandomDigits; // Combine timestamp and random number
  return uniqueId;
}

const getLoadings= useSelector(getLoading)
console.log(getLoadings)
 
  return (
    <div>

     {getLoadings && <Loading/>}
{getProduct && 
getProduct.length>0 &&
<CartHeader
CreateOrder={handleCreateOrder}
/>}



{getProduct && 
getProduct.length>0 ?
        (<Table
            ref={tableRef}
            columns={columns}
            dataSource={getProduct?.map((item) => ({ ...item, key: item.id }))}
          
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}

            footer={() => (
              <div
                  style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginLeft: 8,

                  }}
              >
                  <div style={{ width: "78%" }}>
                      <a style={{ marginRight: 10, color: "#000", }}>Discount</a>
                      <Select
                          showSearch
                          placeholder="Select discount"
                          optionFilterProp="children"


                          options={[
                              {
                                  value: "₹100",
                                  label: "",
                              },
                              {
                                  value: "₹200",
                                  label: "20%",
                              },
                              {
                                  value: "₹300",
                                  label: "30%",
                              },
                          ]}
                      />



                  </div>

                  <div style={{ width: "261px" }}>

                      <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
                          {" "}
                          <a style={{ color: "#000", paddingRight: "88px", paddingLeft: "10px", }}>Sub Total:</a> {totalAmount}
                      </h4>

                      <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
                          {" "}
                          <a style={{ color: "#000", paddingRight: "94px", paddingLeft: "10px", }}>Discount:</a>
                      </h4>






                      <h4 style={{ padding: "8px 0px", backgroundColor: "#ddd", fontSize: "14px" }}>
                          <a style={{ color: "#000", paddingRight: "112px", paddingLeft: "10px", }}>Total : </a>₹2,356
                      </h4>
                  </div>

              </div>
          )}
          />):(
            <div className='no-order-section'>
              <i className="bi bi-cart-x"></i>
              <h2>No order selected</h2>
              </div>
          )}          

         { isUpdateOrder &&<UpdateOrder/>}
    </div>
  )
}

export default TravisCart