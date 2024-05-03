
import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button,Select,Space } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../../../model/travis/TravisMethewModel.ts"
import {useDispatch, useSelector,} from "react-redux"
import {getTravisOrder} from "../../../../slice/orderSlice/travis/CartOrder.tsx"
import {updateQuantity90,updateQuantity88} from "../../../../slice/allProducts/TravisMethewSlice.tsx"
import {addTravisOrder,resetTravisOrder} from "../../../../slice/orderSlice/travis/CartOrder.tsx"
import CartHeader from '../../CartHeader.tsx';
import {CartModel,ProductDetails} from "../../../model/CartOrder/CartModel.ts";
import {CreateOrder} from "../../orderApi/OrderAPi.ts"
import UpdateOrder from "./UpdateOrder.tsx"
import { SettingOutlined } from '@ant-design/icons';

import "./TravisCarts.css";

import {getCurrentUser} from "../../../../slice/UserSlice/UserSlice.tsx"
import {CurentUser} from "../../../model/useAccount/CurrentUser.ts"
import {LoadingStart,LoadingStop,getLoading} from "../../../../slice/loading/LoadingSlice.tsx"
import Loading from '../../../loading/Loading.tsx';
import {updateInclusiveDiscount,updateExclusiveDiscount,updateFlatDiscount,updateTravisOrder} from "../../../../slice/orderSlice/travis/CartOrder.tsx"
import OrderPdf from './OrderPdf.tsx';
import {addTravisOrderDetails} from "../../../../slice/orderSlice/travis/Orderdetails.tsx"
import {addPendingOrder} from "../../../../slice/orderSlice/travis/Orderdetails.tsx"
import GetUserAccount from '../../../auth/components/GetUserAccount.tsx';
import { boolean } from 'yup';
import ImageRenderer from "../../../brands/travisMethew/table/column/gallery.tsx"

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
     const [discountType, setDiscountType]= useState<string>("")
  const [isDiscount, setIsDiscount]= useState<boolean>(false)
  const [discountValue, setDiscountValue]= useState<number>(0)
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
        dataIndex: "Gallery",
        // fixed: "left",
        width: 50,
        render: (value) => <ImageRenderer value={value} />,
        
      
      },

     
  
  
      {
        title: "SKU",
        dataIndex: "SKU",
        width: 100,
        fixed: "left",
        
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search SKU"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onKeyUp={(e) => {

                console.log("enter", e)
                if (e.key === 'Enter') {
                  confirm();
                }
              }}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
          </div>
        ),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              // Trigger the search input to focus when the filter dropdown is opened
            });
          }
        },
        onFilter: (value, record) => {
          const sku =
            record &&
            record.SKU;
           
          console.log("Filtering:", value, "sku:", sku);
          return  sku=== value;
        },
        filterSearch: true,

       
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
         filterMode: 'tree',
         filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search Name"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
          </div>
        ),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              // Trigger the search input to focus when the filter dropdown is opened
            });
          }
        },
        onFilter: (value, record) => {
          const name =
            record &&
            record.Name;
           
          console.log("Filtering:", value, "sku:", name);
          return  name=== value;
        },
        filterSearch: true,

      },
  
      
      
      {
        title: "Category",
        dataIndex: "TravisAttributes",
        key: "Category", 
        width:110,
        render: (value) => <span>{value && value[0] && value[0].Category}</span>,
        sorter: (a, b) => {
          const categoryA = a.TravisAttributes?.[0]?.Category ?? "";
          const categoryB = b.TravisAttributes?.[0]?.Category ?? "";

        return categoryA.localeCompare(categoryB);
        },
       

        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search Name"
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: "block" }}
            />
          </div>
        ),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              // Trigger the search input to focus when the filter dropdown is opened
            });
          }
        },
        onFilter: (value, record) => {
          const category =
            record &&
            record.TravisAttributes &&
            record.TravisAttributes[0].Category ;
            
           
          console.log("Filtering:", value, "category:", category);
          return  category=== value;
        },
        filterSearch: true,
      },
      {
          title: "Season",
          dataIndex: "TravisAttributes",
          key: "Season", 
          width: 100,
          render: (value) => <span>{value && value[0] && value[0].Season}</span>,
          sorter: (a, b) => {
            // Extract and compare Season values, handling null or undefined cases
            const seasonA = a.TravisAttributes?.[0]?.Season ?? "";
            const seasonB = b.TravisAttributes?.[0]?.Season ?? "";
        
            return seasonA.localeCompare(seasonB);
          },
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
              <Input
                placeholder="Search Name"
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => confirm()}
                style={{ width: 188, marginBottom: 8, display: "block" }}
              />
            </div>
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                // Trigger the search input to focus when the filter dropdown is opened
              });
            }
          },
          onFilter: (value, record) => {
            const Season =
              record &&
              record.TravisAttributes &&
              record.TravisAttributes[0].Season ;
              
             
            console.log("Filtering:", value, "season:", Season);
            return  Season=== value;
          },
          filterSearch: true,
         
        },
      {
        title: "Style",
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
        width: 65,
        render: (value) => <span>{value && value[0] && value[0].Size}</span>,
        sorter: (a, b) => {
          // Extract and compare StyleCode values, handling null or undefined cases
          const styleCodeA = a.TravisAttributes?.[0]?.Size ?? "";
          const styleCodeB = b.TravisAttributes?.[0]?.Size ?? "";
      
          return styleCodeA.localeCompare(styleCodeB);
        },
      },
     
    
      
         { title: "Qty88",
          dataIndex: "TravisAttributes",
          key: "Stock88", 
          width: 150,
          fixed:'right',
          render: (value,record) => (
         
            <InputNumber
                  className='mx-3 number-input'
                  addonBefore={value[0]?.Stock88} 
                  value={record.Quantity88?.toString()}
                  style={{ width: 100 }}
                  onChange={(value) => {
                    if (value !== null) {
                      handleQuantity88(value, record)
                    }

                  }}
                   
                  disabled={value[0]?.Stock90 === 0} 
                />
           
          ),
        },
          {
            title: "Qty90",
          dataIndex: "TravisAttributes",
          key: "Stock88", 
          width: 130,
          fixed:'right',
          render: (value,record) => (
        
           <InputNumber
                  className='mx-5 number-input'
                  addonBefore={value[0]?.Stock90||0} 
                  value={record.Quantity90?.toString()}
                  onChange={(value) => {
                    if (value !== null) {
                      handleQuantity90(value, record)
                    }

                  }}
                   
                  disabled={value[0]?.Stock90 === 0} 
                  style={{ width: 100 }}
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
      
      {
        title: "GST",
        dataIndex: "GST",
        key: "GST", 
        width: 100,
        fixed:'right'
      },
      
      {
        title: "LessGST",
        dataIndex: "LessGST",
        key: "LessGST", 
        width: 100,
        // fixed:'right'
      },
      
      {
        title: "Discount",
        dataIndex: "Discount",
        key: "Discount", 
        width: 100,
        // fixed:'right'
      },
      
      {
        title: "LessDiscountAmount",
        dataIndex: "LessDiscountAmount",
        key: "LessDiscountAmount", 
        width: 100,
        // fixed:'right'
      },
      {
        title: "NetBillings",
        dataIndex: "NetBillings",
        key: "NetBillings", 
        width: 100,
        // fixed:'right'
      },
      {
        title: "FinalBillValue",
        dataIndex: "FinalBillValue",
        key: "FinalBillValue", 
        width: 100,
        // fixed:'right'
      },
    
    ];


      const handleQuantity90 = (value: string, record: BasicModelTravis) => {

        const intValue = parseInt(value, 10);
        setDiscountType("");
        setDiscountValue(0);
        setIsDiscount(false)
        if ( record?.TravisAttributes&&record?.TravisAttributes[0].Stock90 && record.TravisAttributes[0].Stock90 >= intValue) {
          
          // Dispatch an action to update the quantity for the SKU
          
          dispatch(updateQuantity90({
            sku: record.SKU,
            qty90: intValue,
            MRP: record.MRP,
            
          }));
          record.Quantity90=intValue;
         
          dispatch(updateTravisOrder({
            travisOrder:record,
            qtys90: intValue,
            qtys88:record.Quantity88
              
          }))
        }
         if(intValue<0){
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

        setDiscountType("");
        setDiscountValue(0);
        setIsDiscount(false)
    
         if ( record?.TravisAttributes&&record?.TravisAttributes[0].Stock88&& record.TravisAttributes[0].Stock88 >= intValue) {
          // Dispatch an action to update the quantity for the SKU
          dispatch(updateQuantity88({
            sku: record.SKU,
            qty88: intValue,
            MRP: record.MRP,
          }));
          record.Quantity88=intValue;
         // setQuantity88(intValue)
         dispatch(updateTravisOrder({
          travisOrder:record,
          qtys88: intValue,
          qtys90:record.Quantity90
            
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
   const [discountAmount, setDiscountAmount]= useState<number>()
   const [totalNetBillAmount, setTotalNetBillAmount]= useState<number>()
      useEffect(()=>{
        let tAmount:number=0;
        let totalBillAmount:number=0;
        if(getProduct && getProduct.length>0){
          getProduct.map((item:BasicModelTravis)=>{
            if(item.Amount){
              tAmount=item.Amount+tAmount
            }
             if(item.FinalBillValue){
                   
                   totalBillAmount=totalBillAmount+item.FinalBillValue
            }
            
          })
            setTotalAmount(tAmount)
            setTotalNetBillAmount(totalBillAmount)
            setDiscountAmount(tAmount-totalBillAmount)
        }
      },[getProduct])

      // save order

    const handleCreateOrder=(retailerId:number )=>{
      
      
      dispatch(LoadingStart())
      if (Array.isArray(getProduct)) {
          
          const orderId= generateUniqueNumeric();
           let brand;
           let amount;
          const ProductDetail:ProductDetails[]=[];
          getProduct.forEach((item: BasicModelTravis) => {
          brand= item.SetType;
          amount=item.FinalBillValue;
              ProductDetail.push({
                  product: item.id,
                  Qty88:item.Quantity88,
                  Qty90:item.Quantity90,
                  TotalPrice:item.FinalBillValue,
                  UnitPrice:item.MRP
                  
              });

              
          });


           const comments={
            Comment:"submit for review",
            Type:"Event",
            "users_permissions_user (1)":userId
           }
          const data={
              OrderId:orderId,
              Status:"Pending",
              ProductDetails:ProductDetail,
              retailer:retailerId,
              users :userId,
              Brand:brand,
              Amount:totalNetBillAmount,
              DiscountType:discountType,
              DiscountPercent:discountValue,
              Comments:[comments]
          }

          createOrder(data)
      }
  }

  const [reLoadUserAccount, setReloadUserAccount]= useState(false)
  const createOrder=async(data:CartModel)=>{
      try{
          const response=await CreateOrder(data);
          console.log("order update",response);
            if(response?.data.id){
            
             
              setReloadUserAccount(true)
            }
           
         
      }
        catch(err){
            console.log(err);
            dispatch(LoadingStop())
            setReloadUserAccount(false);
        }
  }


  // reset userlaoding boolean
  const handleResetId=()=>{
    alert("your order has been created")
    setReloadUserAccount(false);
    dispatch(resetTravisOrder({
      travis:"true"
    }))
    dispatch(LoadingStop())
  }


  
function generateUniqueNumeric(): string {
  const timestamp = new Date().getTime().toString().substr(-5); // Get last 5 digits of timestamp
  const randomDigits = Math.floor(Math.random() * 100000); // Generate random 5-digit number
  const paddedRandomDigits = String(randomDigits).padStart(5, '0'); // Pad random number with leading zeros if necessary
  const uniqueId = timestamp + paddedRandomDigits; // Combine timestamp and random number
  return uniqueId;
}

const getLoadings= useSelector(getLoading)
console.log(getLoadings)
   
/// handle discount
const handleDiscount=(value:string)=>{
  setIsDiscount(true)
  if(value==="Inclusive"){
    setDiscountType(value)
    setDiscountValue(22)
    dispatch(updateInclusiveDiscount({
      discount:22
    }))
  }
  if(value==="Exclusive"){
    setDiscountValue(23)
    setDiscountType(value)
    dispatch(updateExclusiveDiscount({
      discount:23
    }))
  }
  if(value === "Flat"){
    setDiscountValue(0)
    setDiscountType(value)
   dispatch( updateFlatDiscount({
      discount:0
    }))
  }
}


const handleChangeDiscount=(value:number)=>{
  const dis=value;
  console.log(dis);
  setDiscountValue(dis)
  if(discountType==="Inclusive"){
    dispatch(updateInclusiveDiscount({
      discount:dis
    }))
  }
  if(discountType==="Exclusive"){
    dispatch(updateExclusiveDiscount({
      discount:dis
    }))
  }
  if(discountType==="Flat"){
    dispatch(updateFlatDiscount({
      discount:dis
    }))
  }
 
}

const [retailerName, setRetailerName]= useState<string>()
const [retailerAddres, setRetailerAddress]= useState<string>()

const [retailerCity, setRetailerCity]= useState<string>()
const handleRetailerDetail=(retailerId:number, retailerAddres:string, retailerCity:string, retailerName:string)=>{
 
  setRetailerName(retailerName)
  setRetailerAddress(retailerAddres)
  setRetailerCity(retailerCity)
  dispatch(addTravisOrderDetails({
    
    retailerAddres:retailerAddres,
    retailerCity:retailerCity,
    retailerName:retailerName
  }))
 } 

 //haandle viewPdf 
 const [isOrderPdf, setIdOrderPdf]= useState<boolean>(false);
 const handleViewPdf=()=>{
  setIdOrderPdf(true)
 }

 const handleClaoseViewPdf=()=>{
  setIdOrderPdf(false)
 }
 return (
    <div>

     {getLoadings && <Loading/>}
{getProduct && 
getProduct.length>0 &&
<CartHeader
CreateOrder={handleCreateOrder}
sendRetailerData={()=>handleRetailerDetail}

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
                      <Select className="input-dropdown"
                          showSearch
                          placeholder="Select discount"
                          optionFilterProp="children"
                          onChange={handleDiscount}

                          options={[
                              {
                                  value: "Inclusive",
                                  label: "Inclusive",
                              },
                              {
                                  value: "Exclusive",
                                  label: "Exclusive",
                              },
                              {
                                  value: "Flat",
                                  label: "Flat",
                              },
                          ]}
                      />
                    {isDiscount && (
                  <Space className='number-input' direction="vertical">

                {/* <Input
                 
                 
                  onChange={(e)=>handleChangeDiscount(e.target.value)}
                /> */}
<InputNumber
  className='mx-3 number-input'
  addonAfter="%"
  value={discountValue}
  onChange={(value) => {
    if (value !== null) {
      handleChangeDiscount(value);
    }
  }}
/>

                  </Space>

)}
                   

                  </div>

                  <div style={{ width: "261px" }}>

                      <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
                          {" "}
                          <a style={{ color: "#000", paddingRight: "88px", paddingLeft: "10px", }}>Sub Total:</a> {totalAmount}
                      </h4>

                      <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
                          {" "}
                          <a style={{ color: "#000", paddingRight: "94px", paddingLeft: "10px", }}>Discount:</a>
                          {discountAmount !== undefined ? discountAmount.toFixed(2) : "Loading..."}
                      </h4>
                      <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
  {" "}
  <a style={{ color: "#000", paddingRight: "94px", paddingLeft: "10px" }}>Total Net Bill:</a>
  {totalNetBillAmount !== undefined ? totalNetBillAmount.toFixed(2) : "Loading..."}
</h4>






                      {/* <h4 style={{ padding: "8px 0px", backgroundColor: "#ddd", fontSize: "14px" }}>
                          <a style={{ color: "#000", paddingRight: "112px", paddingLeft: "10px", }}>Total : </a>₹2,356
                      </h4> */}
                  </div>

              </div>
          )}
          />):(
            <div className='no-order-section'>
              {/* <i className="bi bi-cart-x"></i> */}
              <i className="bi bi-bag-x"></i>
              <h2>No order selected</h2>
              </div>
          )}          

        

         {/* update order in redux */}
         {reLoadUserAccount&& userId!=null &&<GetUserAccount
        userId={userId}
        resetId={handleResetId}
      />}
     <OrderPdf />
    </div>
  )
}

export default TravisCart