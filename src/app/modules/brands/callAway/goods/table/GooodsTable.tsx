import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb, Select, Tooltip, InputNumber } from "antd";
import { Input, Radio, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import {BasicModelGoods} from "../../../../model/goods/CallawayGoodsModel"
import {useDispatch, useSelector} from "react-redux"
import "./GooodsTable.css"

import SampleExcel from '../excel/SampleExcel';
import { number } from 'yup';
import ImportExcel from '../excel/importExcel/ImportExcel';
import {ExcelModelGoods} from "../../../../model/goods/CallawayGoodsExcel"
import ExcelUploadDB from "../excel/importExcel/ExcelUploadDB"

import * as XLSX from 'xlsx';


 import type { RadioChangeEvent, SelectProps } from 'antd';
import { getCategory, getGoodsProducts, getProductModel, getProductType } from '../../../../../slice/allProducts/CallAwayGoodsSlice';
type SelectCommonPlacement = SelectProps['placement'];

const OPTIONS = ['Accessory',];
const OPTIONS1 = ['Accessory',];
const OPTIONS2 = ['Accessory',];

const GooodsTable = () => {
  const placement: SelectCommonPlacement = 'topLeft'; 
    const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
     const dispatch= useDispatch()
     const searchInput = useRef<InputRef>(null);
     const getCategorys = useSelector(getCategory);
     const getProductTypes = useSelector(getProductType);
     const getProductModels = useSelector(getProductModel);
    const getGoodsProduct:BasicModelGoods[]=useSelector(getGoodsProducts)
     const[amount, setAmount]=useState<number>()
    console.log("callawayGooodsProduct",getGoodsProduct)

    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const filteredOptions = getCategorys.filter((o) => !selectedItems.includes(o));
    const filteredOptions1 = getProductModels.filter((o) => !selectedItems.includes(o));
    const filteredOptions2 = getProductTypes.filter((o) => !selectedItems.includes(o));

    const columns: TableColumnsType<BasicModelGoods> = [
      {
        dataIndex: "primary_image_url",
  
        width: 50,
        // render: (value, record) => <ImageRenderer 
        // record={record} />
  
      },
  
  
  
      {
        title: "SKU ",
        dataIndex: "sku",
        width: 100,
        fixed: "left",
  
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8, width: "300px", position: "absolute", top: -90, zIndex: 1 }}>
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
  
          let check = false;
          const valUpper = value.toString().toUpperCase();
          const valLower = value.toString().toLowerCase();
  
          if (record && record.sku) {
            check = record.sku.startsWith(valUpper) || record.sku.startsWith(valLower);
          }
  
  
  
  
          return check;
        },
        filterSearch: true,
  
  
      },
  
      {
        title: "Description ",
        dataIndex: "description",
        key: "description",
        width: 150,
  
      },
  
  
      {
        title: "Category ",
        dataIndex: "category",
        key: "category",
        width: 110,
  
        sorter: (a, b) => {
          const categoryA = a.category ?? "";
          const categoryB = b.category ?? "";
  
          return categoryA.localeCompare(categoryB);
        },
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8, width: "300px", position: "absolute", top: -90, zIndex: 1, }}>
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
          const category =
            record &&
            record.category &&
            record.category;
  
  
  
          return category === value;
        },
        filterSearch: true,
      },
  
  
  
  
      {
        title: "Product model",
        dataIndex: "product_model",
        key: "product_model",
        width: 100,
  
        sorter: (a, b) => {
          // Extract and compare Season values, handling null or undefined cases
          const seasonA = a.product_model ?? "";
          const seasonB = b.product_model ?? "";
  
          return seasonA.localeCompare(seasonB);
        },
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8, width: "300px", position: "absolute", top: -90, zIndex: 1, }}>
            <Select
              mode="multiple"
              placeholder="Select Season"
              value={selectedKeys}
              onChange={setSelectedKeys}
              style={{ width: '100%' }}
              placement={placement}
              onSelect={() => { confirm(); }}
              onDeselect={() => { confirm(); }}
            >
              {/* Render options based on available seasons */}
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
          const productmodel = record?.product_model;
  
  
          return productmodel === value;
        },
        filterSearch: true,
      },
  
  
  
      {
        title: "Product type",
        dataIndex: "product_type",
        key: "product_type",
        width: 85,
  
        sorter: (a, b) => {
          // Extract and compare StyleCode values, handling null or undefined cases
          const styleCodeA = a.product_type ?? "";
          const styleCodeB = b.product_type ?? "";
  
          return styleCodeA.localeCompare(styleCodeB);
        },
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8, width: "300px", position: "absolute", top: -90, zIndex: 1, }}>
            <Select
              mode="multiple"
              placeholder="Select Style"
              value={selectedKeys}
              onChange={setSelectedKeys}
              style={{ width: '100%' }}
              placement={placement}
              onSelect={() => { confirm(); }}
              onDeselect={() => { confirm(); }}
            >
              {/* Render options based on available style codes */}
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
          const productype = record?.product_type;
  
  
          return productype === value;
        },
        filterSearch: true,
      },
  
  
  
  
      {
        title: "life cycle",
        dataIndex: "life_cycle",
        key: "life_cycle",
        width: 75,
  
        sorter: (a, b) => {
          // Extract and compare StyleCode values, handling null or undefined cases
          const styleCodeA = a.life_cycle ?? "";
          const styleCodeB = b.life_cycle ?? "";
  
          return styleCodeA.localeCompare(styleCodeB);
        },
      },
      {
        title: "Orientation",
        dataIndex: "orientation",
        key: "orientation",
        width: 65,
  
        sorter: (a, b) => {
          // Extract and compare StyleCode values, handling null or undefined cases
          const styleCodeA = a.orientation ?? "";
          const styleCodeB = b.orientation ?? "";
  
          return styleCodeA.localeCompare(styleCodeB);
        },
      },
  
  
      {
        title: "Qty90",
        dataIndex: "stock_90",
        key: "stock_90",
        width: 150,
        fixed: 'right',
        render: (value, record) => (
  
          <Tooltip open={record.sku === qty90ToolSKU ? isQty90ToolTip : false} title={record.sku === qty90ToolSKU ? qty90ToolMesage : ""} placement="top">
            <InputNumber
              status={record.sku === qty90ToolSKU && qty90ToolMesage != "" ? "error" : ""}
              className='mx-5 number-input'
              addonBefore={record.stock_90 || 0}
              value={record.Quantity90?.toString()}
              onChange={(value) => {
                if (value !== null) {
                  handleQuantity90(value, record)
                }
  
              }}
  
              disabled={value.stock_90 === 0}
              style={{ width: 100 }}
            />
          </Tooltip>
  
        ),
      },
  
  
      {
        title: "Qty",
        dataIndex: "TotalQty",
        key: "TotalQty",
        width: 50,
        fixed: 'right'
      },
  
  
      {
        title: "MRP",
        dataIndex: "mrp",
        key: "mrp",
        width: 80,
        fixed: 'right'
      },
  
  
      {
        title: "Amount ",
        dataIndex: "Amount",
        key: "Amount",
        width: 100,
        fixed: 'right'
      },
  
  
    ];

// update goods product 
 const [allGoodsProduct, setAllGoodsProduct]= useState< BasicModelGoods[]>([])

useEffect(()=>{
  const varskuArray: BasicModelGoods[] = [];
  if( getGoodsProduct &&
    getGoodsProduct.length>0
  ){
    getGoodsProduct.map(item=>{
      varskuArray.push(item)
    })
  }
  setAllGoodsProduct(varskuArray)
},[getGoodsProduct])
    
    const [qty90ToolMesage, setQty90Message] = useState<string>("")
    const [qty90ToolSKU, setQty90SKU] = useState<string | undefined>("")
    const [isQty90ToolTip, setIsQty90ToolTip] = useState<boolean>(false)
  
    useEffect(() => {
      if (qty90ToolMesage) {
        console.log("qty90ToolMesage", qty90ToolMesage)
        const timeout = setTimeout(() => {
          setQty90Message("");
          //setQty90SKU("");
          setIsQty90ToolTip(false)
        }, 3000); // 3 seconds
  
        return () => clearTimeout(timeout);
      }
    }, [qty90ToolMesage])
  
    const handleQuantity90 = (value: string, record: BasicModelGoods) => {
  
      const intValue = parseInt(value, 10);
  
      setQty90Message("");
      setIsQty90ToolTip(false);
      setQty90SKU("")
      record.Quantity90 = intValue;
      if (intValue > 0) {
        if (record && record.stock_90 && record.stock_90 >= intValue) {
  
          // Dispatch an action to update the quantity for the SKU
  
          // dispatch(updateQuantity90({
          //   sku: record.sku,
          //   qty90: intValue,
          //   MRP: record.mrp,
  
          // }));
  
  
        }
        else {
          // alert("Quantity is not available")
          const st90 = (record && record.stock_90 && record.stock_90) ? record.stock_90 : 0;
          setQty90Message("The quantity should not exceed the available stock")
          setIsQty90ToolTip(true)
          setQty90SKU(record.sku)
          //setQuantity90(0)
          // dispatch(updateQuantity90({
          //   sku: record.sku,
          //   qty90: st90,
          //   MRP: record.mrp
  
  
          // }));
  
  
  
        }
      } else if (intValue < 0) {
  
        // alert("Quantity cannot be negative")
        setQty90Message("Quantity cannot be negative")
        setIsQty90ToolTip(true)
        setQty90SKU(record.sku)
        console.log("Quantity cannot be negative")
      } else if (intValue === 0) {
        // dispatch(updateQuantity90({
        //   sku: record.sku,
        //   qty90: intValue,
        //   MRP: record.mrp,
  
        // }));
  
  
      }
  
      // Log the record for debugging or tracking purposes
  
    };

    const [selectedRowKeys, setSelectedRowKeys] = useState<BasicModelGoods[]>([]);

    const [selectedRow, setSelectedRow] = useState<BasicModelGoods[]>([])
    const handleSelectRow = (record: BasicModelGoods) => {
      console.log("record", record);
      if (selectedRow && selectedRow.length > 0) {
        const updatedSelectedRow = [...selectedRow];
        const index = selectedRow.findIndex(row => row.sku === record.sku);
        if (index !== -1) {
          updatedSelectedRow.splice(index, 1);
          setSelectedRow(updatedSelectedRow);
  
        } else if (index === -1) {
          setSelectedRowKeys([record]);
          if (record) {
            setSelectedRow(prev => [...prev, record]);
          }
        }
      } else {
        setSelectedRowKeys([record]);
        if (record) {
          setSelectedRow(prev => [...prev, record]);
        }
      }
  
    };

  
  




return (
    <div className='container'>

<Card style={{ marginTop:'80px'}}
          title="CALLAWAY HARDGOODS"
          extra={
            <div >
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <span className="gx-link">Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>   
                  <span className="gx-link">Products</span>
                </Breadcrumb.Item>
              
                <Breadcrumb.Item>Callaway HardGoods</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          }
        >
          <div  style={{ float: "right",marginBottom:"12px" }}>
          <Button className='mx-3 select-btn-detail'
          // onClick={handleImport}
          > <i className="bi bi-bag-check"></i> View cart</Button>

            <Button className='mx-3 select-btn-detail '
            //onClick={handleImport}
            > <i className="bi bi-file-earmark-arrow-up"></i> Import Products</Button>
            <Button className='mx-3 select-btn-detail'
            // onClick={handleExportToPDF} 
            > <i className="bi bi-file-earmark-pdf"></i> Export to PDF</Button>
            <Button className='mx-3 select-btn-detail'
           //onClick={handleExportToExcel}
            > <i className="bi bi-file-earmark-spreadsheet"></i> Export to Excel</Button>
            <Button className='mx-3 select-btn-detail'
            // onClick={handleSampleExcel}
             > <i className="bi bi-file-spreadsheet"></i> Sample Excel</Button>
          </div>



          <Table
          className='cart-table-profile'
            ref={tableRef}
            columns={columns}
            dataSource={allGoodsProduct?.map((item) => ({ ...item, key: item.sku }))}
            rowSelection={{
              onSelect: (record) => { handleSelectRow(record) }
            }}
         
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
  
            pagination={{
              position: ['topRight', 'bottomRight'], // Positions pagination at the top and bottom
              defaultPageSize: 20
            }}
          />
        </Card>

        

        {/* <SampleExcel
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
       /> */}

    </div>
  )
}

export default GooodsTable