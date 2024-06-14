import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Tooltip } from "antd";
import { Input, Radio, InputNumber, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';

import { number } from 'yup';

import "../CallAwayApprelProducts.css";

import * as XLSX from 'xlsx';
import Slider from '../../../../model/slider/Slider';
import { Cascader, Select, Space } from 'antd';

import { message } from "antd";
import { Key } from 'antd/lib/table/interface';
import { useTable } from 'react-table';
import "../TravisTable.css"
import type { RadioChangeEvent, SelectProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel';
import { getApparelProducts, updateQuantity88, updateQuantity90 } from '../../../../../slice/allProducts/CallawayApparelSlice';
import { useNavigate } from 'react-router-dom';
import TravisImportProduct from "./ApparelImportProduct"
import ApparelUpdateQty from "./ApparelUpdateQty"
import AppareImportProduct from "./ApparelExportProduct"

import ApparelPdf from '../pdf/ApparelPdf';
import { TravisPdfPrint } from '../../../../model/pdf/PdfModel';
import OgioProductsToExcel from '../excel/ExportAllProduct';
import ApparelUpdateQtyDb from '../excel/importExcel/ApparelUpdateQtyDb';

import Loading from '../../../../loading/Loading';

import ApparelExcelUploadDb from '../excel/importExcel/ApparelExcelUploadDb';
import ApparelPPt from "../ppt/ApparelPPt"
import PreOrderHome from '../preOrder/PreOrderHome';
import SoftGoodsPPt from '../ppt/SoftGoodsPPt';


type SelectCommonPlacement = SelectProps['placement'];

const OPTIONS = ['Denim',];
const OPTIONS1 = ['SS19', 'SS20	'];
const OPTIONS2 = ['1MR410', '1MO479', '1MR410',];


const ApparelTable = () => {
  const [isUpdate, setIsUpdateQty] = useState(false);
  const [isProduct, setIsProduct] = useState(false);
  const placement: SelectCommonPlacement = 'topLeft';
  const tableRef = useRef(null);
  const [isImport, setIsImport] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getApparelProduct = useSelector(getApparelProducts)
  const [amount, setAmount] = useState<number>()
  const searchInput = useRef<InputRef>(null);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const filteredOptionsOne = OPTIONS1.filter((o) => !selectedItems.includes(o));
  const filteredOptionsTwo = OPTIONS2.filter((o) => !selectedItems.includes(o));
  const [allApparel, setAllApparel] = useState<BasicModelApparel[]>([])
  //get Apparel product 

  useEffect(() => {

    const apparelItem: BasicModelApparel[] = []
    if (getApparelProduct &&
      getApparelProduct.length > 0
    ) {
      getApparelProduct.map(item => {
        apparelItem.push(item)

      })
    }
    setAllApparel(apparelItem)
  }, [getApparelProduct])
  const columns: TableColumnsType<BasicModelApparel> = [
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
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 120,

      sorter: (a, b) => {
        // Extract and compare StyleCode values, handling null or undefined cases
        const styleCodeA = a.color ?? "";
        const styleCodeB = b.color ?? "";

        return styleCodeA.localeCompare(styleCodeB);
      },
    },


    {
      title: "Style",
      dataIndex: "style_id",
      key: "style_id",
      width: 100,

      sorter: (a, b) => {
        // Extract and compare StyleCode values, handling null or undefined cases
        const styleCodeA = a.style_id ?? "";
        const styleCodeB = b.style_id ?? "";

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
        const StyleCode = record?.style_id;


        return StyleCode === value;
      },
      filterSearch: true,
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
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 90,
    },
    {
      title: "Sleeves",
      dataIndex: "sleeves",
      key: "sleeves",
      width: 90,
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
            //addonBefore={record.stock_88}
            addonBefore={record.stock_88 == 0 ? 0 : record.stock_88}

            value={record.Quantity88?.toString()}
            style={{ width: 100 }}
            onChange={(value) => {
              if (value !== null) {
                handleQuantity88(value, record)
              }

            }}


           // disabled={value.stock_88 === 0}
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
            addonBefore={record.stock_90 == 0 ? 0 : record.stock_90}

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
  const [qty88ToolMesage, setQty88Message] = useState<string>("")
  const [qty88ToolSKU, setQty88SKU] = useState<string | undefined>("")
  const [isQty88ToolTip, setIsQty88ToolTip] = useState<boolean>(false)


  useEffect(() => {
    if (qty88ToolMesage) {
      const timeout = setTimeout(() => {
        setQty88Message("");
        setIsQty88ToolTip(false)
      }, 3000); // 3 seconds

      return () => clearTimeout(timeout);
    }
  }, [qty88ToolMesage])

  const handleQuantity88 = (value: string, record: BasicModelApparel) => {

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
    } else if (intValue === 0) {
      dispatch(updateQuantity88({
        sku: record.sku,
        qty88: intValue,
        MRP: record.mrp,
      }));


    }

  };

  const [isPDF, setIspdf] = useState<boolean>(false)
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

  const handleQuantity90 = (value: string, record: BasicModelApparel) => {

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

  const [allXlxData, setAllXlxData] = useState<BasicModelApparel[]>([])

  
  const handleApparelData = (allDatat: BasicModelApparel[]) => {
    const table = tableRef.current;
    handleCloseImport()
    console.log("all81",allDatat)
    setAllXlxData(allDatat)
    //setIsImport(false)
    setIsUpdateQty(false)


  }
  const [allXData, setAllXData] = useState<BasicModelApparel[]>([])
  const handleAppaData = (allDatat: BasicModelApparel[]) => {
    const table = tableRef.current;
    handleCloseImport()
   // console.log("all81",allDatat)
    setAllXData(allDatat)
    setIsImport(false)


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
      anchor.download = `ApparelProducts_${Date.now()}.xlsx`;
      anchor.click();

      // Release the object URL
      URL.revokeObjectURL(url);


    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  // navigate to card
  const handleViewCart = () => {
    navigate("/cart")
  }

  // handle Excels Data
  const handleImportProduct = () => {
    setIsImport(true);
  };

  const handleCloseImport = () => {
    setIsImport(false);
  };


  // handle Excels product
  const handleUpdateQty = () => {
    setIsUpdateQty(true);
  };
  const handleCloseUpdateQty = () => {
    setIsUpdateQty(false);
  };

  // handle Excels product
  const handleProduct = () => {
    setIsProduct(true);
  };
  const handleCloseProduct = () => {
    setIsProduct(false);
  };


  const handleShowPdf = () => {
    setIsProduct(false)
    setIspdf(true)
  }
  const handleDownloadExcel = () => {
    handleExportToExcel()
    setIsProduct(false)
  }



  //ps
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [uniqueSku, setUniqueSku] = useState<string[]>([])
  const [uniqueVariationSku, setUniqueVariationSku] = useState<string[]>([]);
  const [selectedRow, setSelectedRow] = useState<BasicModelApparel[]>([])
  const [selectedRowVartionSku, setSelectedRowVartionSku] = useState<TravisPdfPrint[]>([])
  const handleSelctRow = (record: BasicModelApparel, selected: boolean) => {
  
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
//const [isPDF, setIspdf] = useState<boolean>(false)
  const handleResetSelectedRow = () => {
    setSelectedRow([]);
    setSelectedRowKeys([])
    setIspdf(false)
   
    // setIsCard(true)
  }

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
    setAllXData([])
  }

   const [isPPt, setIsPPt]=useState<boolean>(false);

  const handlePPT=()=>{
setIsPPt(true)
setIsProduct(false)
  }


  const handleResetPPt=()=>{
    setIsPPt(false)
    setSelectedRow([]);
    setSelectedRowKeys([])
  }

  return (
    <>




      <div className='container content-pro mt-3'>
        {/* <SliderApprel /> */}
        <Card className='travish-mat-section' style={{ marginTop: '80px', padding: "10px", }}
          title="CALLAWAY SOFTGOODS "
          extra={
            <div >
              <Breadcrumb separator=">">
                <Breadcrumb.Item>
                  <span className="gx-link">Home</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <span className="gx-link">Products</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Callaway Apparel</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          }

        >
          <div style={{ float: "right", marginBottom: "12px" }}>

            {/* active class ="active-btn" */}


            <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '

              onClick={handleViewCart}
            > <i className="bi bi-bag fs-3"></i> View Cart</Button>



            <Button className=' btn  px-6 p-0  btn-travis mx-3 hover-elevate-up '
              onClick={handleImportProduct}
            > <i className="bi bi-file-earmark-arrow-down fs-3"></i>  Import Products</Button>


            <Button className=' btn px-6 p-0  btn-travis mx-3 hover-elevate-up '
              onClick={handleUpdateQty}
            > <i className="bi bi-arrow-repeat fs-2"></i> Update Qty </Button>

            <Button className=' btn  px-6 p-0  btn-travis mx-3 hover-elevate-up '
              //  onClick={handleProduct} 
              onClick={handleProduct}
            > <i className="bi bi-file-earmark-arrow-up fs-3"></i> Export Product</Button>




          </div>


          {/* <div className='show-prodect-section' >
            <h4 className='fs-4 '>Showing <i><span className='fs-2 fw-bold '>1200</span></i> products</h4>
          </div> */}

       { allApparel.length>0?  
       (<Table className='cart-table-profile'
            ref={tableRef}
            columns={columns}
            dataSource={allApparel?.map((item) => ({ ...item, key: item?.sku }))}

            //ps
            rowSelection={{
              selectedRowKeys,
              onSelect: (record,selected) => { handleSelctRow(record,selected) }
            }}
          
            // expandable={{
            //   expandedRowRender,

            //   onExpand: (expanded, record) => handleExpand(expanded, record),

            //  }}
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}

            pagination={{
              position: ['topRight', 'bottomRight'], // Positions pagination at the top and bottom
              defaultPageSize: 20
            }}
          />):
          (<Loading/>)}
        </Card>


        <TravisImportProduct
          isImport={isImport}
          onClose={handleCloseImport}
          allApparelData={handleAppaData}
        />

        <ApparelUpdateQty
          isUpdate={isUpdate}
         
          onClose={handleCloseUpdateQty}
          allGoodsData={handleApparelData}

    />
    <ApparelUpdateQtyDb
    allXlxData={allXlxData}
    resetQtyData={handeleResetQtyData}
    />

        <AppareImportProduct
          isProduct={isProduct}
          onClose={handleCloseProduct}
          //
          allGoodsData={handleApparelData}
          printPdf={handleShowPdf}
          ppt={handlePPT}
          excelAllExport={handleDownloadExcel} excelExport={function (): void {
            throw new Error('Function not implemented.');
          } }        />

          <ApparelExcelUploadDb
          xlData={allXData}
          resetXls={handleResetXlData}
          />


{isPDF && <ApparelPdf
        selectedRow={selectedRow}
        resetSelectedRow={handleResetSelectedRow}
      />}


{ isExportAll && <OgioProductsToExcel
     resetExportAll={handleResetExportAll}
   />}

   
{isPPt && 
<SoftGoodsPPt
     selectedRow={selectedRow}
     resetPPt={handleResetPPt}
    />}


{/* create and update order  */}
    <PreOrderHome/>
      </div>

    </>
  )
}

export default ApparelTable