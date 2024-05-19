import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Tooltip } from "antd";
import { Input, Radio, InputNumber, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import { BasicModelTravis, BasicModelTravisGraph, ImageType } from "../../../model/travis/TravisMethewModel"
import { useDispatch, useSelector } from "react-redux"
import { getTravisProducts, getOtherProducts } from "../../../../slice/allProducts/TravisMethewSlice"
import SampleExcelTravis from '../excel/SampleExcelTravis';
import travishtham from "../../../../../../public/media/logos/tm-logo.png"
import TravisImportExcel from '../excel/importExcel/TravisImportExcel';
import { ExcelModelTravis } from "../../../model/travis/TravisExcel"
import TravisExcelUploadDB from "../excel/importExcel/TravisExcelUploadDB"
import tmlogo from "../../../../../../public/media/logos/tm_thum.png"
import {  Dropdown } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';

// import * as XLSX from 'xlsx';

import {
  updateQuantity90, updateQuantity88,
  addOtherProduct, updateOtherQuantity90,
  updateOtherQuantity88, removeOtherProduct
} from "../../../../slice/allProducts/TravisMethewSlice"
import { Cascader, Select, Space } from 'antd';
import { addTravisOrder, removeTravisOrder } from "../../../../slice/orderSlice/travis/CartOrder"
import { message } from "antd";
import { Key } from 'antd/lib/table/interface';

import "./TravisTable.css"
import type { RadioChangeEvent, SelectProps } from 'antd';
import TravisPdf from '../pdf/TravisPdf';
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import ImageRenderer from "./column/gallery";
import { getCategory, getStyleCode } from "../../../../slice/allProducts/TravisMethewSlice"
import GetAllProduct from "../../../../api/allProduct/GetAllProduct"
import { list } from 'aws-amplify/storage';

type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Denim',];
const OPTIONS1 = ['SS19', 'SS20'];
const OPTIONS2 = ['1MR410', '1MO479', '1MR410',];


const items = [
  {
    key: '1',
    label: (

       50

    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];




const TravisTable = () => {

  const placement: SelectCommonPlacement = 'topLeft';
  const tableRef = useRef(null);
  const [isImport, setIsImport] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchInput = useRef<InputRef>(null);
  const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)
  const [amount, setAmount] = useState<number>()
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptionsOne = OPTIONS1.filter((o) => !selectedItems.includes(o));
  const [isCard, setIsCard] = useState<boolean>(true)
  //console.log(" travis Product",getProduct)
  const getStyleCodes = useSelector(getStyleCode)
  const getCategorys = useSelector(getCategory);
  const filteredOptions = getCategorys.filter((o) => !selectedItems.includes(o));
  const filteredOptionsTwo = getStyleCodes.filter((o) => !selectedItems.includes(o));

  try {
    const result =  list({
      path: 'public/uploads/',
      // Alternatively, path: ({identityId}) => `album/{identityId}/photos/`
    });
    console.log("result AWS -------->", result)
  } catch (error) {
    console.log(error);
  }
  
  
  const columns: TableColumnsType<BasicModelTravis> = [
    {
      dataIndex: "primary_image_url",
      width: 50,
      render: (value, record) => {

        let newSKU
        const checkFolderExists = async (bucketName: string, folderPath: string) => {
          try {
            const result =  list({
              path: folderPath,
              // Alternatively, path: ({identityId}) => `album/{identityId}/photos/`
            });
            console.log("result AWS -------->", result)

            
          } catch (error) {
            console.error('Error checking folder existence:', error);
            return false; // Return false in case of any error
          }
        }

        if (record && record.sku) {
          const removeLastUnderscore = (str: string) => {
            const lastUnderscoreIndex = str.lastIndexOf('_');
            if (lastUnderscoreIndex !== -1) {
              return str.substring(0, lastUnderscoreIndex);
            }
            return str;
          };
          newSKU = removeLastUnderscore(record?.sku);
          const folderPath = 'https://s3.console.aws.amazon.com/s3/buckets/callawaystoragedevbucket1ca9b-dev';
          checkFolderExists(newSKU, folderPath)
        }
        // Configure AWS SDK with your credentials and region


        // Create an S3 object instance

        // Function to check folder existence
        return (
          record.primary_image_url !== "" ? (
            <Image.PreviewGroup
              items={[
                '/public/media/product/drivers-1.png',
                '/public/media/product/drivers-2.png',
                '/public/media/product/drivers-3.png',
                '/public/media/product/drivers-4.png',
              ]}
            >
              <Image
                width={40}
              className='pro-img'
                src={`https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/productimg/TRAVIS-Images/${newSKU}/${record.primary_image_url}.jpg`}
              />
            </Image.PreviewGroup>
          ) : (
            <span>

              <img
                 src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/thumbnail_tm_logo_52e3761629.png"
                // src={tmlogo}

                alt="Primary Image"
                style={{ maxWidth: "30px", marginRight: "5px" }}
                width={30}
              />


            </span>
          )
          
        );
      },
    },




    {
      title: "SKU",
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



    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   key: "name",
    //   width: 90 ,
    //    fixed: "left",
    //    filterMode: 'tree',
    //    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
    //     <div style={{ padding: 8 }}>
    //       <Input
    //         placeholder="Search Name"
    //         value={selectedKeys[0]}
    //         onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
    //         onPressEnter={() => confirm()}
    //         style={{ width: 188, marginBottom: 8, display: "block" }}
    //       />
    //     </div>
    //   ),
    //   onFilterDropdownVisibleChange: (visible) => {
    //     if (visible) {
    //       setTimeout(() => {
    //         // Trigger the search input to focus when the filter dropdown is opened
    //       });
    //     }
    //   },
    //   onFilter: (value, record) => {
    //     const name =
    //       record &&
    //       record.name;


    //     return  name=== value;
    //   },
    //   filterSearch: true,

    // },



    {
      title: "Category",
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
      width: 85,

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
      width: 75,

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
      width: 150,
      fixed: 'right',
      render: (value, record) => (
        <Tooltip open={record.sku === qty88ToolSKU ? isQty88ToolTip : false} title={record.sku === qty88ToolSKU ? qty88ToolMesage : ""} placement="top">
          <InputNumber
            status={record.sku === qty88ToolSKU && qty88ToolMesage != "" ? "error" : ""}
            className='mx-3 number-input'
            addonBefore={record.stock_88}
            value={record.Quantity88?.toString()}
            style={{ width: 100 }}
            onChange={(value) => {
              if (value !== null) {
                handleQuantity88(value, record)
              }

            }}


            disabled={value.stock_88 === 0}
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
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: 100,
      fixed: 'right'
    },


  ];


  //get other product 
  const getOtherProduct = useSelector(getOtherProducts)
  const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelTravis[]>([]);

  const handleExpand = (expanded: boolean, record: BasicModelTravis) => {
    console.log("handleExpand", record)
    dispatch(removeOtherProduct())
    if (record.sku && record.variation_sku != "" && record.variation_sku != undefined) {
      const inputString = record.variation_sku
      const stringArray = inputString.split(',');
      console.log(stringArray)
      const varskuArray: BasicModelTravis[] = []
      getProduct.map((item) => {
        if (stringArray && stringArray.length > 0) {
          stringArray.map(varSku => {
            if (item.sku === varSku) {
              varskuArray.push(item)
            }
          })

        }

      })
      // Expand only the clicked row

      setExpandedRowKeys(varskuArray);
      dispatch(addOtherProduct(varskuArray))
      // expandedRowRender (record.products.data)  // Assuming SKU is a string
    } else {
      setExpandedRowKeys([])
    }
  };


  const expandedRowRender = (record: BasicModelTravis) => {

    console.log("expandedRowRender", record)
    if (record) {

      const subcolumns: TableColumnsType<BasicModelTravis> = [

        {
          title: "SKU",
          dataIndex: "sku",
          key: "sku",
          width: 390,
          fixed: "left",
        }
        ,


        {
          title: "Style",
          dataIndex: "style_code",
          key: "style_code",
          width: 200,

        },
        {
          title: "size",
          dataIndex: "size",
          key: "size",
          width: 170,

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
                addonBefore={record.stock_88}
                value={record.Quantity88?.toString()}
                style={{ width: 100 }}
                onChange={(value) => {
                  if (value !== null) {
                    handleQuantity881(value, record)
                  }

                }}


                disabled={value.stock_88 === 0}
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
                addonBefore={record.stock_90 || 0}
                value={record.Quantity90?.toString()}
                onChange={(value) => {
                  if (value !== null) {
                    handleQuantity901(value, record)
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
          fixed: 'right',

        },
        {
          title: "Amount",
          dataIndex: "Amount",
          key: "Amount",
          width: 100,
          fixed: 'right'
        },

      ]

      if (expandedRowKeys && getOtherProduct) {


        return (




          <Table className='table-travis'
            columns={subcolumns}
            dataSource={getOtherProduct?.map((item) => ({ ...item, key: item.sku }))}
            pagination={false}

            size="middle"

            rowSelection={{
              onSelect: (record) => { handleSelctRow(record) }
            }}
          />


        );

      }
      else
        return null

    }
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState<BasicModelTravis[]>([]);

  const onSelectChange = (newSelectedRowKeys: Key[], record: BasicModelTravis) => {



    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    // Check if the record is selected by checking if its key is included in newSelectedRowKeys
    //const isSelected = newSelectedRowKeys.includes(record.SKU);
    // Update the selectedRowKeys state based on the toggle state
    // setSelectedRowKeys(isSelected ? [record.SKU] : []);
  };


  const [qty901ToolMesage, setQty901Message] = useState<string>("")
  const [qty901ToolSKU, setQty901SKU] = useState<string | undefined>("")
  const [isQty901ToolTip, setIsQty901ToolTip] = useState<boolean>(false)
  const handleQuantity901 = (value: string, record: BasicModelTravis) => {

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
        //setQuantity90(0)
        dispatch(updateQuantity90({
          sku: record.sku,
          qty90: st90,
          MRP: record.mrp


        }));
        dispatch(updateOtherQuantity90({
          sku: record.sku,
          qty90: intValue,
          MRP: record.mrp,

        }));



      }
    } else if (intValue < 0) {

      // alert("Quantity cannot be negative")
      setQty90Message("Quantity cannot be negative")
      setIsQty90ToolTip(true)
      setQty90SKU(record.sku)
      console.log("Quantity cannot be negative")
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
      console.log("qty90ToolMesage", qty90ToolMesage)
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
      console.log("Quantity cannot be negative")
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
      console.log("qty90ToolMesage", qty88ToolMesage)
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
      console.log("Quantity cannot be negative")
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
    console.log("881", record)
    const intValue = parseInt(value, 10);
    console.log("intValue", intValue)

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
          qty88: intValue,
          MRP: record.mrp,
        }))


      }
    } else if (intValue < 0) {
      // alert("Quantity cannot be negative")
      setQty88Message("Quantity cannot be negative")
      setIsQty88ToolTip(true)
      setQty88SKU(record.sku)
      console.log("Quantity cannot be negative")
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
  const handleExportToExcel = () => {
    try {


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


    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };


  //handle Show Order

  const handleShowOrder = () => {

  }



  const [selectedRow, setSelectedRow] = useState<BasicModelTravis[]>([])
  const handleSelctRow = (record: BasicModelTravis) => {
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

  // export to pdf 
  const [isPDF, setIspdf] = useState<boolean>(false)
  useEffect(() => {
    if (selectedRow) {
      console.log("selectedrow", selectedRow)
    }
  }, [selectedRow])

  const handleExportToPDF = () => {
    setIspdf(true)
    //setIsCard(false)

  }

  const handleResetSelectedRow = () => {
    setSelectedRowKeys([]);
    setSelectedRow([])
    setIspdf(false)
    // setIsCard(true)
  }


  // view cart
  const handleViewCard = () => {
    navigate("/cart")
  }
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

        <div style={{ float: "right", marginBottom: "12px" }}>
          <Button className='mx-3 select-btn-detail'
            onClick={handleViewCard}
          > <i className="bi bi-bag-check"></i> View cart</Button>

          <Button className='mx-3 select-btn-detail'
            onClick={handleImport}
          >  <i className="bi bi-file-earmark-arrow-up"></i> Import Products</Button>
          <Button className='mx-3 select-btn-detail'
            onClick={handleExportToPDF}
          ><i className="bi bi-file-earmark-pdf"></i> Export to PDF</Button>
          <Button className='mx-3 select-btn-detail'
            onClick={handleExportToExcel}
          > <i className="bi bi-file-earmark-spreadsheet"></i> Export to Excel</Button>
          <Button className='mx-3 select-btn-detail'
            onClick={handleSampleExcel}
          ><i className="bi bi-file-spreadsheet"></i> Sample Excel</Button>
        </div>



{/* <label className='form-label'>Show</label>

    <Dropdown className='mx-3' menu={{ items }} placement="top">

    <Button>
   69
        <DownOutlined />
    </Button>
  
       
  

  </Dropdown> */}
  
<div className='show-prodect-section' >
<label style={{ marginRight: 10, color: "#000", }}>Show</label>
                  <Select className="input-dropdown show-prodect"
                    showSearch
                    placeholder="50"
                    optionFilterProp="children"
                 
                    defaultValue="50"
  
                    options={[
                      {
                        value: "50",
                        label: "50",
                      },
                      {
                        value: "40",
                        label: "40",
                      },
                      {
                        value: "30",
                        label: "30",
                      },
                    ]}
                  />

  </div>

                  
        <Table className='card-table-travis'
          ref={tableRef}
          columns={columns}
          dataSource={getProduct?.map((item) => ({ ...item, key: item?.sku }))}
          rowSelection={{
            onSelect: (record) => { handleSelctRow(record) }
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
            defaultPageSize: 20
          }}

          
        />




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

      <TravisExcelUploadDB
        xlData={allXlxData}
        resetXls={handleResetXlData}
      />

      {isPDF && <TravisPdf
        selectedRow={selectedRow}
        resetSelectedRow={handleResetSelectedRow}
      />}
    </div>
  )
}

export default TravisTable