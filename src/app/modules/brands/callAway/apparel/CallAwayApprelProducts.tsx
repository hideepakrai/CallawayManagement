import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio, InputNumber, Button } from "antd";
import type { TableColumnsType } from 'antd';
import { BasicModelTravis, ImageType } from "../../../model/travis/TravisMethewModel"
import { useDispatch, useSelector } from "react-redux"
import { getTravisProducts } from "../../../../slice/allProducts/TravisMethewSlice"
import SampleExcelTravis from '../goods/excel/SampleExcel';
import SliderApprel from './SliderApprel';
import { number } from 'yup';
import TravisImportExcel from '../../travisMethew/excel/importExcel/TravisImportExcel';
import { ExcelModelTravis } from "../../../model/travis/TravisExcel"
import "./CallAwayApprelProducts.css";
import TravisExcelUploadDB from '../../travisMethew/excel/importExcel/TravisExcelUploadDB';
import * as XLSX from 'xlsx';
import { updateQuantity90, updateQuantity88 } from "../../../../slice/allProducts/TravisMethewSlice"
import { Cascader, Select, Space } from 'antd';
import { addTravisOrder } from "../../../../slice/orderSlice/travis/CartOrder"
import { message } from "antd";
import { Key } from 'antd/lib/table/interface';
import { useTable } from 'react-table';
import "./TravisTable.css"
import type { RadioChangeEvent, SelectProps } from 'antd';
import Slider from '../../../model/slider/Slider';

type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Denim',];
const OPTIONS1 = ['SS19', 'SS20	'];
const OPTIONS2 = ['1MR410', '1MO479', '1MR410',];


const CallAwayApprelProducts = () => {
  const placement: SelectCommonPlacement = 'topLeft';
  const tableRef = useRef(null);
  const [isImport, setIsImport] = useState(false);

  const dispatch = useDispatch()

  const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)
  const [amount, setAmount] = useState<number>()


  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

  const filteredOptionsOne = OPTIONS1.filter((o) => !selectedItems.includes(o));
  const filteredOptionsTwo = OPTIONS2.filter((o) => !selectedItems.includes(o));






  return (
    <>
    <Slider/>  



    <div className='container content-pro'>

    
      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className=" d-flex flex-stack">
          <div className="page-title d-flex flex-column">
            <h1 className="d-flex text-white fw-bold my-1 fs-3">
              Callaway Apparel
            </h1>
          </div>

        </div>
      </div>


      {/* <SliderApprel /> */}

      <Card className='travish-mat-section' style={{ marginTop: '80px', padding: "10px", }}
        title="CALLAWAY APPAREL"
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
          <Button className='mx-3 select-btn-detail'
          // onClick={handleImport}
          > <i className="bi bi-bag-check"></i> View cart</Button>

          <Button className='mx-3 select-btn-detail'
           // onClick={handleImport}
          > <i className="bi bi-file-earmark-arrow-up"></i> Import Products</Button>
          <Button className='mx-3 select-btn-detail'
          // onClick={handleExportToPDF} 
          > <i className="bi bi-file-earmark-pdf"></i>  Export to PDF</Button>
          <Button className='mx-3 select-btn-detail'
           // onClick={handleExportToExcel}
          > <i className="bi bi-file-earmark-spreadsheet"></i> Export to Excel</Button>
          <Button className='mx-3 select-btn-detail'
           // onClick={handleSampleExcel}
          > <i className="bi bi-file-spreadsheet"></i> Sample Excel</Button>
        </div>


       


      </Card>


    

    </div>

    </>
  )
}

export default CallAwayApprelProducts