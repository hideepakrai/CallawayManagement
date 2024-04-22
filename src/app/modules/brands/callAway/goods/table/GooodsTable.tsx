import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelGoods} from "../../../model/goods/CallawayGoodsModel"
import {useDispatch, useSelector} from "react-redux"

import {selectCallawayGoods} from "../../../../../slice/allProducts/CallAwayGoodsSlice"
import SampleExcel from '../excel/SampleExcel';
import { number } from 'yup';
import ImportExcel from '../excel/importExcel/ImportExcel';
import {ExcelModelGoods} from "../../../model/goods/CallawayGoodsExcel"
import ExcelUploadDB from "../excel/importExcel/ExcelUploadDB"
import * as XLSX from 'xlsx';

const GooodsTable = () => {

    const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
    


    const callawayGooodsProduct:BasicModelGoods[]=useSelector(selectCallawayGoods)
     const[amount, setAmount]=useState<number>()
    console.log("callawayGooodsProduct",callawayGooodsProduct)
    const columns: TableColumnsType<BasicModelGoods>= [
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
          width: 50,
          fixed: "left",
          // render: (value) => <span>{String(value.Name)}</span>,
        },
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "name",
          width: 50 ,
           fixed: "left",
        },
    
        
        //product Type
        {
          title: "ProductType",
          dataIndex: "GoodsAttributes",
          key: "GoodsAttributes", 
          width: 70,
          render: (value) => <span>{value && value[0] && value[0].ProductType}</span>,
         
        },
        // product model
        {
          title: "ProductModel",
          dataIndex: "GoodsAttributes",
          key: "ProductModel", 
          width: 70,
          render: (value) => <span>{value && value[0] && value[0].ProductModel}</span>,
         
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
    onChange: (selectedRowKeys: React.Key[], selectedRows: BasicModelGoods[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    onSelect: (record: BasicModelGoods, selected: boolean, selectedRows: BasicModelGoods[]) => {
      console.log(
        "record",
        record,
        "selected",
        selected,
        "selectedRows",
        selectedRows
      );
    },
    onSelectAll: (selected: boolean, selectedRows: BasicModelGoods[], changeRows: BasicModelGoods[]) => {
      console.log(selected, selectedRows, changeRows);
    },

    columnWidth: 40,
  };


      const handleAmountChange = (value:string, record:BasicModelGoods) => {
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

  const [allXlxData, setAllXlxData]=useState<ExcelModelGoods[]>([])
const handleGoodsData=(allDatat:ExcelModelGoods[])=>{
  handleCloseImport()
  console.log("allDatat", allDatat)
  setAllXlxData(allDatat)
}

// reset excel datta
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
    XLSX.writeFile(wb, "Callaway_Goods.xlsx");
    console.log("Excel exported successfully.");
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  }
};


return (
    <div>

<Card style={{ marginTop:'80px'}}
          title="CALLAWAY"
          extra={
            <div >
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <span className="gx-link">Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>   
                  <span className="gx-link">Brands</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Callaway Goods</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          }
        >
          <div style={{ float: "right" }}>
            <Button 
            onClick={handleImport}
            >Import Products</Button>
            <Button 
            // onClick={handleExportToPDF} 
            >Export to PDF</Button>
            <Button 
           onClick={handleExportToExcel}
            >Export to Excel</Button>
            <Button
             onClick={handleSampleExcel}
             >Sample Excel</Button>
          </div>

          <Table
            ref={tableRef}
            columns={columns}
            dataSource={callawayGooodsProduct?.map((item) => ({ ...item, key: item.id }))}
            rowSelection={rowSelection}
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}
          />
        </Card>

        <SampleExcel
         isSample={isSample}
        resetIsSample={handleResetIsSample}
        />

        <ImportExcel
        isImport={isImport}
        onClose={handleCloseImport}
        allGoodsData={handleGoodsData}
        />

       <ExcelUploadDB
       xlData={allXlxData}
       resetXls={handleResetXlData}
       />

    </div>
  )
}

export default GooodsTable