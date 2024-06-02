import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Select, Tooltip, InputNumber } from "antd";
import { Input, Radio, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import { BasicModelTravis } from '../../model/travis/TravisMethewModel';
import { OgioBasicModel } from '../../model/ogio/OgioBrandModel';

type Props={
    allarray:string;
    id:number
}
const OgioExpandedRowRender =({allarray,id}:Props)=>{

    const [expandedKeys, setExpandedKeys] = useState<number|null>(null);
    const [expandedRowKeys, setExpandedRowKeys] = useState<OgioBasicModel[]>([]);

    useEffect(()=>{
        setExpandedKeys(null)
        setExpandedRowKeys([])
        if(allarray!==""){
            const allarrays = JSON.parse(allarray);  
            setExpandedRowKeys(allarrays);
            setExpandedKeys(id)  
        }
    },[allarray])

    const subcolumns: TableColumnsType<OgioBasicModel> = [
        {
            title: "SKU ",
            dataIndex: "sku",
            key: "sku",
            width: 390,
            fixed: "left",
        },
      {  title: "ProductType",
        dataIndex: "product_type",
        key: "product_type",
        width: 150,},

      
       
        {
            title: "Qty",
            dataIndex: "TotalQty",
            key: "TotalQty",
            width: 50,
            fixed: "right",
            render: (value, record, index) => {
              
                const qty90=record.stock_90;
              if(qty90 ){
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
            title: "Amount",

            dataIndex: "total_value",
            key: "Amount",
            width: 100,
            fixed: "right",
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


export default OgioExpandedRowRender 