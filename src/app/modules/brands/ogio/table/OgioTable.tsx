import React,{useState, useRef} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {OgioBasicModel,OgioBasicModelGraph,OgioModel} from "../../model/ogio/OgioBrandModel"
import {useDispatch, useSelector} from "react-redux"
import {getOgioProducts} from "../../../../slice/allProducts/OgioSlice"
import SampleOgioExcel from '../excel/SampleOgioExcel';

const OgioTable = () => {
    const tableRef = useRef(null);
    const[amount, setAmount]=useState<number>()
    const [isImport, setIsImport] = useState(false);
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
          width: 115,
          //  fixed: "left",
        },
    
        
        //product Type
        {
          title: "ProductType",
          dataIndex: "OgiAttributes",
          key: "ProductType",
          width: 70,
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
            width: 75,
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
            dataIndex: "MRP",
            key: "MRP", 
            width: 115,
           
          },
          {
            title: "StockAvailable",
            dataIndex: "StockAvailable",
            key: "StockAvailable", 
            width: 80,
          } ,
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
          <div className='mb-5' style={{ float: "right" }}>
            <Button  className='mx-3'
            onClick={handleImport}
            >Import Products</Button>
            <Button  className='mx-3'
            // onClick={handleExportToPDF} 
            >Export to PDF</Button>
            <Button  className='mx-3'
            // onClick={handleExportToExcel}
            >Export to Excel</Button>
            <Button
             onClick={handleSampleExcel}
             >Sample Excel</Button>
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

    </div>
  )
}
export default OgioTable