
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
import { getGoodsProducts, updateQuantity90 ,getHardGoodsRetailerDetail, updateProgressStep, updaterHardGoodsExclusiveDiscount, updateHardGoodsInclusiveDiscount, updateHardGoodsFlatDiscount} from '../../../../slice/allProducts/CallAwayGoodsSlice';
import CallawaySubmitOrder from './CallawaySubmitOrder';
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
 


  const getHardGoodsRetailerDetails = useSelector(getHardGoodsRetailerDetail);

  useEffect(() => {
    if (getLoadings) {
      setIsLoadingStart(true)
    } else if (!getLoadings) {
      setIsLoadingStart(false)
    }
  }, [getLoadings])
  const [allOrder, setAllorder] = useState<BasicModelGoods[]>([])
  console.log("allh",allOrder)
  useEffect(() => {
   
// eslint-disable-next-line no-debugger
debugger
    const order: BasicModelGoods[] = []
    if (getGoodsProduct && getGoodsProduct.length > 0) {

      getGoodsProduct.map(item => {
        if (item.ordered && item.error90 === "") {
          order.push(item)

        }
      })
      setAllorder(order)
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









 // const handleRefetch = () => { }

  const handleRejectOrder = () => { }

  const [isNote, setIsnote] = useState<boolean>(false)

  const handleNote = () => {
    setIsnote(true)
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

  const handleApproveOrder = () => {
  }
  // complete order
  const handleCompletedOrder = () => {

  }
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

  const handleResetSubmitOrder = () => {
    setIsSubmitOrder(false)
    setIsUpdateStrapi(true)
    setTotalAmount(0);
    setTotalNetBillAmount(0)



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

      <Table className='card-table-travis cart-table-profile mt-12 mb-5'
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


{ isSubmitOrder &&
<CallawaySubmitOrder
        totalNetBillAmount={totalNetBillAmount ?? 0}
        discountType={discountType}
        discountValue={discountValue}
        resetSubmitOrder={handleResetSubmitOrder}
        discountAmount={discountAmount ?? 0}
        totalAmount={totalAmount ?? 0} 
        note={''}      />
}
    </div>
  )
}

export default CalawayGoodsCarts
