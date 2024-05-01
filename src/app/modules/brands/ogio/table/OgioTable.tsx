import React,{useState, useRef} from 'react'
import { Card, Table, Carousel, Breadcrumb, Select } from "antd";
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
import type { RadioChangeEvent, SelectProps } from 'antd';
type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Accessory',];
const OPTIONS1 = ['Moto', 'Lifestyle', ];
const OPTIONS2 = ['Og Rise', 'Og Pace Pro', 'Og Max', 'Og Al Convoy	'] ;

const OgioTable = () => {
  const placement: SelectCommonPlacement = 'topLeft'; 
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
    const [selectedItems, setSelectedItems] = useState<string[]>([]);

    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
    const filteredOptions1 = OPTIONS1.filter((o) => !selectedItems.includes(o));
    const filteredOptions2= OPTIONS2.filter((o) => !selectedItems.includes(o));




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
          width: 100,
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

          sorter: (a, b) => {
            const categoryA = a.OgiAttributes?.[0]?.Category ?? "";
            const categoryB = b.OgiAttributes?.[0]?.Category ?? "";
        
            return categoryA.localeCompare(categoryB);
          },

          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
              <Select
                mode="multiple"
                placeholder="Select Category"
                value={selectedKeys}
                onChange={setSelectedKeys}
                style={{ width: '100%' }}
                placement={placement} 
              >
                {/* Render options based on available categories */}
                {filteredOptions.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
           
            </div>
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                // Trigger the search input to focus when the filter dropdown is opened
              });
            }
          },
          onFilter: (value, record) => {
            const category = record?.OgiAttributes?.[0]?.Category;
        
            console.log("Filtering:", value, "Category:", category);
            return category === value;
          },
          filterSearch: true,

        },


        {
          title: "Category",
          dataIndex: "OgiAttributes",
          key: "Category",
          width: 120,
          render: (value) => <span>{value && value[0] && value[0].Category}</span>,
          sorter: (a, b) => {
            const categoryA = a.OgiAttributes?.[0]?.Category ?? "";
            const categoryB = b.OgiAttributes?.[0]?.Category ?? "";
        
            return categoryA.localeCompare(categoryB);
          },

          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
              <Select
                mode="multiple"
                placeholder="Select Category"
                value={selectedKeys}
                onChange={setSelectedKeys}
                style={{ width: '100%' }}
                placement={placement} 
              >
                {/* Render options based on available categories */}
                {filteredOptions1.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
           
            </div>
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                // Trigger the search input to focus when the filter dropdown is opened
              });
            }
          },
          onFilter: (value, record) => {
            const category = record?.OgiAttributes?.[0]?.Category;
        
            console.log("Filtering:", value, "Category:", category);
            return category === value;
          },
          filterSearch: true,
         
        },



          // product model
          {
            title: "ProductModel",
            dataIndex: "OgiAttributes",
            key: "ProductModel", 
            width: 150,
            render: (value) => <span>{value && value[0] && value[0].ProductModel}</span>,
           sorter: (a, b) => {
            const categoryA = a.OgiAttributes?.[0]?.Category ?? "";
            const categoryB = b.OgiAttributes?.[0]?.Category ?? "";
        
            return categoryA.localeCompare(categoryB);
          },

          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
              <Select
                mode="multiple"
                placeholder="Select Category"
                value={selectedKeys}
                onChange={setSelectedKeys}
                style={{ width: '100%' }}
                placement={placement} 
              >
                {/* Render options based on available categories */}
                {filteredOptions2.map((item) => (
                  <Select.Option key={item} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
           
            </div>
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                // Trigger the search input to focus when the filter dropdown is opened
              });
            }
          },
          onFilter: (value, record) => {
            const category = record?.OgiAttributes?.[0]?.Category;
        
            console.log("Filtering:", value, "Category:", category);
            return category === value;
          },
          filterSearch: true,
          },
         
          
          
              { title: " Qty90",
              dataIndex: "OgiAttributes",
              key: "Stock90", 
              width: 90,
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
              title: "MRP",
              dataIndex: "MRP",
              key: "MRP", 
              width: 100,
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
    <div className='container'>
<Card style={{ marginTop:'80px'}}
          title="OGIO"
          extra={
            <div >
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <span className="gx-link">Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>   
                  <span className="gx-link">Products</span>
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