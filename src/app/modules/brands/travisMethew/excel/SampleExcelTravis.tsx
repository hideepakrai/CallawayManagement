
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import * as XLSX from "xlsx";
import {ExcelModelTravis} from "../../../model/travis/TravisExcel"
import { Space, Table, Tag } from 'antd';
import type { ColumnProps } from 'antd/lib/table';
type Props={
    isSample: boolean;
    resetIsSample:()=>void

}

const SampleTravisExcel = ({isSample,resetIsSample}:Props) => {
    const tableRef = useRef(null);

   
    const columns: ColumnProps<ExcelModelTravis>[] = [
        {
          title: 'Brand',
          dataIndex: 'Brand',
          key: 'Brand',
          width: 150,
        },
        {
          title: 'SKU',
          dataIndex: 'SKU',
          key: 'SKU',
          width: 150,
        },
        {
          title: 'Name',
          dataIndex: 'Name',
          key: 'Name',
          width: 70,
        },
        {
          title: 'Description',
          dataIndex: 'Description',
          key: 'Description',
          width: 115,
        },
        {
          title: 'Category',
          dataIndex: 'Category',
          key: 'Category',
          width: 115,
        },
        {
          title: 'Season',
          dataIndex: 'Season',
          key: 'Season',
          width: 115,
        },
        {
          title: 'StyleCode',
          dataIndex: 'StyleCode',
          key: 'StyleCode',
          width: 115,
        },
        {
          title: 'Length',
          dataIndex: 'Length',
          key: 'Length',
          width: 115,
        },
        {
          title: 'Line',
          dataIndex: 'Line',
          key: 'Line',
          width: 115,
        },
        {
          title: 'Color',
          dataIndex: 'Color',
          key: 'Color',
          width: 115,
        },
        {
          title: 'ColorCode',
          dataIndex: 'ColorCode',
          key: 'ColorCode',
          width: 115,
        },
        {
          title: 'Size',
          dataIndex: 'Size',
          key: 'Size',
          width: 115,
        },
        {
          title: 'Gender',
          dataIndex: 'Gender',
          key: 'Gender',
          width: 115,
        },
        {
          title: 'SetType',
          dataIndex: 'SetType',
          key: 'SetType',
          width: 115,
        },
        
        
        {
          title: 'Stock88',
          dataIndex: 'Stock88',
          key: 'Stock88',
          width: 80,
        },
        {
          title: 'Stock90',
          dataIndex: 'Stock90',
          key: 'Stock90',
          width: 80,
        },
        {
          title: 'MRP',
          dataIndex: 'MRP',
          key: 'MRP',
          width: 80,
        },
        {
          title: 'GST',
          dataIndex: 'GST',
          key: 'GST',
          width: 80,
        },
      ];
      
      const excelData: ExcelModelTravis[] = [
        {
          Brand: 4,
          SKU: 'TM001',
          Name: 'Cool Belt',
          Category: 'Belts',
          Season: 'SS22',
          StyleCode: '4MT044',
          Length: 'NA',
          Line: 'In_Line',
          Gender:"Mens",
          Color: 'Heather_Purple_Velvet',
          ColorCode: '5HPR',
          Size: 'M',
          SetType: 'Travis Methew',
          Description: 'This is a cool belt from Travis Mathew.',
          MRP: 50,
       
          Stock88: 100,
          Stock90: 100,
          
        },
        {
            Brand: 4,
          SKU: 'TM002',
          Name: 'Stylish Cap',
          Category: 'Headwear',
          Season: 'SS22',
          StyleCode: '4MT045',
          Length: 'NA',
          Line: 'In_Line',
          Color: 'Black',
          ColorCode: 'BLK',
          Size: 'L',
          SetType: 'Travis Methew',
          Description: 'A stylish cap from Travis Mathew.',
          MRP: 30,
        
         
          Gender:"Mens",
          Stock88: 100,
          Stock90: 100,
        },
        {
            Brand: 4,
          SKU: 'TM003',
          Name: 'Classic Polo',
          Category: 'Tops',
          Season: 'SS22',
          StyleCode: '4MT046',
          Length: 'NA',
          Line: 'In_Line',
          Color: 'Navy Blue',
          ColorCode: 'NVBL',
          Size: 'XL',
          SetType: 'Travis Methew',
          Description: 'A classic polo shirt from Travis Mathew.',
          MRP: 70,
          
        
          Gender:"Mens",
          Stock88: 100,
          Stock90: 100,
        },
      ];
      

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
              td.innerText = String(rowData[column.dataIndex as keyof ExcelModelTravis]) ;
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          hiddenTable.appendChild(tbody);
        
          // Append the hidden table to the body
          document.body.appendChild(hiddenTable);
        
          // Generate and download the Excel file
          XLSX.writeFile(wb, "TravisSample.xlsx");
        
          // Clean up: remove the hidden table
          document.body.removeChild(hiddenTable);
        
          // Reset the sample state
          resetIsSample();
        };
        
        
  return (
    <div></div>
  )
}

export default SampleTravisExcel