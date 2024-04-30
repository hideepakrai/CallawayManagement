import React,{useState, useRef} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {OgioBasicModel,OgioBasicModelGraph,OgioModel,} from "../../../model/ogio/OgioBrandModel"

import {OgioExcelModel} from "../../../model/ogio/OgioExcelModel"
import {useDispatch, useSelector} from "react-redux"
import {getOgioProducts} from "../../../../slice/allProducts/OgioSlice"
import SampleOgioExcel from '../excel/SampleOgioExcel';
import OgioImportExcel from "../excel/importExcel/OgioImportExcel"
import OgioUploadExcelDB from "../excel/importExcel/OgioUploadExcel"
import OgioUpdateExcel from "../excel/UpdateData/ImportExcel"
import UploadDB from '../excel/UpdateData/UpdateDB';
const OgioTable = () => {
    const tableRef = useRef(null);
    const[amount, setAmount]=useState<number>()
    const [isImport, setIsImport] = useState(false);

    const [isUploadData, setUploadData] = useState()
    const handleImport = () => {
      setIsImport(true);
    };
    const handleCloseImport = () => {
      setIsImport(false);
    };

     const ogioProducts: OgioBasicModel[]= useSelector(getOgioProducts)
       console.log("Ogio Products", ogioProducts);
    const columns: TableColumnsType<OgioBasicModel>= [
        {
          // title: "Image",
          dataIndex: "PrimaryImage",
          // fixed: "left",
          width: 40,
         render: (value) => (
           <span>
            <img
              src="/media/icons/icon-callway.png"
             alt="Primary Image"
              style={{ maxWidth: "30px", marginRight: "5px" }}
           />
           </span>
        ),
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
          width: 115,
            fixed: "left",
        },
        {
          title: "Description",
          dataIndex: "Description",
          key: "Description", 
          width: 160,
          fixed: "left",
        },
        
        //product Type
        {
          title: "ProductType",
          dataIndex: "OgiAttributes",
          key: "ProductType",
          width: 110,
          render: (value) => <span>{value && value[0] && value[0].ProductType}</span>,
        },
        {
          title: "Category",
          dataIndex: "OgiAttributes",
          key: "Category",
          width: 70,
          render: (value) => <span>{value && value[0] && value[0].Category}</span>,
         
        },
          // product model
          {
            title: "ProductModel",
            dataIndex: "OgiAttributes",
            key: "ProductModel", 
            width: 90,
            render: (value) => <span>{value && value[0] && value[0].ProductModel}</span>,
           
          },
         
          
          
              { title: " Qty90",
              dataIndex: "OgiAttributes",
              key: "Stock90", 
              width: 110,
              fixed:'right',
              render: (value,record) => (
                <Input 
                addonBefore={value[0]?.Stock90} 
                type='number'
               
                value={record.Quantity90?.toString()}
                onChange={(e) => handleQuantity90(e.target.value, record)} />
               
              ),
            },
            {
              title: "SalePrice",
              dataIndex: "SalePrice",
              key: "SalePrice", 
              width: 115,
              fixed:'right'
             
            },
         
          {
            title: "Amount",
            dataIndex: "Amount",
            key: "Amount", 
            width: 70,
            fixed:'right'
           
          },
           
      
      ];


const handleQuantity90=(value: string, record:OgioBasicModel)=>{

}

      const handleAmountChange = (value:string, record:OgioBasicModel) => {
        // Update the record with the new amount
        record.Amount = parseInt(value);
        // Update the state or dispatch an action to update the data source
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState();
    const rowSelection = {
      onChange: (selectedRowKeys: React.Key[], selectedRows: OgioBasicModel[]) => {
        console.log(
          `selectedRowKeys: ${selectedRowKeys}`,
          "selectedRows: ",
          selectedRows
        );
      },
      onSelect: (record: OgioBasicModel, selected: boolean, selectedRows: OgioBasicModel[]) => {
        console.log(
          "record",
          record,
          "selected",
          selected,
          "selectedRows",
          selectedRows
        );
      },
      onSelectAll: (selected: boolean, selectedRows: OgioBasicModel[], changeRows: OgioBasicModel[]) => {
        console.log(selected, selectedRows, changeRows);
      },
  
      columnWidth: 40,
    };

    const[isSample, setIsSample]=useState<boolean>(false)
    const handleSampleExcel=()=>{
      setIsSample(true)
    }
  
  
    
    const handleResetIsSample=()=>{
      setIsSample(false)
    }
  

    // upload data 
    const [allXlxData, setAllXlxData]=useState<OgioExcelModel[]>([])
    const handleUploadExcel=(allData:OgioExcelModel[])=>{
      setAllXlxData(allData);
      handleCloseImport();
  console.log("all ogio data", allData)

    }

    const handleReseAllXlData=()=>{
      setAllXlxData([])
    }
  const [isUpdate, setIsUpdate]= useState<boolean>(false)

    // handle Uppdate Excel data
  const handleUpdateExcel=()=>{
    setIsUpdate(true)
  }

  const handleCloseUpdate=()=>{
    setIsUpdate(false)
  }

  const [updateXlsData, setUpdateXlsData]=useState<OgioExcelModel[]>([])
  const handleUpdateOgioData=(updateData:OgioExcelModel[])=>{
    setUpdateXlsData(updateData)
    handleCloseUpdate()
  }

  const handleResetUpdateXls=()=>{
    setUpdateXlsData([])
  }
  return (
    <div className='cw-container'>
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
                <Breadcrumb.Item>Ogio</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          }
        >
          <div  style={{ float: "right", marginBottom:"12px"}}>
            <Button  className='mx-3'
            onClick={handleImport}
            >Import Products</Button>
            <Button  className='mx-3'
            // onClick={handleExportToPDF} 
            >Export to PDF</Button>
            <Button  className='mx-3'
            // onClick={handleExportToExcel}
            >Export to Excel</Button>
            <Button className='mx-3'
             onClick={handleSampleExcel}
             >Sample Excel</Button>
            <Button className='mx-3'
             onClick={handleUpdateExcel}
             >Update</Button>
          </div>

          <Table
            ref={tableRef}
            columns={columns}
            dataSource={ogioProducts?.map((item) => ({ ...item, key: item.id }))}
            rowSelection={rowSelection}
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}
          />
        </Card>

        <SampleOgioExcel
         isSample={isSample}
        resetIsSample={handleResetIsSample}
        />

<OgioImportExcel
isImport={isImport}
onClose={handleCloseImport}
allOgioData={handleUploadExcel}
/>

<OgioUploadExcelDB
xlData={allXlxData}
resetXls={handleReseAllXlData}
/>


{isUpdate &&
<OgioUpdateExcel
isUpdate={isUpdate}
onClose={handleCloseUpdate}
updateOgioData={handleUpdateOgioData}
/>}

<UploadDB
updateXlsData={updateXlsData}
resetUpdateXs={handleResetUpdateXls}

/>
    </div>
  )
}
export default OgioTable