import React,{useState, useRef} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModel} from "../../model/OgioBrandModel"
import {useDispatch, useSelector} from "react-redux"
import {getOgioProducts} from "../../../../slice/allProducts/OgioSlice"
const OgioTable = () => {
    const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
    const handleImport = () => {
      setIsImport(true);
    };
    const handleCloseImport = () => {
      setIsImport(false);
    };

     const ogioProducts: BasicModel[]= useSelector(getOgioProducts)
       console.log("Ogio Products", ogioProducts);
    const columns: TableColumnsType<BasicModel>= [
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
          title: "Type",
          dataIndex: "ProductType",
          key: "ProductType",
         
          filterSearch: true, 
          width: 70,
         
        },
        
      
      ];
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
                <Breadcrumb.Item>Ogio</Breadcrumb.Item>
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
            // onClick={handleExportToExcel}
            >Export to Excel</Button>
            <Button
            //  onClick={handleSampleExcel}
             >Sample Excel</Button>
          </div>

          <Table
            ref={tableRef}
            columns={columns}
            dataSource={ogioProducts?.map((item) => ({ ...item, key: item.id }))}
            //rowSelection={rowSelection}
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}
          />
        </Card>

    </div>
  )
}
export default OgioTable