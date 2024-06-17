import React, { useEffect, useRef } from 'react';
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Row, Col, Card, Button } from 'react-bootstrap';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { BrandModel } from "../../../model/brand/AllBrands"
import { getAllBrands } from "../../../../slice/brand/BrandSlice";
import { Link } from 'react-router-dom';
import "./TravisPdf.css"
import TravisLogo from "../../../../../../public/media/logos/travis-white.png";
import productimg from "../../../../../../public/media/product/Pro-img (1).png";
import productimg1 from "../../../../../../public/media/product/Pro-img (2).png";
import productimg2 from "../../../../../../public/media/product/Pro-img (3).png";
import productimg3 from "../../../../../../public/media/product/Pro-img (4).png";
import PrimaryImage from "./PrimaryImage"
import SecondaryImage from './SecondaryImage';
import { TravisPdfPrint } from '../../../model/pdf/PdfModel';
import VarationSkuInfo from './VarationSkuInfo';

type Props = {
  selectedRow: TravisPdfPrint[];
  resetSelectedRow: () => void;
};

const TravisPdf: React.FC<Props> = ({ selectedRow, resetSelectedRow }: Props) => {



   useEffect(() => {
    if (selectedRow && selectedRow.length > 0) {
      handlePrint(null, () => contentToPrint.current);
    }
  }, [selectedRow]);


  const getAllBrand = useSelector(getAllBrands) as BrandModel[];
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => resetSelectedRow(),
    removeAfterPrint: true,

  });





  return (
  
  <div>
    <div className='pdf-info'>
      <Row >
        <Col xs={24} >
          <div style={{ textAlign: "left", marginTop: "40px", marginBottom: "6px" }}>
           

            <button onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }} type="button" className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default mx-3 download-prodect"><span>Download Pdf</span></button>

           

            <button type="button" className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default mx-3 download-prodect"><span>Download PPT</span></button>

          </div>

          <Card id="catelog" ref={contentToPrint}>
      

              <div className='mb-18' style={{ textAlign: 'center', height: "1122px", backgroundColor: "#000", paddingTop: "300px" }}>

                <div >
                  <img style={{ width: "200px", paddingTop: "60px" }} src={TravisLogo}></img>
                </div>

                <h2 className='brand-title'  style={{ paddingTop: "40px", paddingBottom: "40px", fontSize: "45px", color: "#fff", fontWeight: "500", letterSpacing: "4px", }}>Travis Mathew</h2>

                <p style={{ fontSize: "18px", paddingLeft: "30px", color: "#fff", paddingRight: "30px", fontWeight: "100", }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </p>
              </div>
              {/* prodect two  start*/}
           


            {selectedRow &&
              selectedRow.length > 0 &&
              selectedRow.map(
                (callout) => (
                  <>
                    <div
                      style={{
                        // borderBottom: "1px solid #ddd",
                        paddingTop: "30px",
                        paddingLeft: "25px",
                        height: "1122px",
                        paddingRight: "25px",
                      }}
                    >
                      <div
                        className="prodect-pdf-section">
                        <div
                          style={{ order: "0", }}
                        >
                          <h2 className='fs-1 mb-8'>
                            {callout?.description}
                          </h2>



                          <div className='product-pdf  row'>
                            <div className=' col-7' style={{ borderRadius: "5px", }}>

                              <div className='prodect-images'>
                                {callout.primary_image_url !== null ? (
                                  <PrimaryImage
                                    record={callout} />
                                ) : (
                                  <img
                                    alt="Special Edition Party Spas"
                                    style={{
                                      backgroundColor: "#d1d3d4",
                                      borderRadius: "10px",
                                      width: "290px"
                                    }}
                                    src={`https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/large_51xntqlp_Sy_L_AC_SL_1500_a17350c6f1_d08da64450.jpg`}
                                  />
                                )

                                }


                              </div>
                              <div
                                className="prodect-info-img mt-6" >
                                <>
                                  <div
                                    className="prodect-images-pdf"
                                    style={{ marginRight: "10px", marginLeft: "10", }}
                                  >
                                    <SecondaryImage
                                      record={callout}
                                    />


                                   

                                  </div>
                                </>

                              </div>



                            </div>

                            <div className='product-right-section col-5'>
                              {callout && callout.variation_sku_data &&
                                <VarationSkuInfo
                                  variation_sku_data={callout.variation_sku_data}
                                />}

                              <table
                                style={{
                                  border: "1px solid #ddd",
                                  width: "300px",
                                  marginTop: "10px",
                                  borderRadius: "8px",
                                  marginRight: "50px"
                                }}
                              >


                               

                                <tr
                                  style={{
                                    border: "1px solid #ddd",
                                    lineHeight: "40px",
                                  }}
                                >
                                  <td
                                    style={{
                                      borderRight: "1px solid #ddd",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    Category
                                  </td>
                                  <td style={{ paddingLeft: "10px" }}>
                                    {callout?.otherInfo?.category}
                                  </td>
                                </tr>

                                <tr
                                  style={{
                                    border: "1px solid #ddd",
                                    lineHeight: "40px",
                                  }}
                                >
                                  <td
                                    style={{
                                      borderRight: "1px solid #ddd",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    Season
                                  </td>
                                  <td style={{ paddingLeft: "10px" }}>
                                    {callout.otherInfo.season}{" "}
                                  </td>
                                </tr>

                                <tr
                                  style={{
                                    border: "1px solid #ddd",
                                    lineHeight: "40px",
                                  }}
                                >
                                  <td
                                    style={{
                                      borderRight: "1px solid #ddd",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    Color
                                  </td>
                                  <td style={{ paddingLeft: "10px" }}>
                                    {callout.otherInfo.color}
                                  </td>
                                </tr>
                                <tr
                                  style={{
                                    border: "1px solid #ddd",
                                    lineHeight: "40px",
                                  }}
                                >
                                  <td
                                    style={{
                                      borderRight: "1px solid #ddd",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    Style Code
                                  </td>
                                  <td style={{ paddingLeft: "10px" }}>
                                    {callout.otherInfo.style_code}
                                  </td>
                                </tr>

                                <tr
                                  style={{
                                    border: "1px solid #ddd",
                                    lineHeight: "40px",
                                  }}
                                >
                                  <td
                                    style={{
                                      borderRight: "1px solid #ddd",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    MRP
                                  </td>
                                  <td style={{ paddingLeft: "10px" }}>
                                    {/* {callout.otherInfo.mrp} */}
                                    ₹{callout.otherInfo.mrp}
                                  </td>
                                </tr>


                              </table>
                            </div>

                          </div>

                          <div
                                className="prodect-info-img mt-6" >
                                <>

                                  <div
                                    className="prodect-images-pdf"
                                    style={{ marginRight: "10px", marginLeft: "10", }}
                                  >
                                    <SecondaryImage
                                      record={callout}
                                    />


                                    {/* <span style={{ width: "150px" }} className="">
                                      <img
                                        alt="Special Edition Party Spas"
                                        style={{
                                          backgroundColor: "#eee",
                                          borderRadius: "10px",
                                          width: "70px",
                                          border: "1px solid #ddd",
                                          marginBottom: "5px",
                                          height: "70px",
                                        }}

                                        src={productimg1}

                                      />
                                    </span>

                                    <span style={{ width: "150px" }} className="">
                                      <img
                                        alt="Special Edition Party Spas"
                                        style={{
                                          backgroundColor: "#eee",
                                          borderRadius: "10px",
                                          width: "70px",
                                          border: "1px solid #ddd",
                                          marginBottom: "5px",
                                          height: "70px",
                                        }}

                                        src={productimg2}

                                      />
                                    </span>

                                    <span style={{ width: "150px" }} className="">
                                      <img
                                        alt="Special Edition Party Spas"
                                        style={{
                                          backgroundColor: "#eee",
                                          borderRadius: "10px",
                                          width: "70px",
                                          border: "1px solid #ddd",
                                          marginBottom: "5px",
                                          height: "70px",
                                        }}

                                        src={ productimg3}

                                      />
                                    </span>  */}

                                  </div>
                                </>

                              </div>



                        </div>


                      </div>




                    </div>

                    

                  </>
                )
              )}
          </Card>
        </Col>
      </Row>
    </div>

  </div>);
};

export default TravisPdf;
