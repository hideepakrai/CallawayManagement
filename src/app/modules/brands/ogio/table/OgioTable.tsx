import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Select, Tooltip, InputNumber } from "antd";
import { Input, Radio, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import { OgioBasicModel, OgioBasicModelGraph, OgioModel, } from "../../../model/ogio/OgioBrandModel"

import { OgioExcelModel } from "../../../model/ogio/OgioExcelModel"
import { useDispatch, useSelector } from "react-redux"
import { getOgioProducts, updateQuantity90, getCategory, getProductModel, getProductType, addOtherProduct, getOgioOtherProduct, updateOtherQuantity90 } from "../../../../slice/allProducts/OgioSlice"
import SampleOgioExcel from '../excel/SampleOgioExcel';
import OgioImportExcel from "../excel/importExcel/OgioImportExcel"
import OgioExcelUploadDB from "../excel/importExcel/OgioUploadExcel"

import type { RadioChangeEvent, SelectProps } from 'antd';
import OgioGallery from "./column/OgioGallery"
import { addOgioOrder, removeOgioOrder } from "../../../../slice/orderSlice/ogio/OgioCartOrderSlice"
import GetAllProduct from '../../../../api/allProduct/GetAllProduct';
import { useNavigate } from 'react-router-dom';
import { checkIsActive } from '../../../../../_metronic/helpers';

import OgioProdPdf from "../ogioPdf/OgioProdPdf"
import UpdateOgioQty from '../excel/importExcel/UpdateOgioQty';
import OgioUpdateQtyDb from '../excel/importExcel/OgioUpdateQtyDb';
import UploadOgioImages from './UploadOgioImages';
import OgioPreOrder from '../preOrder/OgioPreOrder';
import * as XLSX from 'xlsx';
import ImportAllOgioProduct from '../excel/importExcel/ImportAllOgioProduct';
import { getOtherProducts } from '../../../../slice/allProducts/CallAwayGoodsSlice';
import { TravisPdfPrint, Variation_sku_data } from '../../../model/pdf/PdfModel';
import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice';

import OgioProductsToExcel from '../excel/importExcel/ExportAllProduct';


import Loading from '../../../loading/Loading';

type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Accessory',];
const OPTIONS1 = ['Moto', 'Lifestyle',];
const OPTIONS2 = ['Og Rise', 'Og Pace Pro', 'Og Max', 'Og Al Convoy	'];

const OgioTable = () => {
  const getCurrentUsers= useSelector(getCurrentUser)
  const navigate = useNavigate()
  const searchInput = useRef<InputRef>(null);
  const placement: SelectCommonPlacement = 'topLeft';
  const tableRef = useRef(null);
  const [amount, setAmount] = useState<number>()
  const [isImport, setIsImport] = useState(false);
  const dispatch = useDispatch()
  const [isUploadData, setUploadData] = useState()
  
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const [allXlxData, setAllXlxData] = useState<OgioExcelModel[]>([])
  const getCategorys = useSelector(getCategory);
  const getProductModels = useSelector(getProductModel);
  const getProductTypes = useSelector(getProductType);
  const filteredOptions = getProductTypes.filter((o) => !selectedItems.includes(o));
  const filteredOptions1 = getCategorys.filter((o) => !selectedItems.includes(o));
  const filteredOptions2 = getProductModels.filter((o) => !selectedItems.includes(o));




  const ogioProducts: OgioBasicModel[] = useSelector(getOgioProducts)
  const [allOgioData, setAllOgioData] =useState<OgioBasicModel[]>([])

  const [isProduct, setIsProduct] = useState(false);


  useEffect(()=>{
    if(ogioProducts && ogioProducts.length>0){
      const newData: OgioBasicModel[] = [];
      ogioProducts.map(item => {
        if ( item.stock_90!=0) {
          newData.push(item)
        }
      })
      setAllOgioData(newData)
    }
  },[ogioProducts])

  const columns: TableColumnsType<OgioBasicModel> = [
    {
      // title: "Image",
      dataIndex: "PrimaryImage",
      // fixed: "left",
      width: 50,
      render: (value, record) => 
      <OgioGallery record={record} />,
    },


    {
      title: "SKU",
      dataIndex: "sku",
      width: 100,
      fixed: "left",
      key: 'sku',

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8, width: "300px", position: "absolute", top: -90, zIndex: 1, }}>
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      fixed: "left",
      filterMode: 'tree',
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8, width: "300px", position: "absolute", top: -90, zIndex: 1, }}>
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


        return name === value;
      },
      filterSearch: true,
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description", 
    //   width: 150,

    // },

    //product Type
    {
      title: "ProductType",
      dataIndex: "product_type",
      key: "product_type",
      width: 150,

      sorter: (a, b) => {
        const categoryA = a.product_type ?? "";
        const categoryB = b.product_type ?? "";

        return categoryA.localeCompare(categoryB);
      },

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8, width: "300px", position: "absolute", top: -90, zIndex: 1, }}>
          <Select
            mode="multiple"
            placeholder="Select ProductType"
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
        <div style={{ padding: 8, width: "300px", position: "absolute", top: -90, zIndex: 1, }}>
          <Select
            mode="multiple"
            placeholder="Select Category "

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
        const categoryA = a.product_model ?? "";
        const categoryB = b.product_model ?? "";

        return categoryA.localeCompare(categoryB);
      },

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8, width: "300px", position: "absolute", top: -90, zIndex: 1, }}>
          <Select
            mode="multiple"
            placeholder="Select ProductModel"

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

        return category === value;
      },
      filterSearch: true,
    },



    {
      title: " Qty90",
      dataIndex: "stock_90",
      key: "stock_90",
      width: 150,
      fixed: 'right',
      // render: (value,record) => (
      //   <Input 
      //   addonBefore={value[0]?.Stock90} 
      //   type='number'

      //   value={record.Quantity90?.toString()}
      //   onChange={(e) => handleQuantity90(e.target.value, record)} />

      // ),
      render: (value, record) => (
        <Tooltip open={record.sku === qty90ToolSKU ? isQty90ToolTip : false} title={record.sku === qty90ToolSKU ? qty90ToolMesage : ""} placement="top">
          <InputNumber
            status={record.sku === qty90ToolSKU && qty90ToolMesage != "" ? "error" : ""}
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
      fixed: 'right'

    },

    {
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      width: 70,
      fixed: 'right'

    },


  ];
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

  const handleQuantity90 = (value: string, record: OgioBasicModel) => {

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
        const st90 = (record && record.stock_90) ? record.stock_90 : 0;
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

      //alert("Quantity cannot be negative")
      setQty90Message("Quantity cannot be negative")
      setIsQty90ToolTip(true)
      setQty90SKU(record.sku)
    }
    else if (intValue === 0) {
      dispatch(updateQuantity90({
        sku: record.sku,
        qty90: intValue,
        MRP: record.mrp,

      }));


    }
  }

  const handleAmountChange = (value: string, record: OgioBasicModel) => {
    // Update the record with the new amount
    record.Amount = parseInt(value);
    // Update the state or dispatch an action to update the data source
  };




  const [isSample, setIsSample] = useState<boolean>(false)
  const handleSampleExcel = () => {
    setIsSample(true)
  }



  const handleResetIsSample = () => {
    setIsSample(false)
  }


  // upload data 
  //const [allXlxData, setAllXlxData] = useState<OgioExcelModel[]>([])


  const handleReseAllXlData = () => {
    setAllXlxData([])
  }
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [isQtyImport, setIsQtyImport] = useState<boolean>(false)


  // handle update quantity import
  const handleQtyImport = () => {
    setIsQtyImport(true);
  };
  const handleCloseQtyImport = () => {
    setIsQtyImport(false);
  };
  // update qty in Db
  const [allQtyXlxData, setQtyAllXlxData] = useState<OgioExcelModel[]>([])
  const handleOgioQtyData = (allDatat: OgioExcelModel[]) => {
    setQtyAllXlxData(allDatat)
    handleCloseQtyImport()
  }


  const handleReseyQtyData = (message: string) => {
    if (message != "") {
      alert(message)
    } else {
      alert("something went wrong")
    }
    setQtyAllXlxData([])
  }

  const [selectedRow, setSelectedRow] = useState<OgioBasicModel[]>([])
  // const handleSelctRow = (record: OgioBasicModel,selected:boolean) => {
  //   console.log("selected row: " ,selected)
  //   console.log("selected row: " ,selectedRow)
  //   console.log("record " ,record)
  //   if(selected){
      
  //     setSelectedRow(prev => [...prev, record]);
  //   }
  //   else if(!selected){
  //     const updatedSelectedRow = [...selectedRow];
  //     const index = selectedRow.findIndex(row => row.sku === record.sku);
  //        if (index !== -1) {
  //        updatedSelectedRow.splice(index, 1);
  //         setSelectedRow(updatedSelectedRow);
  
  //       }
  //   }
 

  // };

  const [selectedRowVartionSku, setSelectedRowVartionSku] = useState<TravisPdfPrint[]>([])
  const [uniqueVariationSku, setUniqueVariationSku] = useState<string[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);




  const makePdfPring = (variationSku: string, record: OgioBasicModel) => {
    const stringVar = variationSku.split(',').map(item => item.trim());
    const totalVarSkuData: Variation_sku_data[] = [];
    if (stringVar.length > 0) {
      stringVar.map(varSku => {
        const ogioData = allOgioData.find(ogioo => ogioo.sku === varSku);
        if (ogioData) {
          const varSkuData = {
            sku: ogioData.sku,
            product_type: ogioData.product_type,
            qty:  ogioData.stock_90 ||0,
            mrp: ogioData.mrp||0
          };
          totalVarSkuData.push(varSkuData);

        }

      })
      const otherInfo = {
        product_model:record.product_model,
        category: record.category,
       // product_type:record.product_type,
        mrp:record.mrp?record.mrp:0,
     
      };
      const allVarSku = {
        family:record.sku,
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

  const handleSelectRow = (record: OgioBasicModel, selected: boolean) => {
    console.log("selected row:", selected);
    console.log("record:", record);
    // const variationSkuSet = new Set<string>(uniqueVariationSku);
    if (selected) {
      setSelectedRow(prev => [...prev, record]);

      if (record && record.variation_sku && record.variation_sku != undefined && record.variation_sku !== "") {
       // const stringArray = record.variation_sku.split(',').map(item => item.trim());
    

      makePdfPring(record.variation_sku, record)

   
        setSelectedRowKeys(prev => [...prev, record.sku!]);
      
    } 
  }else  if(!selected){
      const updatedSelectedRow = selectedRow.filter(row => row.sku !== record.sku);
      setSelectedRow(updatedSelectedRow);
  
      const updatedSelectedRowKeys = selectedRowKeys.filter(key => key !== record.sku);
      setSelectedRowKeys(updatedSelectedRowKeys);
      const updatedselectedRowVartionSku = selectedRowVartionSku.filter(key => key.family!== record.sku);
      setSelectedRowVartionSku(updatedselectedRowVartionSku);
    }
  };



 
// useEffect(()=>{
//   console.log("selected row",selectedRow)
// },[selectedRow])


  // export to pdf 
  const [isPDF, setIspdf] = useState<boolean>(false)

  const handleResetSelectedRow = () => {
    setSelectedRowKeys([]);
    setSelectedRow([])
    setIspdf(false)
    setIsExport(false)
    // setIsCard(true)
  }



  const [isStartuploadImages, setiStartuploadImages]= useState(false)

   const handleUploadImages=()=>{
    console.log("upload button")
    setiStartuploadImages(true)
    
   }

   const handleResetUploadImages=()=>{
    setiStartuploadImages(false)
   }

   const handleViewCart = () => {
    navigate("/cart")
  }
  const [isExport , setIsExport]= useState<boolean>(false)
  // export pdf and excel on selection 
    // handle Excels product
    
   
    const handleProduct = () => {
      setIsExport(true);
    };
    const handleCloseImport = () => {
      setIsExport(false);
     setSelectedRow([])
     setSelectedRowVartionSku([])
    };
  
// import all ogio product

    const handleImport = () => {
      setIsImport(true);
    };

    const handleCloseImportModal=()=>{
      setIsImport(false);

    }

    const handleOgioData=(allOgioData:OgioBasicModel[])=>{
      setAllXlxData(allOgioData);
      setIsImport(false)
    }
  

// show pd()
  const handleShowPdf = () => {
    setIspdf(true)
    setIsExport(false)
  }


  // download excel
  const handleDownloadExcel = () => {
    handleExportToExcel(selectedRow)
    setIsExport(false)
  }
  //export to excel 
  const handleExportToExcel = (selectedRow: OgioBasicModel[]) => {
    try {
      if (!selectedRow) {
        console.error("No row selected.");
        return;
      }

      const worksheetData = selectedRow.map(row => ({
        "sku": row.sku,
        "description": row.description,
        "product_type": row.product_type,
        "category": row.category,
        "product_model": row.product_model,
        "stock_90": row.stock_90,
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
      anchor.download = `OgioProducts.xlsx`;
      anchor.click();

      // Release the object URL
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };


   

  const handleRowSelectionChange = (selectedKeys: React.Key[], selectedRows: OgioBasicModel[]) => {
    const validKeys = selectedKeys.filter((key): key is string => typeof key === 'string');
    setSelectedRowKeys(validKeys);
    setSelectedRow(selectedRows);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelectionChange, // Synchronize state with table selections
    onSelect: handleSelectRow,
    onSelectAll: (selected: boolean, selectedRows: OgioBasicModel[]) => {
      const keys = selectedRows.map((row: OgioBasicModel) => row.sku).filter((sku): sku is string => !!sku);
      setSelectedRowKeys(keys);
      setSelectedRow(selectedRows);
    },
  };


  // expannsion of family

    //get other product 
    const getOgioOtherProducts = useSelector(getOgioOtherProduct)
    const [expandedRowKeys, setExpandedRowKeys] = useState<OgioBasicModel[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<string|null>(null);
  
    const handleExpand = (expanded: boolean, record: OgioBasicModel) => {
      setExpandedRowKeys([])
      setExpandedKeys(null);
      console.log("expanded",expanded)
      //dispatch(removeOtherProduct())
      if (record.sku && record.variation_sku != "" && record.variation_sku != undefined &&expanded ) {
        const inputString = record.variation_sku
        const stringArray =  inputString.split(',').map(item => item.trim());
        const varskuArray: OgioBasicModel[] = [];
      
        console.log("vartion sku",varskuArray)
        allOgioData.map((item) => {
          if (stringArray && stringArray.length > 0) {
            stringArray.map(varSku => {
              if (item.sku === varSku) {
                varskuArray.push(item)
  
              }
            })
  
          }
  
        })

        // Expand only the clicked row
        setExpandedKeys(record.sku)
        setExpandedRowKeys(varskuArray);
        dispatch(addOtherProduct(varskuArray))
        // expandedRowRender (record.products.data)  // Assuming SKU is a string
      } else  {
        setExpandedRowKeys([])
        setExpandedKeys(null)
      }
    };
  
  const expandedRowRender = (record: OgioBasicModel) => {

    if (record) {

      const subcolumns: TableColumnsType<OgioBasicModel> = [
        {
          title: "SKU",
          dataIndex: "sku",
          key: "sku",
          width: 390,
          fixed: "left",
        },
        {
          title: "Product Model",
          dataIndex: "product_model",
          key: "product_model",
          width: 390,
          fixed: "left"

        },
        {
          title: "Product Type",
          dataIndex: "product_type",
          key: "product_type",
          width: 390,
          fixed: "left"

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

                disabled={value !== null && value?.stock_90 === 0}
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
      if (expandedKeys===record.sku && getOgioOtherProducts) {

      return (
        <Table className='cart-table-profile'
          columns={subcolumns}
          dataSource={getOgioOtherProducts?.map((item) => ({ ...item, key: item.sku }))}
          pagination={false}

          size="middle"

         
        />


      );
    }

    }
  }

  const [qty901ToolMesage, setQty901Message] = useState<string>("")
  const [qty901ToolSKU, setQty901SKU] = useState<string | undefined>("")
  const [isQty901ToolTip, setIsQty901ToolTip] = useState<boolean>(false)
  const handleQuantity901 = (value: string, record: OgioBasicModel) => {
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

  const [isExportAll, setIsExportAll] = useState<boolean>(false)
  const handleDownloadAllExcel= () =>{
    setIsExportAll(true)
    setIsProduct(false)


  }
  const handleResetExportAll=() =>{
    setIsExportAll(false)
  }
  return (
    <div className='container'>
      <Card style={{ marginTop: '80px' }}
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
        <div style={{ float: "right", marginBottom: "12px" }}>

        {/* {getCurrentUsers &&getCurrentUsers.role!=="Retailer" &&<Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '

           onClick={handleUploadImages}
          > <i className="bi bi-bag fs-3"></i> UploadImages</Button>} */}
          <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '

         onClick={handleViewCart}
          > <i className="bi bi-bag fs-3"></i> View Cart</Button>


{getCurrentUsers &&getCurrentUsers.role!=="Retailer" &&<Button className=' btn  px-6 p-0  btn-travis mx-3 hover-elevate-up '
            onClick={handleImport}
          > <i className="bi bi-file-earmark-arrow-up fs-3"></i>  Import Products</Button>
}

         {getCurrentUsers &&getCurrentUsers.role!=="Retailer" && <Button className=' btn px-6 p-0  btn-travis mx-3 hover-elevate-up '
            onClick={handleQtyImport}
          > <i className="bi bi-file-earmark-arrow-up fs-3"></i> Update Qty </Button>
}
          <Button className=' btn  px-6 p-0  btn-travis mx-3 hover-elevate-up '
            onClick={handleProduct}
          > <i className="bi bi-file-earmark-spreadsheet fs-3"></i>Export Products</Button>

        </div>





{/* 
        <div className='show-prodect-section' >
          <h4 className='fs-4 '>Showing <i><span className='fs-2 fw-bold '>1200</span></i> products</h4>

        </div> */}


      {allOgioData.length>0? ( <Table
          className='cart-table-profile'
          ref={tableRef}
          columns={columns}
          dataSource={allOgioData?.map((item) => ({ ...item, key: item.sku }))}
          rowSelection={rowSelection}
          // rowSelection={{
          //   onSelect: (record, selected: boolean,selectedRows: OgioBasicModel[]) => { handleSelctRow(record,selected) },
          // }}
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
        />):(<Loading/>)}


      </Card>

      <SampleOgioExcel
        isSample={isSample}
        resetIsSample={handleResetIsSample}
      />

      {/* open modal for excel and pdf */}

      <OgioImportExcel
        isExport={isExport}
        onClose={handleCloseImport}
        printPdf={handleShowPdf}
        excelExport={handleDownloadExcel}
        selectedRow={selectedRow}
        excelAllExport={handleDownloadAllExcel}

        
      />

{/* open modal for upload all ogio products */}
<ImportAllOgioProduct
        isImport={isImport}
        onClose={handleCloseImportModal}
        allOgioData={handleOgioData}
      />
      <OgioExcelUploadDB
        xlData={allXlxData}
        resetXls={handleReseAllXlData}
      />


      <UpdateOgioQty
        isUpdate={isQtyImport}
        onClose={handleCloseQtyImport}
        allOgioData={handleOgioQtyData}
      />



      <OgioUpdateQtyDb
        allQtyXlxData={allQtyXlxData}
        resetQtyData={handleReseyQtyData}
      />

      {isPDF && <OgioProdPdf
        selectedRow={selectedRowVartionSku}
        resetSelectedRow={handleResetSelectedRow}
      />}


{isStartuploadImages &&
        <UploadOgioImages
        resetOgioImages={handleResetUploadImages}
        />}

      <OgioPreOrder />

      { isExportAll && <OgioProductsToExcel
     resetExportAll={handleResetExportAll}
   
   />}
    </div>
  )
}
export default OgioTable