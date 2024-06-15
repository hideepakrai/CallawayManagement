import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Select, Tooltip, InputNumber } from "antd";
import { Input, Radio, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import { OgioBasicModel } from '../../model/ogio/OgioBrandModel';
//import { BasicModelApparel } from '../../model/apparel/CallawayApparelModel';
import { BasicModelGoods } from '../../model/goods/CallawayGoodsModel';

type Props={
    allarray:string;
    id:number
}
const HardGoodsExpandedRowRender =({allarray,id}:Props)=>{

    const [expandedKeys, setExpandedKeys] = useState<number|null>(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelGoods[]>([]);

    useEffect(()=>{
        setExpandedKeys(null)
        setExpandedRowKeys([])
        if(allarray!==""){
            const allarrays = JSON.parse(allarray);  
            setExpandedRowKeys(allarrays);
            setExpandedKeys(id)  
        }
    },[allarray])

    console.log("all array",allarray)

    const subcolumns: TableColumnsType<BasicModelGoods> = [
        {
            title: "SKU ",
            dataIndex: "sku",
            key: "sku",
            width: 100,
            fixed: "left",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: 150,
      
          },
          // {
          //     title: "Category",
          //     dataIndex: "category",
          //     key: "category",
          //     width: 120,
        
        
        
          //   },
      
      
          {
              title: "Model",
              dataIndex: "product_model",
              key: "product_model",
              width: 100,
        
        
            },
      
      
    
        

      
       
        {
            title: "Qty",
            dataIndex: "TotalQty",
            key: "TotalQty",
            width: 50,
            fixed: "right",
            render: (value, record, index) => {
              
                const qty88=record.stock_88;
              if(qty88 ){
                    return qty88;
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

            dataIndex: "total_value",
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


export default HardGoodsExpandedRowRender 