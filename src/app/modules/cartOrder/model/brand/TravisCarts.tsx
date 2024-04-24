
import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../../../brands/model/travis/TravisMethewModel"
import {useDispatch, useSelector} from "react-redux"
import {getTravisOrder} from "../../../../slice/orderSlice/CartOrder"
import {updateQuantity90,updateQuantity88} from "../../../../slice/allProducts/TravisMethewSlice"
import {addTravisOrder} from "../../../../slice/orderSlice/CartOrder"

const TravisCart = () => {
    const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
   
    const dispatch= useDispatch()

   const getProduct:BasicModelTravis[]=useSelector(getTravisOrder)
     const[amount, setAmount]=useState<number>()
     
     const columns: TableColumnsType<BasicModelTravis>= [
        {
          // title: "Image",
          dataIndex: "PrimaryImage",
          // fixed: "left",
          width: 25,
        //   render: (value) => (
        //     <span>
        //       <img
        //         src={master}
        //         alt="Primary Image"
        //         style={{ maxWidth: "30px", marginRight: "5px" }}
        //       />
        //     </span>
        //   ),
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
            dataIndex: "StockAvailable88",
            key: "StockAvailable88", 
            width: 130,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.StockAvailable88} 
              type='number'
             
              value={record.Quantity88?.toString()}
              onChange={(e) => handleQuantity88(e.target.value, record)} 
              />
             
            ),
          },
            {
              title: "90  QTY",
            dataIndex: "StockAvailable88",
            key: "StockAvailable88", 
            width: 130,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.StockAvailable90} 
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
          dataIndex: "RegularPrice",
          key: "RegularPrice", 
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
    
        if (record?.StockAvailable90 && record.StockAvailable90 >= intValue) {
          
          // Dispatch an action to update the quantity for the SKU
          
          dispatch(updateQuantity90({
            sku: record.SKU,
            qty90: intValue,
            RegularPrice: record.RegularPrice,
            
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
    
        if (record?.StockAvailable88 && record.StockAvailable88 >= intValue) {
          // Dispatch an action to update the quantity for the SKU
          dispatch(updateQuantity88({
            sku: record.SKU,
            qty88: intValue,
            RegularPrice: record.RegularPrice,
          }));
          record.Quantity88=intValue;
         // setQuantity88(intValue)
         dispatch(addTravisOrder({
          travisOrder:record,
            qty88: intValue,
            qty90:record.Quantity90
            
        }))
        }
        else if(record?.StockAvailable88 && record.StockAvailable88 < intValue &&intValue!==0){
          alert("Quantity is not available")
         // setQuantity88(0)
         dispatch(updateQuantity88({
          sku: record.SKU,
          qty88: 0,
        }));
        record.Quantity90=0;
        }
      
      };
  return (
    <div>travis Order

{getProduct && 
getProduct.length>0 &&
        <Table
            ref={tableRef}
            columns={columns}
            dataSource={getProduct?.map((item) => ({ ...item, key: item.id }))}
          
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}
          />}
    </div>
  )
}

export default TravisCart