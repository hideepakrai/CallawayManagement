import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../../../model/travis/TravisMethewModel"
import {useDispatch, useSelector} from "react-redux"
import {getTravisProducts} from "../../../../slice/allProducts/TravisMethewSlice"
import SampleExcelTravis from '../excel/SampleExcelTravis';
import { number } from 'yup';
import TravisImportExcel from '../excel/importExcel/TravisImportExcel';
import {ExcelModelTravis} from "../../../model/travis/TravisExcel"
import TravisExcelUploadDB from "../excel/importExcel/TravisExcelUploadDB"
import * as XLSX from 'xlsx';
 import {updateQuantity90,updateQuantity88} from "../../../../slice/allProducts/TravisMethewSlice"
 import { Cascader,Select, Space } from 'antd';
import {addTravisOrder} from "../../../../slice/orderSlice/CartOrder"
import { message } from "antd";
import { Key } from 'antd/lib/table/interface';
import { useTable } from 'react-table';
// import jsPDF from "jspdf";
// import "jspdf-autotable";



// Extend jsPDF types
// declare module "jspdf" {
//   export interface jsPDF {
//     autoTable: (
//       columns: string[] | object[],
//       body: object[],
//       options?: object
//     ) => jsPDF;
//   }
// }

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

      
        
           { title: "88    QTY",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 130,
            fixed:'right',
            render: (value,record) => (
              <Input 
              addonBefore={value[0]?.Stock88} 
              type='number'
             
              value={record.Quantity88?.toString()}
              onChange={(e) => handleQuantity88(e.target.value, record)} />
             
            ),
          },
            {
              title: "90  QTY",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 130,
            fixed:'right',
            render: (value,record) => (
              <Input addonBefore={value[0]?.Stock90} 
              type='number'
              
              value={record.Quantity90?.toString()}
              onChange={(e) => handleQuantity90(e.target.value, record)} />
             
            ),
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
          dataIndex: "SalePrice",
          key: "SalePrice", 
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


      const subColumns: TableColumnsType<BasicModelTravis> = [
        { title:'SKU', dataIndex: 'SKU', key: 'SKU' },
        { title: 'StyleCode', dataIndex: 'StyleCode', key: 'StyleCode' },
        { title: 'Size', dataIndex: 'Size', key: 'Size' },
       
      ];
      const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelTravis>();

      const handleExpand = (expanded: boolean, record: BasicModelTravis) => {
         
         
        if (expanded && record.SKU !== undefined) {
          // Expand only the clicked row
          setExpandedRowKeys(record);  // Assuming SKU is a string
        } else{
          setExpandedRowKeys(undefined)
        }
      };


      const expandedRowRender = (record: BasicModelTravis) => {

        console.log("record expanded",record)
        if (record.TravisAttributes && record.TravisAttributes.length > 0) {
        const subcolumns: TableColumnsType<BasicModelTravis> = [
          {
            title: "SKU",
            dataIndex: "SKU",
            key:"SKU",
            width: 130,
            fixed: "left",
            
           
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
          }
        },
            {
          title: "Size",
          dataIndex: "TravisAttributes",
          key: "Size", 
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].Size}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Size ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Size ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title:"Stock",
          children:[
           { title: "88    QTY",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 130,
            fixed:'right',
            render: (value, record:BasicModelTravis) => (
              <Input addonBefore={value[0].Stock88} 
              type='number'
             
              value={record.Quantity88?.toString()}
              onChange={(e) => handleQuantity88(e.target.value, record)} />
             
            ),
          },
            {
              title: "90  QTY",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 130,
            fixed:'right',
            render: (value, record) => (
              <Input addonBefore={value[0].Stock90} 
              type='number'
              
              value={record.Quantity90?.toString()}
              onChange={(e) => handleQuantity90(e.target.value, record)} />
             
            ),
            }
          ]},
            {
              title: "Total Qty",
              dataIndex: "TotalQty",
              key: "TotalQty", 
              width: 100,
              fixed:'right'
            },
            {
              title: "MRP",
              dataIndex: "SalePrice",
              key: "SalePrice", 
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
           
          ]
           
          if(expandedRowKeys &&record.SKU===expandedRowKeys.SKU){
            return (
              <Table
                columns={subcolumns}
                dataSource={[record]}
                pagination={false}
                
                size="middle"
              />
            );
          }
          else
          return null
    
        }
      }
        const [selectedRowKeys,setSelectedRowKeys]= useState<BasicModelTravis[]>([]);
   
        const onSelectChange = (newSelectedRowKeys: Key[], record: BasicModelTravis) => {
          // eslint-disable-next-line no-debugger
          debugger
          
          console.log("selectedRowKeys changed: ", newSelectedRowKeys);
          // Check if the record is selected by checking if its key is included in newSelectedRowKeys
          //const isSelected = newSelectedRowKeys.includes(record.SKU);
          // Update the selectedRowKeys state based on the toggle state
         // setSelectedRowKeys(isSelected ? [record.SKU] : []);
        };
      


  const handleQuantity90 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);

    if ( record?.TravisAttributes&&record?.TravisAttributes[0]?.Stock90 && record.TravisAttributes[0].Stock90 >= intValue) {
      
      // Dispatch an action to update the quantity for the SKU
      
      dispatch(updateQuantity90({
        sku: record.SKU,
        qty90: intValue,
        MRP: record.SalePrice,
        
      }));
      record.Quantity90=intValue;
      dispatch(addTravisOrder({
        travisOrder:record,
        qty90: intValue,
        qty88:record.Quantity88
      }))
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
       console.log("record",record)
    const intValue = parseInt(value, 10);
    

    if ( record?.TravisAttributes &&record?.TravisAttributes[0].Stock88 && record.TravisAttributes[0].Stock88 >= intValue) {
  
      dispatch(updateQuantity88({
        sku: record.SKU,
        qty88: intValue,
        MRP: record.SalePrice,
      }));
      record.Quantity88=intValue;
     // setQuantity88(intValue)
     dispatch(addTravisOrder({
      travisOrder:record,
        qty88: intValue,
        qty90:record.Quantity90
        
    }))
    }
    else if( record?.TravisAttributes &&record?.TravisAttributes[0].Stock88&& record?.TravisAttributes[0].Stock88 < intValue &&intValue!==0){
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
    console.log("Exporting to Excel...");

    const table = tableRef.current as HTMLTableElement | null;

    if (!table) {
      console.error("Table element not found.");
      return;
    }

    // Get the table's outerHTML
    const tableHtml = table.outerHTML;

    // Create a Blob object representing the data as an XLSX file
    const blob = new Blob([tableHtml], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Create a temporary anchor element to download the Blob
    const anchor = document.createElement('a');
    const url = URL.createObjectURL(blob);

    anchor.href = url;
    anchor.download = `TravisMathewProducts_${Date.now()}.xlsx`;
    anchor.click();

    // Release the object URL
    URL.revokeObjectURL(url);

    console.log("Excel exported successfully.");
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  }
};





//handle Show Order

const handleShowOrder=()=>{

}
// table into pdf
// const handleExportToPDF = () => {
//   const table = tableRef.current;
//   if (!table) {
//     message.error("Table reference not found");
//     return;
//   }

//   const doc = new jsPDF({
//     orientation: "landscape",
//   });

//   const tableColumn = [
//     { header: "Brand", dataKey: "brand" },
//     { header: "Name", dataKey: "Name" },
//     { header: "SKU", dataKey: "SKU" },
//     { header: "Category", dataKey: "Category" },
//     { header: "Style code", dataKey: "StyleCode" },
//   ];

//   const tableRows = getProduct.map((item: BasicModelTravis) => ({
//     brand: item.SetType || "",
//     Name: item.Name || "",
//     SKU: item.SKU || "",
//     Category: (item.TravisAttributes && item.TravisAttributes[0]?.Category) || "",
//     StyleCode: (item.TravisAttributes && item.TravisAttributes[0]?.StyleCode) || "",
//   }));

//   if (tableRows.length === 0) {
//     message.warning("No data available to export");
//     return;
//   }

//   // startY is basically margin-top
//   doc.autoTable(tableColumn, tableRows, { startY: 20 });
//   doc.save(`TravisMathew.pdf`);
// };



const handleSelctRow=(record:BasicModelTravis)=>{
  console.log("record",record)
  setSelectedRowKeys([record])
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
          <div style={{ float: "right",marginBottom:"12px" }}>
            <Button className='mx-3' 
           // onClick={handleImport}
            >Add to cart</Button>

            <Button className='mx-3'
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

       
        </Card>
        <Table
            ref={tableRef}
            columns={columns}
            dataSource={getProduct?.map((item) => ({ ...item, key: item?.SKU }))}
            rowSelection={{
              onSelect:(record)=>{handleSelctRow(record)}
            }}
            expandable={{ expandedRowRender,
          
              onExpand: (expanded, record) => handleExpand(expanded, record),
              
             }}
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}
          />

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