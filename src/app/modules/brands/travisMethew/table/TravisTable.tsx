import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Tooltip, Pagination } from "antd";
import { Input, Radio, InputNumber, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import { BasicModelTravis, BasicModelTravisGraph, ImageType } from "../../../model/travis/TravisMethewModel"
import { useDispatch, useSelector } from "react-redux"
import { getTravisProducts, getOtherProducts, getPreOrderId, getTravisProgressStep, updateProgressStep, addPreOrderId, startUploadTravisImage, getTravisuploadImage } from "../../../../slice/allProducts/TravisMethewSlice"
import SampleExcelTravis from '../excel/SampleExcelTravis';
import travishtham from "../../../../../../public/media/logos/tm-logo.png"
import TravisImportExcel from '../excel/importExcel/TravisImportExcel';
import TravisImportProduct from "../excel/importExcel/TravisExportProduct"
import { ExcelModelTravis } from "../../../model/travis/TravisExcel"
import TravisExcelUploadDB from "../excel/importExcel/TravisExcelUploadDB"
import TravisUpdateQty from "../excel/importExcel/TravisUpdateQty"
import ScrolBottom  from "../../../../modules/ProductScrollBottom/ScrollBottom";


import {
  updateQuantity90, updateQuantity88,
  addOtherProduct, updateOtherQuantity90,
  updateOtherQuantity88, removeOtherProduct
} from "../../../../slice/allProducts/TravisMethewSlice"
import { Cascader, Select, Space } from 'antd';

import { Key } from 'antd/lib/table/interface';

import "./TravisTable.css"
import type { RadioChangeEvent, SelectProps } from 'antd';
import TravisPdf from '../pdf/TravisPdf';
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import ImageRenderer from "./column/gallery";
import { getCategory, getStyleCode } from "../../../../slice/allProducts/TravisMethewSlice"
import GetAllProduct from "../../../../api/allProduct/GetAllProduct"
import TravisQtyImport from '../excel/importExcel/TravisQtyImport';
import TravisUpdateQtyDb from '../excel/importExcel/TravisUpdateQtyDb';
import PreOrder from '../preOrder/PreOrder';
import UploadTravisImages from './UploadTravisImages';
import * as XLSX from 'xlsx';
import { TravisPdfPrint, Variation_sku_data } from '../../../model/pdf/PdfModel';
import { exit } from 'process';
import { LoadingStart } from '../../../../slice/loading/LoadingSlice';
import TravisImage from '../../../../pages/dashboard/TravisImage';
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice';


import TravisProductsToExcel from '../excel/ExportAllProduct'


import Loading from '../../../loading/Loading';

import { addTravisReatailerDetails, getTravisRetailerDetail } from "../../../../slice/allProducts/TravisMethewSlice";
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';
import TravisMathewPPt from '../pptTravis/TravisMathewPPt';
import { left } from '@popperjs/core';




type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Denim',];
const OPTIONS1 = ['SS19', 'SS20'];
const OPTIONS2 = ['1MR410', '1MO479', '1MR410',];




const TravisTable = () => {
  const getCurrentUsers = useSelector(getCurrentUser)
  const placement: SelectCommonPlacement = 'topLeft';
  const tableRef = useRef(null);
  const [isImport, setIsImport] = useState(false);
  const [isQtyImport, setIsQtyImport] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [isUpdate, setIsUpdateQty] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchInput = useRef<InputRef>(null);
  const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)
  const [amount, setAmount] = useState<number>()
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptionsOne = OPTIONS1.filter((o) => !selectedItems.includes(o));
  const [isCard, setIsCard] = useState<boolean>(true)
  const getStyleCodes = useSelector(getStyleCode)
  const getCategorys = useSelector(getCategory);
  const filteredOptions = getCategorys.filter((o) => !selectedItems.includes(o));
  const filteredOptionsTwo = getStyleCodes.filter((o) => !selectedItems.includes(o));
  const [allTravisProduct, setAllTravisProduct] = useState<BasicModelTravis[]>([])
  const [availTravisProduct, setAvailTravisProduct] = useState<BasicModelTravis[]>([])

  // get Trvis data
  useEffect(() => {

    const allTr: BasicModelTravis[] = []
    const allShowTr: BasicModelTravis[] = []
    if (getProduct && getProduct.length > 0) {
      getProduct.map(item => {
        allTr.push(item)
       
        
            if ((item.stock_88 != undefined && item.stock_88 > 0) || (item.stock_90 != undefined && item.stock_90 > 0)) {
              allShowTr.push(item)
  
            }
  
  
        
        
      })
    }
    setAllTravisProduct(allTr)

    if(allShowTr && allShowTr.length){
      setAvailTravisProduct(allShowTr)
    }
    //localStorage.setItem("Travis",JSON.stringify(allTr))
  }, [getProduct])

  const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);
  //const filteredProducts = showAvailableOnly ? allTravisProduct.filter(product => product.Quantity88 > 0 && product.Quantity90 > 0) : allTravisProduct;

  const handleCheckboxClick = (showAvailableOnly: boolean) => {
    setShowAvailableOnly(!showAvailableOnly);

  };


  const columns: TableColumnsType<BasicModelTravis> = [
    {
      dataIndex: "primary_image_url",

      width: 50,
      render: (value, record) => <ImageRenderer
        record={record} />

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
          // check = record.sku.startsWith(valUpper) || record.sku.startsWith(valLower);
          check = record.sku.includes(valUpper) || record.sku.includes(valLower);
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
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8, width: "300px", position: "absolute", top: -90, zIndex: 1 }}>
          <Input
            ref={searchInput}

            placeholder="Search Description"
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

        if (record && record.description) {
          // check = record.sku.startsWith(valUpper) || record.sku.startsWith(valLower);
          check = record.description.includes(valUpper) || record.description.includes(valLower);
        }




        return check;
      },
      filterSearch: true,

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
      title: "Season",
      dataIndex: "season",
      key: "season",
      width: 100,

      sorter: (a, b) => {
        // Extract and compare Season values, handling null or undefined cases
        const seasonA = a.season ?? "";
        const seasonB = b.season ?? "";

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
            {filteredOptionsOne.map((item) => (
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
        const Season = record?.season;


        return Season === value;
      },
      filterSearch: true,
    },



    {
      title: "Style",
      dataIndex: "style_code",
      key: "style_code",
      width: 90,

      sorter: (a, b) => {
        // Extract and compare StyleCode values, handling null or undefined cases
        const styleCodeA = a.style_code ?? "";
        const styleCodeB = b.style_code ?? "";

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
            {filteredOptionsTwo.map((item) => (
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
        const StyleCode = record?.style_code;


        return StyleCode === value;
      },
      filterSearch: true,
    },




    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 100,

      sorter: (a, b) => {
        // Extract and compare StyleCode values, handling null or undefined cases
        const styleCodeA = a.color ?? "";
        const styleCodeB = b.color ?? "";

        return styleCodeA.localeCompare(styleCodeB);
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 65,

      sorter: (a, b) => {
        // Extract and compare StyleCode values, handling null or undefined cases
        const styleCodeA = a.size ?? "";
        const styleCodeB = b.size ?? "";

        return styleCodeA.localeCompare(styleCodeB);
      },
    },



    {
      title: "Qty88",
      dataIndex: "stock_88",
      key: "stock_88",
      width: 120,
      fixed: 'right',
      render: (value, record) => {

        return (
          <Tooltip
            open={record.sku === qty88ToolSKU ? isQty88ToolTip : false}
            title={record.sku === qty88ToolSKU ? qty88ToolMesage : ""}
            placement="top"
          >
            <InputNumber
              status={record.sku === qty88ToolSKU && qty88ToolMesage !== "" ? "error" : ""}
              className=' number-input'
              addonBefore={record.stock_88 == 0 ? 0 : record.stock_88}
              value={record.Quantity88?.toString()}
              style={{ width: 100 }}
              onChange={(value) => {
                if (value !== null) {
                  handleQuantity88(value, record);
                }
              }}
              disabled={record.stock_88 === 0}
            />
          </Tooltip>
        );
      }
    },

    {
      title: "Qty90",
      dataIndex: "stock_90",
      key: "stock_90",
      width: 120,
      fixed: 'right',
      render: (value, record) => (

        <Tooltip open={record.sku === qty90ToolSKU ? isQty90ToolTip : false} title={record.sku === qty90ToolSKU ? qty90ToolMesage : ""} placement="top">
          <InputNumber
            status={record.sku === qty90ToolSKU && qty90ToolMesage != "" ? "error" : ""}
            className=' number-input'
            addonBefore={record.stock_90 == 0 ? 0 : record.stock_90}
            style={{ width: 100 }}
            // addonBefore={record.stock_90 || 0}
            value={record.Quantity90?.toString()}
            onChange={(value) => {
              if (value !== null) {

                handleQuantity90(value, record)
              }

            }}

            // disabled={value != null && value.stock_90 === 0}

            // style={{ width: 100 }}
            disabled={record.stock_90 === 0}

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


  //get other product 
  const getOtherProduct = useSelector(getOtherProducts)
  const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelTravis[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string>('');

  const handleExpand = (expanded: boolean, record: BasicModelTravis) => {
    setExpandedRowKeys([])
    dispatch(removeOtherProduct())
    if (record.sku && record.variation_sku != "" && record.variation_sku != undefined) {
      const inputString = record.variation_sku
      const stringArray = inputString.split(',').map(item => item.trim());
      const varskuArray: BasicModelTravis[] = [];
      const keys: string = "";
      console.log("vartion sku", stringArray)
      getProduct.map((item) => {
        if (stringArray && stringArray.length > 0) {
          stringArray.map(varSku => {
            if (item.sku === varSku) {
              varskuArray.push(item)

            }
          })

        }

      })

      // if (stringArray && stringArray.length > 0){
      //   stringArray.map(item=>{
      //     const findTravis= getProduct.find(travis=>travis.sku===item);
      //     console.log("findTravis",findTravis)
      //     if(findTravis){
      //       varskuArray.push(findTravis)
      //     }

      //   })
      // }
      console.log("new array", varskuArray)
      // Expand only the clicked row
      setExpandedKeys(record.sku)
      setExpandedRowKeys(varskuArray);
      dispatch(addOtherProduct(varskuArray))
      // expandedRowRender (record.products.data)  // Assuming SKU is a string
    } else {
      setExpandedRowKeys([])
      setExpandedKeys("")
    }
  };


  const expandedRowRender = (record: BasicModelTravis) => {

    if (record) {

      const subcolumns: TableColumnsType<BasicModelTravis> = [

        {
          title: "SKU",
          dataIndex: "sku",
          key: "sku",
          width: 100,
          fixed: "left",
        }
        ,


        {
          title: "Style",
          dataIndex: "style_code",
          key: "style_code",
          width: 100,

        },
        {
          title: "Size",
          dataIndex: "size",
          key: "size",
          width: 100,

        },


        //         { title: "Qty88",
        //         dataIndex: "TravisAttributes",
        //         key: "Stock88", 
        //         width: 100,
        //         fixed:'right',
        //         render: (value,record) => (
        //           <Tooltip  open={record.SKU=== qty881ToolSKU ?isQty881ToolTip:false} title={record.SKU=== qty881ToolSKU ? qty881ToolMesage : ""} placement="top">
        //           {/* <Input 
        //           addonBefore={value[0]?.Stock88} 
        //           type='number'

        //           value={record.Quantity88?.toString()}
        //           onChange={(e) => handleQuantity881(e.target.value, record)}
        //           disabled={value[0]?.Stock88 === 0} 
        //           /> */}
        //            <InputNumber
        //                status={record.sku=== qty88ToolSKU &&qty88ToolMesage!=""?"error":""}
        //               className='mx-3 number-input'
        //               addonBefore={value[0]?.Stock88} 
        //               value={record.Quantity88?.toString()}
        //               style={{ width: 100 }}
        //               onChange={(value) => {
        //                 if (value !== null) {
        //                   handleQuantity881(value, record)
        //                 }

        //               }}


        //               disabled={value[0]?.Stock90 === 0} 
        //             />
        //          </Tooltip>
        //         ),
        //       },
        //       {
        //         title: "Qty90",
        //       dataIndex: "TravisAttributes",
        //       key: "Stock88", 
        //       width: 100,
        //       fixed:'right',
        //       render: (value,record) => (
        //         <Tooltip  open={record.SKU=== qty901ToolSKU ?isQty901ToolTip:false} title={record.SKU=== qty901ToolSKU ? qty901ToolMesage : ""} placement="top">
        //         {/* <Input addonBefore={value[0]?.Stock90||0} 
        //         type='number'

        //         value={record.Quantity90?.toString()}
        //         onChange={(e) => handleQuantity901(e.target.value, record)} 
        //         disabled={value[0]?.Stock90 === 0} 
        //         /> */}

        // <InputNumber
        //  status={record.sku=== qty90ToolSKU &&qty90ToolMesage!=""?"error":""}
        //               className='mx-5 number-input'
        //               addonBefore={value[0]?.Stock90||0} 
        //               value={record.Quantity90?.toString()}
        //               onChange={(value) => {
        //                 if (value !== null) {
        //                   handleQuantity901(value, record)
        //                 }

        //               }}

        //               disabled={value[0]?.Stock90 === 0} 
        //               style={{ width: 100 }}
        //             />
        //        </Tooltip>
        //       ),
        //       },




        {
          title: "Qty88",
          dataIndex: "stock_88",
          key: "stock_88",
          width: 150,
          fixed: 'right',
          render: (value, record) => (
            <Tooltip open={record.sku === qty88ToolSKU ? isQty88ToolTip : false} title={record.sku === qty88ToolSKU ? qty88ToolMesage : ""} placement="top">
              <InputNumber
                status={record.sku === qty88ToolSKU && qty88ToolMesage != "" ? "error" : ""}
                className='mx-3 number-input'
                // addonBefore={record.stock_88}
                addonBefore={record.stock_88 == 0 ? 0 : record.stock_88}

                value={record.Quantity88?.toString()}
                style={{ width: 100 }}
                onChange={(value) => {
                  if (value !== null) {
                    handleQuantity881(value, record)
                  }

                }}


                // disabled={value !== null && value?.stock_88 === 0}
                disabled={record.stock_88 === 0}

              />
            </Tooltip>

          ),
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
                //  addonBefore={record.stock_90 || 0}
                addonBefore={record.stock_90}

                value={record.Quantity90?.toString()}
                onChange={(value) => {
                  if (value !== null) {
                    handleQuantity901(value, record)
                  }

                }}

                //disabled={value !== null && value?.stock_90 === 0}
                disabled={record.stock_90 === 0}

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
          fixed: 'right',

        },
        {
          title: "Amount ",
          dataIndex: "Amount",
          key: "Amount",
          width: 100,
          fixed: 'right'
        },

      ]

      if (expandedRowKeys && getOtherProduct) {


        return (


          <Table className='cart-table-profile'
            columns={subcolumns}
            dataSource={getOtherProduct?.map((item) => ({ ...item, key: item.sku }))}
            pagination={false}

            size="middle"

            rowSelection={{
              onSelect: (record, selected) => { handleSelctRow(record, selected) }
            }}
          />


        );

      }
      else
        return null

    }
  }
  //const [selectedRowKeys, setSelectedRowKeys] = useState<BasicModelTravis[]>([]);


  const onSelectChange = (newSelectedRowKeys: Key[], record: BasicModelTravis) => {

  };


  const [qty901ToolMesage, setQty901Message] = useState<string>("")
  const [qty901ToolSKU, setQty901SKU] = useState<string | undefined>("")
  const [isQty901ToolTip, setIsQty901ToolTip] = useState<boolean>(false)
  const handleQuantity901 = (value: string, record: BasicModelTravis) => {
    console.log("qunatity: handleQuantity 90", value,)
    const intValue = parseInt(value, 10);
    setQty901Message("");
    setIsQty901ToolTip(false);
    setQty901SKU("")

    record.Quantity90 = intValue;
    if (intValue > 0) {
      if (record && record.stock_90 && record.stock_90 >= intValue) {

        // Dispatch an action to update the quantity for the SKU

        dispatch(updateQuantity90({
          sku: record.sku,
          qty90: intValue,
          MRP: record.mrp,

        }));
        dispatch(updateOtherQuantity90({
          sku: record.sku,
          qty90: intValue,
          MRP: record.mrp,

        }));


      }
      else {
        // alert("Quantity is not available")
        const st90 = (record && record.stock_90 && record.stock_90) ? record.stock_90 : 0;
        setQty90Message("The quantity should not exceed the available stock")
        setIsQty90ToolTip(true)
        setQty90SKU(record.sku)

        dispatch(updateQuantity90({
          sku: record.sku,
          qty90: st90,
          MRP: record.mrp


        }));
        dispatch(updateOtherQuantity90({
          sku: record.sku,
          qty90: st90,
          MRP: record.mrp,

        }));



      }
    } else if (intValue < 0) {

      // alert("Quantity cannot be negative")
      setQty90Message("Quantity cannot be negative")
      setIsQty90ToolTip(true)
      setQty90SKU(record.sku)
    } else if (intValue === 0) {
      dispatch(updateQuantity90({
        sku: record.sku,
        qty90: intValue,
        MRP: record.mrp,

      }));
      dispatch(updateOtherQuantity90({
        sku: record.sku,
        qty90: intValue,
        MRP: record.mrp,

      }));

    }




    // Log the record for debugging or tracking purposes

  };

  const [qty90ToolMesage, setQty90Message] = useState<string>("")
  const [qty90ToolSKU, setQty90SKU] = useState<string | undefined>("")
  const [isQty90ToolTip, setIsQty90ToolTip] = useState<boolean>(false)

  useEffect(() => {
    if (qty90ToolMesage) {
      const timeout = setTimeout(() => {
        setQty90Message("");
        //setQty90SKU("");
        setIsQty90ToolTip(false)
      }, 3000); // 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [qty90ToolMesage])

  const handleQuantity90 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);

    setQty90Message("");
    setIsQty90ToolTip(false);
    setQty90SKU("")
    record.Quantity90 = intValue;
    if (intValue > 0) {
      if (record && record.stock_90 && record.stock_90 >= intValue) {

        // Dispatch an action to update the quantity for the SKU

        dispatch(updateQuantity90({
          sku: record.sku,
          qty90: intValue,
          MRP: record.mrp,

        }));
        dispatch(updateProgressStep({
          progressStep: 0,

        }))


      }
      else {
        // alert("Quantity is not available")
        const st90 = (record && record.stock_90 && record.stock_90) ? record.stock_90 : 0;
        setQty90Message("The quantity should not exceed the available stock")
        setIsQty90ToolTip(true)
        setQty90SKU(record.sku)
        //setQuantity90(0)
        dispatch(updateQuantity90({
          sku: record.sku,
          qty90: st90,
          MRP: record.mrp


        }));



      }
    } else if (intValue < 0) {

      // alert("Quantity cannot be negative")
      setQty90Message("Quantity cannot be negative")
      setIsQty90ToolTip(true)
      setQty90SKU(record.sku)
    } else if (intValue === 0) {
      dispatch(updateQuantity90({
        sku: record.sku,
        qty90: intValue,
        MRP: record.mrp,

      }));


    }

    // Log the record for debugging or tracking purposes

  };
  const [qty88ToolMesage, setQty88Message] = useState<string>("")
  const [qty88ToolSKU, setQty88SKU] = useState<string | undefined>("")
  const [isQty88ToolTip, setIsQty88ToolTip] = useState<boolean>(false)


  useEffect(() => {
    if (qty88ToolMesage) {
      const timeout = setTimeout(() => {
        setQty88Message("");
        //setQty90SKU("");
        setIsQty88ToolTip(false)
      }, 3000); // 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [qty88ToolMesage])

  const handleQuantity88 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);
    setQty88Message("");
    setIsQty88ToolTip(false);
    setQty88SKU("")
    if (intValue > 0) {

      if (record && record.stock_88 && record.stock_88 >= intValue) {


        dispatch(updateQuantity88({
          sku: record.sku,
          qty88: intValue,
          MRP: record.mrp,
        }));
        dispatch(updateProgressStep({
          progressStep: 0,

        }))



      }
      else if (record && record.stock_88 && record.stock_88) {
        // alert("Quantity is not available")
        setQty88Message("The quantity should not exceed the available stock")
        setIsQty88ToolTip(true)
        setQty88SKU(record.sku)
        const st88 = (record && record.stock_88) ? record.stock_88 : 0;
        dispatch(updateQuantity88({
          sku: record.sku,
          qty88: st88,
          MRP: record.mrp
        }));


      }
    } else if (intValue < 0) {
      // alert("Quantity cannot be negative")
      setQty88Message("Quantity cannot be negative")
      setIsQty88ToolTip(true)
      setQty88SKU(record.sku)
    } else if (intValue === 0) {
      dispatch(updateQuantity88({
        sku: record.sku,
        qty88: intValue,
        MRP: record.mrp,
      }));


    }

  };

  const [qty881ToolMesage, setQty881Message] = useState<string>("")
  const [qty881ToolSKU, setQty881SKU] = useState<string | undefined>("")
  const [isQty881ToolTip, setIsQty881ToolTip] = useState<boolean>(false)



  const handleQuantity881 = (value: string, record: BasicModelTravis) => {
    setQty881Message("");
    setIsQty881ToolTip(false);
    setQty881SKU("")
    const intValue = parseInt(value, 10);

    if (intValue > 0) {

      if (record && record.stock_88 && record.stock_88 >= intValue) {


        dispatch(updateQuantity88({
          sku: record.sku,
          qty88: intValue,
          MRP: record.mrp,
        }));
        dispatch(updateOtherQuantity88({
          sku: record.sku,
          qty88: intValue,
          MRP: record.mrp,
        }))

      }
      else if (record && record.stock_88 && record.stock_88) {
        // alert("Quantity is not available")
        setQty88Message("The quantity should not exceed the available stock")
        setIsQty88ToolTip(true)
        setQty88SKU(record.sku)
        const st88 = (record && record.stock_88) ? record.stock_88 : 0;
        dispatch(updateQuantity88({
          sku: record.sku,
          qty88: st88,
          MRP: record.mrp
        }));
        dispatch(updateOtherQuantity88({
          sku: record.sku,
          qty88: st88,
          MRP: record.mrp,
        }))


      }
    } else if (intValue < 0) {
      // alert("Quantity cannot be negative")
      setQty88Message("Quantity cannot be negative")
      setIsQty88ToolTip(true)
      setQty88SKU(record.sku)
    } else if (intValue === 0) {
      dispatch(updateQuantity88({
        sku: record.sku,
        qty88: intValue,
        MRP: record.mrp,
      }));
      dispatch(updateOtherQuantity88({
        sku: record.sku,
        qty88: intValue,
        MRP: record.mrp,
      }))
    }


  };
  // sample xls
  const [isSample, setIsSample] = useState<boolean>(false)
  const handleSampleExcel = () => {
    setIsSample(true)
  }



  const handleResetIsSample = () => {
    setIsSample(false)
  }

  // handle Excels Data
  const handleImport = () => {
    setIsImport(true);
  };

  const handleCloseImport = () => {
    setIsImport(false);
  };

  // handle Excels product
  const handleProduct = () => {
    setIsProduct(true);
  };
  const handleCloseProduct = () => {
    setIsProduct(false);
  };

  // handle Excels product
  const handleUpdateQty = () => {
    setIsUpdateQty(true);
  };
  const handleCloseUpdateQty = () => {
    setIsUpdateQty(false);
  };


  const [allXlxData, setAllXlxData] = useState<ExcelModelTravis[]>([])
  const handleTravisData = (allDatat: ExcelModelTravis[]) => {
    const table = tableRef.current;
    handleCloseImport()

    setAllXlxData(allDatat)
  }

  //reset excel datta
  const handleResetXlData = () => {
    setAllXlxData([])
  }

  //exportto excel
  // const handleExportToExcel = () => {
  //   try {



  //     const table = tableRef.current as HTMLTableElement | null;

  //     if (!table) {
  //       console.error("Table element not found.");
  //       return;
  //     }

  //     // Get the table's outerHTML
  //     const tableHtml = table.outerHTML;

  //     // Create a Blob object representing the data as an XLSX file
  //     const blob = new Blob([tableHtml], {
  //       type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  //     });

  //     // Create a temporary anchor element to download the Blob
  //     const anchor = document.createElement('a');
  //     const url = URL.createObjectURL(blob);

  //     anchor.href = url;
  //     anchor.download = `TravisMathewProducts_${Date.now()}.xlsx`;
  //     anchor.click();

  //     // Release the object URL
  //     URL.revokeObjectURL(url);


  //   } catch (error) {
  //     console.error("Error exporting to Excel:", error);
  //   }
  // };selectedRowKeys


  const handleExportToExcel = (selectedRow: BasicModelTravis[]) => {
    try {
      if (!selectedRow) {
        console.error("No row selected.");
        return;
      }

      const worksheetData = selectedRow.map(row => ({
        "sku": row.sku,
        "description": row.description,
        "category": row.category,
        "season": row.season,
        "style_code": row.style_code,
        "color": row.color,
        "size": row.size,
        "stock_90": row.stock_90,
        "stock_88": row.stock_88,
        "gst": row.gst,
        "mrp": row.mrp,
        // Add more columns as needed
      }));

      const worksheet = XLSX.utils.json_to_sheet(worksheetData);

      // Create a new workbook and append the worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Generate a binary string representation of the workbook
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

      // Create a Blob object from the binary string
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

      // Create a temporary anchor element to download the Blob
      const anchor = document.createElement('a');
      const url = URL.createObjectURL(blob);

      anchor.href = url;
      anchor.download = `TravisMathewProducts_${Date.now()}.xlsx`;
      anchor.click();

      // Release the object URL
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };




  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [uniqueSku, setUniqueSku] = useState<string[]>([])
  const [uniqueVariationSku, setUniqueVariationSku] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<BasicModelTravis[]>([])
  const [selectedRowVartionSku, setSelectedRowVartionSku] = useState<TravisPdfPrint[]>([])
  const handleSelctRow = (record: BasicModelTravis, selected: boolean) => {
    const skuSet = new Set<string>(uniqueSku);
    const variationSkuSet = new Set<string>(uniqueVariationSku);

    if (selected && record && record.sku) {
      setSelectedRow(prev => [...prev, record]);
      const key = record.sku
      setSelectedRowKeys(prev => [...prev, key]);
      if (record && record.variation_sku && record.variation_sku != undefined && record.variation_sku !== "") {
        const stringArray = record.variation_sku.split(',').map(item => item.trim());
        if (uniqueVariationSku && uniqueVariationSku.length > 0) {
          let check = false;

          uniqueVariationSku.forEach(objVarSku => {
            const stringVar = objVarSku.split(',').map(item => item.trim());


            if (stringVar.length > 0 && stringArray.length > 0) {
              stringArray.forEach(item => {
                if (stringVar.includes(item)) {
                  check = true;
                }
              });
            }
          });

          if (!check) {
            variationSkuSet.add(record.variation_sku);
            makePdfPring(record.variation_sku, record)
          }
        } else {
          variationSkuSet.add(record.variation_sku);
          makePdfPring(record.variation_sku, record)
        }
      }

      setUniqueVariationSku(Array.from(variationSkuSet));
    } else {
      const updatedSelectedRow = selectedRow.filter(row => row.sku !== record.sku);
      setSelectedRow(updatedSelectedRow);
      setSelectedRowKeys(prev => prev.filter(key => key !== record.sku));
    }
  };


  const makePdfPring = (variationSku: string, record: BasicModelTravis) => {
    const stringVar = variationSku.split(',').map(item => item.trim());
    const totalVarSkuData: Variation_sku_data[] = [];
    if (stringVar.length > 0) {
      stringVar.map(varSku => {
        const travisData = allTravisProduct.find(travis => travis.sku === varSku);
        if (travisData) {
          const varSkuData = {
            sku: travisData.sku,
            size: travisData.size,
            qty: (travisData.stock_88 || 0) + (travisData.stock_90 || 0),
            mrp: travisData.mrp
          };
          totalVarSkuData.push(varSkuData);

        }

      })
      const otherInfo = {
        color: record.color,
        style_code: record.style_code,
        category: record.category,
        gender: record.gender,
        season: record.season,
        mrp: record.mrp ? record.mrp : 0,
      };
      const allVarSku = {
        family: record.family,
        primary_image_url: record.primary_image_url,
        gallery_images_url: record.gallery_images_url,
        name: record.name,
        description: record.description,
        variation_sku: variationSku,
        otherInfo: otherInfo,
        variation_sku_data: totalVarSkuData
      };
      setSelectedRowVartionSku(prev => [...prev, allVarSku])
    }

  }

  useEffect(() => {
    console.log("uniqueSku", selectedRowVartionSku)
  }, [selectedRowVartionSku])


  // export to pdf 
  const [isPDF, setIspdf] = useState<boolean>(false)
  const handleResetSelectedRow = () => {
    setSelectedRowKeys([]);
    setSelectedRow([])
    setIspdf(false)
    setSelectedRowVartionSku([])
    // setIsCard(true)
  }

  const getPreOrderIds = useSelector(getPreOrderId)
  // view cart
  const handleViewCard = () => {
    navigate("/cart")
  }


  // show pd()
  const handleShowPdf = () => {
    setIsProduct(false)
    setIspdf(true)
  }
  const handleDownloadExcel = () => {
    handleExportToExcel(selectedRow)
    setIsProduct(false)
  }

  // handle update quantity Data
  const handleQtyImport = () => {
    setIsQtyImport(true);
  };
  const handleCloseQtyImport = () => {
    setIsQtyImport(false);
  };


  const [allQtyXlxData, setQtyAllXlxData] = useState<ExcelModelTravis[]>([])
  const handleTravisQtyData = (allDatat: ExcelModelTravis[]) => {
    const table = tableRef.current;
    handleCloseQtyImport()


    setQtyAllXlxData(allDatat)
  }

  const handleReseyQtyData = (message: string) => {
    if (message != "") {
      alert(message)
    } else {
      alert("something went wrong")
    }
    setQtyAllXlxData([])
  }

  // update progress step
  const getPregressSteps = useSelector(getTravisProgressStep)
  useEffect(() => {
    if (getPregressSteps === 4) {
      dispatch(updateProgressStep({
        progressStep: 0
      }))

      dispatch(addPreOrderId({
        preOrderId: 0
      }))
    }

  }, [getPregressSteps])

  const [isStartSearch, setIsStartSearch] = useState<boolean>(false)
  const handelUploadImage = () => {
    // setIsStartSearch(true)
    dispatch(startUploadTravisImage())
    dispatch(LoadingStart())
  }


  const handleResetUploadImages = () => {
    setIsStartSearch(false)
  }

  const getTravisuploadImages = useSelector(getTravisuploadImage)
  const [isExportAll, setIsExportAll] = useState<boolean>(false)


  const handleDownloadAllExcel = () => {
    setIsExportAll(true)
    setIsProduct(false)


  }
  const handleResetExportAll = () => {
    setIsExportAll(false)
  }

  const [isPPT, setIsPPt] = useState<boolean>(false)
  const handlePPT = () => {
    setIsPPt(true)
  }


  const handleResetPPT = () => {
    setIsPPt(false)
    setIsProduct(false)
    setSelectedRowKeys([]);
    setSelectedRow([])
    setIspdf(false)
    setSelectedRowVartionSku([])

  }
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(200);
 




  return (
    <div className='container'>

      {isCard && <Card className='travish-mat-section' style={{ marginTop: '80px', padding: "10px", }}
        title="TRAVIS MATHEW"
        extra={
          <div >
            <Breadcrumb separator=">">
              <Breadcrumb.Item>
                <span className="gx-link">Home</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <span className="gx-link">Products</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Travis Mathew</Breadcrumb.Item>
            </Breadcrumb>
          </div>

        }

      >

        <div className='row'>

          <div className="form-check form-check-custom form-check-solid  cursor-pointer col-4" style={{ paddingLeft: "10px" }}>
            <input
              className="form-check-input submit-order"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              checked={showAvailableOnly}
              onClick={() => handleCheckboxClick(showAvailableOnly)}
            />
            <label className="form-check-label fs-4 text-gray-700 cursor-pointer" style={{ fontWeight: "500" }}>
              Show Only Available Products


            </label>
          </div>






          <div className='col-8' style={{ float: "right", marginBottom: "12px", textAlign: "end", }}>

            <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '

              onClick={handleViewCard}
            > <i className="bi bi-bag fs-3"></i> View Cart</Button>


            {getCurrentUsers && getCurrentUsers.role !== "Retailer" && <Button className=' btn  px-6 p-0  btn-travis mx-3 hover-elevate-up '
              onClick={handleImport}
            > <i className="bi bi-file-earmark-arrow-down fs-3"></i>Import Products</Button>
            }


            {getCurrentUsers && getCurrentUsers.role !== "Retailer" && <Button className=' btn px-6 p-0  btn-travis mx-3 hover-elevate-up '
              onClick={handleQtyImport}
            > <i className="bi bi-arrow-repeat fs-3"></i> Update Qty </Button>}

            <Button className=' btn  px-6 p-0  btn-travis mx-3 hover-elevate-up'
              onClick={handleProduct}
            //  onClick={handleSampleExcel}
            > <i className="bi bi-file-earmark-arrow-up fs-3"></i>Export Products </Button>

          </div>

        </div>


        {/* <div className='show-prodect-section' >
          <h4 className='fs-4 '>Showing <i><span className='fs-2 fw-bold '>{getProduct.length}</span></i> products</h4>
        
        </div>  */}

          {!showAvailableOnly?(
             allTravisProduct.length > 0 ? (
              <div>
                <Table
                  className='cart-table-profile'
                  ref={tableRef}
                  columns={columns}
                  dataSource={allTravisProduct?.map((item) => ({ ...item, key: item?.sku }))}
                  rowSelection={{
                    selectedRowKeys,
                    onSelect: handleSelctRow,
                  }}
                  expandable={{
                    expandedRowRender,
                    onExpand: (expanded, record) => handleExpand(expanded, record),
                  }}
                  bordered
                  size="middle"
                  scroll={{ x: "100%", y: "auto" }}
                  pagination={{
                    position: ['topRight', 'bottomRight'], // Positions pagination at the top and bottom
                    defaultPageSize: 200,
            
                    showTotal: (total) => <span className="ant-pagination-total-text">Total {total} items</span>,
                    showSizeChanger: true, // Show page size changer
                    pageSizeOptions: ['100', '200', '300', '400', '500', '600', '1000'], // Page size options
                  }}
                />
  
  <ScrolBottom 
                ViewCart={handleViewCard}
                imports={handleImport}
                qtyImport={handleQtyImport}
                product={handleProduct} 
               />
  
  
              </div>
            ):(<Loading/>)
          ):(availTravisProduct &&
            availTravisProduct.length>0?(
              <div>
              <Table
                className='cart-table-profile'
                ref={tableRef}
                columns={columns}
                dataSource={availTravisProduct?.map((item) => ({ ...item, key: item?.sku }))}
                rowSelection={{
                  selectedRowKeys,
                  onSelect: handleSelctRow,
                }}
                expandable={{
                  expandedRowRender,
                  onExpand: (expanded, record) => handleExpand(expanded, record),
                }}
                bordered
                size="middle"
                scroll={{ x: "100%", y: "auto" }}
                pagination={{
                  position: ['topRight', 'bottomRight'], // Positions pagination at the top and bottom
                  defaultPageSize: 200,
                  showTotal: (total) => <span className="ant-pagination-total-text ">Total <span className='total-page '> <i> {total} </i></span> items</span>,
                  showSizeChanger: true, // Show page size changer
                  pageSizeOptions: ['100', '200', '300', '400', '500', '600', '1000'], // Page size options
                }}
              />

<ScrolBottom 
                  ViewCart={handleViewCard}
                  imports={handleImport}
                  qtyImport={handleQtyImport}
                  product={handleProduct}
             />

            </div>
            ):(<Loading/>)
          )}

    
       


      </Card>}


      <SampleExcelTravis
        isSample={isSample}
        resetIsSample={handleResetIsSample}
      />

      <TravisImportExcel
        isImport={isImport}
        onClose={handleCloseImport}
        allGoodsData={handleTravisData}
      />


      <TravisQtyImport
        isQtyImport={isQtyImport}
        onClose={handleCloseQtyImport}
        travisQtyData={handleTravisQtyData}
      />


      <TravisUpdateQtyDb
        allQtyXlxData={allQtyXlxData}
        resetQtyData={handleReseyQtyData}


      />


      <TravisUpdateQty
        isUpdate={isUpdate}
        onClose={handleCloseUpdateQty}
        allGoodsData={handleTravisData}
      />



      <TravisImportProduct
        isProduct={isProduct}
        onClose={handleCloseProduct}
        allGoodsData={handleTravisData}
        printPdf={handleShowPdf}
        excelExport={handleDownloadExcel}
        excelAllExport={handleDownloadAllExcel}
        ppt={handlePPT}
      />

      <TravisExcelUploadDB
        xlData={allXlxData}
        resetXls={handleResetXlData}
      />

      {isPDF && <TravisPdf
        selectedRow={selectedRowVartionSku}
        resetSelectedRow={handleResetSelectedRow}
      />}


      {isPPT &&
        <TravisMathewPPt
          selectedRowVartionSku={selectedRowVartionSku}
          resetPPT={handleResetPPT}
        />
      }

      {isStartSearch &&
        <UploadTravisImages
          resetUploadImages={handleResetUploadImages}
        />}
      <PreOrder />

      {getTravisuploadImages && <TravisImage />}


      {isExportAll && <TravisProductsToExcel
        resetExportAll={handleResetExportAll}

      />}

    </div>
  )
}

export default TravisTable