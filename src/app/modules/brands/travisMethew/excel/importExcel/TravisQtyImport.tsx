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
import SampleExcelTravis from "../SampleExcelTravis";
import { Badge,  Tooltip } from 'antd';
const { Dragger } = Upload;
import "./TravisQtyImport.css"

type Props = {
  onClose: () => void;
  isQtyImport: boolean;
  travisQtyData: (allData: ExcelModelTravis[]) => void
}

const props: UploadProps = {
  name: 'file',
  multiple: false,

};
const TravisQtyImport = ({ onClose, isQtyImport, travisQtyData }: Props) => {
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

    travisQtyData(allXlxData)
    setAllXlxData([]);
    // onClose();
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    onClose();
  };

  const columns: ColumnProps<BasicModelTravis>[] = [
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
      title: 'stock_88',
      dataIndex: 'stock_88',
      key: 'stock_88',
      width: 80,
    },
    {
      title: 'stock_90',
      dataIndex: 'stock_90',
      key: 'stock_90',
      width: 80,
    },

  ];
  const excelData: BasicModelTravis[] = [
    {
      brand: "Travismathew",
      sku: 'TM001',
      stock_88: 100,
      stock_90: 100,


    },
    {
      brand: "Travismathew",
      sku: 'TM002',
      stock_88: 100,
      stock_90: 100,
    },
    {
      brand: "Travismathew",
      sku: 'TM003',
      stock_88: 100,
      stock_90: 100,
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
        td.innerText = String(rowData[column.dataIndex as keyof BasicModelTravis]);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    hiddenTable.appendChild(tbody);

    // Append the hidden table to the body
    document.body.appendChild(hiddenTable);

    // Generate and download the Excel file
    XLSX.writeFile(wb, "TravisQtyUpdateSample.xlsx");

    // Clean up: remove the hidden table
    document.body.removeChild(hiddenTable);

    // Reset the sample state

  };
  return (
    <div>
      <Modal className="updateqty-model"
        // title="Basic Modal"
        open={isQtyImport}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3 className="mb-3">Update Qty</h3>
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
        <div className="mt-6 downlaod-excel mb-8"
          
        >
          <h4 className="fs-5"> Click to Download Travis Mathew Stock Update Sample Excel  <Tooltip  className="py-1 px-2 mx-1" title={"Downlaod"} > <i className="bi bi-download fs-3" onClick={handleExportToExcel}></i></Tooltip> </h4>
        </div>
      </Modal>


      {/* <SampleExcelTravis
        isSample={isSample}
        resetIsSample={handleResetIsSample}
      /> */}

    </div>


  )
}


export default TravisQtyImport