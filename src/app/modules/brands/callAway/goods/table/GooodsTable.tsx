import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Select, Tooltip, InputNumber } from "antd";
import { Input, Radio, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import { BasicModelGoods } from "../../../../model/goods/CallawayGoodsModel"
import { useDispatch, useSelector } from "react-redux"
import "./GooodsTable.css"
import { useNavigate } from 'react-router-dom';
import SampleExcel from '../excel/SampleExcel';
import { number } from 'yup';
import ImportExcel from '../excel/importExcel/ImportExcel';
import ExcelUploadDB from "../excel/importExcel/ExcelUploadDB";
import * as XLSX from 'xlsx';
import GoodsImportExcel from "./GoodsImportExcel"
//import { ExcelModelTravis } from "../../../../model/travis/TravisExcel"
import GoodsQtyImport from "./GoodsQtyImport"
import TravisExportProduct from "./GoodsExportProduct"
import type { RadioChangeEvent, SelectProps } from 'antd';
import { getCategory, getGoodsProducts, getProductModel, getProductType, updateQuantity90 } from '../../../../../slice/allProducts/CallAwayGoodsSlice';

import OgioProductsToExcel from '../excel/exportExcel/ExportAllProduct';
import GoodsUpdateQtyDb from '../excel/importExcel/GoodsUpdateQtyDb';

import Loading from '../../../../loading/Loading';
import HardGoodsExcelUploadDb from '../excel/importExcel/ExcelUploadDB';
import PreOrder from '../preOrder/PreOrder';
import { render } from 'react-dom';
import HardGoodsPPt from '../pptHardGoods/HardGoodsPPt';
import { TravisPdfPrint } from '../../../../model/pdf/PdfModel';



type SelectCommonPlacement = SelectProps['placement'];

const OPTIONS = ['Accessory',];
const OPTIONS1 = ['Accessory',];
const OPTIONS2 = ['Accessory',];

const GooodsTable = () => {
  const placement: SelectCommonPlacement = 'topLeft';
  const tableRef = useRef(null);
  const navigate = useNavigate()
  const [isImport, setIsImport] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const [allXlxData, setAllXlxData] = useState<BasicModelGoods[]>([])
  const [isPDF, setIspdf] = useState<boolean>(false)
  const [isQtyImport, setIsQtyImport] = useState(false);
  const dispatch = useDispatch()
  const searchInput = useRef<InputRef>(null);
  const getCategorys = useSelector(getCategory);

  const getProductTypes = useSelector(getProductType);
  const getProductModels = useSelector(getProductModel);
  const getGoodsProduct: BasicModelGoods[] = useSelector(getGoodsProducts)
  const [amount, setAmount] = useState<number>()


  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const filteredOptions = getCategorys.filter((o) => !selectedItems.includes(o));
  const filteredOptions1 = getProductModels.filter((o) => !selectedItems.includes(o));
  const filteredOptions2 = getProductTypes.filter((o) => !selectedItems.includes(o));


  const [allQtyXlxData, setQtyAllXlxData] = useState<BasicModelGoods[]>([])

  //console.log("tabo",allQtyXlxData)
  const handleOgioQtyData = (allDatat: BasicModelGoods[]) => {
    const table = tableRef.current;
    handleCloseQtyImport()

    setQtyAllXlxData(allDatat)
   // console.log("tabi",allDatat)
    setIsQtyImport(false)
  }



  const handleTravisData = (allDatat: BasicModelGoods[]) => {
    const table = tableRef.current;
    handleCloseImport()

    setAllXlxData(allDatat)
        console.log("tabi",allDatat)
      

  }

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
      width: 140,


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
      width: 140,

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
      title: "Life cycle",
      dataIndex: "life_cycle",
      key: "life_cycle",
      width: 100,

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
      width: 100,

      sorter: (a, b) => {
        // Extract and compare StyleCode values, handling null or undefined cases
        const styleCodeA = a.orientation ?? "";
        const styleCodeB = b.orientation ?? "";

        return styleCodeA.localeCompare(styleCodeB);
      },
    },


    {
      title: "Qty88",
      dataIndex: "stock_88",
      key: "stock_88",
      width: 110,
      fixed: 'right',

      render: (value, record) => (
        


        <Tooltip open={record.sku === qty90ToolSKU ? isQty90ToolTip : false} title={record.sku === qty90ToolSKU ? qty90ToolMesage : ""} placement="top">
          <InputNumber
            status={record.sku === qty90ToolSKU && qty90ToolMesage != "" ? "error" : ""}
            className=' number-input'
            addonBefore={record.stock_88 || 0}
            value={record.Quantity90?.toString()}
            onChange={(value) => {
              if (value !== null) {
                handleQuantity90(value, record)
              }

            }}
            disabled={value != null && value.stock_88 === 0}

            style={{ width: 100 }}
          />
        </Tooltip>

      ),
    },


    // {
    //   title: "Qty",
    //   dataIndex: "TotalQty",
    //   key: "TotalQty",
    //   width: 50,
    //   fixed: 'right'
    // },


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
  const [allGoodsProduct, setAllGoodsProduct] = useState<BasicModelGoods[]>([])

  useEffect(() => {
    const varskuArray: BasicModelGoods[] = [];
    if (getGoodsProduct &&
      getGoodsProduct.length > 0
    ) {
      getGoodsProduct.map(item => {
        varskuArray.push(item)
      })
    }
    setAllGoodsProduct(varskuArray)
  }, [getGoodsProduct])

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






  const handleQuantity90 = (value: string, record: BasicModelGoods) => {

    const intValue = parseInt(value, 10);

    setQty90Message("");
    setIsQty90ToolTip(false);
    setQty90SKU("")
    record.Quantity90 = intValue;
    if (intValue > 0) {
      if (record && record.stock_88 && record.stock_88 >= intValue) {

        // Dispatch an action to update the quantity for the SKU

        dispatch(updateQuantity90({
          sku: record.sku,
          qty90: intValue,
          MRP: record.mrp,

        }));


      }
      else {
        // alert("Quantity is not available")
        const st90 = (record && record.stock_88 && record.stock_88) ? record.stock_88 : 0;
        setQty90Message("The quantity should not exceed the available stock")
        setIsQty90ToolTip(true)
        setQty90SKU(record.sku)

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


  };


  const [selectedRow, setSelectedRow] = useState<BasicModelGoods[]>([])
  const [selectedRowVartionSku, setSelectedRowVartionSku] = useState<TravisPdfPrint[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);


  // const handleSelectRow = (record: BasicModelGoods) => {
  //   if (selectedRow && selectedRow.length > 0) {
  //     const updatedSelectedRow = [...selectedRow];
  //     const index = selectedRow.findIndex(row => row.sku === record.sku);
  //     if (index !== -1) {
  //       updatedSelectedRow.splice(index, 1);
  //       setSelectedRow(updatedSelectedRow);

  //     } else if (index === -1) {
  //       setSelectedRowKeys([record]);
  //       if (record) {
  //         setSelectedRow(prev => [...prev, record]);
  //       }
  //     }
  //   } else {
  //     setSelectedRowKeys([record]);
  //     if (record) {
  //       setSelectedRow(prev => [...prev, record]);
  //     }
  //   }
  // }

  const handleSelctRow = (record: BasicModelGoods, selected: boolean) => {
  
    if (selected) {
        setSelectedRow(prev => [...prev, record]);
        setSelectedRowKeys(prev => [...prev, record.sku!]);
 
    } else {
        const updatedSelectedRow = selectedRow.filter(row => row.sku !== record.sku);
        setSelectedRow(updatedSelectedRow);

        const updatedSelectedRowKeys = selectedRowKeys.filter(key => key !== record.sku);
      setSelectedRowKeys(updatedSelectedRowKeys);

        
    }
};





  // navigate to card
  const handleViewCart = () => {
    navigate("/cart")
  }

  // handle Excels Data
  const handleImport = () => {
    setIsImport(true);
  };

  const handleCloseImport = () => {
    setIsImport(false);
  };

  // handle update quantity Data
  const handleQtyImport = () => {
    setIsQtyImport(true);
  };
  const handleCloseQtyImport = () => {
    setIsQtyImport(false);
  };

  // handle Excels product
  const handleProduct = () => {
    setIsProduct(true);
  };
  const handleCloseProduct = () => {
    setIsProduct(false);
  };

  // show pd()
  const handleShowPdf = () => {
    setIsProduct(false)
    setIspdf(true)
  }
  const handleDownloadExcel = () => {
    handleExportToExcel()
    setIsProduct(false)
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
      anchor.download = `HardGoodsProducts_${Date.now()}.xlsx`;
      anchor.click();

      // Release the object URL
      URL.revokeObjectURL(url);


    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };
  const [isExportAll, setIsExportAll] = useState<boolean>(false)
  const handleDownloadAllExcel= () =>{
    setIsExportAll(true)
    setIsProduct(false)


  }
  const handleResetExportAll=() =>{
    setIsExportAll(false)
  }

  const handeleResetQtyData=() =>{
    setAllXlxData([])
  }
  const handleResetXlData = () => {
    setAllXlxData([])
  }


  const [isPPT, setIsPPt]= useState<boolean>(false)
 const handlePPT=()=>{
  setIsPPt(true)
 }


 const handleResetPPT=()=>{
  setIsPPt(false)
  setIsProduct(false)
  setSelectedRowKeys([]);
    setSelectedRow([])
    setIspdf(false)
    setSelectedRowVartionSku([])

 }

  return (
    <div className='container'>

      <Card style={{ marginTop: '80px' }}
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

        <div style={{ float: "right", marginBottom: "12px" }}>

          <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '

            onClick={handleViewCart}
          > <i className="bi bi-bag fs-3"></i> View Cart</Button>

          <Button className=' btn  px-6 p-0  btn-travis mx-3 hover-elevate-up '
            onClick={handleImport}
          > <i className="bi bi-file-earmark-arrow-down fs-3"></i>  Import Products</Button>


          <Button className=' btn px-6 p-0  btn-travis mx-3 hover-elevate-up '
            onClick={handleQtyImport}
          > <i className="bi bi-arrow-repeat fs-2"></i> Update Qty </Button>

          <Button className=' btn  px-6 p-0  btn-travis mx-3 hover-elevate-up '
            onClick={handleProduct}
          > <i className="bi bi-file-earmark-arrow-up fs-3"></i>Export Products</Button>




        </div>

        <div className='show-prodect-section' >
          {/* <h4 className='fs-4 '>Showing <i><span className='fs-2 fw-bold '>1200</span></i> products</h4> */}

        </div>

      { allGoodsProduct.length>0? 
    (  <Table
          className='cart-table-profile'
          ref={tableRef}
          columns={columns}
          dataSource={allGoodsProduct?.map((item) => ({ ...item, key: item.sku }))}
          rowSelection={{
            selectedRowKeys,
            onSelect: (record,selected) => { handleSelctRow(record,selected) }
          }}

          bordered
          size="middle"
          scroll={{ x: "100%", y: "auto" }}

          pagination={{
            position: ['topRight', 'bottomRight'], // Positions pagination at the top and bottom
            defaultPageSize: 20
          }}
        
        />):(
          <Loading/>
        )
      }
      </Card>

      <GoodsImportExcel
        isImport={isImport}
        onClose={handleCloseImport}
        allGoodsData={handleTravisData}
      />

      <GoodsQtyImport
        isQtyImport={isQtyImport}
        onClose={handleCloseQtyImport}
        allGoodsData={handleOgioQtyData}
      />
      <TravisExportProduct
        isProduct={isProduct}
        onClose={handleCloseProduct}
        allGoodsData={handleTravisData}
        printPdf={handleShowPdf}
        excelExport={handleDownloadExcel}
        excelAllExport={handleDownloadAllExcel}
        ppt={handlePPT}


      />
      <GoodsUpdateQtyDb
      allQtyXlxData = {allQtyXlxData}
      resetQtyData={handeleResetQtyData}

        />

        <HardGoodsExcelUploadDb
         xlData={allXlxData}
         resetXls={handleResetXlData}
          />


{ isExportAll && <OgioProductsToExcel
     resetExportAll={handleResetExportAll}
   
   />}

   <PreOrder/>


   
{isPPT &&
<HardGoodsPPt
selectedRowVartionSku={selectedRowVartionSku}
resetPPT={handleResetPPT}
/>
}

    </div>
  )
}

export default GooodsTable