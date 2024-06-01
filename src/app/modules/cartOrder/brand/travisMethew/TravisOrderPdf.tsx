import React, { useEffect, useRef, useState } from 'react'
import { getCurrentUser, getUserProfile } from '../../../../slice/UserSlice/UserSlice'
import { useSelector } from 'react-redux'
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel'
import { getTravisProducts, getTravisRetailerDetail } from '../../../../slice/allProducts/TravisMethewSlice'
import { Button, Card, Table, type TableColumnsType } from 'antd';
import { useReactToPrint } from 'react-to-print'
import { RetailerModel } from '../../../model/AccountType/retailer/RetailerModel'
const TravisOrderPdf = () => {

    const getCurrentUsers = useSelector(getCurrentUser)
    const [salesRepName, setSalesRepName] = useState<string>()
    const getUserProfiles= useSelector(getUserProfile)
    //get sales Rep name
  useEffect(()=>{
    if(getUserProfiles && getUserProfiles.length > 0){
        getUserProfiles.map(item=>{
            if(item.role==="Sales Representative"){
                setSalesRepName(item.name)
            }
        })
    }
},[getUserProfiles])

// get all discount , net billl amount
const getTravisRetailerDetails= useSelector(getTravisRetailerDetail) as RetailerModel;
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
      width: 150,

    },


    {
        title: "Season",
        dataIndex: "season",
        key: "season",
        width: 100,
  
  
      },


    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,



    },


    {
        title: "Style",
        dataIndex: "style_code",
        key: "style_code",
        width: 85,
  
      },



    {
      title: " Qty90",
      dataIndex: "Quantity90",
      key: "Quantity90",
      width: 150,
      fixed: 'right',





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

      <div className=" ant-card ant-card-bordered gx-card mt-6"  ref={contentToPrint}>
        <div className="ant-card-body">
         
        <div className="bg-black  py-12 mx-7 d-flex" style={{ borderRadius: "5px" }}>
        <div style={{ width: "100%", textAlign: "center" }} >
          
        </div>
      </div>


      <div className="row px-10 mt-8 mb-18" >
        <div className="col-8">
          <h1 className=" d-flex font-gray-800 fw-light my-1 fs-1  fw-bold pt-3 pb-2" >{getTravisRetailerDetails.name} </h1>

          <div className="d-flex">
            <span className="gx-mb-0  font-weight-800 fw-semibold fs-5">GSTIN: </span>
            <p className='text-gray-600 font-weight-800 fw-semibold fs-5 m-0 mx-1'> {getTravisRetailerDetails.gstin} <i className="bi bi-copy text-gray-600 text-hover-dark cursor-pointer"></i></p>
          </div>

          <div className="user-address pt-2 d-flex">
            <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Phone:
            
             </span>
            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mx-1">
           {getTravisRetailerDetails.phone}
              {/* {retailerphone}   */}
            </p>
          </div>

          <div className="user-address pt-2 ">
            <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Address:</span>
            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">
              {getTravisRetailerDetails.address}  
            </p>
          </div>
        </div>



        <div className="col-4 user-details-pdf" >
          <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Date:</span> 16/01/2024 </p>

          <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Company:</span> Callaway Golf India</p>

          <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Brand:</span> Ogio</p>
          <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Manager:</span> {getCurrentUsers?.name}</p>
          <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Sales Rep:</span>  {salesRepName}</p>
        </div>
      </div>


       

          <Table
            className='cart-table-profile project-table-profile mx-7'

            style={{ border: "1px solid #f0f0f0", borderRadius: "8px 8px 0 0px" }}

            columns={columns}
            dataSource={allTravisOrders?.map((item) => ({ ...item, key: item.sku }))}

            size="middle"
            pagination={false} />



          <div className="mx-7" style={{ width: "237px", float: "right", paddingTop: "20px", backgroundColor: "#fff" }}>

            <h4 style={{ color: "#545454", display: "flex", borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
              {" "}
              <a style={{ color: "#545454", paddingRight: "88px", paddingLeft: "10px", }}>Sub Total:</a>₹{totalAmount}
            </h4>
            {/* ₹ */}
            <h4 style={{ color: "#545454", display: "flex", borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
              {" "}
              <a style={{ color: "#545454", paddingRight: "90px", paddingLeft: "10px", }}>Discount:</a> ₹{discountAmount}
            </h4>



            {/* <h4 style={{color:"#545454", borderBottom:"1px solid #ddd", paddingBottom:"5px",fontSize:"14px"}}>
              {" "}
              <a style={{color:"#545454",  paddingRight:"123px",paddingLeft:"10px", }}>Tax:</a> ₹50
            </h4> */}



            <h4 style={{ color: "#545454", padding: "8px 0px", backgroundColor: "#ddd", fontSize: "14px" }}>
              <a style={{ color: "#545454", paddingRight: "109px", paddingLeft: "10px", }}>Total : </a>{totalNetBillAmount}
            </h4>
          </div>
        </div>

      </div>

    </Card>

  </div>
  )
}

export default TravisOrderPdf