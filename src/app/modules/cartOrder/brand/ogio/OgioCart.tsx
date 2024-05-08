import React, { useEffect, useRef, useState } from 'react'
import {getOgioOrder} from "../../../../slice/orderSlice/ogio/OgioCartOrderSlice";
import { useSelector, useDispatch } from 'react-redux';
import {OgioBasicModel} from "../../../model/ogio/OgioBrandModel"
import { Input, InputNumber, InputRef, Select, SelectProps, Space, Table, TableColumnsType, Tooltip } from 'antd';
import OgioGallery from '../../../brands/ogio/table/column/OgioGallery';
import {updateOgioInclusiveDiscount,updateOgioExclusiveDiscount,updateOgioFlatDiscount, resetOgioOrder} from "../../../../slice/allProducts/OgioSlice"
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

  console.log("getOgioProduct",getOgioProduct)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const filteredOptions1 = OPTIONS1.filter((o) => !selectedItems.includes(o));
  const filteredOptions2= OPTIONS2.filter((o) => !selectedItems.includes(o));
  const [ allOgioOrders, setGetAllOgioOrders]= useState<OgioBasicModel[]>([])
  const [userId, setUserId] = useState<number>();

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
      dataIndex: "SKU",
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
          if(record && record.SKU){
             check= record.SKU?.startsWith(val)
          }
       
        return  check;
      },
      filterSearch: true,

     
    },

    {
      title: "Name",
      dataIndex: "Name",
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
           record.Name;
          
       
         return  name=== value;
       },
       filterSearch: true,
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

      sorter: (a, b) => {
        const categoryA = a.OgiAttributes?.[0]?.Category ?? "";
        const categoryB = b.OgiAttributes?.[0]?.Category ?? "";
    
        return categoryA.localeCompare(categoryB);
      },

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
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
        const category = record?.OgiAttributes?.[0]?.Category;
    
        console.log("Filtering:", value, "Category:", category);
        return category === value;
      },
      filterSearch: true,

    },


    {
      title: "Category",
      dataIndex: "OgiAttributes",
      key: "Category",
      width: 120,
      render: (value) => <span>{value && value[0] && value[0].Category}</span>,
      sorter: (a, b) => {
        const categoryA = a.OgiAttributes?.[0]?.Category ?? "";
        const categoryB = b.OgiAttributes?.[0]?.Category ?? "";
    
        return categoryA.localeCompare(categoryB);
      },

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
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
        const category = record?.OgiAttributes?.[0]?.Category;
    
        console.log("Filtering:", value, "Category:", category);
        return category === value;
      },
      filterSearch: true,
     
    },



      // product model
      {
        title: "ProductModel",
        dataIndex: "OgiAttributes",
        key: "ProductModel", 
        width: 150,
        render: (value) => <span>{value && value[0] && value[0].ProductModel}</span>,
       sorter: (a, b) => {
        const categoryA = a.OgiAttributes?.[0]?.Category ?? "";
        const categoryB = b.OgiAttributes?.[0]?.Category ?? "";
    
        return categoryA.localeCompare(categoryB);
      },

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
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
        const category = record?.OgiAttributes?.[0]?.Category;
    
        console.log("Filtering:", value, "Category:", category);
        return category === value;
      },
      filterSearch: true,
      },
     
      
      
          { title: " Qty90",
          dataIndex: "OgiAttributes",
          key: "Stock90", 
          width: 150,
          fixed:'right',
          
          render: (value,record) => (
            <Tooltip  open={record.SKU=== qty90ToolSKU ?isQty90ToolTip:false} title={record.SKU=== qty90ToolSKU ? qty90ToolMesage : ""} placement="top">
            <InputNumber
            
            className='mx-3 number-input'
            addonBefore={value[0]?.Stock90} 
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
           
          ),
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
      {
        title: "GST",
        dataIndex: "GST",
        key: "GST",
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
      console.log("Ogio order",getOgioProduct)

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
if ( record?.OgiAttributes&&record?.OgiAttributes[0]?.Stock90 && record.OgiAttributes[0].Stock90 >= intValue) {

  // Dispatch an action to update the quantity for the SKU
  
  dispatch(updateQuantity90({
    sku: record.SKU,
    qty90: intValue,
    MRP: record.MRP,
    
  }));

  // dispatch(addOgioOrder({
  //   OgioOrder:record,
  //   qty90: intValue,
  //   qty88:record.Quantity88
  // }))
}
else{
  // alert("Quantity is not available")
  const st90=(record?.OgiAttributes&&record?.OgiAttributes[0]?.Stock90 )? record.OgiAttributes[0].Stock90:0;
  setQty90Message("The quantity should not exceed the available stock")
  setIsQty90ToolTip(true)
  setQty90SKU(record.SKU)
  //setQuantity90(0)
  dispatch(updateQuantity90({
    sku: record.SKU,
    qty90: st90,
  
   
  }));
  

  
}
}else if(intValue<0){

// alert("Quantity cannot be negative")
setQty90Message("Quantity cannot be negative")
setIsQty90ToolTip(true)
setQty90SKU(record.SKU)
console.log("Quantity cannot be negative")
} 
else if(intValue===0){
dispatch(updateQuantity90({
  sku: record.SKU,
  qty90: intValue,
  MRP: record.MRP,
  
}));

// dispatch(removeOgioOrder({
//   ogioOrder:record,
//     qty90s: intValue,
//     qty88s:record.Quantity90
    
// }))
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
const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
useEffect(() => {
  let tAmount: number = 0;
  let totalBillAmount: number = 0;
  if (getOgioProduct && getOgioProduct.length > 0) {
    getOgioProduct.map((item: OgioBasicModel) => {
      if (item.Amount) {
        tAmount = item.Amount + tAmount
      }
      if (item.FinalBillValue) {

        totalBillAmount = totalBillAmount + item.FinalBillValue
      }

    })
    setTotalAmount(tAmount)
    setTotalNetBillAmount(totalBillAmount)
    setDiscountAmount(tAmount - totalBillAmount)
  }
}, [getOgioProduct])



  // handle disount
  
  const [discountType, setDiscountType] = useState<string>("")
  const [isDiscount, setIsDiscount] = useState<boolean>(false)
  const [discountValue, setDiscountValue] = useState<number>(0)

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
      dispatch(updateOgioInclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Exclusive") {
      dispatch(updateOgioExclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Flat") {
      dispatch(updateOgioFlatDiscount({
        discount: dis
      }))
    }

  }

  // check start submit for Review
// csubmit fro review
const [retailerId, setRetailerId] = useState<number>(0);
 
const handleCreateOrder = (retailerId: number,retailerUserId:number) => {

  setRetailerId(retailerUserId)
    dispatch(LoadingStart())
    if (Array.isArray(allOgioOrders)) {

      const orderId = generateUniqueNumeric();
      let brand;
      let amount;
      const ProductDetail: ProductDetails[] = [];
      allOgioOrders.forEach((item: OgioBasicModel) => {
        brand = item.SetType;
        amount = item.FinalBillValue;
        ProductDetail.push({
          product: item.id,
          Qty88: item.Quantity88,
          Qty90: item.Quantity90,
          TotalPrice: item.FinalBillValue,
          UnitPrice: item.MRP

        });
      const ogiodata=item.OgiAttributes
      const st90=item.Quantity90
        if(ogiodata && ogiodata[0]?.Stock90  &&st90){

        const  stk90=ogiodata[0]?.Stock90- st90
        //updateQty(item?.id, stk88, stk90)

        }
        

      });


      const comments = {
        Comment: "submit for review",
        Type: "Event",
        "users_permissions_user (1)": userId
      }
         if(userId &&retailerId &&orderId){
        
           const data:CartModel = {
            OrderId: orderId,
            Status: "Pending",
            ProductDetails: ProductDetail,
            retailer: retailerId,
            users: {
              connect: [
                {
                  id: retailerUserId,
                  position: {
                    end: true
                  }
                },
                {
                id: userId,
                position: {
                  end: true
                }
              }, 
             
            ]
            },
            Brand: brand,
            Amount: totalNetBillAmount,
            DiscountType: discountType,
            DiscountPercent: discountValue,
            Comments: [comments]
          }

         createOrder(data)
         }
      
      

     
     }
  }

  function generateUniqueNumeric(): string {
    const timestamp = new Date().getTime().toString().substr(-5); // Get last 5 digits of timestamp
    const randomDigits = Math.floor(Math.random() * 100000); // Generate random 5-digit number
    const paddedRandomDigits = String(randomDigits).padStart(5, '0'); // Pad random number with leading zeros if necessary
    const uniqueId = timestamp + paddedRandomDigits; // Combine timestamp and random number
    return uniqueId;
  }


  const [orderId, setOrderId]= useState<number>(0)
  const [reLoadUserAccount, setReloadUserAccount] = useState(false)
  const createOrder = async (data: CartModel) => {
    try {
      const response = await CreateOrder(data);
   
      if (response?.data.id) {
        setOrderId(response?.data.id)

        setReloadUserAccount(true)
      }


    }
    catch (err) {
      console.log(err);
      dispatch(LoadingStop())
      setReloadUserAccount(false);
    }
  }


// reset userlaoding boolean
const handleResetId = () => {
  alert("your order has been created")
  setReloadUserAccount(false);
  dispatch(resetOgioOrder())
  dispatch(LoadingStop())
}
  return (
    <div>

{isLoadingStart && <Loading />}
      {allOgioOrders &&
        allOgioOrders.length > 0 &&
        <CartHeader
          
           CreateOrder={handleCreateOrder}
        />}
       <Table
            ref={tableRef}
            columns={columns}
            dataSource={allOgioOrders?.map((item) => ({ ...item, key: item.id }))}
          //  rowSelection={rowSelection}
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
  
                  <h4 style={{ borderBottom: "1px solid #ddd", fontSize: "14px",  paddingBottom:"10px" ,paddingTop:"2px" }}>
                    {" "}
                    <a style={{ color: "#000", paddingRight: "93px", paddingLeft: "10px", }}>Sub Total:</a> {totalAmount}
                  </h4>
  
                  <h4 style={{ borderBottom: "1px solid #ddd",  fontSize: "14px", paddingBottom:"10px" ,paddingTop:"2px", margin:"0" }}>
                    {" "}
                    <a style={{ color: "#000", paddingRight: "100px", paddingLeft: "10px", }}>Discount:</a>
                    {discountAmount !== undefined ? discountAmount.toFixed(2) : "Loading..."}
                  </h4>
  
                  <h4 style={{ borderBottom: "1px solid #ddd",  fontSize: "14px", paddingBottom:"10px" ,paddingTop:"10px", background:"#f1f1f1"  }}>
                    {" "}
                    <a style={{ color: "#000", paddingRight: "75px", paddingLeft: "10px" }}>Total Net Bill:</a>
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

        {reLoadUserAccount && userId != null && <GetUserAccount
        userId={userId}
        resetId={handleResetId}
      />}
  <GetAllProduct/>
      
      
    </div>
  )
}

export default OgioCart