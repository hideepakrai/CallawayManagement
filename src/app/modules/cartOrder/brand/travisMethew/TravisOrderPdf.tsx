import React, { useEffect, useRef, useState } from 'react'
import { getCurrentUser, getUserProfile } from '../../../../slice/UserSlice/UserSlice'
import { useSelector } from 'react-redux'
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel'
import { getPreOrderId, getTravisNote, getTravisProducts, getTravisRetailerDetail } from '../../../../slice/allProducts/TravisMethewSlice'
import { Button, Card, Flex, Table, type TableColumnsType } from 'antd';
import { useReactToPrint } from 'react-to-print'
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel'
import BrandLogo from "../../../../../../public/media/logos/logo-white.png"
import "./TravisOrderPdf.css"
const TravisOrderPdf = () => {
  const getPreOrderIds = useSelector(getPreOrderId)
  const today = new Date();
  //const formattedDate = today.toLocaleDateString('en-CA'); 
  const formattedDate = today.toLocaleDateString('en-GB');

  const getCurrentUsers = useSelector(getCurrentUser)
  const [salesRepName, setSalesRepName] = useState<string>()
  const getUserProfiles = useSelector(getUserProfile)
  //get sales Rep name
  useEffect(() => {
    if (getUserProfiles && getUserProfiles.length > 0) {
      getUserProfiles.map(item => {
        if (item.role === "Sales Representative") {
          setSalesRepName(item.name)
        }
      })
    }
  }, [getUserProfiles])

  const [notes, setNotes] = useState<string[]>([])
  const getTravisNotes = useSelector(getTravisNote)
  useEffect(() => {
    const check: string[] = [];
    if (getTravisNotes) {
      getTravisNotes.map((item) => {
        if (item.type != "system" && item.message) {
          check.push(item.message)

        }
      })
      setNotes(check)
    }
  }, [getTravisNotes])

  // get all discount , net billl amount
  const getTravisRetailerDetails = useSelector(getTravisRetailerDetail) as RetailerModel;
  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
  const getTravisProduct: BasicModelTravis[] = useSelector(getTravisProducts)
  const [allTravisOrders, setGetAllTravisOrders] = useState<BasicModelTravis[]>([])
  useEffect(() => {
    let tAmount: number = 0;
    let totalBillAmount: number = 0;
    const travis: BasicModelTravis[] = [];
    if (getTravisProduct && getTravisProduct.length > 0) {
      getTravisProduct.map((item) => {
        if (item.ordered) {
          travis.push(item)
        }
        if (item.Amount) {

          tAmount = parseFloat((item.Amount + tAmount).toFixed(2))
        }
        if (item.FinalBillValue) {

          totalBillAmount = parseFloat((totalBillAmount + item.FinalBillValue).toFixed(2))
        }
      })


      setGetAllTravisOrders(travis)
      setTotalAmount(tAmount)
      setTotalNetBillAmount(totalBillAmount)
      setDiscountAmount(parseFloat((tAmount - totalBillAmount).toFixed(2)));
    }
  }, [getTravisProduct]);

  const columns: TableColumnsType<BasicModelTravis> = [

    {
      title: "SKU",
      dataIndex: "sku",
      width: 100,
      fixed: "left",


    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,

    },


    // {
    //   title: "Season",
    //   dataIndex: "season",
    //   key: "season",
    //   width: 100,


    // },


    // {
    //   title: "Category",
    //   dataIndex: "category",
    //   key: "category",
    //   width: 120,



    // },


    // {
    //   title: "Style",
    //   dataIndex: "style_code",
    //   key: "style_code",
    //   width: 85,

    // },



    {
      title: " Qty",
      dataIndex: "TotalQty",
      key: "TotalQty",
      width: 20,
      fixed: 'right',





    },
    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
      width: 115,
      fixed: 'right'

    },
    {
      title: "Discount",
      dataIndex: "LessDiscountAmount",
      key: "LessDiscountAmount",
      width: 115,
      fixed: 'right'

    },

    {
      title: "Amount ",
      dataIndex: "Amount",
      key: "Amount",
      width: 60,
      fixed: 'right'

    },


  ];

  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing .."),


  });


  return (
    <div>
      <Button className="mt-12"
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}

      >Download PDF</Button>

      <Card className="padf" style={{ marginTop: "10px", backgroundColor: "#f8f8f8" }}>

        <div className=" ant-card ant-card-bordered gx-card mt-6" ref={contentToPrint}>
          <div className="ant-card-body">

            <div className="bg-black  py-12  row" style={{ borderRadius: "5px" }}>
              <div className="col-7 text-end ">
                <img className="pdf-image" width={200} src={BrandLogo}></img>
              </div>
              <div className="col-5 text-end px-6">
                <h2 className="text-white pdf-title">ORDER PDF</h2>
                <h2 className="text-white pdf-title"><span>#</span>{getPreOrderIds}</h2>
              </div>
            </div>


            <div className="row px-10 mt-8 mb-18" >
              <div className="col-8">
                <h1 className=" d-flex font-gray-900 fw-light my-1 fs-1  fw-bold pt-3 pb-2" >{getTravisRetailerDetails.name}</h1>

                <div className="d-flex">
                  <span className="gx-mb-0  font-weight-800 fw-semibold fs-5">GSTIN: </span>
                  <p className='text-gray-600 font-weight-800 fw-semibold fs-5 m-0 mx-1'> {getTravisRetailerDetails.gstin} <i className="bi bi-copy text-gray-600 text-hover-dark cursor-pointer"></i></p>
                </div>

                <div className="user-address pt-3">
                  <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Address:</span>
                  <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mb-3">
                    {getTravisRetailerDetails.address}
                  </p>
                </div>

                {/* <div className="user-address  d-flex">
            <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Phone:
             </span>

            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mx-1">
           {getTravisRetailerDetails.phone}

            </p>
          </div> */}


              </div>



              <div className="col-4 user-details-pdf" >
                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">Date:</span> {formattedDate} </p>

                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">Company:</span> Callaway Golf India</p>

                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">Brand:</span> Travis Mathew</p>
                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">Manager:</span> {getCurrentUsers?.name}</p>
                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">Sales Rep:</span>  {salesRepName}</p>
              </div>
            </div>




            <Table
              className='cart-table-profile project-table-profile mx-7 product-table-pdf'

              style={{ border: "1px solid #f0f0f0", borderRadius: "8px 8px 0 0px" }}

              columns={columns}
              dataSource={allTravisOrders?.map((item) => ({ ...item, key: item.sku }))}

              size="middle"
              pagination={false} />

            <div className='row'>
              <div className='col-3 mt-6 notes-pdf'>
                {notes &&
                  notes.length > 0 &&
                  <h2 className='fs-4'>NOTES:</h2>
                }
                <ul>
                  {notes &&
                    notes.length > 0 &&
                    notes.map((item) => (
                      <li className='fs-5 text-gray-700 notes-pdf-text'>{item}</li>
                    ))}
                </ul>
                {/* <h4 className='fs-5 text-gray-700 notes-pdf-text'>- This is note one</h4>
            <h4 className='fs-5 text-gray-700 notes-pdf-text'>- This is note two</h4> */}
              </div>


              <div className='col-9'>
                <div className="mx-7 " style={{ width: "260px", float: "right", paddingTop: "20px", backgroundColor: "#fff" }}>

                  <tr className="total-amout-list">
                    <th className="order-pdf-list"> Sub Total: </th>
                    <th className="order-pdf-data"> ₹{totalAmount} </th>
                  </tr>




                  <tr className="total-amout-list pt-1">
                    <th className="order-pdf-list"> Discount: </th>
                    <th className="order-pdf-data"> ₹{discountAmount} </th>
                  </tr>

                  <tr className="total-amout-list" style={{ backgroundColor: "#ddd", paddingTop: "3px" }}>
                    <th className="order-pdf-list"> Total : </th>
                    <th className="order-pdf-data">₹{totalNetBillAmount}</th>

                  </tr>


                </div>
              </div>

            </div>

          </div>


        </div>
      </Card>

    </div>
  )
}

export default TravisOrderPdf