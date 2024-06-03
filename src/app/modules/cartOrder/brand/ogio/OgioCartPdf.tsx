import React, { useEffect, useState, useRef } from "react";
import { Card, Table, Input, Button, Select, InputNumber, Tooltip } from "antd";
import type { TableColumnsType } from 'antd';
import { BasicModelTravis } from "../../../model/travis/TravisMethewModel.ts"
import { useDispatch, useSelector, } from "react-redux"
import { getTravisOrder } from "../../../../slice/orderSlice/travis/CartOrder.tsx"
import { useReactToPrint } from 'react-to-print';
import { getRetailerDetails } from "../../../../slice/orderSlice/travis/Orderdetails.tsx"
import OgioGallery from "../../../brands/ogio/table/column/OgioGallery.tsx";
import { OgioBasicModel } from "../../../model/ogio/OgioBrandModel.ts";
import { getOgioProducts, getOgioRetailerDetail } from "../../../../slice/allProducts/OgioSlice.tsx";
import { getOgioOrder } from "../../../../slice/orderSlice/ogio/OgioCartOrderSlice.tsx";
//import BrandLogo from "../../../../../../public/media/logos/logo-white.png"
import { getCurrentUser, getUserAccount, getUserProfile, getUserRetailer } from "../.../../../../../slice/UserSlice/UserSlice"
import "./OgioCartPdf.css"
import { RetailerModel } from "../../../model/AccountType/retailer/RetailerModel.ts";
type Props = {
  // totalAmount:number,
  // discountAmount:number,
  // totalNetBillAmount:number,
  // retailerName:string,
  // retailerAddres:string,
  // retailerCity:string,

}

const OgioCartPdf = () => {

  
  const getUserProfiles= useSelector(getUserProfile)
  const getCurrentUsers = useSelector(getCurrentUser)
  const [retailerName, setRetailerName] = useState<string>()


  const [retailerAddres, setRetailerAddress] = useState<string>()
  const [retailerId, setRetailerId] = useState<number>(0)
  const [retailerCty, setRetailerCity] = useState<string>()
  const [salesRepName, setSalesRepName] = useState<string>()
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-CA'); 

  const getAllTravisOrder = useSelector(getTravisOrder)

  useEffect(()=>{
    if(getUserProfiles && getUserProfiles.length > 0){
        getUserProfiles.map(item=>{
            if(item.role==="Sales Representative"){
                setSalesRepName(item.name)
            }
        })
    }
},[getUserProfiles])



    const getOgioRetailerDetails= useSelector(getOgioRetailerDetail) as RetailerModel;
  const getOgioProduct: OgioBasicModel[] = useSelector(getOgioProducts)
  const [allOgioOrders, setGetAllOgioOrders] = useState<OgioBasicModel[]>([])
  const [totalAmount, setTotalAmount] = useState<number>()
  const [discountAmount, setDiscountAmount] = useState<number>()
  const [totalNetBillAmount, setTotalNetBillAmount] = useState<number>()
  useEffect(() => {
    let tAmount: number = 0;
    let totalBillAmount: number = 0;
    const ogio: OgioBasicModel[] = [];
    if (getOgioProduct && getOgioProduct.length > 0) {
      getOgioProduct.map((item) => {
        if (item.ordered) {
          ogio.push(item)
        }
        if (item.Amount) {

          tAmount = parseFloat((item.Amount + tAmount).toFixed(2))
        }
        if (item.FinalBillValue) {

          totalBillAmount = parseFloat((totalBillAmount + item.FinalBillValue).toFixed(2))
        }
      })


      setGetAllOgioOrders(ogio)
      setTotalAmount(tAmount)
      setTotalNetBillAmount(totalBillAmount)
      setDiscountAmount(parseFloat((tAmount - totalBillAmount).toFixed(2)));
    }
  }, [getOgioProduct]);
  const columns: TableColumnsType<OgioBasicModel> = [


    {
      title: "SKU",
      dataIndex: "sku",
      width: 100,
      fixed: "left",


    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      fixed: "left",

    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 150,

    },

    //product Type
    {
      title: "ProductType",
      dataIndex: "product_type",
      key: "product_type",
      width: 150,




    },


    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 120,



    },


    {
      title: "ProductModel",
      dataIndex: "product_model",
      key: "product_model",
      width: 150,

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
           
          <div className="bg-black  py-12  row" style={{ borderRadius: "5px" }}>
          <div className="col-7 text-end ">
            {/* <img className="pdf-image" width={200} src={BrandLogo}></img> */}
          </div>
          <div className="col-5 text-end px-6">
            <h2 className="text-white pdf-title">ORDER PDF </h2>
          </div>
          </div>


        <div className="row px-10 mt-8 mb-18" >
          <div className="col-8">
            <h1 className=" d-flex font-gray-800 fw-light my-1 fs-1  fw-bold pt-3 pb-2" >{getOgioRetailerDetails.name} </h1>

            <div className="d-flex">
              <span className="gx-mb-0  font-weight-800 fw-semibold fs-5">GSTIN: </span>
              <p className='text-gray-600 font-weight-800 fw-semibold fs-5 m-0 mx-1'> {getOgioRetailerDetails.gstin} <i className="bi bi-copy text-gray-600 text-hover-dark cursor-pointer"></i></p>
            </div>

            <div className="user-address pt-2 ">
              <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Address:</span>
              <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5">
                {getOgioRetailerDetails.address}  
              </p>
            </div>


            {/* <div className="user-address pt-1 d-flex">
              <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Phone:
               </span>
              <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mx-1">
             {getOgioRetailerDetails.phone}
               
              </p>

            </div> */}

           
          </div>



          <div className="col-4 user-details-pdf" >
            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Date:</span> {formattedDate} </p>

            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Company:</span> Callaway Golf India </p>

            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Brand:</span> Ogio</p>
            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Manager:</span>{getCurrentUsers?.name}</p>
            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5"><span className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4">Sales Rep:</span>  {salesRepName}</p>
          </div>
        </div>


         

            <Table
              className='cart-table-profile project-table-profile mx-7'

              style={{ border: "1px solid #f0f0f0", borderRadius: "8px 8px 0 0px" }}

              columns={columns}
              dataSource={allOgioOrders?.map((item) => ({ ...item, key: item.sku }))}

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

export default OgioCartPdf