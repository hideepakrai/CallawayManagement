
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import * as XLSX from "xlsx";
import {RetailerExcelModal} from "../../../model/AccountType/retailer/RetailerExcelModal"
import { Space, Table, Tag } from 'antd';
import type { ColumnProps } from 'antd/lib/table';
type Props={
    isSample: boolean;
    resetIsSample:()=>void

}

const SampleRetailerExcel = ({isSample,resetIsSample}:Props) => {
    const tableRef = useRef(null);

   
    const columns: ColumnProps<RetailerExcelModal>[] = [
        {
          title: 'Name',
          dataIndex: 'Name',
          key: 'Name',
          width: 150,
        },
        {
          title: 'Address',
          dataIndex: 'Address',
          key: 'Address',
          width: 150,
        },
        {
          title: 'Phone',
          dataIndex: 'Phone',
          key: 'Phone',
          width: 70,
        },
        {
          title: 'Phone2',
          dataIndex: 'Phone2',
          key: 'Phone2',
          width: 115,
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'Email',
          width: 115,
        },
        {
          title: 'Location',
          dataIndex: 'Location',
          key: 'Location',
          width: 115,
        },
        {
          title: 'Website',
          dataIndex: 'Website',
          key: 'Website',
          width: 115,
        },
        {
          title: 'GST',
          dataIndex: 'GST',
          key: 'GST',
          width: 115,
        },
      
      ];
      
      const excelData: RetailerExcelModal[] = [
        {
            Name: "Ramesh Shrivastav",
            Address: "E 123 Main Street, GuruGram, Haryana, pin code-234567",   
            Phone:"1234567890",
            Phone2: "9876543210",
            Email: "ramesh@gmail.com",
            Location: "Gurugram",
            Website:"rameshGolf.com" ,
            GST: "GHYT768965",
          
        },
        {
            Name: "Mohan Shrivastav",
            Address: "E 123 Main Street, GuruGram, Haryana, pin code-234567",   
            Phone:"1234567890",
            Phone2: "9876543210",
            Email: "ramesh@gmail.com",
            Location: "Gurugram",
            Website:"rameshGolf.com" ,
            GST: "GHYT768965",
          
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
              td.innerText = String(rowData[column.dataIndex as keyof RetailerExcelModal]) ;
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          hiddenTable.appendChild(tbody);
        
          // Append the hidden table to the body
          document.body.appendChild(hiddenTable);
        
          // Generate and download the Excel file
          XLSX.writeFile(wb, "RetailerSample.xlsx");
        
          // Clean up: remove the hidden table
          document.body.removeChild(hiddenTable);
        
          // Reset the sample state
          resetIsSample();
        };
        
        
  return (
    <div></div>
  )
}

export default SampleRetailerExcel