import { Button, Card, Table, TableColumnsType } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import { BasicModelTravis } from '../../model/travis/TravisMethewModel';
import { AccountOrder } from '../../model/CartOrder/CartModel';
import { useSelector } from "react-redux";
// import BrandLogo from "../../../../../public/media/logos/travis-white.png";
import { getCurrentUser, getUserProfile } from '../../../slice/UserSlice/UserSlice';
import { RetailerModel } from "../../model/AccountType/retailer/RetailerModel"
import { getPreOrderId, getTravisNote, getTravisProducts, getTravisRetailerDetail } from '../../../slice/allProducts/TravisMethewSlice'

// import BrandLogo from "../../../../../../../BrandLogopublic/media/logos/logo-white.png"
import BrandLogo from "../../../../../public/media/logos/logo-white.png"
import "./TravisPdfPrintOrder.css"
type Props = {
  recordPdf: AccountOrder;
  resetTravisPdf: () => void;
}
const TravisPdfPrintOrder = ({ recordPdf, resetTravisPdf }: Props) => {

  console.log("recordPdf", recordPdf)
  const [managerName, setmanagerName] = useState<string>("")
  const [orderDate, setOrderDate] = useState<string | undefined>(undefined);
  const [alldata, setAllData] = useState<BasicModelTravis[]>([])
  const [retailerDetail, setRetailerDetail] = useState<RetailerModel>()
  const getCurrentUsers = useSelector(getCurrentUser)
  const getUserProfiles = useSelector(getUserProfile)
  useEffect(() => {
    if (getCurrentUsers && getCurrentUsers.role === "Manager" && getCurrentUsers.name) {
      setmanagerName(getCurrentUsers.name)
    }
  }, [getCurrentUsers, getUserProfiles])



  const getPreOrderIds=recordPdf.id


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




  useEffect(() => {
    if (recordPdf && recordPdf.items && recordPdf.retailer_details && recordPdf.created_at && recordPdf.manager_id) {
      const orderData = JSON.parse(recordPdf.items)
      setAllData(orderData)
      const retailer = JSON.parse(recordPdf.retailer_details)
      setRetailerDetail(retailer)


      const formattedDate = recordPdf.created_at
        ? new Date(recordPdf.created_at).toLocaleDateString('en-GB')
        : '0';
      setOrderDate(formattedDate);

    }
  }, [recordPdf, getCurrentUsers])
  const columns: TableColumnsType<BasicModelTravis> = [

    {
      title: "SKU",
      dataIndex: "sku",
      width: 100,
      fixed: "left",


    },
    // {
    //   title: "Size",
    //   dataIndex: "size",
    //   key: "size",
    //   width: 150,

    // },


    // {
    //   title: "Color",
    //   dataIndex: "color",
    //   key: "color",
    //   width: 100,


    // },

    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 150,

    },
    {
      title: "QTY",
      dataIndex: "TotalQty",
      key: "TotalQty",
      width: 120,
      render: (value, record) => {

        const total = (record.stock_88 ? record.stock_88 : 0) + (record.stock_90 ? record.stock_90 : 0);
        return (
          <div>
            {total}
          </div>
        )
      }



    },



    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
      width: 100,
      fixed: 'right'

    },
    {
      title: "Discount",
      dataIndex: "LessDiscountAmount",
      key: "LessDiscountAmount",
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
    onAfterPrint: () => resetTravisPdf(),


  });

   useEffect(()=>{
    // eslint-disable-next-line no-debugger
    if(alldata && alldata.length > 0){
      handlePrint(null, () => contentToPrint.current);
    }
  },[alldata])

  return (
    
    <div>
      
      <Button className="mt-12"
        onClick={() => {
          handlePrint(null, () => contentToPrint.current);
        }}

      >Download PDF</Button>

      <Card className="padf" style={{ marginTop: "10px", backgroundColor: "#f8f8f8" }}>

        <div className=" ant-card ant-card-bordered gx-card "
          ref={contentToPrint}
        >
          <div className="ant-card-body">



            <div className="bg-black  py-12  row" style={{ borderRadius: "5px" }}>
              <div className="col-7 text-end ">
                <img className="pdf-image user-barnd-image" width={200} src={BrandLogo}></img>
              </div>
              <div className="col-5 text-end px-10 text-white ">
                <h2 className="text-white pdf-title">ORDER PDF </h2>
                <h3 className="text-white pdf-title"><span>#</span>{getPreOrderIds}</h3>
              </div>
            </div>



            <div className="row px-10 mt-8 mb-18" >
              <div className="col-8">
                <h1 className=" d-flex font-gray-800 fw-light my-1 fs-1  fw-bold pt-3 pb-2" >
                  {recordPdf.retailer_name}
                </h1>

                <div className="d-flex">
                  <span className="gx-mb-0  font-weight-800 fw-semibold fs-5">GSTIN: </span>
                  <p className='text-gray-600 font-weight-800 fw-semibold fs-5 m-0 mx-1'>
                    {recordPdf.retailer_gstin}
                    <i className="bi bi-copy text-gray-600 text-hover-dark cursor-pointer mx-2"></i></p>
                </div>

                {/* <div className="user-address pt-2 d-flex">
            <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Phone:
            
             </span>
            <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 m-0 mx-1">
          {recordPdf.retailer_phone}
              
            </p>
          </div> */}

                <div className="user-address pt-2 d-flex">
                  <span className="gx-mb-0 font-weight-800 fw-semibold fs-4 ">Address:</span>
                  <p className="text-black font-weight-800 text-gray-600 fw-semibold fs-5 mx-1">
                    {recordPdf.retailer_address}
                  </p>
                </div>
              </div>



              <div className="col-4 user-details-pdf" >
                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-4">Date:</span> {orderDate} </p>

                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-4">Company:</span> Callaway Golf India</p>

                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-4">Brand:</span> Travis Mathew</p>
                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-4">Manager:</span> {managerName}
                </p>
                <p className="gx-mb-0  text-black font-weight-800 fw-semibold fs-4"><span className="text-black font-weight-800 text-gray-600 fw-semibold fs-4">Sales Rep:</span> {recordPdf.salesrep_name}
                </p>
              </div>
            </div>




            <Table
              className='cart-table-profile project-table-profile mx-7'

              style={{ border: "1px solid #f0f0f0", borderRadius: "8px 8px 0 0px" }}

              columns={columns}
              dataSource={alldata?.map((item) => ({ ...item, key: item.sku }))}

              size="middle"
              pagination={false} />



            <div className='row'>
              <div className='col-6 mt-6 notes-pdf'>
              {notes &&
                    notes.length > 0 &&
                <h2 className='fs-4'>NOTES: </h2>
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

              <div className='col-6'>
                <div className="mx-7" style={{ width: "237px", float: "right", paddingTop: "20px", backgroundColor: "#fff" }}>

                <tr className="total-amout-list-print">
                    <th className="order-pdf-list-print"> Sub Total: </th>
                    <th className="order-pdf-data-print">  ₹{recordPdf.total_val_pre_discount} </th>
                  </tr>

                  <tr className="total-amout-list-print pt-1">
                    <th className="order-pdf-list-print"> Discount: </th>
                    <th className="order-pdf-data-print">₹{recordPdf.discount_amount}</th>
                  </tr>


                  <tr className="total-amout-list-print" style={{ backgroundColor: "#ddd", paddingTop: "3px" }}>
                    <th className="order-pdf-list-print"> Total : </th>
                    <th className="order-pdf-data-print"> ₹{recordPdf.total_value} </th>

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

export default TravisPdfPrintOrder