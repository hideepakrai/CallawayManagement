import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button } from "antd";
import type { InputRef, TableColumnsType } from 'antd';
import {BasicModelTravis,BasicModelTravisGraph,ImageType} from "../../../model/travis/TravisMethewModel"
import {useDispatch, useSelector} from "react-redux"
import {getTravisProducts,getOtherProducts} from "../../../../slice/allProducts/TravisMethewSlice"
import SampleExcelTravis from '../excel/SampleExcelTravis';

import { number } from 'yup';
import TravisImportExcel from '../excel/importExcel/TravisImportExcel';
import {ExcelModelTravis} from "../../../model/travis/TravisExcel"
import TravisExcelUploadDB from "../excel/importExcel/TravisExcelUploadDB"
import * as XLSX from 'xlsx';
 import {updateQuantity90,updateQuantity88,
  addOtherProduct,updateOtherQuantity90,
  updateOtherQuantity88,removeOtherProduct} from "../../../../slice/allProducts/TravisMethewSlice"
 import { Cascader,Select, Space } from 'antd';
import {addTravisOrder,removeTravisOrder} from "../../../../slice/orderSlice/travis/CartOrder"
import { message } from "antd";
import { Key } from 'antd/lib/table/interface';
import { useTable } from 'react-table';
import "./TravisTable.css"
import type { RadioChangeEvent, SelectProps } from 'antd';
import TravisPdf from '../pdf/TravisPdf';
import Item from 'antd/es/list/Item';
// import jsPDF from "jspdf";
// import "jspdf-autotable";



// Extend jsPDF types
// declare module "jspdf" {
//   export interface jsPDF {
//     autoTable: (
//       columns: string[] | object[],
//       body: object[],
//       options?: object
//     ) => jsPDF;
//   }
// }
type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Denim',];
const OPTIONS1 = ['SS19','SS20	' ];
const OPTIONS2 = ['1MR410', '1MO479','1MR410',];


 const TravisTable = () => {
  const placement: SelectCommonPlacement = 'topLeft'; 
   const tableRef = useRef(null);
    const [isImport, setIsImport] = useState(false);
   
    const dispatch= useDispatch()
    const searchInput = useRef<InputRef>(null);
   const getProduct:BasicModelTravis[]=useSelector(getTravisProducts)
     const[amount, setAmount]=useState<number>()
     

     const [selectedItems, setSelectedItems] = useState<string[]>([]);

     const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));

     const filteredOptionsOne = OPTIONS1.filter((o) => !selectedItems.includes(o));
     const filteredOptionsTwo = OPTIONS2.filter((o) => !selectedItems.includes(o));
     
    //console.log(" travis Product",getProduct)
    const columns: TableColumnsType<BasicModelTravis>= [
        {
          // title: "Image",
          dataIndex: "Gallery",
          // fixed: "left",
          width: 50,
          render: (value) => {
            // Check if value and value.data[0] exist before accessing properties
            if (value && value.data[0] && value.data[0].attributes && value.data[0].attributes.formats && value.data[0].attributes.formats.thumbnail && value.data[0].attributes.formats.thumbnail.url) {
              // console.log("image: " + value.data[0].attributes.formats.thumbnail.url);
              return (
                <span>
                  <img
                    src={`https://admin.callawayindiaoms.com${value.data[0].attributes.formats.thumbnail.url}`}
                    alt="Primary Image"
                    style={{ maxWidth: "30px", marginRight: "5px" }}
                  />
                </span>
              );
            } else {
              return (
                <span>
                  <img
                    src="/media/icons/icon-callway.png"
                    alt="Primary Image"
                    style={{ maxWidth: "30px", marginRight: "5px" }}
                  />
                </span>
              ); // Return a placeholder image if thumbnail url is null or undefined
            }
          },
          
        
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
              console.log("filter",record)
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
          title: "Description ",
          dataIndex: "Description",
          key: "Description", 
          width: 150,
         
        },

        
    
        {
          title: "Name",
          dataIndex: "Name",
          key: "name",
          width: 90 ,
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
          title: "Category",
          dataIndex: "TravisAttributes",
          key: "Category", 
          width: 110,
          render: (value) => <span>{value && value[0] && value[0].Category}</span>,
          sorter: (a, b) => {
            const categoryA = a.TravisAttributes?.[0]?.Category ?? "";
            const categoryB = b.TravisAttributes?.[0]?.Category ?? "";
        
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
            const category =
              record &&
              record.TravisAttributes &&
              record.TravisAttributes[0].Category ;
              
             
           
            return  category=== value;
          },
          filterSearch: true,
        },
        {
            title: "Season",
            dataIndex: "TravisAttributes",
            key: "Season", 
            width: 100,
            render: (value) => <span>{value && value[0] && value[0].Season}</span>,
            sorter: (a, b) => {
              // Extract and compare Season values, handling null or undefined cases
              const seasonA = a.TravisAttributes?.[0]?.Season ?? "";
              const seasonB = b.TravisAttributes?.[0]?.Season ?? "";
          
              return seasonA.localeCompare(seasonB);
            },
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
              const Season =
                record &&
                record.TravisAttributes &&
                record.TravisAttributes[0].Season ;
                
               

              return  Season=== value;
            },
            filterSearch: true,
           
          },
        {
          title: "Style",
          dataIndex: "TravisAttributes",
          key: "StyleCode", 
          width: 85,
          render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.StyleCode ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.StyleCode ?? "";
            return styleCodeA.localeCompare(styleCodeB);
        
          },
        },


        {
          title: "Season",
          dataIndex: "TravisAttributes",
          key: "Season", 
          width: 100,
          render: (value) => <span>{value && value[0] && value[0].Season}</span>,
          sorter: (a, b) => {
            // Extract and compare Season values, handling null or undefined cases
            const seasonA = a.TravisAttributes?.[0]?.Season ?? "";
            const seasonB = b.TravisAttributes?.[0]?.Season ?? "";
          
            return seasonA.localeCompare(seasonB);
          },
          filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
            <div style={{ padding: 8 }}>
              <Select
                mode="multiple"
                placeholder="Select Season"
                value={selectedKeys}
                onChange={setSelectedKeys}
                style={{ width: '100%' }}
                placement={placement} 
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
            const Season = record?.TravisAttributes?.[0]?.Season;
        
            console.log("Filtering:", value, "season:", Season);
            return Season === value;
          },
          filterSearch: true,
        },



      {
        title: "Style",
        dataIndex: "TravisAttributes",
        key: "StyleCode", 
        width: 85,
        render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
        sorter: (a, b) => {
          // Extract and compare StyleCode values, handling null or undefined cases
          const styleCodeA = a.TravisAttributes?.[0]?.StyleCode ?? "";
          const styleCodeB = b.TravisAttributes?.[0]?.StyleCode ?? "";
      
          return styleCodeA.localeCompare(styleCodeB);
        },
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
          <div style={{ padding: 8 }}>
            <Select
              mode="multiple"
              placeholder="Select Style"
              value={selectedKeys}
              onChange={setSelectedKeys}
              style={{ width: '100%' }}
              placement={placement} 
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
          const StyleCode = record?.TravisAttributes?.[0]?.StyleCode;
      
          console.log("Filtering:", value, "Style Code:", StyleCode);
          return StyleCode === value;
        },
        filterSearch: true,
      },
      



        {
          title: "Color",
          dataIndex: "TravisAttributes",
          key: "Color", 
          width: 75,
          render: (value) => <span>{value && value[0] && value[0].Color}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Color ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Color ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
        {
          title: "Size",
          dataIndex: "TravisAttributes",
          key: "Size", 
          width: 65,
          render: (value) => <span>{value && value[0] && value[0].Size}</span>,
          sorter: (a, b) => {
            // Extract and compare StyleCode values, handling null or undefined cases
            const styleCodeA = a.TravisAttributes?.[0]?.Size ?? "";
            const styleCodeB = b.TravisAttributes?.[0]?.Size ?? "";
        
            return styleCodeA.localeCompare(styleCodeB);
          },
        },
       
      
        
           { title: "Qty88",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 100,
            fixed:'right',
            render: (value,record) => (
              <Input 
              addonBefore={value[0]?.Stock88} 
              type='number'
             
              value={record.Quantity88?.toString()}
              onChange={(e) => handleQuantity88(e.target.value, record)}
              disabled={value[0]?.Stock88 === 0} 
              />
             
            ),
          },
            {
              title: "Qty90",
            dataIndex: "TravisAttributes",
            key: "Stock88", 
            width: 100,
            fixed:'right',
            render: (value,record) => (
              <Input addonBefore={value[0]?.Stock90||0} 
              type='number'
              
              value={record.Quantity90?.toString()}
              onChange={(e) => handleQuantity90(e.target.value, record)} 
              disabled={value[0]?.Stock90 === 0} 
              />
             
            ),
            },
           
        
        {
          title: "Qty",
          dataIndex: "TotalQty",
          key: "TotalQty", 
          width: 50,
          fixed:'right'
        },


        {
          title: "MRP",
          dataIndex: "MRP",
          key: "MRP", 
          width: 80,
          fixed:'right'
        },


        {
          title: "Amount",
          dataIndex: "Amount",
          key: "Amount", 
          width: 100,
          fixed:'right'
        },
        
      
      ];


      //get other product 
      const getOtherProduct= useSelector(getOtherProducts)
      const [expandedRowKeys, setExpandedRowKeys] = useState<BasicModelTravis[]>([]);

      const handleExpand = (expanded: boolean, record: BasicModelTravis) => {
         
          dispatch(removeOtherProduct())
        if (record && record.products && record.products.data) {
          // eslint-disable-next-line no-debugger
          debugger
          const sdd:BasicModelTravisGraph[]=record.products.data
          const recordedData:BasicModelTravis[]=[];
          getProduct.map((item)=>{
            sdd.map((product:BasicModelTravisGraph)=>{
              if(product && product.attributes){
                if(product.attributes.SKU === item.SKU){
                  recordedData.push(item)
                }
              }
            })


          })
          // Expand only the clicked row
          console.log("expand  new Record",recordedData )
          setExpandedRowKeys(recordedData);
          dispatch(addOtherProduct(recordedData))
         // expandedRowRender (record.products.data)  // Assuming SKU is a string
        } else{
          setExpandedRowKeys([])
        }
      };


      const expandedRowRender = (record: BasicModelTravis) => {
        console.log("expanded row render",record)

        if (record && record.products && record.products.data  &&record.products.data.length > 0) {
         
        const subcolumns: TableColumnsType<BasicModelTravis> = [
          {
            title: "SKU",
            dataIndex: "SKU",
            key: "SKU",
            width: 130,
            fixed: "left",
          }
          ,
          
           
            {
              title: "Style",
              dataIndex: "TravisAttributes",
              key: "StyleCode", 
              width: 85,
              render: (value) => <span>{value && value[0] && value[0].StyleCode}</span>,
        },
            {
              title: "Size",
              dataIndex: "TravisAttributes",
              key: "Size", 
              width: 85,
              render: (value) => <span>{value && value[0] && value[0].Size}</span>,
        },
        
         
        { title: "Qty88",
        dataIndex: "TravisAttributes",
        key: "Stock88", 
        width: 100,
        fixed:'right',
        render: (value,record) => (
          <Input 
          addonBefore={value[0]?.Stock88} 
          type='number'
         
          value={record.Quantity88?.toString()}
          onChange={(e) => handleQuantity881(e.target.value, record)}
          disabled={value[0]?.Stock88 === 0} 
          />
         
        ),
      },
      {
        title: "Qty90",
      dataIndex: "TravisAttributes",
      key: "Stock88", 
      width: 100,
      fixed:'right',
      render: (value,record) => (
        <Input addonBefore={value[0]?.Stock90||0} 
        type='number'
        
        value={record.Quantity90?.toString()}
        onChange={(e) => handleQuantity901(e.target.value, record)} 
        disabled={value[0]?.Stock90 === 0} 
        />
       
      ),
      },
      {
        title: "Qty",
        dataIndex: "TotalQty",
        key: "TotalQty", 
        width: 50,
        fixed:'right'
      },
        
            {
              title: "MRP",
              dataIndex: "MRP",
              key: "MRP", 
              width: 80,
              fixed:'right',
            
            },
            {
              title: "Amount",
              dataIndex: "Amount",
              key: "Amount", 
              width: 100,
              fixed:'right'
            },
           
          ]
           
          if(expandedRowKeys && getOtherProduct){

          
            return (
        
 


  <Table  className='table-travis'
                columns={subcolumns}
                dataSource={getOtherProduct?.map((item)=>({...item,key:item.id}))}
                pagination={false}
                
                size="middle"
              />
        //  <h1>hello</h1>

           );
               
          }
          else
          return null
    
        }
      }
        const [selectedRowKeys,setSelectedRowKeys]= useState<BasicModelTravis[]>([]);
   
        const onSelectChange = (newSelectedRowKeys: Key[], record: BasicModelTravis) => {
        
          
          
          console.log("selectedRowKeys changed: ", newSelectedRowKeys);
          // Check if the record is selected by checking if its key is included in newSelectedRowKeys
          //const isSelected = newSelectedRowKeys.includes(record.SKU);
          // Update the selectedRowKeys state based on the toggle state
         // setSelectedRowKeys(isSelected ? [record.SKU] : []);
        };
      


  const handleQuantity901 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);

    // eslint-disable-next-line no-debugger
    debugger
    record.Quantity90=intValue;
    if(intValue>0 ){
      if ( record?.TravisAttributes&&record?.TravisAttributes[0]?.Stock90 && record.TravisAttributes[0].Stock90 >= intValue) {
      
        // Dispatch an action to update the quantity for the SKU
        
        dispatch(updateQuantity90({
          sku: record.SKU,
          qty90: intValue,
          MRP: record.MRP,
          
        }));
      
        dispatch(addTravisOrder({
          travisOrder:record,
          qty90: intValue,
          qty88:record.Quantity88
        }))

        // update other product
        dispatch(updateOtherQuantity90({
          sku: record.SKU,
          qty90: intValue,
          MRP: record.MRP,
        }))
      
     
      }
      else{
        alert("Quantity is not available")
        //setQuantity90(0)
        dispatch(updateQuantity90({
          sku: record.SKU,
          qty90: 0,
        
         
        }));
        record.Quantity90=0;
        
      }
    }else if(intValue<0){
      
      alert("Quantity cannot be negative")
    }  else if(intValue===0){
      dispatch(updateQuantity90({
        sku: record.SKU,
        qty90: intValue,
        MRP: record.MRP,
        
      }));

      dispatch(removeTravisOrder({
        travisOrder:record,
          qty90s: intValue,
          qty88s:record.Quantity90
          
      }))
    }

    

  
    // Log the record for debugging or tracking purposes
   
  };
  const handleQuantity90 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);

    // eslint-disable-next-line no-debugger
    debugger
    record.Quantity90=intValue;
    if(intValue>0 ){
      if ( record?.TravisAttributes&&record?.TravisAttributes[0]?.Stock90 && record.TravisAttributes[0].Stock90 >= intValue) {
      
        // Dispatch an action to update the quantity for the SKU
        
        dispatch(updateQuantity90({
          sku: record.SKU,
          qty90: intValue,
          MRP: record.MRP,
          
        }));
      
        dispatch(addTravisOrder({
          travisOrder:record,
          qty90: intValue,
          qty88:record.Quantity88
        }))
      }
      else{
        alert("Quantity is not available")
        //setQuantity90(0)
        dispatch(updateQuantity90({
          sku: record.SKU,
          qty90: 0,
        
         
        }));
        record.Quantity90=0;
        
      }
    }else if(intValue<0){
      
      alert("Quantity cannot be negative")
    }  else if(intValue===0){
      dispatch(updateQuantity90({
        sku: record.SKU,
        qty90: intValue,
        MRP: record.MRP,
        
      }));

      dispatch(removeTravisOrder({
        travisOrder:record,
          qty90s: intValue,
          qty88s:record.Quantity90
          
      }))
    }

    

  
    // Log the record for debugging or tracking purposes
   
  };
  const handleQuantity88 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);
    if(intValue>0 ){

    if ( record?.TravisAttributes &&record?.TravisAttributes[0].Stock88 && record.TravisAttributes[0].Stock88 >= intValue) {
  

      dispatch(updateQuantity88({
        sku: record.SKU,
        qty88: intValue,
        MRP: record.MRP,
      }));
      record.Quantity88=intValue;
     // setQuantity88(intValue)
     dispatch(addTravisOrder({
      travisOrder:record,
        qty88: intValue,
        qty90:record.Quantity90
        
    }))
    }
    else if( record?.TravisAttributes &&record?.TravisAttributes[0].Stock88&& record?.TravisAttributes[0].Stock88 < intValue &&intValue!==0){
      alert("Quantity is not available")
     // setQuantity88(0)
     dispatch(updateQuantity88({
      sku: record.SKU,
      qty88: 0,
    }));
    record.Quantity90=0;
    }
  } else if(intValue<0){
    alert("Quantity cannot be negative")
  } else if(intValue===0){
    dispatch(updateQuantity88({
      sku: record.SKU,
      qty88: 0,
    }));
    dispatch(removeTravisOrder({
      travisOrder:record,
        qty88s: intValue,
        qty90s:record.Quantity90
        
    }))
    
  }
  
  };
  const handleQuantity881 = (value: string, record: BasicModelTravis) => {

    const intValue = parseInt(value, 10);
    if(intValue>0 ){

    if ( record?.TravisAttributes &&record?.TravisAttributes[0].Stock88 && record.TravisAttributes[0].Stock88 >= intValue) {
  

      dispatch(updateQuantity88({
        sku: record.SKU,
        qty88: intValue,
        MRP: record.MRP,
      }));
      record.Quantity88=intValue;
     // setQuantity88(intValue)
     dispatch(addTravisOrder({
      travisOrder:record,
        qty88: intValue,
        qty90:record.Quantity90
        
    }))
    dispatch(updateOtherQuantity88({
      sku: record.SKU,
      qty88: intValue,
      MRP: record.MRP,
    }))
    }
    else if( record?.TravisAttributes &&record?.TravisAttributes[0].Stock88&& record?.TravisAttributes[0].Stock88 < intValue &&intValue!==0){
      alert("Quantity is not available")
     // setQuantity88(0)
     dispatch(updateQuantity88({
      sku: record.SKU,
      qty88: 0,
    }));
    record.Quantity90=0;
    }
  } else if(intValue<0){
    alert("Quantity cannot be negative")
  } else if(intValue===0){
    dispatch(updateQuantity88({
      sku: record.SKU,
      qty88: 0,
    }));
    dispatch(removeTravisOrder({
      travisOrder:record,
        qty88s: intValue,
        qty90s:record.Quantity90
        
    }))
    
  }
  
  };
      // sample xls
  const[isSample, setIsSample]=useState<boolean>(false)
  const handleSampleExcel=()=>{
    setIsSample(true)
  }


  
  const handleResetIsSample=()=>{
    setIsSample(false)
  }

  // handle Excels Data
  const handleImport = () => {
    setIsImport(true);
  };
  const handleCloseImport = () => {
    setIsImport(false);
  };

  const [allXlxData, setAllXlxData]=useState<ExcelModelTravis[]>([])
const handleTravisData=(allDatat:ExcelModelTravis[])=>{
  const table = tableRef.current;
  handleCloseImport()
  
  setAllXlxData(allDatat)
}

//reset excel datta
const handleResetXlData=()=>{
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

    console.log("Excel exported successfully.");
  } catch (error) {
    console.error("Error exporting to Excel:", error);
  }
};


//handle Show Order

const handleShowOrder=()=>{

}



const [selectedRow, setSelectedRow]= useState<BasicModelTravis[]>([])
const handleSelctRow = (record: BasicModelTravis) => {
  console.log("record", record);
  setSelectedRowKeys([record]);
  if (record) {
    setSelectedRow(prev => [...prev, record]);
  }
};

// export to pdf 
const [isPDF, setIspdf]= useState<boolean>(false)
useEffect(()=>{
  if(selectedRow){
    console.log("selectedrow",selectedRow)
  }
},[selectedRow])

const handleExportToPDF=()=>{
  setIspdf(true)
}
const handleResetSelectedRow =()=>{
  setSelectedRow([])
  setIspdf(false)
}

return (
    <div className='container'>

<Card className='travish-mat-section'  style={{ marginTop:'80px',padding:"10px",}}
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
          
          <div style={{ float: "right",marginBottom:"12px" }}>
            <Button className='mx-3' 
           // onClick={handleImport}
            >Add to cart</Button>

            <Button className='mx-3'
            onClick={handleImport}
            >Import Products</Button>
            <Button  className='mx-3'
            onClick={handleExportToPDF} 
            >Export to PDF</Button>
            <Button  className='mx-3'
           onClick={handleExportToExcel}
            >Export to Excel</Button>
            <Button className='mx-3'
             onClick={handleSampleExcel}
             >Sample Excel</Button>
          </div>


          <Table className='card-table-travis'
            ref={tableRef}
            columns={columns}
            dataSource={getProduct?.map((item) => ({ ...item, key: item?.SKU }))}
            rowSelection={{
              onSelect:(record)=>{handleSelctRow(record)}
            }}
            expandable={{ expandedRowRender,
           onExpand: (expanded, record) => handleExpand(expanded, record),
              
             }}
            bordered
            size="middle"
            scroll={{ x: "100%", y: "auto" }}
            style={{ maxHeight: "1600px" }}
            pagination={{ defaultPageSize: 20 }}
          />

          

       
        </Card>
       

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

             { isPDF &&<TravisPdf
              selectedRow={selectedRow}
              resetSelectedRow={handleResetSelectedRow}
              />}
    </div>
  )
}

export default TravisTable