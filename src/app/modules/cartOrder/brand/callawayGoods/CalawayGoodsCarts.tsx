
import React, { useState, useRef, useEffect } from 'react'
import { Card, Table, Carousel, Breadcrumb, Tooltip, Select, Space } from "antd";
import { Input, Radio, InputNumber, Button } from "antd";
import type { InputRef, SelectProps, TableColumnsType } from 'antd';
import { message as antdMessage } from 'antd';


import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import Loading from '../../../loading/Loading';
import { LoadingStart, LoadingStop, getLoading } from '../../../../slice/loading/LoadingSlice';
import CartHeader from '../../CartHeader';

import { getUserAccount } from '../../../../slice/UserSlice/UserSlice';
import { BasicModelGoods } from '../../../model/goods/CallawayGoodsModel';
import { getGoodsProducts, updateQuantity90 ,getHardGoodsRetailerDetail, updateProgressStep, updaterHardGoodsExclusiveDiscount, updateHardGoodsInclusiveDiscount, updateHardGoodsFlatDiscount, resetHardGoodsOrder, addPreOrderId} from '../../../../slice/allProducts/CallAwayGoodsSlice';
import CallawaySubmitOrder from './CallawaySubmitOrder';

import GetCallawayGoodsProduct from '../../../../api/allProduct/callaway/goods/GetCallAWayGoods';
import SubmitModel from './SubmitModel';
import CallawayUpdateOrderToDB from './CallawayUpdateOrderToDB';
import HardGoodsApproveModel from './CalawayGoodsApproveModel';
import ApproveOrderHardGoods from './ApproveOrderHardGoods';
import HardGoodsRejectedModel from './HardGoodsRejectedModel';
import RejectOrderHardGoods from './RejectOrderHardGoods';
import HardGoodsCompleteModel from './HardGoodsCompleteModel';
import CompletedHardGoods from './CompletedOrderHardGoods';
import Note from '../../Note';

import { NoProdect } from '../../NoProdect';
import AlertTravis from '../travisMethew/AlertTravis';
import HardGoodsOrderPdf from './HardGoodsOrderPdf';
import { resetActive } from '../../../../slice/activeTabsSlice/ActiveTabSlice';

const CalawayGoodsCarts = () => {

  const tableRef = useRef(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const searchInput = useRef<InputRef>(null);
  type SelectCommonPlacement = SelectProps['placement'];
  const placement: SelectCommonPlacement = 'topLeft';
  const getLoadings = useSelector(getLoading)
  const [notes, setNotes] = useState<string>('');
  const [isLoadingStart, setIsLoadingStart] = useState<boolean>(false)
  const getGoodsProduct: BasicModelGoods[] = useSelector(getGoodsProducts)
  const getUserAccounts = useSelector(getUserAccount)
  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const [isShowPdf, setIsShowPdf] = useState<boolean>(false);

 


  const getHardGoodsRetailerDetails = useSelector(getHardGoodsRetailerDetail);

  useEffect(() => {
    if (getLoadings) {
      setIsLoadingStart(true)
    } else if (!getLoadings) {
      setIsLoadingStart(false)
    }
  }, [getLoadings])
  const [allOrder, setAllorder] = useState<BasicModelGoods[]>([])
  useEffect(() => {
    console.log("allh",allOrder)

   

    const order: BasicModelGoods[] = []
    if (getGoodsProduct && getGoodsProduct.length > 0) {

      getGoodsProduct.map(item => {
        if (item.ordered && item.error88 === "") {
          order.push(item)

        }
      })


      //setAllorder(order)
      if(order && order.length>0){
        setAllorder(order)
        setIsShowPdf(true)
      } else if(order && order.length==0){
        setAllorder([])
        setIsShowPdf(false)
      }
    }
  },
    [getGoodsProduct])


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

    },




    {
      title: "Product model",
      dataIndex: "product_model",
      key: "product_model",
      width: 100,
    },



    {
      title: "Product type",
      dataIndex: "product_type",
      key: "product_type",
      width: 85,

    },




    {
      title: "life cycle",
      dataIndex: "life_cycle",
      key: "life_cycle",
      width: 75,


    },
    {
      title: "Orientation",
      dataIndex: "orientation",
      key: "orientation",
      width: 65,

    },


    {
      title: "Qty88",
      dataIndex: "stock_88",
      key: "stock_88",
      width: 150,
      fixed: 'right',
      render: (value, record) => (

        <Tooltip open={record.sku === qty90ToolSKU ? isQty90ToolTip : false} title={record.sku === qty90ToolSKU ? qty90ToolMesage : ""} placement="top">
          <InputNumber
            status={record.sku === qty90ToolSKU && qty90ToolMesage != "" ? "error" : ""}
            className='mx-5 number-input'
            addonBefore={record.stock_88 || 0}
            value={record.Quantity90?.toString()}
            onChange={(value) => {
              if (value !== null) {
                handleQuantity90(value, record)
              }

            }}

            disabled={value.stock_88 === 0}
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

  //const hanldeSubmitOrder = () => { }

  const [discountType, setDiscountType] = useState<string>("Inclusive")
  const [isDiscount, setIsDiscount] = useState<boolean>(false)
  const [discountValue, setDiscountValue] = useState<number>(22)

  

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

 
  const handleCheckRetailerDetail = () =>{
    console.log( "hardheck1",getHardGoodsRetailerDetails)
    if(getHardGoodsRetailerDetails && getHardGoodsRetailerDetails.length == 0)
     {
       alert("please select reatailer")
     }
     else if(getHardGoodsRetailerDetails ){
       console.log("hardgchec2",getHardGoodsRetailerDetails)
      const xyz = getHardGoodsRetailerDetails 
      handleRefetch()
 
     }
 
   }


   useEffect(() => {
    let tAmount: number = 0;
    let totalBillAmount: number = 0;
    if (getGoodsProduct && getGoodsProduct.length > 0) {
      getGoodsProduct.map((item: BasicModelGoods) => {
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
  }, [getGoodsProduct])


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


  
  // handle change discount 
  const handleChangeDiscount = (value: number) => {
    const dis = value;
    setDiscountValue(dis)
    if (discountType === "Inclusive") {
      setDiscountType("Inclusive")
      setDiscountValue(dis)
      dispatch(updateHardGoodsInclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Exclusive") {
      setDiscountType("Exclusive")
      setDiscountValue(dis)
      dispatch(updaterHardGoodsExclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Flat") {
      setDiscountValue(dis)
      setDiscountType("Flat")
      dispatch(updateHardGoodsFlatDiscount({
        discount: dis
      }))
    }

  }


  
  const handleDiscount = (value: string) => {
    setIsDiscount(true)
    if (value === "Inclusive") {
      setDiscountType(value)
      setDiscountValue(22)
      dispatch(updateHardGoodsInclusiveDiscount({
        discount: 22
      }))
    }
    if (value === "Exclusive") {
      setDiscountValue(23)
      setDiscountType(value)
      dispatch(updaterHardGoodsExclusiveDiscount({
        discount: 23
      }))
    }
    if (value === "Flat") {
      setDiscountValue(0)
      setDiscountType(value)
      dispatch(updateHardGoodsFlatDiscount({
        discount: 0
      }))
    }
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
    dispatch(resetHardGoodsOrder())

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


    dispatch(resetHardGoodsOrder())
    alert("Your order is suceessfully completed")
    // messageApi.info('Your order is suceessfully completed');
   dispatch(resetActive())
  }
  

  return (
    <div>

      {isLoadingStart && <Loading />}

      {allOrder &&
        allOrder.length > 0 &&
        <CartHeader


          reviewOrder={handleRefetch}
          approveorder={handleApproveOrder}
          submitOrder={hanldeSubmitOrder}
          rejectOrder={handleRejectOrder}
          completedOrder={handleCompletedOrder}
          note={handleNote}
          checkAvailability={handleCheckRetailerDetail}

        />}


      { allOrder &&
        allOrder.length > 0 ?
       ( 
       <div>
       <button className='note-button hover-elevate-up mt-10' onClick={handleNote}> <i className="bi bi-pencil-square"></i> Add a Note</button>
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
                {(
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
                <a style={{ color: "#000", paddingRight: "75px", paddingLeft: "10px" }}>Total Net Bill:</a>
                ₹{totalNetBillAmount !== undefined ? totalNetBillAmount.toFixed(2) : "Loading..."}
              </h4>






            </div>

          </div>
        )}
      />
       <button className='note-button hover-elevate-up mb-20' onClick={handleNote}> <i className="bi bi-pencil-square"></i> Add a Note</button>
      </div>
      )
      :(<NoProdect/>)
    }




{isRefetch && <GetCallawayGoodsProduct
        resetGoods={handleResetRefetch}
  />}
  
<SubmitModel
      isSubmit={isSubmitModel}
      onOkHandler={handleSumbitOk}
      handleCancel={handleSumbitCancel}
      />
{ isSubmitOrder &&
<CallawaySubmitOrder
        totalNetBillAmount={totalNetBillAmount ?? 0}
        discountType={discountType}
        discountValue={discountValue}
        resetSubmitOrder={handleResetSubmitOrder}
        discountAmount={discountAmount ?? 0}
        totalAmount={totalAmount ?? 0} 
             />
}



{isUpdateStrapi &&
        <CallawayUpdateOrderToDB
          resetUpdateData={handleUpdateStrapi}
        />} 

 {/* Approve modal */}
          <HardGoodsApproveModel
          isApprove={isApproveModel}
          onOkHandler={handleApproveOk}
          handleCancel={handleApproveModalCancel}

          />
          {/* approve order */}
      {isstatusUpdate && <ApproveOrderHardGoods
        resetStatus={handleResetStatus}
        statusUpdate={statusUpdate} />}

         {/* reject order */}


      {isRejectedorder &&
        <RejectOrderHardGoods
          resetReject={handleResetRejectedOrder}
        />}

    <HardGoodsRejectedModel
          isReject={isRejectedModel}
          onOkHandler={handleRejectedOk}
          handleCancel={handleRejectedModalCancel}

          />


           {/* completed modal */}
       <HardGoodsCompleteModel
          iscompleted={isCompletedModel}
          onOkHandler={handleCompltedOk}
          handleCancel={handleCompltedModalCancel}

          />
          
            {isCompletedorder && <CompletedHardGoods
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

{isShowPdf && <HardGoodsOrderPdf/>}




    </div>
  )
}

export default CalawayGoodsCarts
