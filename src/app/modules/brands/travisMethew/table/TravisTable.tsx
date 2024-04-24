import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button } from "antd";
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
 import {updateQuantity90,updateQuantity88} from "../../../../slice/allProducts/TravisMethewSlice"
 import { Cascader,Select, Space } from 'antd';



 const TravisTable = () => {

   const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
   
    const dispatch= useDispatch()

   const getProduct:BasicModelTravis[]=useSelector(getTravisProducts)
     const[amount, setAmount]=useState<number>()
     

    //console.log(" travis Product",getProduct)
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
          width: 130,
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
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].Category}</span>,
          sorter: (a, b) => {
            const categoryA = a.TravisAttributes?.[0]?.Category ?? "";
            const categoryB = b.TravisAttributes?.[0]?.Category ?? "";

          return categoryA.localeCompare(categoryB);
          },
         
        },
        {
            title: "Season",
            dataIndex: "TravisAttributes",
            key: "Season", 
            width: 85,
            render: (value) => <span>{value && value[0] && value[0].Season}</span>,
            sorter: (a, b) => {
              // Extract and compare Season values, handling null or undefined cases
              const seasonA = a.TravisAttributes?.[0]?.Season ?? "";
              const seasonB = b.TravisAttributes?.[0]?.Season ?? "";
          
              return seasonA.localeCompare(seasonB);
            },
           
          },
        {
          title: "StyleCode",
          dataIndex: "TravisAttributes",
          key: "StyleCode", 
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.StyleCode ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.StyleCode ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title: "Color",
          dataIndex: "TravisAttributes",
          key: "Color", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Color}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Color ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Color ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title: "Size",
          dataIndex: "TravisAttributes",
          key: "Size", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Size}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Size ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Size ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title: "Description",
          dataIndex: "Description",
          key: "Description", 
          width: 115,
         
        },

      
        {
          title:"Stock",
          children:[
           { title: "88    QTY",
            dataIndex: "StockAvailable88",
            key: "StockAvailable88", 
            width: 130,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.StockAvailable88} 
              type='number'
             
              value={record.Quantity88?.toString()}
              onChange={(e) => handleQuantity88(e.target.value, record)} />
             
            ),
          },
            {
              title: "90  QTY",
            dataIndex: "StockAvailable88",
            key: "StockAvailable88", 
            width: 130,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.StockAvailable90} 
              type='number'
              
              value={record.Quantity90?.toString()}
              onChange={(e) => handleQuantity90(e.target.value, record)} />
             
            ),
            }
           
          ],
          
        },
        // {
        //   title:"Quantity",
        //   children:[
        //     {
        //       title: "88",
        //       dataIndex: "quantity88",
        //       key: "quantity88", 
        //       width: 100, 
        //       fixed:'right',
        //       render: (text, record) => (
        //         <Input 
        //          type='number'
        //          value={record.Quantity88?.toString()}
        //           onChange={(e) => handleQuantity88(e.target.value, record)}
        //         />
               
        //       ),
              
        //     },
        //     { title: "90",
        //     dataIndex: "quantity90",
        //     key: "quantity90", 
        //     width: 100,
        //     fixed:'right',
        //     render: (text, record) => (
        //       <Input 
        //        type='number'
        //        value={record.Quantity90?.toString()}
        //         onChange={(e) => handleQuantity90(e.target.value, record)}
        //       />
        //     ),
        //    }
        //   ],
         
          
         
        // },
        {
          title: "Total Qty",
          dataIndex: "TotalQty",
          key: "TotalQty", 
          width: 100,
          fixed:'right'
        },
        {
          title: "MRP",
          dataIndex: "RegularPrice",
          key: "RegularPrice", 
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



      const expandedRowRender = (record: BasicModelTravis) => {
        const columns: TableColumnsType<BasicModelTravis> = [
          {
            title: "SKU",
            dataIndex: "SKU",
            key:"SKU",
            width: 130,
            fixed: "left",
            
           
          },
          {
            title: "Category",
            dataIndex: "TravisAttributes",
            key: "Category", 
            width: 85,
            render: (value) => <span>{value && value[0] && value[0].Category}</span>,
            sorter: (a, b) => {
              const categoryA = a.TravisAttributes?.[0]?.Category ?? "";
              const categoryB = b.TravisAttributes?.[0]?.Category ?? "";
  
            return categoryA.localeCompare(categoryB);
            },
           
          },
            {
          title: "StyleCode",
          dataIndex: "TravisAttributes",
          key: "StyleCode", 
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.StyleCode ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.StyleCode ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title:"Stock",
          children:[
           { title: "88    QTY",
            dataIndex: "StockAvailable88",
            key: "StockAvailable88", 
            width: 130,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.StockAvailable88} 
              type='number'
             
              value={record.Quantity88?.toString()}
              onChange={(e) => handleQuantity88(e.target.value, record)} />
             
            ),
          },
            {
              title: "90  QTY",
            dataIndex: "StockAvailable88",
            key: "StockAvailable88", 
            width: 130,
            fixed:'right',
            render: (text, record) => (
              <Input addonBefore={record.StockAvailable90} 
              type='number'
              
              value={record.Quantity90?.toString()}
              onChange={(e) => handleQuantity90(e.target.value, record)} />
             
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
              dataIndex: "RegularPrice",
              key: "RegularPrice", 
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
           
          ],
          
        },


        ]
        return (
          <Table
            columns={columns}
            dataSource={[record]}
            pagination={false}
            
            size="middle"
          />
        );
      }
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


  const handleQuantity90 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);

    if (record?.StockAvailable90 && record.StockAvailable90 >= intValue) {
      // Dispatch an action to update the quantity for the SKU
      dispatch(updateQuantity90({
        sku: record.SKU,
        qty90: intValue,
        RegularPrice: record.RegularPrice,
        
      }));
      record.Quantity90=intValue;
    }
    else{
      alert("Quantity is not available")
      //setQuantity90(0)
      dispatch(updateQuantity90({
        sku: record.SKU,
        qty90: 0,
       
      }));
      record.Quantity90=0;
      
    }
  
    // Log the record for debugging or tracking purposes
    console.log(record);
  };
  const handleQuantity88 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);

    if (record?.StockAvailable88 && record.StockAvailable88 >= intValue) {
      // Dispatch an action to update the quantity for the SKU
      dispatch(updateQuantity88({
        sku: record.SKU,
        qty88: intValue,
        RegularPrice: record.RegularPrice,
      }));
      record.Quantity90=intValue;
     // setQuantity88(intValue)
    }
    else if(record?.StockAvailable88 && record.StockAvailable88 < intValue &&intValue!==0){
      alert("Quantity is not available")
     // setQuantity88(0)
     dispatch(updateQuantity88({
      sku: record.SKU,
      qty88: 0,
    }));
    record.Quantity90=0;
    }
  
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

//handle Show Order

const handleShowOrder=()=>{

}

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
          <div style={{ float: "left" }}>

          <Button 
            onClick={handleShowOrder}
            >Orders</Button>
          </div>

          <div style={{ float: "right" }}>
            <Button 
           // onClick={handleImport}
            >Add to cart</Button>

            <Button 
            onClick={handleImport}
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
            expandable={{ expandedRowRender, defaultExpandedRowKeys: [] }}
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