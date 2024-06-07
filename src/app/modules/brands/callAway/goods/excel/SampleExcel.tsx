
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import * as XLSX from "xlsx";
import {ExcelModelGoods} from "../../../../model/goods/CallawayGoodsExcel"
import { Space, Table, Tag } from 'antd';
import type { ColumnProps } from 'antd/lib/table';
type Props={
    isSample: boolean;
    resetIsSample:()=>void

}

const SampleExcel = ({isSample,resetIsSample}:Props) => {
    const tableRef = useRef(null);

    const columns: ColumnProps<ExcelModelGoods>[]=[
       
        {
          title: "Brand",
          dataIndex: "Brand",
          width: 80,
          fixed: "left",
          // render: (value) => <span>{String(value.Name)}</span>,
        },
        {
          title: "SKU",
          dataIndex: "SKU",
          width: 80,
          fixed: "left",
          // render: (value) => <span>{String(value.Name)}</span>,
        },
        {
          title: "ProductType",
          dataIndex: "ProductType",
          key: "ProductType",
            width: 115,
        },

        //category
        
        {
          title: "Category",
          dataIndex: "Category",
          key: "Category",
            width: 115,
        },
        {
          title: "ProductModel",
          dataIndex: "ProductModel",
          key: "ProductModel",
            width: 115,
        },
        {
          title: "LifeCycle",
          dataIndex: "LifeCycle",
          key: "LifeCycle",
            width: 115,
        },
        {
          title: "Orientation",
          dataIndex: "Orientation",
          key: "Orientation",
            width: 115,
        },
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "Name",
          width: 115,
          //  fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "Description",
          key: "Description",
          width: 115,
          //  fixed: "left",
        },
        {
            title: "SetType",
            dataIndex: "SetType",
            key: "SetType",
            width: 115,
            //  fixed: "left",
          },
        {
            title: "StockAvailable",
            dataIndex: "StockAvailable",
            key: "StockAvailable",
            width: 115,
            //  fixed: "left",
          },
    
        {
            title: "MRP",
            dataIndex: "MRP",
            key: "MRP",
            width: 115,
            //  fixed: "left",
          }, 
       
        {
          title: "MRP",
          dataIndex: "MRP",
          key: "MRP",
            width: 115,
        },
        {
          title: "StockManagement",
          dataIndex: "StockManagement",
          key: "StockManagement",
            width: 115,
        },
        {
          title: "StockStatus",
          dataIndex: "StockStatus",
          key: "StockStatus",
            width: 115,
        },
        
      ]
  const excelData:ExcelModelGoods[]=[
  
  ]

        useEffect(()=>{
          if(isSample){
            handleExportToExcel()
          }
        },[isSample])

        const handleExportToExcel = () => {
          const headerTitles = columns.map(col => col.title) as string[];
          const ws = XLSX.utils.json_to_sheet(excelData, { header: headerTitles });
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        
          const hiddenTable = document.createElement("table");
          hiddenTable.style.visibility = "hidden";
        
          // Add the table headers
          const thead = document.createElement("thead");
          const trHead = document.createElement("tr");
          columns.forEach((column) => {
            const th = document.createElement("th");
            th.innerText = column.title?.toString() || "";
            trHead.appendChild(th);
          });
          thead.appendChild(trHead);
          hiddenTable.appendChild(thead);
        
          // Add the table body (rows)
          const tbody = document.createElement("tbody");
          excelData.forEach((rowData) => {
            const tr = document.createElement("tr");
            columns.forEach((column) => {
              const td = document.createElement("td");
              td.innerText = String(rowData[column.dataIndex as keyof ExcelModelGoods]) ;
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          hiddenTable.appendChild(tbody);
        
          // Append the hidden table to the body
          document.body.appendChild(hiddenTable);
        
          // Generate and download the Excel file
          XLSX.writeFile(wb, "CallawayGoodsSample.xlsx");
        
          // Clean up: remove the hidden table
          document.body.removeChild(hiddenTable);
        
          // Reset the sample state
          resetIsSample();
        };
        
        
  return (
    <div>SampleExcel</div>
  )
}

export default SampleExcel