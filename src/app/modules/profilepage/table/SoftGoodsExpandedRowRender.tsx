import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Select, Tooltip, InputNumber } from "antd";
import { Input, Radio, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import { OgioBasicModel } from '../../model/ogio/OgioBrandModel';
import { BasicModelApparel } from '../../model/apparel/CallawayApparelModel';

type Props={
    allarray:string;
    id:number
}
const SoftGoodsExpandedRowRender =({allarray,id}:Props)=>{

    const [expandedKeys, setExpandedKeys] = useState<number|null>(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelApparel[]>([]);

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

    const subcolumns: TableColumnsType<BasicModelApparel> = [
        {
            title: "SKU ",
            dataIndex: "sku",
            key: "sku",
            width: 390,
            fixed: "left",
        },
    
        {
            title: "Color ",
            dataIndex: "color",
            key: "color",
            width: 390,
            fixed: "left",
        },
    

      
       
        {
            title: "Qty",
            dataIndex: "TotalQty",
            key: "TotalQty",
            width: 50,
            fixed: "right",
            render: (value, record, index) => {
              
                const qty90=record.stock_90;
                const qty88=record.stock_88;
                const qty=(qty90??0)+(qty88??0)
              if(qty ){
                    return qty;
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


export default SoftGoodsExpandedRowRender 