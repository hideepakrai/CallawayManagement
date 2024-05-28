

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

import { BasicModelApparel } from '../../../model/apparel/CallawayApparelModel';
import { getApparelProducts, updateQuantity88, updateQuantity90 } from '../../../../slice/allProducts/CallawayApparelSlice';
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
  const getApparelProduct: BasicModelApparel[] = useSelector(getApparelProducts)
  const getUserAccounts = useSelector(getUserAccount)
  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()

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


  ];









  const handleRefetch = () => { }

  const handleRejectOrder = () => { }


  const handleNote = () => { }

  const hanldeSubmitOrder = () => { }

  const [discountType, setDiscountType] = useState<string>("Inclusive")
  const [isDiscount, setIsDiscount] = useState<boolean>(false)
  const [discountValue, setDiscountValue] = useState<number>(22)

  const handleDiscount = (value: string) => { }

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

  const handleApproveOrder = () => {
  }
  // complete order
  const handleCompletedOrder = () => {

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
        />}

      <Table className='card-table-travis cart-table-profile'
        ref={tableRef}
        columns={columns}
        dataSource={allApparel?.map((item) => ({ ...item, key: item?.sku }))}
        // rowSelection={{
        //   onSelect:(record)=>{handleSelctRow(record)}
        // }}

        bordered
        size="middle"
        scroll={{ x: "100%", y: "auto" }}

        pagination={{
          position: ['topRight', 'bottomRight'], // Positions pagination at the top and bottom
          defaultPageSize: 20
        }}
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
                  // onChange={handleDiscount}


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

                      className='mx-3 number-input'
                      addonAfter="%"
                      value={discountValue}
                      onChange={(value) => {
                        if (value !== null) {
                          // handleChang eDiscount(value);
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
                <a style={{ color: "#000", paddingRight: "93px", paddingLeft: "10px", }}>Sub Total:</a> {totalAmount}
              </h4>

              <h4 style={{ borderBottom: "1px solid #ddd", display: "flex", fontSize: "14px", paddingBottom: "10px", paddingTop: "2px", margin: "0" }}>
                {" "}
                <a style={{ color: "#000", paddingRight: "100px", paddingLeft: "10px", }}>Discount:</a>
                {discountAmount !== undefined ? discountAmount.toFixed(2) : "Loading..."}
              </h4>

              <h4 style={{ borderBottom: "1px solid #ddd", display: "flex", fontSize: "14px", paddingBottom: "10px", paddingTop: "10px", background: "#f1f1f1" }}>
                {" "}
                <a style={{ color: "#000", paddingRight: "75px", paddingLeft: "10px" }}>Total Net Bill:</a>
                {totalNetBillAmount !== undefined ? totalNetBillAmount.toFixed(2) : "Loading..."}
              </h4>






            </div>

          </div>
        )}
      />


    </div>
  )
}

export default CallawayApparelCarts
