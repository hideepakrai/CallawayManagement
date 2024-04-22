
import React, { useState, useRef } from "react";
import { useEffect } from "react";
import * as XLSX from "xlsx";
import {OgioExcelModel} from "../../model/ogio/OgioExcelModel"
import { Space, Table, Tag } from 'antd';
import type { ColumnProps } from 'antd/lib/table';
type Props={
    isSample: boolean;
    resetIsSample:()=>void

}

const SampleOgioExcel = ({isSample,resetIsSample}:Props) => {
    const tableRef = useRef(null);

   
    const columns: ColumnProps<OgioExcelModel>[] = [
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
            title: 'ProductType',
            dataIndex: 'ProductType',
            key: 'ProductType',
            width: 115,
          },
          {
            title: 'ProductModel',
            dataIndex: 'ProductModel',
            key: 'ProductModel',
            width: 115,
          },
        {
          title: 'Category',
          dataIndex: 'Category',
          key: 'Category',
          width: 115,
        },
        
        {
          title: 'LifeCycle',
          dataIndex: 'LifeCycle',
          key: 'LifeCycle',
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
          title: 'Description',
          dataIndex: 'Description',
          key: 'Description',
          width: 115,
        },
        {
          title: 'MRP',
          dataIndex: 'RegularPrice',
          key: 'RegularPrice',
          width: 115,
        },
        {
          title: 'StockAvailable',
          dataIndex: 'StockAvailable',
          key: 'StockAvailable',
          width: 80,
        },
        {
          title: 'SalePrice',
          dataIndex: 'SalePrice',
          key: 'SalePrice',
          width: 80,
        },
      ];
      
      const excelData: OgioExcelModel[] = [
        {
          Brand: 3,
          SKU: 'TM001',
          Name: 'Cool Belt',
          SetType: 'OgioExcelModel',
          ProductType:"Product Type 1",
          Category: 'Belts',
          ProductModel:"product model 1",
          Description: 'This is a cool belt from Travis Mathew.',
          RegularPrice: 50,
          SalePrice: 40,
          StockAvailable: 100,
          
        },
        {
            Brand: 3,
          SKU: 'TM001',
          Name: 'Cool Belt',
          SetType: 'OgioExcelModel',
          ProductType:"Product Type 1",
          Category: 'Belts',
          ProductModel:"product model 1",
          Description: 'This is a cool belt from Travis Mathew.',
          RegularPrice: 50,
          SalePrice: 40,
          StockAvailable: 100,
        },
        { Brand:3,
            SKU: 'TM001',
            Name: 'Cool Belt',
            SetType: 'OgioExcelModel',
            ProductType:"Product Type 1",
            Category: 'Belts',
            ProductModel:"product model 1",
            Description: 'This is a cool belt from Travis Mathew.',
            RegularPrice: 50,
            SalePrice: 40,
            StockAvailable: 100,
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
              td.innerText = String(rowData[column.dataIndex as keyof OgioExcelModel]) ;
              tr.appendChild(td);
            });
            tbody.appendChild(tr);
          });
          hiddenTable.appendChild(tbody);
        
          // Append the hidden table to the body
          document.body.appendChild(hiddenTable);
        
          // Generate and download the Excel file
          XLSX.writeFile(wb, "OgioSample.xlsx");
        
          // Clean up: remove the hidden table
          document.body.removeChild(hiddenTable);
        
          // Reset the sample state
          resetIsSample();
        };
        
        
  return (
    <div></div>
  )
}

export default SampleOgioExcel