import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelGoods} from "../../model/goods/CallawayGoodsModel"
import {useDispatch, useSelector} from "react-redux"

import {selectCallawayGoods} from "../../../slice/allProducts/CallAwayGoodsSlice"
import * as XLSX from 'xlsx';
 import {updateGoodsQuantity90,updateGoodsQuantity88} from "../../../slice/allProducts/CallAwayGoodsSlice"
import {getGoodsOrder} from "../../../slice/orderSlice/CartOrder"
import CartHeader from '../CartHeader';
 const CalawayGoodsCarts = () => {

    const tableRef = useRef(null);
    const dispatch= useDispatch()

    const getGoodsOrders:BasicModelGoods[]=useSelector(getGoodsOrder)
    const columns: TableColumnsType<BasicModelGoods>= [
        {
          title: "Image",
          dataIndex: "PrimaryImage",
           fixed: "left",
          width:70,
          render: (value) => {
            console.log("image: " + value?.data?.attributes?.formats?.thumbnail?.url)
           return  (
            
            <span>
              <img
                 src={`https://aigigs.in${value?.data?.attributes?.formats?.thumbnail?.url}`}
                
                alt="Primary Image"
                style={{ maxWidth: "30px", marginRight: "5px" }}
              />
            </span>
          )}
        },
    
        {
          title: "SKU",
          dataIndex: "SKU",
          width: 80,
          fixed: "left",
          // render: (value) => <span>{String(value.Name)}</span>,
        },
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "name",
          width: 100 ,
           fixed: "left",
        },
    
        
        //product Type
        {
          title: "ProductType",
          dataIndex: "GoodsAttributes",
          key: "GoodsAttributes", 
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].ProductType}</span>,
         
        },
        // product model
        {
          title: "ProductModel",
          dataIndex: "GoodsAttributes",
          key: "ProductModel", 
          width: 80,
          render: (value) => <span>{value && value[0] && value[0].ProductModel}</span>,
         
        },
        
        {
          title: "Orientation",
          dataIndex: "GoodsAttributes",
          key: "Orientation", 
          width: 150,
          render: (value) => <span>{value && value[0] && value[0].Orientation}</span>,
        },
        {
          title: "Description",
          dataIndex: "Description",
          key: "Description", 
          width: 115,
         
        },
        {
          title:"Stock",
          children:[
           { title: "88    QTY",
            dataIndex: "Stock88",
            key: "Stock88", 
            width: 130,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.Stock88 === 0 ? "0" : record.Stock88} 
              type='number'
             
              value={record.Quantity88?.toString()}
             // onChange={(e) => handleQuantity88(e.target.value, record)}
               />
             
            )
          },
            {
              title: "90  QTY",
            dataIndex: "Stock88",
            key: "Stock88", 
            width: 130,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.Stock90 === 0 ? "0" : record.Stock90} 
              type='number'
              
              value={record.Quantity90?.toString()}
            // onChange={(e) => handleQuantity90(e.target.value, record)} 
             />
             
            ),
            }
           
          ],
          
        },
        {
          title: "Total Qty",
          dataIndex: "TotalQty",
          key: "TotalQty", 
          width: 100,
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
        
      
      ];

      const handleCreateOrderGoods=()=>{
        
      }
  return (
    <div>
<CartHeader
CreateOrder={handleCreateOrderGoods}
/>
{getGoodsOrders  &&
getGoodsOrders.length>0?
(<Table
            ref={tableRef}
            columns={columns}
            dataSource={getGoodsOrders?.map((item) => ({ ...item, key: item.id }))}
            //rowSelection={rowSelection}
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}
          />):(
            <div>
              <h2>No Data Found</h2>
            </div>
          )}

    </div>
  )
}

export default CalawayGoodsCarts