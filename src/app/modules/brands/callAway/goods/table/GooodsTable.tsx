import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelGoods} from "../../../../model/goods/CallawayGoodsModel"
import {useDispatch, useSelector} from "react-redux"
import "./GooodsTable.css"
import {selectCallawayGoods} from "../../../../../slice/allProducts/CallAwayGoodsSlice"
import SampleExcel from '../excel/SampleExcel';
import { number } from 'yup';
import ImportExcel from '../excel/importExcel/ImportExcel';
import {ExcelModelGoods} from "../../../../model/goods/CallawayGoodsExcel"
import ExcelUploadDB from "../excel/importExcel/ExcelUploadDB"

import * as XLSX from 'xlsx';
 import {updateGoodsQuantity90,updateGoodsQuantity88} from "../../../../../slice/allProducts/CallAwayGoodsSlice";
 import {addGoodsOrder} from ".././../../../../slice/orderSlice/CartOrder"
const GooodsTable = () => {

    const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
     const dispatch= useDispatch()


    const callawayGooodsProduct:BasicModelGoods[]=useSelector(selectCallawayGoods)
     const[amount, setAmount]=useState<number>()
    console.log("callawayGooodsProduct",callawayGooodsProduct)
    const columns: TableColumnsType<BasicModelGoods>= [
        {
          title: "Image",
          dataIndex: "PrimaryImage",
           fixed: "left",
          width:70,
          render: (value) => {
            console.log("image: " + value?.data?.attributes?.formats?.thumbnail?.url)
           return  (
            
            <span>
              <img
                 src={`https://aigigs.in${value?.data?.attributes?.formats?.thumbnail?.url}`}
                
                alt="Primary Image"
                style={{ maxWidth: "30px", marginRight: "5px" }}
              />
            </span>
          )}
        },
    
        {
          title: "SKU",
          dataIndex: "SKU",
          width: 80,
          fixed: "left",
          // render: (value) => <span>{String(value.Name)}</span>,
        },
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "name",
          width: 100 ,
           fixed: "left",
        },
    
        
        //product Type
        {
          title: "ProductType",
          dataIndex: "GoodsAttributes",
          key: "GoodsAttributes", 
          width: 110,
          render: (value) => <span>{value && value[0] && value[0].ProductType}</span>,
         
        },
        // product model
        {
          title: "ProductModel",
          dataIndex: "GoodsAttributes",
          key: "ProductModel", 
          width: 115,
          render: (value) => <span>{value && value[0] && value[0].ProductModel}</span>,
         
        },
        
        {
          title: "Orientation",
          dataIndex: "GoodsAttributes",
          key: "Orientation", 
          width: 100,
          render: (value) => <span>{value && value[0] && value[0].Orientation}</span>,
        },
        {
          title: "Description",
          dataIndex: "Description",
          key: "Description", 
          width: 115,
         
        },
        
        
           { title: "Qty88",
            dataIndex: "Stock88",
            key: "Stock88", 
            width: 90,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.Stock88 === 0 ? "0" : record.Stock88} 
              type='number'
             
              value={record.Quantity88?.toString()}
              onChange={(e) => handleQuantity88(e.target.value, record)}
               />
             
            )
          },
            {
              title: " Qty90",
            dataIndex: "Stock88",
            key: "Stock88", 
            width: 90,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.Stock90 === 0 ? "0" : record.Stock90} 
              type='number'
              
              value={record.Quantity90?.toString()}
             onChange={(e) => handleQuantity90(e.target.value, record)} 
             />
             
            ),
            
           
          
          
        },
        {
          title: "Total Qty",
          dataIndex: "TotalQty",
          key: "TotalQty", 
          width: 100,
          fixed:'right'
        },
        {
          title: "MRP",
          dataIndex: "MRP",
          key: "MRP", 
          width: 80,
          fixed:'right'
        },
        
        {
          title: "Amount",
          dataIndex: "Amount",
          key: "Amount", 
          width: 100,
          fixed:'right'
          
         
        },
        
      
      ];


      const handleQuantity90 = (value: string, record: BasicModelGoods) => {

        const intValue = parseInt(value, 10);
    
        if (record?.Stock90 && record.Stock90 >= intValue) {
          
          // Dispatch an action to update the quantity for the SKU
          
          dispatch(updateGoodsQuantity90({
            sku: record.SKU,
            qty90: intValue,
            MRP: record.MRP,
            
          }));
          record.Quantity90=intValue;
          dispatch(addGoodsOrder({
            goodsOrder:record,
            qty90: intValue,
            qty88:record.Quantity88
          }))
        }
        else{
          alert("Quantity is not available")
          //setQuantity90(0)
          dispatch(updateGoodsQuantity90({
            sku: record.SKU,
            qty90: 0,
          
           
          }));
          record.Quantity90=0;
          
        }
      
        // Log the record for debugging or tracking purposes
        console.log(record);
      };
      const handleQuantity88 = (value: string, record: BasicModelGoods) => {
           console.log("record",record)
        const intValue = parseInt(value, 10);
    
        if (record?.Stock88 && record.Stock88 >= intValue) {
          // Dispatch an action to update the quantity for the SKU
          dispatch(updateGoodsQuantity88({
            sku: record.SKU,
            qty88: intValue,
            MRP: record.MRP,
          }));
          record.Quantity88=intValue;
         // setQuantity88(intValue)
         dispatch(addGoodsOrder({
          goodsOrder:record,
            qty88: intValue,
            qty90:record.Quantity90
            
        }))
        }
        else if(record?.Stock88 && record.Stock88 < intValue &&intValue!==0){
          alert("Quantity is not available")
         // setQuantity88(0)
         dispatch(updateGoodsQuantity88({
          sku: record.SKU,
          qty88: 0,
        }));
        record.Quantity90=0;
        }
      
      };

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
    <div className='cw-container'>

<Card style={{ marginTop:'80px'}}
          title="CALLAWAY GOODS"
          extra={
            <div >
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <span className="gx-link">Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>   
                  <span className="gx-link">Products</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>   
                  <span className="gx-link">Callaway</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Callaway Goods</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          }
        >
          <div  style={{ float: "right",marginBottom:"12px" }}>
            <Button className='mx-3'
            onClick={handleImport}
            >Import Products</Button>
            <Button className='mx-3'
            // onClick={handleExportToPDF} 
            >Export to PDF</Button>
            <Button className='mx-3'
           onClick={handleExportToExcel}
            >Export to Excel</Button>
            <Button className='mx-3'
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