import OgioSlice from "../../../../../slice/allProducts/OgioSlice"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector  } from "react-redux"
//import {getOgioProducts}  from "../../../../../slice/allProducts/OgioSlice"
import {getApparelProducts}  from "../../../../../slice/allProducts/CallawayApparelSlice"

import { useNavigate } from 'react-router-dom'
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { BasicModelApparel } from "../../../../model/apparel/CallawayApparelModel"
import * as XLSX from 'xlsx';
import { constants } from "buffer"
import exports from "webpack"


type Props = {
    resetExportAll: () => void;

}

const exportApparelProductsToExcel = ({ resetExportAll }: Props)  => {

 // eslint-disable-next-line react-hooks/rules-of-hooks
 const alldata = useSelector(getApparelProducts) as BasicModelApparel[];
console.log("all data", alldata);

// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(() => {
   if(alldata && alldata.length > 0){
    handleExportToExcel(alldata)
    
   }
  }, [alldata]);

  const handleExportToExcel = (selectedRow: BasicModelApparel[]) => {
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
//"style_code": row.style_code,
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
      anchor.download = `CallawaySogtgoodsProducts_${Date.now()}.xlsx`;
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

export default exportApparelProductsToExcel;
    