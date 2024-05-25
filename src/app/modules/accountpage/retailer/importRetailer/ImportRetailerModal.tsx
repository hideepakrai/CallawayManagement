import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import * as XLSX from "xlsx";
import {RetailerExcelModal}from "../../../model/AccountType/retailer/RetailerExcelModal"
import type { UploadChangeParam } from "antd/lib/upload";

const { Dragger } = Upload;

type Props={
    onClose: () =>void;
    isRetailer:boolean;
    
}

const props: UploadProps = {
    name: 'file',
    multiple: false,
    
  };
const TravisImportExcel = ({isRetailer,onClose}:Props) => {
    const [allXlxData, setAllXlxData]=useState<RetailerExcelModal[]>([])
    const [loading, setLoading] = useState<boolean>(false);


     // handle input xls
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
       const jsonData = XLSX.utils.sheet_to_json<RetailerExcelModal>(worksheet) as RetailerExcelModal[];
    // console.log("json ", data)
      // Use the extracted JSON data here
      //console.log(jsonData);
    //   setAllXlxData(jsonData)
    //   setLoading(false);
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
//     console.log("ok")
//    allGoodsData(allXlxData)
   onClose();
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
     onClose();
  };
  return (
    <div>
         <Modal
        // title="Basic Modal"
        open={isRetailer}
        onOk={handleOk}
       onCancel={handleCancel}
      >
        <h3>Import Products </h3>
        <Dragger 
         multiple={false}
        onChange={(info)=>handleInput(info)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
   

      </Modal>
    </div>
  )
}

export default TravisImportExcel