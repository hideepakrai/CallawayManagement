import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Select, Tooltip, InputNumber } from "antd";
import { Input, Radio, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import { BasicModelTravis } from '../../model/travis/TravisMethewModel';
import { CartModel } from '../../model/CartOrder/CartModel';


type Props={
    allarray:string;
    id:number
}
const TravisExpandedRowRender =({allarray,id}:Props)=>{

    const [expandedKeys, setExpandedKeys] = useState<number|null>(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelTravis[]>([]);
   console.log("allarray",allarray)
    useEffect(()=>{
        if(allarray!==""){
            const allarrays = JSON.parse(allarray);  
            setExpandedRowKeys(allarrays);
            setExpandedKeys(id)  
        }
    },[allarray])


 
    const subcolumns: TableColumnsType<BasicModelTravis> = [
        {
            title: "SKU",
            dataIndex: "sku",
            width: 100,
            fixed: "left",
      
      
          },
          {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: 150,
      
          },
      
      
          {
              title: "Season",
              dataIndex: "season",
              key: "season",
              width: 100,
        
        
            },
      
      
          {
            title: "Category",
            dataIndex: "category",
            key: "category",
            width: 120,
      
      
      
          },
      
      
          {
              title: "Style",
              dataIndex: "style_code",
              key: "style_code",
              width: 85,
        
            },
      
      
        {
            title: "Qty",
            dataIndex: "TotalQty",
            key: "TotalQty",
            width: 50,
            fixed: "right",
            render: (value, record, index) => {
                const qty88=record.stock_88;
                const qty90=record.stock_90;

                if(qty88 && qty90){
                    return qty88+qty90;
                } else if(qty88 &&qty90===0){
                    return qty88;
                }
                else if(qty90 &&qty88===0){
                    return qty90;
                }

            }
        },
        {
            title: "MRP",
            dataIndex: "mrp",
            key: "mrp",
            width: 80,
            fixed: "right",
        },
        {
            title: "Discount",
            dataIndex: "LessDiscountAmount",
            key: "LessDiscountAmount",
            width: 80,
            fixed: "right",
        },
        {
            title: "Amount",
        
            dataIndex: "newAmount",
            key: "Amount",
            width: 100,
            fixed: "right",
            render:(value, record)=>{
                const newAmount=(record?.mrp??0)-(record?.LessDiscountAmount??0)
                return(newAmount)
            }
        },
    ]

    return(
        <>
         <Table
                className="table-profile"
                columns={subcolumns}
                dataSource={expandedRowKeys.map((item) => ({
                    ...item,
                    key: item.sku,
                }))}
                pagination={false}
                size="middle"
            />
        </>
    )
}


export default TravisExpandedRowRender 