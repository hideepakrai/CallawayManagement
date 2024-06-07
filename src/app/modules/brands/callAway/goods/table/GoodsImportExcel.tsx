import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import * as XLSX from "xlsx";
import { ExcelModelTravis } from "../../../../model/travis/TravisExcel"
import type { UploadChangeParam } from "antd/lib/upload";
import { BasicModelTravis } from "../../../../model/travis/TravisMethewModel";
import type { ColumnProps } from 'antd/lib/table';
import { BasicModelGoods } from "../../../../model/goods/CallawayGoodsModel";
// import SampleExcelTravis from "../SampleExcelTravis";

const { Dragger } = Upload;

type Props = {
  onClose: () => void;
  isImport: boolean;
  allGoodsData: (allData: ExcelModelTravis[]) => void
}

const props: UploadProps = {
  name: 'file',
  multiple: false,

};
const GoodsImportExcel = ({ onClose, isImport, allGoodsData }: Props) => {
  const [allXlxData, setAllXlxData] = useState<ExcelModelTravis[]>([])
  const [loading, setLoading] = useState<boolean>(false);


  // handle input xls
  const handleInput = (info: UploadChangeParam) => {

    const file = info.file.originFileObj;
    if (!file || file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      message.error('You can only upload Excel files!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result as string;


      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json<ExcelModelTravis>(worksheet) as ExcelModelTravis[];
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

    allGoodsData(allXlxData)
    // onClose();
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    onClose();
  };

  const columns: ColumnProps<BasicModelGoods>[] = [
    {
      title: 'brand',
      dataIndex: 'brand',
      key: 'brand',
      width: 150,
    },
    {
      title: 'sku',
      dataIndex: 'sku',
      key: 'sku',
      width: 150,
    },
    
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      width: 115,
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      width: 115,
    },
    {
      title: 'product_type',
      dataIndex: 'product_type',
      key: 'product_type',
      width: 115,
    },
    {
      title: 'product_model',
      dataIndex: 'product_model',
      key: 'product_model',
      width: 115,
    },
    {
      title: 'life_cycle',
      dataIndex: 'life_cycle',
      key: 'life_cycle',
      width: 115,
    },
    {
      title: 'orientation',
      dataIndex: 'orientation',
      key: 'orientation',
      width: 115,
    },
   

   
    {
      title: 'stock_90',
      dataIndex: 'stock_90',
      key: 'stock_90',
      width: 80,
    },
    {
      title: 'mrp',
      dataIndex: 'mrp',
      key: 'mrp',
      width: 80,
    },
    {
      title: 'gst',
      dataIndex: 'gst',
      key: 'gst',
      width: 80,
    },
    // {
    //   title: 'variation_sku',
    //   dataIndex: 'variation_sku',
    //   key: 'variation_sku',
    //   width: 80,
    // },
  ];


  const excelData: BasicModelGoods[] = [
    {

      brand: "Callaway SoftGoods",
      sku: 'TM001',
     
      category: 'SOFT GOODS',
      
     product_model:"CG M595-364 CHV ACE",
     product_type:"FOOTWEAR",
     life_cycle:"In line",
     orientation:"NA",

      description: 'This is a cool belt from Travis Mathew.',
      mrp: 50,

      
      stock_90: 100,
      gst: 12,

    },
    {

      brand: "Callaway SoftGoods",
      sku: 'TM001',
     
      category: 'SOFT GOODS',
      
     product_model:"CG M595-364 CHV ACE",
     product_type:"FOOTWEAR",
     life_cycle:"In line",
     orientation:"NA",

      description: 'This is a cool belt from Travis Mathew.',
      mrp: 50,

      

      stock_90: 100,
      gst: 12,
    },
    {

      brand: "Callaway SoftGoods",
      sku: 'TM001',
     
      category: 'SOFT GOODS',
      
     product_model:"CG M595-364 CHV ACE",
     product_type:"FOOTWEAR",
     life_cycle:"In line",
     orientation:"NA",

      description: 'This is a cool belt from Travis Mathew.',
      mrp: 50,
      

      stock_90: 100,
      gst: 12,
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
        td.innerText = String(rowData[column.dataIndex as keyof BasicModelGoods]);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    hiddenTable.appendChild(tbody);

    // Append the hidden table to the body
    document.body.appendChild(hiddenTable);

    // Generate and download the Excel file
    XLSX.writeFile(wb, "HardGoodsSample.xlsx");

    // Clean up: remove the hidden table
    document.body.removeChild(hiddenTable);

    // Reset the sample state

  };
  return (
    <div>
      <Modal
        // title="Basic Modal"
        open={isImport}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Import Products</h3>
        <Dragger
          multiple={false}
          onChange={(info) => handleInput(info)}
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
        <div className="mt-5 downlaod-excel "
        onClick={handleExportToExcel}

        >
          <h4 >Click to  Download Sample Excel <span className="py-1 px-2"><i className="bi bi-download fs-3" onClick={handleExportToExcel} ></i> </span></h4>
        </div>
      </Modal>


      {/* <SampleExcelTravis
        isSample={isSample}
        resetIsSample={handleResetIsSample}
      /> */}

    </div>


  )
}


export default GoodsImportExcel