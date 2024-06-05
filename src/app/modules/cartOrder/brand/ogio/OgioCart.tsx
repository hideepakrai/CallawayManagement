import React, { useEffect, useRef, useState } from 'react'
import { getOgioOrder } from "../../../../slice/orderSlice/ogio/OgioCartOrderSlice";
import { useSelector, useDispatch } from 'react-redux';
import { OgioBasicModel } from "../../../model/ogio/OgioBrandModel"
import { Input, InputNumber, InputRef, Popconfirm, Select, SelectProps, Space, Table, TableColumnsType, Tooltip } from 'antd';
import OgioGallery from '../../../brands/ogio/table/column/OgioGallery';
import { updateOgioInclusiveDiscount, updateOgioExclusiveDiscount, updateOgioFlatDiscount, updateProgressStep, resetOgioOrder, addPreOrderId } from "../../../../slice/allProducts/OgioSlice"
import { getOgioProducts, updateQuantity90 } from "../../../../slice/allProducts/OgioSlice"
import Loading from '../../../loading/Loading';
import "./OgioCart.css";
import { LoadingStart, LoadingStop, getLoading } from "../../../../slice/loading/LoadingSlice"
import CartHeader from '../../CartHeader';
import OgioCartPdf from './OgioCartPdf';
import SubmitHomePage from '../../../submitReview/SubmitHomePage';
import { CartModel, ProductDetails } from '../../../model/CartOrder/CartModel';
import { getCurrentUser, getUserAccount } from '../../../../slice/UserSlice/UserSlice';
import { CurentUser } from '../../../model/useAccount/CurrentUser';
import { CreateOrder } from '../../orderApi/OrderAPi';
import GetUserAccount from '../../../auth/components/GetUserAccount';
import GetAllProduct from '../../../../api/allProduct/GetAllProduct';
import OgioProduct from '../../../../api/allProduct/ogio/OgioProduct';
import OgioSubmitOrder from './OgioSubmitOrder';
import UpdateOrderToDB from "./updateOrderToDB"
// import { InfoCircleOutlined } from '@ant-design/icons';
import UpdateReduxOgio from "./UpdateReduxOgio"
import Note from '../../Note';
import ApproveOrderOgio from './ApproveOrderOgio';
import CompletedOgioOrder from './CompletedOgioOrder';
import RejectedOgioOrder from './RejectedOgioOrder';
import OgioSubmitModel from './OgioSubmitModal';
import OgioApproveModel from './OgioApproveModal';
import OgioCompleteModel from './OgioCompltedmodal';
import { NoProdect } from '../../NoProdect';

type SelectCommonPlacement = SelectProps['placement'];
const OPTIONS = ['Accessory',];
const OPTIONS1 = ['Moto', 'Lifestyle',];
const OPTIONS2 = ['Og Rise', 'Og Pace Pro', 'Og Max', 'Og Al Convoy	'];

const OgioCart = () => {
  const placement: SelectCommonPlacement = 'topLeft';
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const searchInput = useRef<InputRef>(null);
  // const getOgioOrders=useSelector(getOgioOrder);
  const getOgioProduct = useSelector(getOgioProducts);

  const getUserAccounts = useSelector(getUserAccount)
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  const filteredOptions1 = OPTIONS1.filter((o) => !selectedItems.includes(o));
  const filteredOptions2 = OPTIONS2.filter((o) => !selectedItems.includes(o));
  const [allOgioOrders, setGetAllOgioOrders] = useState<OgioBasicModel[]>([])
  const [userId, setUserId] = useState<number>();
  const [notes, setNotes] = useState<string>('');
  const [isShowPdf, setIsShowPdf] = useState<boolean>(false);
  

  // update user Id
  const getCurrentUsers = useSelector(getCurrentUser) as CurentUser
  useEffect(() => {
    if (getCurrentUsers) {


      setUserId(getCurrentUsers?.id)
    }
  }, [getCurrentUsers])
  const columns: TableColumnsType<OgioBasicModel> = [
    {
      // title: "Image",
      dataIndex: "PrimaryImage",
      // fixed: "left",
      width: 50,
      render: (value,record) => <OgioGallery record={record} />,
    },

    {
      title: "SKU",
      dataIndex: "sku",
      width: 100,
      fixed: "left",


      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            setTimeout(() => searchInput.current?.select(), 1000);
          });
        }
      },
      onFilter: (value, record) => {

        let check: boolean = false
        const val: string = value.toString().toUpperCase()
        if (record && record.sku) {
          check = record.sku?.startsWith(val)
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
      //   filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      //    <div style={{ padding: 8 }}>
      //      <Input
      //        placeholder="Search Name"
      //        value={selectedKeys[0]}
      //        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      //        onPressEnter={() => confirm()}
      //        style={{ width: 188, marginBottom: 8, display: "block" }}
      //      />
      //    </div>
      //  ),
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

      // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      //   <div style={{ padding: 8,  width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
      //     <Select
      //       mode="multiple"
      //       placeholder="Select Category"

      //       value={selectedKeys}
      //       onChange={setSelectedKeys}
      //       style={{ width: '100%' }}
      //       placement={placement} 
      //     >
      //       {/* Render options based on available categories */}
      //       {filteredOptions.map((item) => (
      //         <Select.Option key={item} value={item}>
      //           {item}
      //         </Select.Option>
      //       ))}
      //     </Select>

      //   </div>
      // ),
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

      // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      //   <div style={{ padding: 8,  width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
      //     <Select
      //       mode="multiple"
      //       placeholder="Select Category"

      //       value={selectedKeys}
      //       onChange={setSelectedKeys}
      //       style={{ width: '100%' }}
      //       placement={placement} 
      //     >
      //       {/* Render options based on available categories */}
      //       {filteredOptions1.map((item) => (
      //         <Select.Option key={item} value={item}>
      //           {item}
      //         </Select.Option>
      //       ))}
      //     </Select>

      //   </div>
      // ),
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

      // filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      //   <div style={{ padding: 8,  width: "300px", position: "absolute", top: -90,  zIndex: 1, }}>
      //     <Select
      //       mode="multiple"
      //       placeholder="Select Category"

      //       value={selectedKeys}
      //       onChange={setSelectedKeys}
      //       style={{ width: '100%' }}
      //       placement={placement} 
      //     >
      //       {/* Render options based on available categories */}
      //       {filteredOptions2.map((item) => (
      //         <Select.Option key={item} value={item}>
      //           {item}
      //         </Select.Option>
      //       ))}
      //     </Select>

      //   </div>
      // ),
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => {
            // Trigger the search input to focus when the filter dropdown is opened
          });
        }
      },
      onFilter: (value, record) => {
        const product_mode = record?.product_model;

        return product_mode === value;
      },
      filterSearch: true,
    },



    {
      title: " Qty90",
      dataIndex: "stock_90",
      key: "stock_90",
      width: 150,
      fixed: 'right',

      render: (value, record) => (
        <>

          <Tooltip open={record.sku === qty90ToolSKU ? isQty90ToolTip : false} title={record.sku === qty90ToolSKU ? qty90ToolMesage : ""} placement="top">

            <InputNumber
              status={record.error !== "" ? "error" : ""}
              className='mx-3 number-input'
              addonBefore={record.stock_90}
              value={record.Quantity90?.toString()}
              style={{ width: 100 }}
              onChange={(value) => {
                if (value !== null) {
                  handleQuantity90(value, record)
                }

              }}


              disabled={value[0]?.Stock90 === 0}
            />
          </Tooltip>
        </>


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

  useEffect(() => {
    const ogio: OgioBasicModel[] = [];
    if (getOgioProduct && getOgioProduct.length > 0) {
      getOgioProduct.map((item) => {
        if (item.ordered) {
          ogio.push(item)
        }
      })


      // setGetAllOgioOrders(ogio)
    }
    if(ogio && ogio.length>0){
      setGetAllOgioOrders(ogio)
      setIsShowPdf(true)
    } else if(ogio && ogio.length===0){
      setIsShowPdf(false)
      setGetAllOgioOrders([])
    }
  }, [getOgioProduct]);

  const [qty90ToolMesage, setQty90Message] = useState<string>("")
  const [qty90ToolSKU, setQty90SKU] = useState<string | undefined>("")
  const [isQty90ToolTip, setIsQty90ToolTip] = useState<boolean>(false)

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
      const confirmed = window.confirm("Do you want to remove the product?");
      if (confirmed) {
        dispatch(updateQuantity90({
          sku: record.sku,
          qty90: intValue,
          MRP: record.mrp,
        }));
      }


    }
  }
  const getLoadings = useSelector(getLoading)
  const [isLoadingStart, setIsLoadingStart] = useState<boolean>(false)
  useEffect(() => {
    if (getLoadings) {
      setIsLoadingStart(true)
    } else if (!getLoadings) {
      setIsLoadingStart(false)
    }
  }, [getLoadings])

  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>(0)

  useEffect(() => {
    let tAmount: number = 0;
    let totalBillAmount: number = 0;
    if (getOgioProduct && getOgioProduct.length > 0) {
      getOgioProduct.map((item: OgioBasicModel) => {
        if (item.Amount && item.ordered && item.error === "") {
          tAmount = parseFloat((item.Amount + tAmount).toFixed(2))
        }
        if (item.FinalBillValue && item.ordered && item.error === "") {

          totalBillAmount = parseFloat((totalBillAmount + item.FinalBillValue).toFixed(2))
        }

      })
      setTotalAmount(tAmount)
      setTotalNetBillAmount(totalBillAmount)
      setDiscountAmount(tAmount - totalBillAmount)
    }
  }, [getOgioProduct])



  // handle disount

  const [discountType, setDiscountType] = useState<string>("Inclusive")
  const [isDiscount, setIsDiscount] = useState<boolean>(true)
  const [discountValue, setDiscountValue] = useState<number>(22)

  const handleDiscount = (value: string) => {
    setIsDiscount(true)
    if (value === "Inclusive") {
      setDiscountType(value)
      setDiscountValue(22)
      dispatch(updateOgioInclusiveDiscount({
        discount: 22
      }))
    }
    if (value === "Exclusive") {
      setDiscountValue(23)
      setDiscountType(value)
      dispatch(updateOgioExclusiveDiscount({
        discount: 23
      }))
    }
    if (value === "Flat") {
      setDiscountValue(0)
      setDiscountType(value)
      dispatch(updateOgioFlatDiscount({
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
      dispatch(updateOgioInclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Exclusive") {
      setDiscountType("Exclusive")
      setDiscountValue(dis)
      dispatch(updateOgioExclusiveDiscount({
        discount: dis
      }))
    }
    if (discountType === "Flat") {
      setDiscountValue(dis)
      setDiscountType("Flat")
      dispatch(updateOgioFlatDiscount({
        discount: dis
      }))
    }

  }

  // check start submit for Review
  // csubmit fro review


  const [isNote, setIsnote] = useState<boolean>(false)
  


  const [retailerId, setRetailerId] = useState<number>(0);


  // submite order
  const [isUpdateRedux, setIsUpdateRedux] = useState(false)
  const [isUpdateStrapi, setIsUpdateStrapi] = useState(false)
  const [isSubmitOrder, setIsSubmitOrder] = useState(false)
  const [isSubmitModal, setIsSubmitModal] = useState(false)
  const [reLoadUserAccount, setReLoadUserAccount] = useState(false)
  
  //refetch
  
  const [isRefetch, setIsRefetch] = useState<boolean>(false)
  const handleRefetch = () => {
    setIsRefetch(true)
    dispatch(LoadingStart())
   
  }

  const handleResetRefetch = () => {
    console.log("refetch")
    setIsRefetch(false)
    dispatch(LoadingStop())
    dispatch(updateProgressStep({
      progressStep: 1

    }))
  }


  // submit order
const handleOkSubmit=()=>{
  setIsSubmitModal(false)
  setIsSubmitOrder(true)
  dispatch(LoadingStart())
}

  const hanldeSubmitOrder = () => {
    setIsSubmitModal(true)
   
  }
  const handleCancelSubmit = () => {
   setIsSubmitModal(false)
   
  }

  const handleResetSubmitOrder = () => {
    setIsSubmitOrder(false)
    setIsUpdateStrapi(true)
    setTotalAmount(0);
    setTotalNetBillAmount(0);
    setDiscountAmount(0)


  }

  const handleResetUSerAccount = () => {
    setReLoadUserAccount(false)

  }

  const handleUpdateStrapi = (message:string) => {
    setIsUpdateStrapi(false)
    setIsUpdateRedux(true)
    if (message === "") {
    //  messageApi.info('some went wrong');
       alert("some went wrong")
       dispatch(updateProgressStep({
        progressStep: 1
  
      }))
    }
    else if (message != ``) {
      alert(message)
     // messageApi.info(message);
     dispatch(updateProgressStep({
      progressStep: 2

    }))
    }
     dispatch(LoadingStop())
  }

  const handleUpdateRedux = () => {
    alert("Your order has been plcaed successfully")
    setIsUpdateRedux(false)

    dispatch(LoadingStop())
    setGetAllOgioOrders([])
  }

  //approve 
  const [isRejectedorder, setIsRejectedorder] = useState<boolean>(false)
  const [isCompletedorder, setIsCompletedorder] = useState<boolean>(false)
  const [isCompletedModal, setIsCompletedModal] = useState<boolean>(false)
  const [isstatusUpdate, setIsStatusUpdate] = useState<boolean>(false)
  const [isApproveModal, setIsApproveModal] = useState<boolean>(false)
  const [statusUpdate, setStatusUpdate] = useState<string>("")
  
  const handleOkApprove=() => {
    setIsApproveModal(false)
    setIsStatusUpdate(true)
    setStatusUpdate("Approved")
    dispatch(LoadingStart())
  }
  
  const handleApproveOrder = () => {
    setIsApproveModal(true)
  }
  const handleCancelApprove = () => {
    setIsApproveModal(false)
  }


  const handleResetStatus = (status: string) => {
    if (status === "Approved") {
      dispatch(updateProgressStep({
        progressStep: 3

      }))
      alert(" your order is approved")
    } else if(status === "Approved failed"){
      dispatch(updateProgressStep({
        progressStep: 2

      }))
      alert("Approved failed")
    }
    setIsStatusUpdate(false)
    dispatch(LoadingStop())
  }

  // complete order

  const handleOkCompleted=() => {
    setIsCompletedorder(true)
    setIsCompletedModal(false)
    dispatch(LoadingStart())
  }
  const handleCompletedOrder = () => {
     setIsCompletedModal(true)

  }

  const handleCancelCompleted=() => {
    setIsCompletedModal(false)
  }

  const handleResetCompletedOrder = (message:string) => {
    setIsCompletedorder(false)
    dispatch(LoadingStop())
    if(message==="Completed"){
      dispatch(updateProgressStep({
        progressStep: 4

      }))
      alert("Your order is suceessfully completed")

      dispatch(resetOgioOrder())
    } else if(message==="Failed to Complete order"){
      dispatch(updateProgressStep({
        progressStep: 3

      }))
      alert("Failed to Complete order")
    }
 
  }


  // rejet order

  const handleRejectOrder = () => {
    setIsRejectedorder(true)
    dispatch(LoadingStart())
  }
  const handleResetRejectedOrder = () => {
    setIsRejectedorder(false)
    dispatch(LoadingStop())
    //messageApi.info('Your order is rejected');
    alert("Your order is rejected")
    dispatch(resetOgioOrder())

    dispatch(updateProgressStep({
      progressStep: 0

    }))
    dispatch(addPreOrderId({
      preOrderId:0
    }))
  }


  // notes 
  const handleNote = () => {
    setIsnote(true)
  }

  const handleCancelNote = () => {
    setIsnote(false)
  }
  const handleOkNote = () => {
 
   
    setIsnote(false)
  }

  return (
    <div>

      {isLoadingStart && <Loading />}
      {allOgioOrders &&
        allOgioOrders.length > 0 &&
        <CartHeader

          reviewOrder={handleRefetch}
          approveorder={handleApproveOrder}
          submitOrder={hanldeSubmitOrder}
          rejectOrder={handleRejectOrder}
          completedOrder={handleCompletedOrder}
          note={handleNote}
        />}



    { allOgioOrders && allOgioOrders.length>0 ?
   (  <Table
        className='cart-table-profile ogio-table-cart'
        ref={tableRef}
        columns={columns}
        dataSource={allOgioOrders?.map((item) => ({ ...item, key: item.sku }))}
        //  rowSelection={rowSelection}
        bordered
        size="middle"
        scroll={{ x: "100%", y: "auto" }}
        style={{ maxHeight: "1600px" }}

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
              <a style={{ marginRight: 10, color: "#000", paddingTop: "4px" }}>Discount</a>
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
              <div>
                {isDiscount && (
                  <Space className='number-input' direction="vertical" style={{ width: "125px" }}>


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






              {/* <h4 style={{ padding: "8px 0px", backgroundColor: "#ddd", fontSize: "14px" }}>
                            <a style={{ color: "#000", paddingRight: "112px", paddingLeft: "10px", }}>Total : </a>₹2,356
                        </h4> */}
            </div>

          </div>
        )}
      />):(<>
      <NoProdect/>
      </>)
    }


      { isShowPdf &&<OgioCartPdf />}

      {/* update the order from user 
 */}
      {reLoadUserAccount && userId != null && <GetUserAccount
        userId={userId}
        resetId={handleResetUSerAccount}
        reLoadUserAccount={reLoadUserAccount}
      />}


{/* check for Availibilty */}
      {isRefetch && <OgioProduct
        resetOgio={handleResetRefetch}
        isRefetch={isRefetch}

      />}

<OgioSubmitModel
isSubmit={isSubmitModal}
onOkHandler={handleOkSubmit}
handleCancel={handleCancelSubmit}
/>

      {
        isSubmitOrder &&
        <OgioSubmitOrder
          totalNetBillAmount={totalNetBillAmount}
          discountType={discountType}
          discountValue={discountValue}
          resetSubmitOrder={handleResetSubmitOrder}
          discountAmount={discountAmount??0}
          totalAmount={totalAmount??0}
          notes={notes}
        />}

      {isUpdateStrapi && <UpdateOrderToDB
        resetUpdateData={handleUpdateStrapi}
      />}

    {/* approve order */}
    <OgioApproveModel
isApprove={isApproveModal}
onOkHandler={handleOkApprove}
handleCancel={handleCancelApprove}
/>

    {isstatusUpdate && <ApproveOrderOgio
        resetStatus={handleResetStatus}
        />}


      {/* complted order */}


      <OgioCompleteModel
iscompleted={isCompletedModal}
onOkHandler={handleOkCompleted}
handleCancel={handleCancelCompleted}
/>
      {isCompletedorder && <CompletedOgioOrder
        resetCompleted={handleResetCompletedOrder}

      />}

       {/* reject order */}

       {isRejectedorder &&
        <RejectedOgioOrder
          resetReject={handleResetRejectedOrder}
        />}

<Note
        isModalOpen={isNote}
        handleOk={handleOkNote}
        handleCancel={handleCancelNote}
      />
    </div>
  )
}

export default OgioCart