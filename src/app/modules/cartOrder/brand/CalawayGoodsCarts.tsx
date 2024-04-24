import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelGoods} from "../../../modules/brands/model/goods/CallawayGoodsModel"
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
            dataIndex: "StockAvailable88",
            key: "StockAvailable88", 
            width: 130,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.StockAvailable88 === 0 ? "0" : record.StockAvailable88} 
              type='number'
             
              value={record.Quantity88?.toString()}
             // onChange={(e) => handleQuantity88(e.target.value, record)}
               />
             
            )
          },
            {
              title: "90  QTY",
            dataIndex: "StockAvailable88",
            key: "StockAvailable88", 
            width: 130,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.StockAvailable90 === 0 ? "0" : record.StockAvailable90} 
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
  return (
    <div>
<CartHeader/>
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
              <h1>No Data Found</h1>
            </div>
          )}

    </div>
  )
}

export default CalawayGoodsCarts