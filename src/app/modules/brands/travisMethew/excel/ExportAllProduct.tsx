/* eslint-disable react-hooks/rules-of-hooks */
import TravisMethewSlice from "../../../../slice/allProducts/TravisMethewSlice"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector  } from "react-redux"
import { getTravisProducts } from "../../../../slice/allProducts/TravisMethewSlice"
import { useNavigate } from 'react-router-dom'
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { BasicModelTravis } from "../../../model/travis/TravisMethewModel";
import * as XLSX from 'xlsx';
import { constants } from "buffer"


type Props = {
    resetExportAll: () => void;

}

const exportTravisProductsToExcel = ({ resetExportAll }: Props)  => {

    //getTravisProducts
    const alldata = useSelector(getTravisProducts) as BasicModelTravis[];
console.log("all data", alldata);

useEffect(() => {
   // getTravisProductsData();
   if(alldata && alldata.length > 0){
    handleExportToExcel(alldata)
    

   }
  }, [alldata]);
    
  const handleExportToExcel = (selectedRow: BasicModelTravis[]) => {
    try {
      if (!selectedRow) {
        console.error("No row selected.");
        return;
      }
    
      const worksheetData = selectedRow.map(row => ({
        "sku": row.sku,
        "description": row.description,
        "category": row.category,
        "season": row.season,
        "style_code": row.style_code,
        "color": row.color,
        "size": row.size,
        "stock_90": row.stock_90,
        "stock_88": row.stock_88,
        "gst": row.gst,
        "mrp": row.mrp,
        // Add more columns as needed
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Generate a binary string representation of the workbook
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      // Create a Blob object from the binary string
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

      // Create a temporary anchor element to download the Blob
      const anchor = document.createElement('a');
      const url = URL.createObjectURL(blob);

      anchor.href = url;
      anchor.download = `TravisMathewProducts_${Date.now()}.xlsx`;
      anchor.click();

      // Release the object URL
      URL.revokeObjectURL(url);

      resetExportAll();

    } catch (error) {
      console.error("Error exporting to Excel:", error);
      resetExportAll();

    }
  };

    return (
        <>
       
        </>
        
    )

}
  
export default exportTravisProductsToExcel;


