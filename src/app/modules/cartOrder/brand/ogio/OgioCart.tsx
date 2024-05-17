import React, { useEffect, useRef, useState } from 'react'
import {getOgioOrder} from "../../../../slice/orderSlice/ogio/OgioCartOrderSlice";
import { useSelector, useDispatch } from 'react-redux';
import {OgioBasicModel} from "../../../model/ogio/OgioBrandModel"
import { Input, InputNumber, InputRef, Popconfirm, Select, SelectProps, Space, Table, TableColumnsType, Tooltip } from 'antd';
import OgioGallery from '../../../brands/ogio/table/column/OgioGallery';
import {updateOgioInclusiveDiscount,updateOgioExclusiveDiscount,updateOgioFlatDiscount} from "../../../../slice/allProducts/OgioSlice"
import {getOgioProducts,updateQuantity90} from "../../../../slice/allProducts/OgioSlice"
import Loading from '../../../loading/Loading';

import {LoadingStart, LoadingStop, getLoading} from "../../../../slice/loading/LoadingSlice"
import CartHeader from '../../CartHeader';
import OgioCartPdf from './OgioCartPdf';
import SubmitHomePage from '../../../submitReview/SubmitHomePage';
import { CartModel, ProductDetails } from '../../../model/CartOrder/CartModel';
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { CreateOrder } from '../../orderApi/OrderAPi';
import GetUserAccount from '../../../auth/components/GetUserAccount';
import GetAllProduct from '../../../../api/allProduct/GetAllProduct';
import OgioProduct from '../../../../api/allProduct/ogio/OgioProduct';
import OgioSubmitOrder from './OgioSubmitOrder';
import UpdateOrderToDB from "./updateOrderToDB"
import { InfoCircleOutlined } from '@ant-design/icons';
import UpdateReduxOgio  from "./UpdateReduxOgio"

type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Accessory',];
const OPTIONS1 = ['Moto', 'Lifestyle', ];
const OPTIONS2 = ['Og Rise', 'Og Pace Pro', 'Og Max', 'Og Al Convoy	'] ;

const OgioCart = () => {
  const placement: SelectCommonPlacement = 'topLeft';
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const searchInput = useRef<InputRef>(null);
  // const getOgioOrders=useSelector(getOgioOrder);
  const getOgioProduct=useSelector(getOgioProducts);


  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const filteredOptions1 = OPTIONS1.filter((o) => !selectedItems.includes(o));
  const filteredOptions2= OPTIONS2.filter((o) => !selectedItems.includes(o));
  const [ allOgioOrders, setGetAllOgioOrders]= useState<OgioBasicModel[]>([])
  const [userId, setUserId] = useState<number>();

   const handleconfirm=()=>{

   }

   const handlecancel=()=>{

   }

   // update user Id
   const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
   useEffect(() => {
    if (getCurrentUsers) {

     
      setUserId(getCurrentUsers?.user?.id)
    }
  }, [getCurrentUsers])
  const columns: TableColumnsType<OgioBasicModel>= [
    {
      // title: "Image",
      dataIndex: "PrimaryImage",
      // fixed: "left",
      width: 50,
      render: (value) => <OgioGallery value={value} />,
    },

    {
      title: "SKU",
      dataIndex: "sku",
      width: 100,
      fixed: "left",
      
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div  style={{ padding: 8, position: "absolute", top: -90, backgroundColor: "white", zIndex: 1 }}>
          <Input
            ref={searchInput}

            placeholder="Search SKU"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onKeyUp={(e) => {
              confirm({ closeDropdown: false });
              
            }}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
        </div>
      ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            setTimeout(() => searchInput.current?.select(), 1000);
          });
        }
      },
      onFilter: (value, record) => {
         
          let check: boolean= false
        const val:string=value.toString().toUpperCase()
          if(record && record.sku){
             check= record.sku?.startsWith(val)
          }
       
        return  check;
      },
      filterSearch: true,

     
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
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
           record.name;
          
       
         return  name=== value;
       },
       filterSearch: true,
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description", 
    //   width: 150,
      
    // },
    
    //product Type
    {
      title: "ProductType",
      dataIndex: "product_type",
      key: "product_type",
      width: 150,
      

      sorter: (a, b) => {
        const categoryA = a.product_type ?? "";
        const categoryB = b.product_type ?? "";
    
        return categoryA.localeCompare(categoryB);
      },

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8,  width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
          <Select
            mode="multiple"
            placeholder="Select Category"
           
            value={selectedKeys}
            onChange={setSelectedKeys}
            style={{ width: '100%' }}
            placement={placement} 
          >
            {/* Render options based on available categories */}
            {filteredOptions.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
       
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
        const category = record?.product_type;
    
        console.log("Filtering:", value, "Category:", category);
        return category === value;
      },
      filterSearch: true,

    },


    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,
      
      sorter: (a, b) => {
        const categoryA = a.category ?? "";
        const categoryB = b.category ?? "";
    
        return categoryA.localeCompare(categoryB);
      },

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8,  width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
          <Select
            mode="multiple"
            placeholder="Select Category"
        
            value={selectedKeys}
            onChange={setSelectedKeys}
            style={{ width: '100%' }}
            placement={placement} 
          >
            {/* Render options based on available categories */}
            {filteredOptions1.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
       
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
        const category = record?.category;
    
        console.log("Filtering:", value, "Category:", category);
        return category === value;
      },
      filterSearch: true,
     
    },



      // product model
      {
        title: "ProductModel",
        dataIndex: "product_model",
        key: "product_model", 
        width: 150,
       
       sorter: (a, b) => {
        const categoryA = a.product_model ?? "";
        const categoryB = b.product_model ?? "";
    
        return categoryA.localeCompare(categoryB);
      },

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8,  width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
          <Select
            mode="multiple"
            placeholder="Select Category"
           
            value={selectedKeys}
            onChange={setSelectedKeys}
            style={{ width: '100%' }}
            placement={placement} 
          >
            {/* Render options based on available categories */}
            {filteredOptions2.map((item) => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
       
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
        const product_mode = record?.product_model;
    
        console.log("Filtering:", value, "product_mode:", product_mode);
        return product_mode === value;
      },
      filterSearch: true,
      },
     
      
      
          { title: " Qty90",
          dataIndex: "stock_90",
          key: "stock_90", 
          width: 150,
          fixed:'right',
          
          render: (value,record) => (
            <>
               {value === 0 && ( // Conditionally render Popconfirm when intValue is 0
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={handleconfirm}
              onCancel={handlecancel}
              okText="Yes"
              cancelText="No"
              placement="top" // Set the placement to top
            >
              <Tooltip title="Enter quantity" placement="top">
                <InfoCircleOutlined className="icon" />
              </Tooltip>
            </Popconfirm>
          )}
            <Tooltip  open={record.sku=== qty90ToolSKU ?isQty90ToolTip:false} title={record.sku=== qty90ToolSKU ? qty90ToolMesage : ""} placement="top">
           
            <InputNumber
              status={record.error !== "" ? "error" : ""}
            className='mx-3 number-input'
            addonBefore={record.stock_90} 
            value={record.Quantity90?.toString()}
            style={{ width: 100 }}
            onChange={(value) => {
              if (value !== null) {
                handleQuantity90(value, record)
              }

            }}
           
             
            disabled={value[0]?.Stock90 === 0} 
          />
          </Tooltip>
            </>
         
           
          ),
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
      {
        title: "GST",
        dataIndex: "gst",
        key: "gst",
        width: 100,
        fixed: 'right'
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

  useEffect(()=>{
    const ogio:OgioBasicModel[]=[];
    if(getOgioProduct &&getOgioProduct.length>0){
      getOgioProduct.map((item)=>{
        if(item.ordered){
          ogio.push(item)
        }
      })
      

       setGetAllOgioOrders(ogio)
    }
  },[getOgioProduct]);

  const [qty90ToolMesage, setQty90Message]= useState<string>("")
  const [qty90ToolSKU, setQty90SKU]= useState<string|undefined>("")
 const [isQty90ToolTip, setIsQty90ToolTip]= useState<boolean>(false)

 const handleQuantity90=(value: string, record:OgioBasicModel)=>{
  
  const intValue = parseInt(value, 10);
  setQty90Message("");
  setIsQty90ToolTip(false);
  setQty90SKU("")
  record.Quantity90=intValue;
  if(intValue>0 ){
    if ( record&& record.stock_90 &&record.stock_90 >= intValue) {
    
      // Dispatch an action to update the quantity for the SKU
      
      dispatch(updateQuantity90({
        sku: record.sku,
        qty90: intValue,
        MRP: record.mrp,
        
      }));
    
     
    }
    else {
      // alert("Quantity is not available")
      const st90=(record&& record.stock_90 )? record.stock_90:0;
      setQty90Message("The quantity should not exceed the available stock")
      setIsQty90ToolTip(true)
      setQty90SKU(record.sku)
      //setQuantity90(0)
      dispatch(updateQuantity90({
        sku: record.sku,
        qty90: st90,
        MRP:record.mrp
      
       
      }));
      
  
      
    }
  }else if(intValue<0){
    
    //alert("Quantity cannot be negative")
    setQty90Message("Quantity cannot be negative")
  setIsQty90ToolTip(true)
  setQty90SKU(record.sku)
  console.log("Quantity cannot be negative")
  } 
   else if(intValue===0){
    const confirmed = window.confirm("Do you want to remove the product?");
    if (confirmed) {
        dispatch(updateQuantity90({
            sku: record.sku,
            qty90: intValue,
            MRP: record.mrp,
        }));
    }

   
}
}
const getLoadings = useSelector(getLoading)
const[isLoadingStart, setIsLoadingStart]= useState<boolean>(false)
useEffect(()=>{
  if(getLoadings){
    setIsLoadingStart(true)
  } else if(!getLoadings){
    setIsLoadingStart(false)
  }
},[getLoadings])

const [totalAmount, setTotalAmount] = useState<number>()
const [discountAmount, setDiscountAmount] = useState<number>()
const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>(0)

useEffect(() => {
  let tAmount: number = 0;
  let totalBillAmount: number = 0;
  if (getOgioProduct && getOgioProduct.length > 0) {
    getOgioProduct.map((item: OgioBasicModel) => {
      if (item.Amount && item.ordered && item.error==="") {
        tAmount =parseFloat(( item.Amount + tAmount).toFixed(2))
      }
      if (item.FinalBillValue && item.ordered && item.error==="") {

        totalBillAmount = parseFloat((totalBillAmount + item.FinalBillValue).toFixed(2))
      }

    })
    setTotalAmount(tAmount)
    setTotalNetBillAmount(totalBillAmount)
    setDiscountAmount(tAmount - totalBillAmount)
  }
}, [getOgioProduct])



  // handle disount
  
  const [discountType, setDiscountType] = useState<string>("Inclusive")
  const [isDiscount, setIsDiscount] = useState<boolean>(false)
  const [discountValue, setDiscountValue] = useState<number>(22)

   const handleDiscount = (value: string) => {
    setIsDiscount(true)
    if (value === "Inclusive") {
      setDiscountType(value)
      setDiscountValue(22)
      dispatch(updateOgioInclusiveDiscount({
        discount: 22
      }))
    }
    if (value === "Exclusive") {
      setDiscountValue(23)
      setDiscountType(value)
      dispatch(updateOgioExclusiveDiscount({
        discount: 23
      }))
    }
    if (value === "Flat") {
      setDiscountValue(0)
      setDiscountType(value)
      dispatch(updateOgioFlatDiscount({
        discount: 0
      }))
    }
  }

  // handle change discount 
  const handleChangeDiscount = (value: number) => {
    const dis = value;
    console.log(dis);
    setDiscountValue(dis)
    if (discountType === "Inclusive") {
      setDiscountType("Inclusive")
      setDiscountValue(dis)
      dispatch(updateOgioInclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Exclusive") {
      setDiscountType("Exclusive")
      setDiscountValue(dis)
      dispatch(updateOgioExclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Flat") {
      setDiscountValue(dis)
      setDiscountType("Flat")
      dispatch(updateOgioFlatDiscount({
        discount: dis
      }))
    }

  }

  // check start submit for Review
// csubmit fro review
const [ isRefetch, setIsRefetch]= useState<boolean>(false)
const handleRefetch=()=>{
  setIsRefetch(true)
  dispatch(LoadingStart())
}

const handleResetRefetch=()=>{
  setIsRefetch(false)
  dispatch(LoadingStop())
}

const [retailerId, setRetailerId] = useState<number>(0);
 

// submite order
const[isUpdateRedux, setIsUpdateRedux]= useState(false)
const[isUpdateStrapi, setIsUpdateStrapi]= useState(false)
const[isSubmitOrder, setIsSubmitOrder]= useState(false)
const[reLoadUserAccount, setReLoadUserAccount]= useState(false)
const hanldeSubmitOrder = () => {
  console.log("submit buuton")
  setIsSubmitOrder(true)
}

const handleResetSubmitOrder=()=>{
  console.log("order submitted")
  setIsSubmitOrder(false)
  setIsUpdateStrapi(true)
  setTotalAmount(0);
  setTotalNetBillAmount(0);
  setDiscountAmount(0)

  
}

const handleResetUSerAccount=()=>{
  setReLoadUserAccount(false)
 
}

const handleUpdateStrapi=()=>{
  console.log("updated in DB")
  setIsUpdateStrapi(false)
  setIsUpdateRedux(true)
}  

const handleUpdateRedux=()=>{
  console.log("finally finished all task")
  alert("Your order has been plcaed successfully")
  setIsUpdateRedux(false)
  
    dispatch(LoadingStop())
    setGetAllOgioOrders([])
}
  return (
    <div>

{isLoadingStart && <Loading />}
      {allOgioOrders &&
        allOgioOrders.length > 0 &&
        <CartHeader
          
        reviewOrder={handleRefetch}
        submitOrder={hanldeSubmitOrder}
        />}

       <Table
            ref={tableRef}
            columns={columns}
            dataSource={allOgioOrders?.map((item) => ({ ...item, key: item.sku }))}
          //  rowSelection={rowSelection}
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
           
            pagination={{
              position: ['topRight', 'bottomRight'], // Positions pagination at the top and bottom
              defaultPageSize: 20
            }}
            
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
  
                  <h4 style={{ borderBottom: "1px solid #ddd", fontSize: "14px",  paddingBottom:"10px" ,paddingTop:"2px" }}>
                    {" "}
                    <a style={{ color: "#000", paddingRight: "93px", paddingLeft: "10px", }}>Sub Total:</a> {totalAmount}
                  </h4>
  
                  <h4 style={{ borderBottom: "1px solid #ddd", display:"flex",  fontSize: "14px", paddingBottom:"10px" ,paddingTop:"2px", margin:"0" }}>
                    {" "}
                    <a style={{ color: "#000", paddingRight: "100px", paddingLeft: "10px", }}>Discount:</a>
                    {discountAmount !== undefined ? discountAmount.toFixed(2) : "Loading..."}
                  </h4>
  
                  <h4 style={{ borderBottom: "1px solid #ddd", display:"flex",  fontSize: "14px", paddingBottom:"10px" ,paddingTop:"10px", background:"#f1f1f1"  }}>
                    {" "}
                    <a style={{ color: "#000",  paddingRight: "75px", paddingLeft: "10px" }}>Total Net Bill:</a>
                    {totalNetBillAmount !== undefined ? totalNetBillAmount.toFixed(2) : "Loading..."}
                  </h4>
  
  
  
  
  
  
                  {/* <h4 style={{ padding: "8px 0px", backgroundColor: "#ddd", fontSize: "14px" }}>
                            <a style={{ color: "#000", paddingRight: "112px", paddingLeft: "10px", }}>Total : </a>₹2,356
                        </h4> */}
                </div>
  
              </div>
            )}
          />
        

        <OgioCartPdf/>

{/* update the order from user 
 */}
        {reLoadUserAccount && userId != null && <GetUserAccount
        userId={userId}
        resetId={handleResetUSerAccount}
        reLoadUserAccount={reLoadUserAccount}
      />}



{isRefetch && <OgioProduct
       resetOgio={handleResetRefetch}
       isRefetch={isRefetch}
       
       />}

      { totalNetBillAmount!=0 &&
      isSubmitOrder&&
      <OgioSubmitOrder
       totalNetBillAmount={totalNetBillAmount}
       discountType={discountType}
       discountValue={discountValue}
       resetSubmitOrder={handleResetSubmitOrder}
       />}

  {isUpdateStrapi &&  <UpdateOrderToDB
    resetUpdateOrder={handleUpdateStrapi}
   />} 
      
   { isUpdateRedux &&  <UpdateReduxOgio

resetReducOgio={handleUpdateRedux}
   />} 
    </div>
  )
}

export default OgioCart