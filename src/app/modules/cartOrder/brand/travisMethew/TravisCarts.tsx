
import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Tooltip, Select, Space } from "antd";
import { Input, Radio, InputNumber, Button } from "antd";
import type { InputRef, SelectProps, TableColumnsType } from 'antd';
import { BasicModelTravis, BasicModelTravisGraph, ImageType } from "../../../model/travis/TravisMethewModel"
import { getTravisProducts, getOtherProducts, updateTravisInclusiveDiscount, updaterTravisExclusiveDiscount, updateTravisFlatDiscount, resetTravisOrder, updateProgressStep, addPreOrderId, getTravisRetailerDetail } from "../../../../slice/allProducts/TravisMethewSlice"
import {
  updateQuantity90, updateQuantity88,
  addOtherProduct, updateOtherQuantity90,
  updateOtherQuantity88, removeOtherProduct
} from "../../../../slice/allProducts/TravisMethewSlice";
import { message } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import Loading from '../../../loading/Loading';
import { LoadingStart, LoadingStop, getLoading } from '../../../../slice/loading/LoadingSlice';
import CartHeader from '../../CartHeader';
import GetTravisMethewProduct from "../../../../api/allProduct/travismethew/GetTravisMethewProduct"
import TravisSubmitOrder from './TravisSubmitOrder';
import TravisUpdateOrderToDB from "./TravisUpdateOrderToDB"
import TravisGallery from "../../../brands/travisMethew/table/column/gallery"
import Note from "../../Note"
import { getUserAccount } from '../../../../slice/UserSlice/UserSlice';
import ApproveOrderTravis from './ApproveOrderTravis';
import { message as antdMessage } from 'antd';
import AlertTravis from "./AlertTravis"
import RejectOrderTravis from "./RejectOrderTravis"
import CompletedOrderTravis from './CompletedOrderTravis';
import TravisOrderPdf from './TravisOrderPdf';
import SubmitModel from './SubmitModel';
import TravisApproveModel from './TravisApproveModal';
import TravisCompleteModel from './TraviscompleteModal';
import TravisRejectedModel from './TravisRejectedModal';
import { NoProdect } from '../../NoProdect';
import "./TravisCarts.css"
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel';
import { resetActive } from '../../../../slice/activeTabsSlice/ActiveTabSlice';
const TravisCarts = () => {
  const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)
  const tableRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchInput = useRef<InputRef>(null);
  type SelectCommonPlacement = SelectProps['placement'];
  const placement: SelectCommonPlacement = 'topLeft';
  const getLoadings = useSelector(getLoading)
  const [notes, setNotes] = useState<string>('');
  const [isLoadingStart, setIsLoadingStart] = useState<boolean>(false)
  const [isShowPdf, setIsShowPdf] = useState<boolean>(false);
  const getTravisRetailerDetails = useSelector(getTravisRetailerDetail);

  const getUserAccounts = useSelector(getUserAccount)

  useEffect(() => {
    if (getLoadings) {
      setIsLoadingStart(true)
    } else if (!getLoadings) {
      setIsLoadingStart(false)
    }
  }, [getLoadings])
  const [allOrder, setAllorder] = useState<BasicModelTravis[]>([])
  useEffect(() => {
    const order: BasicModelTravis[] = []
    if (getProduct && getProduct.length > 0) {

      getProduct.map(item => {
        if (item.ordered) {
          order.push(item)

        }
      })
    
    }
    if(order && order.length>0){
      setAllorder(order)
      setIsShowPdf(true)
    } else if(order && order.length==0){
      setAllorder([])
      setIsShowPdf(false)
    }
  },
    [getProduct])
  const columns: TableColumnsType<BasicModelTravis> = [

    {
      // title: "Image",
      dataIndex: "PrimaryImage",
      // fixed: "left",
      width: 60,
      render: (value, record) => <TravisGallery record={record} />,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      width: 100,
      fixed: "left",

      // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      //   <div  style={{ padding: 8, width:"300px", position: "absolute", top: -90,  zIndex: 1 }}>
      //     <Input
      //       ref={searchInput}

      //       placeholder="Search SKU"
      //       value={selectedKeys[0]}
      //       onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      //       onKeyUp={(e) => {
      //         confirm({ closeDropdown: false });

      //       }}
      //       style={{ width: 188, marginBottom: 8, display: "block" }}
      //     />
      //   </div>
      // ),
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 110,


    },




    {
      title: "Season",
      dataIndex: "season",
      key: "season",
      width: 100,


    },




    {
      title: "Style",
      dataIndex: "style_code",
      key: "style_code",
      width: 85,

    },




    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 75,


    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 65,


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


            disabled={value?.stock_88 === 0}
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

            disabled={value?.stock_90 === 0}
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
    {
      title: "GST",
      dataIndex: "gst",
      key: "gst",
      width: 100,
      fixed: 'right'
    },
    {
      title: "LessGST",
      dataIndex: "LessGST",
      key: "LessGST",
      width: 100,
      // fixed:'right'
    },
    {
      title: "Discount",
      dataIndex: "Discount",
      key: "Discount",
      width: 100,
      // fixed:'right'
    },
    {
      title: "LessDiscountAmount",
      dataIndex: "LessDiscountAmount",
      key: "LessDiscountAmount",
      width: 100,
      // fixed:'right'
    },
    {
      title: "NetBillings",
      dataIndex: "NetBillings",
      key: "NetBillings",
      width: 100,
      // fixed:'right'
    },
    {
      title: "FinalBillValue",
      dataIndex: "FinalBillValue",
      key: "FinalBillValue",
      width: 100,
      // fixed:'right'
    },


  ];
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

  const [discountType, setDiscountType] = useState<string>("Inclusive")
  const [isDiscount, setIsDiscount] = useState<boolean>(true)
  const [discountValue, setDiscountValue] = useState<number>(22)

  const handleDiscount = (value: string) => {
    setIsDiscount(true)
    if (value === "Inclusive") {
      setDiscountType(value)
      setDiscountValue(22)
      dispatch(updateTravisInclusiveDiscount({
        discount: 22
      }))
    }
    if (value === "Exclusive") {
      setDiscountValue(23)
      setDiscountType(value)
      dispatch(updaterTravisExclusiveDiscount({
        discount: 23
      }))
    }
    if (value === "Flat") {
      setDiscountValue(0)
      setDiscountType(value)
      dispatch(updateTravisFlatDiscount({
        discount: 0
      }))
    }
  }

  // handle change discount 
  const handleChangeDiscount = (value: number) => {
    const dis = value;
    setDiscountValue(dis)
    if (discountType === "Inclusive") {
      setDiscountType("Inclusive")
      setDiscountValue(dis)
      dispatch(updateTravisInclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Exclusive") {
      setDiscountType("Exclusive")
      setDiscountValue(dis)
      dispatch(updaterTravisExclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Flat") {
      setDiscountValue(dis)
      setDiscountType("Flat")
      dispatch(updateTravisFlatDiscount({
        discount: dis
      }))
    }

  }

  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
  const [messageApi, contextHolder] = antdMessage.useMessage();
  useEffect(() => {
    let tAmount: number = 0;
    let totalBillAmount: number = 0;
    if (getProduct && getProduct.length > 0) {
      getProduct.map((item: BasicModelTravis) => {
        if (item.Amount && item.ordered) {
          tAmount = parseFloat((item.Amount + tAmount).toFixed(2))
        }
        if (item.FinalBillValue && item.ordered) {

          totalBillAmount = parseFloat((totalBillAmount + item.FinalBillValue).toFixed(2))
        }

      })
      setTotalAmount(tAmount)
      setTotalNetBillAmount(totalBillAmount)
      setDiscountAmount(tAmount - totalBillAmount)
    }
  }, [getProduct])

  // submit for review
  const [isRefetch, setIsRefetch] = useState<boolean>(false)
  const handleRefetch = () => {
    setIsRefetch(true)
    dispatch(LoadingStart())
    console.log("fetch")
   
    
  }

  const handleResetRefetch = () => {
    setIsRefetch(false)
    dispatch(LoadingStop())
    dispatch(updateProgressStep({
      progressStep: 1

    }))
   

  }

  // submite order
  const [isUpdateRedux, setIsUpdateRedux] = useState(false)
  const [isUpdateStrapi, setIsUpdateStrapi] = useState(false)
  const [isSubmitOrder, setIsSubmitOrder] = useState(false)
  const [isSubmitModel, setIsSubmitModel] = useState(false)
  const [reLoadUserAccount, setReLoadUserAccount] = useState(false)
  const hanldeSubmitOrder = () => {
    // setIsSubmitOrder(true)
    setIsSubmitModel(true)
    console.log("submited")
   
  }


  const handleSumbitOk=() => {
    setIsSubmitModel(false)

    setIsSubmitOrder(true)
  }
  const handleSumbitCancel=() => {
    setIsSubmitModel(false)
  }
  const handleResetSubmitOrder = () => {
    setIsSubmitOrder(false)
    setIsUpdateStrapi(true)
    setTotalAmount(0);
    setTotalNetBillAmount(0)



  }

  const handleUpdateStrapi = (message: string) => {
    setIsUpdateStrapi(false)
    setIsUpdateRedux(true)
    if (message === "") {
      messageApi.info('some went wrong');
      // alert("some went wrong")
      dispatch(updateProgressStep({
        progressStep: 1
  
      }))
    }
    else if (message != ``) {
      alert(message)
      //messageApi.info(message);
      dispatch(updateProgressStep({
        progressStep: 2
  
      }))
    }

   
    dispatch(LoadingStop())
  }

  // Approve order
  const [message, setMessages] = useState<string>("")
  const [messageType, setMessagesType] = useState<string>("")
  const [isstatusUpdate, setIsStatusUpdate] = useState<boolean>(false)
  const [isApproveModel, setIsApproveModel] = useState<boolean>(false)
  const [isCompletedModel, setIsCompletedModel] = useState<boolean>(false)
  const [isRejectedorder, setIsRejectedorder] = useState<boolean>(false)
  const [isRejectedModel, setIsRejectedModel] = useState<boolean>(false)
  const [isCompletedorder, setIsCompletedorder] = useState<boolean>(false)
  const [statusUpdate, setStatusUpdate] = useState<string>("")
  const handleApproveOk=()=>{
    setIsApproveModel(false)
    
    setIsStatusUpdate(true)
    setStatusUpdate("Approved")
    dispatch(LoadingStart())
  }
const handleApproveModalCancel=()=>{
  setIsApproveModel(false)
}

  const handleApproveOrder = () => {
   
  setIsApproveModel(true)
  }

  const handleResetStatus = (status: string) => {
    if (status === "Approved") {
      dispatch(updateProgressStep({
        progressStep: 3

      }))

    }
    setIsStatusUpdate(false)
    dispatch(LoadingStop())
  }

  // reject order
const handleRejectedOk=()=>{
  setIsRejectedorder(true)
  setIsRejectedModel(false)
  dispatch(LoadingStart())
}
const handleRejectedModalCancel=()=>{
  setIsRejectedModel(false)
}

  const handleRejectOrder = () => {
    setIsRejectedModel(true)
  }

  const handleResetRejectedOrder = () => {
    setIsRejectedorder(false)
    dispatch(LoadingStop())
    messageApi.info('Your order is rejected');
    //alert("Your order is rejected")
    dispatch(resetTravisOrder())

    dispatch(updateProgressStep({
      progressStep: 0

    }))
    dispatch(addPreOrderId({
      preOrderId:0
    }))
    dispatch(resetActive())
  }


   const handleCompltedOk=()=>{
 setIsCompletedModel(false)
 setIsCompletedorder(true)
 dispatch(LoadingStart())
   }

  const handleCompletedOrder = () => {
    setIsCompletedModel(true)
   
  }
  const handleCompltedModalCancel=()=>{
    setIsCompletedModel(false)
  }

  const handleResetCompletedOrder = () => {
    setIsCompletedorder(false)
    dispatch(LoadingStop())
    dispatch(updateProgressStep({
      progressStep: 4

    }))
    dispatch(resetActive())
    dispatch(resetTravisOrder())
    alert("Your order is suceessfully completed")
    // messageApi.info('Your order is suceessfully completed');

  }
  const [isNote, setIsnote] = useState<boolean>(false)
  const handleNote = () => {
    setIsnote(true)
  }

  const handleCancelNote = () => {
    setIsnote(false)
  }

  const handleOkNote = () => {
  
   
    // setNotes(JSON.stringify(note))
    setIsnote(false)
  }
  const handleCheckRetailerDetail = () =>{
   console.log( "check1",getTravisRetailerDetails)
   if(getTravisRetailerDetails && getTravisRetailerDetails.length == 0)
    {
      alert("Please select reatailer")
    }
    else if(getTravisRetailerDetails ){
      console.log("chec2",getTravisRetailerDetails)
     const xyz = getTravisRetailerDetails 
     handleRefetch()

    }

  }
  return (
    <div>

      {isLoadingStart && <Loading />}

      {allOrder &&
        allOrder.length > 0 &&
        <CartHeader

          reviewOrder={handleRefetch}
          submitOrder={hanldeSubmitOrder}
          approveorder={handleApproveOrder}
          rejectOrder={handleRejectOrder}
          completedOrder={handleCompletedOrder}
          note={handleNote}
          checkAvailability={handleCheckRetailerDetail}
        />}


    
     { allOrder && allOrder.length>0?
    ( 
    <div>
     <button className='note-button hover-elevate-up mt-8' onClick={handleNote}> <i className="bi bi-pencil-square"></i> Add a Note</button>

    <Table className='card-table-travis  cart-table-profile mt-6 mb-6'
        ref={tableRef}
        columns={columns}
        dataSource={allOrder?.map((item) => ({ ...item, key: item?.sku }))}
        // rowSelection={{
        //   onSelect:(record)=>{handleSelctRow(record)}
        // }}

        bordered
        size="middle"
        scroll={{ x: "100%", y: "auto" }}

        pagination={false}

        footer={() => (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: 8,

            }}
          >
            <div className='cart-sec' style={{ width: "78%", display: "flex", }}>
              <div>
                <a style={{ marginRight: 10, color: "#000", }}>Discount</a>
                <Select className="input-dropdown"
                  style={{ width: "150px" }}
                  showSearch
                  placeholder="Select discount"
                  optionFilterProp="children"
                  onChange={handleDiscount}
                  defaultValue="Inclusive" 

                  options={[
                    {
                      value: "Inclusive",
                      label: "Inclusive",
                    },
                    {
                      value: "Exclusive",
                      label: "Exclusive",
                    },
                    {
                      value: "Flat",
                      label: "Flat",
                    },
                  ]}
                />
              </div>

              <div>
                {isDiscount && (
                  <Space className='cart-number-input' direction="vertical" style={{ width: "300px" }}>

                    {/* <Input
          //   onChange={(e)=>handleChangeDiscount(e.target.value)}
          // /> */}

                    <InputNumber
                         style={{width:100}}
                      className='mx-3 number-input'
                      addonAfter="%"
                      
                      value={discountValue}
                    
                      onChange={(value) => {
                        if (value !== null) {
                          handleChangeDiscount(value);
                        }
                      }}
                    />

                  </Space>

                )}
              </div>



            </div>

            <div style={{ width: "261px" }}>

              <h4 style={{ borderBottom: "1px solid #ddd", fontSize: "14px", paddingBottom: "10px", paddingTop: "2px" }}>
                {" "}
                <a style={{ color: "#000", paddingRight: "93px", paddingLeft: "10px", }}>Sub Total:</a> ₹{totalAmount}
              </h4>

              <h4 style={{ borderBottom: "1px solid #ddd", display: "flex", fontSize: "14px", paddingBottom: "10px", paddingTop: "2px", margin: "0" }}>
                {" "}
                <a style={{ color: "#000", paddingRight: "100px", paddingLeft: "10px", }}>Discount:</a>
                ₹{discountAmount !== undefined ? discountAmount.toFixed(2) : "Loading..."}
              </h4>

              <h4 style={{ borderBottom: "1px solid #ddd", display: "flex", fontSize: "14px", paddingBottom: "10px", paddingTop: "10px", background: "#f1f1f1" }}>
                {" "}
                <a style={{ color: "#000", paddingRight: "75px", paddingLeft: "10px" }}>Total Net Bill:</a>
                ₹{totalNetBillAmount !== undefined ? totalNetBillAmount.toFixed(2) : "Loading..."}
              </h4>






              {/* <h4 style={{ padding: "8px 0px", backgroundColor: "#ddd", fontSize: "14px" }}>
                    <a style={{ color: "#000", paddingRight: "112px", paddingLeft: "10px", }}>Total : </a>₹2,356
                </h4> */}
            </div>

          </div>
        )}
      />
    <button className='note-button hover-elevate-up mb-20' > <i className="bi bi-pencil-square"></i> Add a Note</button>
      </div>
      ):(
        <NoProdect/>
      )
    }
{/* <Button >Add a note</Button> */}




      {isRefetch && <GetTravisMethewProduct
        resetTravis={handleResetRefetch}


      />}

       {/* submit model */}
        
       <SubmitModel
      isSubmit={isSubmitModel}
      onOkHandler={handleSumbitOk}
      handleCancel={handleSumbitCancel}
      />

      {
        isSubmitOrder &&
        <TravisSubmitOrder
          totalNetBillAmount={totalNetBillAmount ?? 0}
          discountType={discountType}
          discountValue={discountValue}
          resetSubmitOrder={handleResetSubmitOrder}
       
          discountAmount={discountAmount??0}
          totalAmount={totalAmount??0}
        />}


      {isUpdateStrapi &&
        <TravisUpdateOrderToDB
          resetUpdateData={handleUpdateStrapi}
        />}

          {/* Approve modal */}
          <TravisApproveModel
          isApprove={isApproveModel}
          onOkHandler={handleApproveOk}
          handleCancel={handleApproveModalCancel}

          />
      {/* approve order */}
      {isstatusUpdate && <ApproveOrderTravis
        resetStatus={handleResetStatus}
        statusUpdate={statusUpdate} />}

      {/* reject order */}

      {isRejectedorder &&
        <RejectOrderTravis
          resetReject={handleResetRejectedOrder}
        />}

        
           <TravisRejectedModel
          isReject={isRejectedModel}
          onOkHandler={handleRejectedOk}
          handleCancel={handleRejectedModalCancel}

          />

       {/* completed modal */}
       <TravisCompleteModel
          iscompleted={isCompletedModel}
          onOkHandler={handleCompltedOk}
          handleCancel={handleCompltedModalCancel}

          />

      {isCompletedorder && <CompletedOrderTravis
        resetCompleted={handleResetCompletedOrder}

      />}

      <Note
        isModalOpen={isNote}
        handleOk={handleOkNote}
        handleCancel={handleCancelNote}
      />
     
           
      <AlertTravis
        message={message}
        messageType={messageType}

      />

     {isShowPdf && <TravisOrderPdf/>}




    </div>
  )
}

export default TravisCarts

