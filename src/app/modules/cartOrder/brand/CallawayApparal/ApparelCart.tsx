

import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Tooltip, Select, Space } from "antd";
import { Input, Radio, InputNumber, Button } from "antd";
import type { InputRef, SelectProps, TableColumnsType } from 'antd';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import Loading from '../../../loading/Loading';
import { LoadingStart, LoadingStop, getLoading } from '../../../../slice/loading/LoadingSlice';
import CartHeader from '../../CartHeader';

import { getUserAccount } from '../../../../slice/UserSlice/UserSlice';
import { message as antdMessage } from 'antd';
import { BasicModelApparel } from '../../../model/apparel/CallawayApparelModel';
import { getApparelProducts, getSoftgoodRetailerDetail, resetSoftGoods, updateApparelFlatDiscount, updateApparelInclusiveDiscount, updateProgressStep, updateQuantity88, updateQuantity90, updaterApparelExclusiveDiscount,addPreOrderId } from '../../../../slice/allProducts/CallawayApparelSlice';
import GetAllApparelProducts from '../../../../api/allProduct/callaway/appreal/GetAllApparelProducts';
import SubmitSoftGoodModel from './submitOrder/SubmitSoftGoodModel';
import SubmitSoftOrder from './submitOrder/SubmitSoftOrder';
import Note from '../../Note';
import UpdateApparelQtyInDB from './upadateQty_Db/UpdateApparelQtyInDB';
import ApparelApproveModel from './approve/ApparelApproveModal';
import ApparelApproveOrder from './approve/ApparelApproveOrder';
import ApparelCompleteModel from './completeOrder/ApparelCompleteModal';
import ApparelCompletedOrder from './completeOrder/ApparelcompleteOrder';
import { NoProdect } from '../../NoProdect';
import SoftGoodsOrderPdf from './pdfOrder/SoftGoodsOrderPdf';
import { resetActive } from '../../../../slice/activeTabsSlice/ActiveTabSlice';
import SoftGoodsRejectedModel from "./SoftGoodsRejectedModel"
import RejectOrderSoftGoods from './RejectOrderSoftGoods';
const CallawayApparelCarts = () => {

  const tableRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchInput = useRef<InputRef>(null);
  type SelectCommonPlacement = SelectProps['placement'];
  const placement: SelectCommonPlacement = 'topLeft';
  const getLoadings = useSelector(getLoading)
  const [notes, setNotes] = useState<string>('');
  const [isLoadingStart, setIsLoadingStart] = useState<boolean>(false)
  const [isRejectedModel, setIsRejectedModel] = useState<boolean>(false)
  const getApparelProduct: BasicModelApparel[] = useSelector(getApparelProducts)
  const getUserAccounts = useSelector(getUserAccount)
  const [isShowPdf, setIsShowPdf] = useState<boolean>(false);

 
  useEffect(() => {
    if (getLoadings) {
      setIsLoadingStart(true)
    } else if (!getLoadings) {
      setIsLoadingStart(false)
    }
  }, [getLoadings])
  const [allApparel, setAllApparel] = useState<BasicModelApparel[]>([])

  //get Apparel product 

  useEffect(() => {

    const apparelItem: BasicModelApparel[] = []
    if (getApparelProduct &&
      getApparelProduct.length > 0
    ) {
      getApparelProduct.map(item => {
        if (item.ordered && item.error88 == "" && item.error90 == "")
          apparelItem.push(item)

      })
    }

   // setAllApparel(apparelItem)
   if(apparelItem && apparelItem.length>0){
    setAllApparel(apparelItem)
    setIsShowPdf(true)
  } else if(apparelItem && apparelItem.length==0){
    setAllApparel([])
    setIsShowPdf(false)
  }


  }, [getApparelProduct])

  console.log("allApparel",allApparel)
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


    },




    {
      title: "Season",
      dataIndex: "season",
      key: "season",
      width: 100,


    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      width: 75,

    },


    {
      title: "Style",
      dataIndex: "style_id",
      key: "style_id",
      width: 85,

    },



    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: 65,

    },

    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 150,
    },
    {
      title: "Sleeves",
      dataIndex: "sleeves",
      key: "sleeves",
      width: 150,
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
      title: "Amount ",
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

  
  

  const getSoftgoodRetailerDetails= useSelector(getSoftgoodRetailerDetail)
  const handleCheckRetailerDetail = () =>{
    if(getSoftgoodRetailerDetails && getSoftgoodRetailerDetails.length == 0)
      {
        alert("Please select reatailer")
      }
      else if(getSoftgoodRetailerDetails ){
       
       handleRefetch()
  
      }
 
   }


     // check for availiabilty by updating all quantity
  const [isRefetch, setIsRefetch] = useState<boolean>(false)
  const handleRefetch = () => {
    setIsRefetch(true)
    dispatch(LoadingStart())
    console.log("fetch")
   
    
  }

  const handleResetRefetch=()=>{
    setIsRefetch(false)
    dispatch(LoadingStop())
    dispatch(updateProgressStep({
      progressStep: 1

    }))
  }
// notes

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

  // submite order
  const [isUpdateRedux, setIsUpdateRedux] = useState(false)
  const [isUpdateStrapi, setIsUpdateStrapi] = useState(false)
  const [isSubmitOrder, setIsSubmitOrder] = useState(false)
  const [isSubmitModel, setIsSubmitModel] = useState(false)
  const [reLoadUserAccount, setReLoadUserAccount] = useState(false)
  const hanldeSubmitOrder = () => {
   
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
  const [isApproveModel, setIsApproveModel] = useState<boolean>(false)
  const [isCompletedModel, setIsCompletedModel] = useState<boolean>(false)
  const [isRejectedorder, setIsRejectedorder] = useState<boolean>(false)

  //approve order
  const handleApproveOrder = () => {
    setIsApproveModel(true)
  }
  const handleApproveModalCancel=()=>{
    setIsApproveModel(false)
  }

  // handle disacount
  const [discountType, setDiscountType] = useState<string>("Inclusive")
  const [isDiscount, setIsDiscount] = useState<boolean>(true)
  const [discountValue, setDiscountValue] = useState<number>(22)

  const handleDiscount = (value: string) => {
    setIsDiscount(true)
    if (value === "Inclusive") {
      setDiscountType(value)
      setDiscountValue(22)
      dispatch(updateApparelInclusiveDiscount({
        discount: 22
      }))
    }
    if (value === "Exclusive") {
      setDiscountValue(23)
      setDiscountType(value)
      dispatch(updaterApparelExclusiveDiscount({
        discount: 23
      }))
    }
    if (value === "Flat") {
      setDiscountValue(0)
      setDiscountType(value)
      dispatch(updateApparelFlatDiscount({
        discount: 0
      }))
    }
  }

  // calculated amount and discount ammount

  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()

  useEffect(() => {
    let tAmount: number = 0;
    let totalBillAmount: number = 0;
    if (getApparelProduct && getApparelProduct.length > 0) {
      getApparelProduct.map((item: BasicModelApparel) => {
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
  }, [getApparelProduct])

  // handle change discount 
  const handleChangeDiscount = (value: number) => {
    const dis = value;
    setDiscountValue(dis)
    if (discountType === "Inclusive") {
      setDiscountType("Inclusive")
      setDiscountValue(dis)
      dispatch(updateApparelInclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Exclusive") {
      setDiscountType("Exclusive")
      setDiscountValue(dis)
      dispatch(updaterApparelExclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Flat") {
      setDiscountValue(dis)
      setDiscountType("Flat")
      dispatch(updateApparelFlatDiscount({
        discount: dis
      }))
    }

  }

  const [isCompletedorder, setIsCompletedorder] = useState<boolean>(false)
  const [statusUpdate, setStatusUpdate] = useState<string>("")
  const [isstatusUpdate, setIsStatusUpdate] = useState<boolean>(false)
  const [messageApi, contextHolder] = antdMessage.useMessage();
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
      alert("order submited sucessfully")
      //messageApi.info(message);
      dispatch(updateProgressStep({
        progressStep: 2
  
      }))
    }

   
    dispatch(LoadingStop())
  }

  // aprove modal

  const handleApproveOk=()=>{
    setIsApproveModel(false)
    setStatusUpdate("Approved")
    setIsStatusUpdate(true)
  
    dispatch(LoadingStart())
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
    dispatch(resetSoftGoods())

    dispatch(updateProgressStep({
      progressStep: 0

    }))
    dispatch(addPreOrderId({
      preOrderId:0
    }))
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
  
  //  complete
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
   
       dispatch(resetSoftGoods())
       alert("Your order is suceessfully completed")
       // messageApi.info('Your order is suceessfully completed');
        dispatch(resetActive())
     }
  return (
    <div>

      {isLoadingStart && <Loading />}

      {allApparel &&
        allApparel.length > 0 &&
        <CartHeader

          reviewOrder={handleRefetch}
          approveorder={handleApproveOrder}
          submitOrder={hanldeSubmitOrder}
          rejectOrder={handleRejectOrder}
          completedOrder={handleCompletedOrder}
          note={handleNote}
          checkAvailability={handleCheckRetailerDetail}

        />}


     {allApparel &&
        allApparel.length > 0 ?
      (
      <div>
<button className='note-button hover-elevate-up mt-10' onClick={handleNote}> <i className="bi bi-pencil-square"></i> Add a Note</button>
        
      <Table className='card-table-travis  cart-table-profile mt-6 mb-6'
        ref={tableRef}
        columns={columns}
        dataSource={allApparel?.map((item) => ({ ...item, key: item?.sku }))}
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
                  // defaultValue="Inclusive" 

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
                  <Space className='cart-number-input' direction="vertical" style={{ width: "125px" }}>

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
                <a style={{ color: "#000", paddingRight: "75px", paddingLeft: "10px" }}>Total Net Bill: </a>
                ₹{totalNetBillAmount !== undefined ? totalNetBillAmount.toFixed(2) : "Loading..."}
              </h4>







            </div>

          </div>
        )}
      />
      <button className='note-button hover-elevate-up mb-20' onClick={handleNote}> <i className="bi bi-pencil-square"></i> Add a Note</button>
      </div>
    
    ) 
      : (<NoProdect/>)
      
      }




          {/*check availablity by getting all apparael qty  */}
          {isRefetch && <GetAllApparelProducts
        resetApparel={handleResetRefetch}
      />}

      {/* notes */}
      <Note
        isModalOpen={isNote}
        handleOk={handleOkNote}
        handleCancel={handleCancelNote}
      />
     

        {/* submit model */}
        
        <SubmitSoftGoodModel
      isSubmit={isSubmitModel}
      onOkHandler={handleSumbitOk}
      handleCancel={handleSumbitCancel}
      />

{
        isSubmitOrder &&
        <SubmitSoftOrder
          totalNetBillAmount={totalNetBillAmount ?? 0}
          discountType={discountType}
          discountValue={discountValue}
          resetSubmitOrder={handleResetSubmitOrder}
       
          discountAmount={discountAmount??0}
          totalAmount={totalAmount??0}
        />}

{/* update data into DB */}
{isUpdateStrapi &&
        <UpdateApparelQtyInDB
        allApparel={allApparel}
          resetUpdateData={handleUpdateStrapi}
        />}


           {/* Approve modal */}
           <ApparelApproveModel
          isApprove={isApproveModel}
          onOkHandler={handleApproveOk}
          handleCancel={handleApproveModalCancel}

          />



            {/* approve order */}
      {isstatusUpdate && <ApparelApproveOrder
        resetStatus={handleResetStatus}
        statusUpdate={statusUpdate}
        />}



          {/* reject order */}

          {isRejectedorder &&
     <RejectOrderSoftGoods
     resetReject={handleResetRejectedOrder}
     />
          }

<SoftGoodsRejectedModel
          isReject={isRejectedModel}
          onOkHandler={handleRejectedOk}
          handleCancel={handleRejectedModalCancel}

          />




        {/* complete modal */}

           {/* completed modal */}
       <ApparelCompleteModel
          iscompleted={isCompletedModel}
          onOkHandler={handleCompltedOk}
          handleCancel={handleCompltedModalCancel}

          />

{isCompletedorder && <ApparelCompletedOrder
        resetCompleted={handleResetCompletedOrder}

      />}

      
     {isShowPdf && <SoftGoodsOrderPdf
      />}
    </div>
  )
}

export default CallawayApparelCarts
