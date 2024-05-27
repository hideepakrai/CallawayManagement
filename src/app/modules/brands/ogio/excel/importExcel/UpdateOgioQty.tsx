import React, { useState } from 'react'
import * as XLSX from "xlsx";
import type { UploadChangeParam } from "antd/lib/upload";
import type { UploadProps } from 'antd';
import { message, Modal, Upload } from 'antd';
import { OgioBasicModel } from '../../../../model/ogio/OgioBrandModel';
import type { ColumnProps } from 'antd/lib/table';
import Dragger from 'antd/es/upload/Dragger';


type Props={
    onClose: () =>void;
    isUpdate:boolean;
    allOgioData:(allData:OgioBasicModel[])=>void
}
const UpdateOgioQty = ({isUpdate,allOgioData,onClose}:Props) => {
    const [allXlxData, setAllXlxData]=useState<OgioBasicModel[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const handleInput=(info:UploadChangeParam)=>{

        const file = info.file.originFileObj;
        if (!file||file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          message.error('You can only upload Excel files!');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result as string;
         
           
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json<OgioBasicModel>(worksheet) as OgioBasicModel[];
        console.log("json ", data)
          // Use the extracted JSON data here
          //console.log(jsonData);
          setAllXlxData(jsonData)
          setLoading(false);
        };
        reader.onerror = () => {
            message.error("File reading failed!");
            setLoading(false);
          };
        reader.readAsBinaryString(file);
       // 
      }
    
      const handleOk = () => {
        //setIsModalOpen(false);
        console.log("ok")
       allOgioData(allXlxData)
       // onClose();
      };
      const handleCancel = () => {
        // setIsModalOpen(false);
        onClose();
      };
    
      const columns: ColumnProps<OgioBasicModel>[] = [
        {
          title: 'brand',
          dataIndex: 'brand',
          key: 'Brand',
          width: 150,
        },
        {
          title: 'sku',
          dataIndex: 'sku',
          key: 'sku',
          width: 150,
        },
      
 
        {
          title: 'stock_90',
          dataIndex: 'stock_90',
          key: 'stock_90',
          width: 80,
        },
 
        
      ];
      
      const excelData: OgioBasicModel[] = [
        {
          brand: "Ogio",
          sku: 'TM001',
          stock_90:100,
        },
        {
          brand: "Ogio",
          sku: 'TM002',
          stock_90:100,
        
        },
        {
          brand: "Ogio",
          sku: 'TM003',
          stock_90:100,
        },
        
      ];
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
            td.innerText = String(rowData[column.dataIndex as keyof OgioBasicModel]) ;
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        hiddenTable.appendChild(tbody);
      
        // Append the hidden table to the body
        document.body.appendChild(hiddenTable);
      
        // Generate and download the Excel file
        XLSX.writeFile(wb, "OgioQtySample.xlsx");
      
        // Clean up: remove the hidden table
        document.body.removeChild(hiddenTable);
      
        // Reset the sample state
        
      };
  return (
    <div>
    <Modal
   // title="Basic Modal"
   open={isUpdate}
   onOk={handleOk}
  onCancel={handleCancel}
 >
   <h3>Import Products</h3>
   <Dragger 
    multiple={false}
   onChange={(info)=>handleInput(info)}
   >
     <p className="ant-upload-drag-icon">
       {/* <InboxOutlined /> */}
     </p>
     <p className="ant-upload-text">
       Click or drag file to this area to upload
     </p>
     <p className="ant-upload-hint">
       Support for a single or bulk upload. Strictly prohibited from
       uploading company data or other banned files.
     </p>
   </Dragger>
   <div className="mt-5 downlaod-excel "
   onClick={handleExportToExcel}
   >
     <h4>Click to  Download Ogio Qantity Sample Excel <span className="py-1 px-2"><i className="bi bi-download fs-3"></i> </span></h4>
   </div>
 </Modal>
</div>
  )
}

export default UpdateOgioQty