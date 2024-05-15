import React,{useState, useRef, useEffect} from 'react'
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
import { checkIsActive } from '../../../../../_metronic/helpers';

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
          dataIndex: "sku",
          width: 100,
          fixed: "left",
          key:'sku',
          
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div  style={{ padding: 8, position: "absolute", top: -90, backgroundColor: "white", zIndex: 1 }}>
              <Input
                ref={searchInput}

                placeholder="Search sku"
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
                console.log("filter Record",record)
              let check: boolean= false
            const val:string=value.toString().toUpperCase()
              console.log("value",val)
              if(record && record.sku){
                 check= record.sku?.startsWith(val)
                 console.log("check",check)
              }
           
            return  check;
          },
          filterSearch: true,

         
        },
    
        {
          title: "Name",
          dataIndex: "name",
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
                 onKeyUp={() => confirm()}
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
               record.name;
              
           
             return  name=== value;
           },
           filterSearch: true,
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description", 
          width: 150,
          
        },
        
        //product Type
        {
          title: "ProductType",
          dataIndex: "product_type",
          key: "product_type",
          width: 150,
        
          sorter: (a, b) => {
            const categoryA = a.product_type?? "";
            const categoryB = b.product_type?? "";
        
            return categoryA.localeCompare(categoryB);
          },

          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
              <Select
                mode="multiple"
                placeholder="Select Category"
                value={selectedKeys}
                onChange={setSelectedKeys}
                onSelect={() => { confirm(); }}
                onDeselect={() => { confirm(); }}
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
            const category = record?.product_type;
        
            console.log("Filtering:", value, "Category:", category);
            return category === value;
          },
          filterSearch: true,

        },


        {
          title: "Category",
          dataIndex: "category",
          key: "category",
          width: 120,

          sorter: (a, b) => {
            const categoryA = a.category ?? "";
            const categoryB = b.category ?? "";
        
            return categoryA.localeCompare(categoryB);
          },

          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
              <Select
                mode="multiple"
                placeholder="Select Category"
                value={selectedKeys}
                onChange={setSelectedKeys}
                onSelect={() => { confirm(); }}
                onDeselect={() => { confirm(); }}
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
            const category = record?.category;
        
            console.log("Filtering:", value, "Category:", category);
            return category === value;
          },
          filterSearch: true,
         
        },



          // product model
          {
            title: "ProductModel",
            dataIndex: "product_model",
            key: "product_model", 
            width: 150,
           
           sorter: (a, b) => {
            const categoryA = a.product_model?? "";
            const categoryB = b.product_model?? "";
        
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
                onSelect={() => { confirm(); }}
                onDeselect={() => { confirm(); }}
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
            const category = record?.product_model;
        
            console.log("Filtering:", value, "Category:", category);
            return category === value;
          },
          filterSearch: true,
          },
         
          
          
              { title: " Qty90",
              dataIndex: "stock_90",
              key: "stock_90", 
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
                <Tooltip  open={record.sku=== qty90ToolSKU ?isQty90ToolTip:false} title={record.sku=== qty90ToolSKU ? qty90ToolMesage : ""} placement="top">
                <InputNumber
                  status={record.sku=== qty90ToolSKU &&qty90ToolMesage!=""?"error":""}
                className='mx-3 number-input'
                addonBefore={record?.stock_90} 
                value={record.Quantity90?.toString()}
                style={{ width: 100 }}
                onChange={(value) => {
                  if (value !== null) {
                    handleQuantity90(value, record)
                  }
  
                }}
               
                 
                disabled={value.stock_90 === 0} 
              />
              </Tooltip>
               
              ),
            },
            {
              title: "MRP",
              dataIndex: "mrp",
              key: "mrp", 
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

 useEffect(()=>{
  if(qty90ToolMesage){
    console.log("qty90ToolMesage",qty90ToolMesage)
    const timeout = setTimeout(() => {
      setQty90Message("");
      //setQty90SKU("");
      setIsQty90ToolTip(false)
    }, 3000); // 3 seconds

    return () => clearTimeout(timeout);
  }
 },[qty90ToolMesage])

const handleQuantity90=(value: string, record:OgioBasicModel)=>{
  
  const intValue = parseInt(value, 10);
  setQty90Message("");
  setIsQty90ToolTip(false);
  setQty90SKU("")
  record.Quantity90=intValue;
  if(intValue>0 ){
    if ( record&& record.stock_90 &&record.stock_90 >= intValue) {
    
      // Dispatch an action to update the quantity for the SKU
      
      dispatch(updateQuantity90({
        sku: record.sku,
        qty90: intValue,
        MRP: record.mrp,
        
      }));
    
     
    }
    else {
      // alert("Quantity is not available")
      const st90=(record&& record.stock_90 )? record.stock_90:0;
      setQty90Message("The quantity should not exceed the available stock")
      setIsQty90ToolTip(true)
      setQty90SKU(record.sku)
      //setQuantity90(0)
      dispatch(updateQuantity90({
        sku: record.sku,
        qty90: st90,
        MRP:record.mrp
      
       
      }));
      
  
      
    }
  }else if(intValue<0){
    
    //alert("Quantity cannot be negative")
    setQty90Message("Quantity cannot be negative")
  setIsQty90ToolTip(true)
  setQty90SKU(record.sku)
  console.log("Quantity cannot be negative")
  } 
   else if(intValue===0){
    dispatch(updateQuantity90({
      sku: record.sku,
      qty90: intValue,
      MRP: record.mrp,
      
    }));

   
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
            dataSource={ogioProducts?.map((item) => ({ ...item, key: item.sku }))}
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


{/* {isUpdate &&
<OgioUpdateExcel
isUpdate={isUpdate}
onClose={handleCloseUpdate}
updateOgioData={handleUpdateOgioData}
/>}

<UploadDB
updateXlsData={updateXlsData}
resetUpdateXs={handleResetUpdateXls}

/> */}


    </div>
  )
}
export default OgioTable