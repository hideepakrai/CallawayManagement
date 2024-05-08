import React, { useEffect, useRef, useState } from 'react'
import {getOgioOrder} from "../../../../slice/orderSlice/ogio/OgioCartOrderSlice";
import { useSelector, useDispatch } from 'react-redux';
import {OgioBasicModel} from "../../../model/ogio/OgioBrandModel"
import { Input, InputNumber, InputRef, Select, SelectProps, Table, TableColumnsType, Tooltip } from 'antd';
import OgioGallery from '../../../brands/ogio/table/column/OgioGallery';
import {addOgioOrder,removeOgioOrder} from "../../../../slice/orderSlice/ogio/OgioCartOrderSlice"
import {getOgioProducts,updateQuantity90} from "../../../../slice/allProducts/OgioSlice"
import Loading from '../../../loading/Loading';

import {getLoading} from "../../../../slice/loading/LoadingSlice"
import CartHeader from '../../CartHeader';
import OgioCartPdf from './OgioCartPdf';

type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Accessory',];
const OPTIONS1 = ['Moto', 'Lifestyle', ];
const OPTIONS2 = ['Og Rise', 'Og Pace Pro', 'Og Max', 'Og Al Convoy	'] ;

const OgioCart = () => {
  const placement: SelectCommonPlacement = 'topLeft';
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const searchInput = useRef<InputRef>(null);
  const getOgioOrders=useSelector(getOgioOrder);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const filteredOptions1 = OPTIONS1.filter((o) => !selectedItems.includes(o));
  const filteredOptions2= OPTIONS2.filter((o) => !selectedItems.includes(o));
  const [ allOgioOrders, setGetAllOgioOrders]= useState<OgioBasicModel[]>([])
 
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
          // render: (value,record) => (
          //   <Input 
          //   addonBefore={value[0]?.Stock90} 
          //   type='number'
           
          //   value={record.Quantity90?.toString()}
          //   onChange={(e) => handleQuantity90(e.target.value, record)} />
           
          // ),
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
       
  
  ];

  useEffect(()=>{
    if(getOgioOrders){
      //console.log("Ogio order",getOgioOrders)
      setGetAllOgioOrders(getOgioOrders)
    }
  },[getOgioOrders]);

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

  dispatch(addOgioOrder({
    OgioOrder:record,
    qty90: intValue,
    qty88:record.Quantity88
  }))
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

dispatch(removeOgioOrder({
  travisOrder:record,
    qty90s: intValue,
    qty88s:record.Quantity90
    
}))
}
}
const getLoadings = useSelector(getLoading)

// csubmit fro review
const handleCreateOrder = (retailerId: number,retailerUserId:number) => {

  // setRetailerId(retailerUserId)
    // dispatch(LoadingStart())
    // if (Array.isArray(getProduct)) {

    //   const orderId = generateUniqueNumeric();
    //   let brand;
    //   let amount;
    //   const ProductDetail: ProductDetails[] = [];
    //   getProduct.forEach((item: BasicModelTravis) => {
    //     brand = item.SetType;
    //     amount = item.FinalBillValue;
    //     ProductDetail.push({
    //       product: item.id,
    //       Qty88: item.Quantity88,
    //       Qty90: item.Quantity90,
    //       TotalPrice: item.FinalBillValue,
    //       UnitPrice: item.MRP

    //     });
    //   // const trsvisdata=item.TravisAttributes
    //   //   if(trsvisdata && travisdata[0]?.Stock88 &&travisdata?[0].Stock90){

    //   //   let stk88=travisdata[0]?.Stock88- item.Quantity88
    //   //   let stk90=travisdata[0]?.Stock90- item.Quantity90
    //   //   updateQty(item?.id, stk88, stk90)

    //   //   }
        

    //   });


    //   const comments = {
    //     Comment: "submit for review",
    //     Type: "Event",
    //     "users_permissions_user (1)": userId
    //   }
    //      if(userId &&retailerId &&orderId){
        
    //        const data:CartModel = {
    //         OrderId: orderId,
    //         Status: "Pending",
    //         ProductDetails: ProductDetail,
    //         retailer: retailerId,
    //         users: {
    //           connect: [
    //             {
    //               id: retailerUserId,
    //               position: {
    //                 end: true
    //               }
    //             },
    //             {
    //             id: userId,
    //             position: {
    //               end: true
    //             }
    //           }, 
             
    //         ]
    //         },
    //         Brand: brand,
    //         Amount: totalNetBillAmount,
    //         DiscountType: discountType,
    //         DiscountPercent: discountValue,
    //         Comments: [comments]
    //       }

    //       createOrder(data)
    //      }
      
      

     
    // }
  }
  return (
    <div>

{getLoadings && <Loading />}
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
          />
        
        <OgioCartPdf/>
    </div>
  )
}

export default OgioCart