import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../../model/travis/TravisMethewModel"
import {useDispatch, useSelector} from "react-redux"

import {getTravisProducts} from "../../../../slice/allProducts/TravisMethewSlice"
import SampleExcelTravis from '../excel/SampleExcelTravis';
import { number } from 'yup';
import TravisImportExcel from '../excel/importExcel/TravisImportExcel';
import {ExcelModelTravis} from "../../model/travis/TravisExcel"
import TravisExcelUploadDB from "../excel/importExcel/TravisExcelUploadDB"
import * as XLSX from 'xlsx';

const TravisTable = () => {

   const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
   


   const getProduct:BasicModelTravis[]=useSelector(getTravisProducts)
     const[amount, setAmount]=useState<number>()
    console.log(" travis Product",getProduct)
    const columns: TableColumnsType<BasicModelTravis>= [
        {
          // title: "Image",
          dataIndex: "PrimaryImage",
          // fixed: "left",
          width: 25,
        //   render: (value) => (
        //     <span>
        //       <img
        //         src={master}
        //         alt="Primary Image"
        //         style={{ maxWidth: "30px", marginRight: "5px" }}
        //       />
        //     </span>
        //   ),
        },
    
        {
          title: "SKU",
          dataIndex: "SKU",
<<<<<<< Updated upstream
          width: 150,
=======
          width: 70,
>>>>>>> Stashed changes
          fixed: "left",
          // render: (value) => <span>{String(value.Name)}</span>,
        },
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "name",
          width: 70 ,
           fixed: "left",
        },
    
        
        
        {
          title: "Category",
          dataIndex: "TravisAttributes",
          key: "Description", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Category}</span>,
         
        },
        {
            title: "Season",
            dataIndex: "TravisAttributes",
            key: "Season", 
            width: 75,
            render: (value) => <span>{value && value[0] && value[0].Season}</span>,
           
          },
        {
          title: "StyleCode",
          dataIndex: "TravisAttributes",
          key: "StyleCode", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
         
        },
        {
          title: "Color",
          dataIndex: "TravisAttributes",
          key: "Color", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Color}</span>,
         
        },
        {
          title: "Size",
          dataIndex: "TravisAttributes",
          key: "Size", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Color}</span>,
         
        },
        {
          title: "Description",
          dataIndex: "Description",
          key: "Description", 
          width: 115,
         
        },

        {
          title: "MRP",
          dataIndex: "RegularPrice",
          key: "RegularPrice", 
          width: 115,
         
        },
        {
          title: "StockAvailable",
          dataIndex: "StockAvailable",
          key: "StockAvailable", 
          width: 80,
         
        },
        {
          title: "Quantity",
          dataIndex: "Quantity",
          key: "Quantity", 
          width: 50,
         
        },
        {
          title: "Amount",
          dataIndex: "Amount",
          key: "Amount", 
          width: 50,
          render: (text, record) => (
            <Input 
             type='number'
             value={amount}
              onChange={(e) => handleAmountChange(e.target.value, record)}
            />
          ),
         
        },
        
      
      ];


  const [selectedRowKeys, setSelectedRowKeys] = useState();
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: BasicModelTravis[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record: BasicModelTravis, selected: boolean, selectedRows: BasicModelTravis[]) => {
      console.log(
        "record",
        record,
        "selected",
        selected,
        "selectedRows",
        selectedRows
      );
    },
    onSelectAll: (selected: boolean, selectedRows: BasicModelTravis[], changeRows: BasicModelTravis[]) => {
      console.log(selected, selectedRows, changeRows);
    },

    columnWidth: 40,
  };


      const handleAmountChange = (value:string, record:BasicModelTravis) => {
        // Update the record with the new amount
        record.Amount = parseInt(value);
        // Update the state or dispatch an action to update the data source
    };
      // sample xls
  const[isSample, setIsSample]=useState<boolean>(false)
  const handleSampleExcel=()=>{
    setIsSample(true)
  }


  
  const handleResetIsSample=()=>{
    setIsSample(false)
  }

  // handle Excels Data
  const handleImport = () => {
    setIsImport(true);
  };
  const handleCloseImport = () => {
    setIsImport(false);
  };

  const [allXlxData, setAllXlxData]=useState<ExcelModelTravis[]>([])
const handleTravisData=(allDatat:ExcelModelTravis[])=>{
  const table = tableRef.current;
  handleCloseImport()
  console.log("all travis data", allDatat)
  setAllXlxData(allDatat)
}

//reset excel datta
const handleResetXlData=()=>{
  setAllXlxData([])
}

//exportto excel
const handleExportToExcel = () => {
  try {
    console.log("Excel importing...");
    const table = tableRef.current;
    // eslint-disable-next-line no-debugger
    debugger
    if (!table) {
      console.error("Table element not found.");
      return;
    }
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    console.log("Workbook:", wb);
     // Generate a unique name for the file using current timestamp
     const fileName = `TravisMathewProducts_${Date.now()}.xlsx`;

     XLSX.writeFile(wb, fileName);

    console.log("Excel exported successfully.");
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  }
};


return (
    <div className='cw-container'>

<Card style={{ marginTop:'80px'}}
          title="TRAVIS METHEW"
          extra={
            <div >
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <span className="gx-link">Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>   
                  <span className="gx-link">Brands</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Travis Methew</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          }
        >
<<<<<<< Updated upstream
          <div style={{ float: "right" }}>
            <Button 
            onClick={handleImport}
=======
          <div className="mb-5" style={{ float: "right" }}>
            <Button  className='mx-3'
          //  onClick={handleImport}
>>>>>>> Stashed changes
            >Import Products</Button>
            <Button  className='mx-3'
            // onClick={handleExportToPDF} 
            >Export to PDF</Button>
            <Button  className='mx-3'
           onClick={handleExportToExcel}
            >Export to Excel</Button>
            <Button className='mx-3'
             onClick={handleSampleExcel}
             >Sample Excel</Button>
          </div>

          <Table
            ref={tableRef}
            columns={columns}
            dataSource={getProduct?.map((item) => ({ ...item, key: item.id }))}
            rowSelection={rowSelection}
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}
          />
        </Card>

        <SampleExcelTravis
         isSample={isSample}
        resetIsSample={handleResetIsSample}
        />

        <TravisImportExcel
        isImport={isImport}
        onClose={handleCloseImport}
        allGoodsData={handleTravisData}
        />

       <TravisExcelUploadDB
       xlData={allXlxData}
       resetXls={handleResetXlData}
       />

    </div>
  )
}

export default TravisTable