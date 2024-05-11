import React,{useState, useRef} from 'react'
import { Card, Table, Carousel, Breadcrumb, Select, Tooltip, InputNumber } from "antd";
import { Input, Radio, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import {OgioBasicModel,OgioBasicModelGraph,OgioModel,} from "../../../model/ogio/OgioBrandModel"

import {OgioExcelModel} from "../../../model/ogio/OgioExcelModel"
import {useDispatch, useSelector} from "react-redux"
import {getOgioProducts,updateQuantity90,getCategory,getProductModel,getProductType} from "../../../../slice/allProducts/OgioSlice"
import SampleOgioExcel from '../excel/SampleOgioExcel';
import OgioImportExcel from "../excel/importExcel/OgioImportExcel"
import OgioUploadExcelDB from "../excel/importExcel/OgioUploadExcel"
import OgioUpdateExcel from "../excel/UpdateData/ImportExcel"
import UploadDB from '../excel/UpdateData/UpdateDB';
import type { RadioChangeEvent, SelectProps } from 'antd';
import OgioGallery from"./column/OgioGallery"
import {addOgioOrder,removeOgioOrder} from "../../../../slice/orderSlice/ogio/OgioCartOrderSlice"
import GetAllProduct from '../../../../api/allProduct/GetAllProduct';
import { useNavigate } from 'react-router-dom';

type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Accessory',];
const OPTIONS1 = ['Moto', 'Lifestyle', ];
const OPTIONS2 = ['Og Rise', 'Og Pace Pro', 'Og Max', 'Og Al Convoy	'] ;

const OgioTable = () => {

  const navigate= useNavigate()
  const searchInput = useRef<InputRef>(null);
  const placement: SelectCommonPlacement = 'topLeft'; 
    const tableRef = useRef(null);
    const[amount, setAmount]=useState<number>()
    const [isImport, setIsImport] = useState(false);
    const dispatch= useDispatch()
    const [isUploadData, setUploadData] = useState()
    const handleImport = () => {
      setIsImport(true);
    };
    const handleCloseImport = () => {
      setIsImport(false);
    };
    const [selectedItems, setSelectedItems] = useState<string[]>([]);


     const getCategorys= useSelector(getCategory) ;
     const getProductModels= useSelector(getProductModel);
     const getProductTypes= useSelector(getProductType);
    const filteredOptions = getProductTypes.filter((o) => !selectedItems.includes(o));
    const filteredOptions1 = getCategorys.filter((o) => !selectedItems.includes(o));
    const filteredOptions2= getProductModels.filter((o) => !selectedItems.includes(o));




     const ogioProducts: OgioBasicModel[]= useSelector(getOgioProducts)
     
    const columns: TableColumnsType<OgioBasicModel>= [
        {
          // title: "Image",
          dataIndex: "PrimaryImage",
          // fixed: "left",
          width: 50,
          render: (value) => <OgioGallery value={value} />,
        },
    
        {
          title: "SKU",
          dataIndex: "SKU",
          width: 100,
          fixed: "left",
          
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div  style={{ padding: 8, position: "absolute", top: -90, backgroundColor: "white", zIndex: 1 }}>
              <Input
                ref={searchInput}

                placeholder="Search SKU"
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onKeyUp={(e) => {
                  confirm({ closeDropdown: false });
                  
                }}
                style={{ width: 188, marginBottom: 8, display: "block" }}
              />
            </div>
          ),
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => {
                setTimeout(() => searchInput.current?.select(), 1000);
              });
            }
          },
          onFilter: (value, record) => {
             
              let check: boolean= false
            const val:string=value.toString().toUpperCase()
              if(record && record.SKU){
                 check= record.SKU?.startsWith(val)
              }
           
            return  check;
          },
          filterSearch: true,

         
        },
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "name",
          width: 150,
            fixed: "left",
            filterMode: 'tree',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
             <div style={{ padding: 8 }}>
               <Input
                 placeholder="Search Name"
                 value={selectedKeys[0]}
                 onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                 onPressEnter={() => confirm()}
                 style={{ width: 188, marginBottom: 8, display: "block" }}
               />
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
             const name =
               record &&
               record.Name;
              
           
             return  name=== value;
           },
           filterSearch: true,
        },
        {
          title: "Description",
          dataIndex: "Description",
          key: "Description", 
          width: 150,
          
        },
        
        //product Type
        {
          title: "ProductType",
          dataIndex: "OgiAttributes",
          key: "ProductType",
          width: 150,
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
              width: 150,
              fixed:'right',
              // render: (value,record) => (
              //   <Input 
              //   addonBefore={value[0]?.Stock90} 
              //   type='number'
               
              //   value={record.Quantity90?.toString()}
              //   onChange={(e) => handleQuantity90(e.target.value, record)} />
               
              // ),
              render: (value,record) => (
                <Tooltip  open={record.SKU=== qty90ToolSKU ?isQty90ToolTip:false} title={record.SKU=== qty90ToolSKU ? qty90ToolMesage : ""} placement="top">
                <InputNumber
                
                className='mx-3 number-input'
                addonBefore={value[0]?.Stock90} 
                value={record.Quantity90?.toString()}
                style={{ width: 100 }}
                onChange={(value) => {
                  if (value !== null) {
                    handleQuantity90(value, record)
                  }
  
                }}
               
                 
                disabled={value[0]?.Stock90 === 0} 
              />
              </Tooltip>
               
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
      const [qty90ToolMesage, setQty90Message]= useState<string>("")
      const [qty90ToolSKU, setQty90SKU]= useState<string|undefined>("")
     const [isQty90ToolTip, setIsQty90ToolTip]= useState<boolean>(false)

const handleQuantity90=(value: string, record:OgioBasicModel)=>{
  
  const intValue = parseInt(value, 10);
  setQty90Message("");
  setIsQty90ToolTip(false);
  setQty90SKU("")
  record.Quantity90=intValue;
  if(intValue>0 ){
    if ( record?.OgiAttributes&&record?.OgiAttributes[0]?.Stock90 && record.OgiAttributes[0].Stock90 >= intValue) {
    
      // Dispatch an action to update the quantity for the SKU
      
      dispatch(updateQuantity90({
        sku: record.SKU,
        qty90: intValue,
        MRP: record.MRP,
        
      }));
    
      // dispatch(addOgioOrder({
      //   OgioOrder:record,
      //   qty90: intValue,
      //   qty88:record.Quantity88
      // }))
    }
    else{
      // alert("Quantity is not available")
      const st90=(record?.OgiAttributes&&record?.OgiAttributes[0]?.Stock90 )? record.OgiAttributes[0].Stock90:0;
      setQty90Message("The quantity should not exceed the available stock")
      setIsQty90ToolTip(true)
      setQty90SKU(record.SKU)
      //setQuantity90(0)
      dispatch(updateQuantity90({
        sku: record.SKU,
        qty90: st90,
      
       
      }));
      
  
      
    }
  }else if(intValue<0){
    
    // alert("Quantity cannot be negative")
    setQty90Message("Quantity cannot be negative")
  setIsQty90ToolTip(true)
  setQty90SKU(record.SKU)
  console.log("Quantity cannot be negative")
  } 
   else if(intValue===0){
    dispatch(updateQuantity90({
      sku: record.SKU,
      qty90: intValue,
      MRP: record.MRP,
      
    }));

    // dispatch(removeOgioOrder({
    //   travisOrder:record,
    //     qty90s: intValue,
    //     qty88s:record.Quantity90
        
    // }))
}
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

  const handleViewCart=()=>{
    navigate("/cart")
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
            onClick={handleViewCart}
            >View Cart</Button>
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