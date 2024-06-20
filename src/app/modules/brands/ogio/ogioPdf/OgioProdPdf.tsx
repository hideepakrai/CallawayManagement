import React, { useEffect, useRef, useState } from 'react';

import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Row, Col, Card, Button } from 'react-bootstrap';

import { useReactToPrint } from 'react-to-print';


import "../../travisMethew/pdf/TravisPdf.css"
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';
import OgioLogo from "../../../../../../public/media/logos/ogio-white.png";

import OgioPrimaryImages from './OgioPrimaryImages';
import OgioSecondaryImages from './OgioSecondaryImages';
import GioVarationSkuInfo from './GioVarationSkuInfo';
import { TravisPdfPrint } from '../../../model/pdf/PdfModel';


type Props = {
  selectedRow: TravisPdfPrint[];
  resetSelectedRow: () => void;
  cancelRowSelected:()=>void
};

const OgioPdf: React.FC<Props> = ({ selectedRow, resetSelectedRow,cancelRowSelected }: Props) => {
  const currentTime = new Date().toISOString();
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: `OgioProduct_${new Date().toISOString()}.pdf`,
    onBeforePrint: () => cancelRowSelected(),
    onAfterPrint: () => resetSelectedRow(),
    removeAfterPrint: true,

  });

  useEffect(() => {
    if (selectedRow && selectedRow.length > 0) {
       handlePrint(null, () => contentToPrint.current);

      
    }
  }, [selectedRow]);

  console.log("selectedRow",selectedRow)
  return (<div>
    <div className='pdf-info'>
      <Row >
        <Col xs={24} >
          <div style={{ textAlign: "left", marginTop: "40px", marginBottom: "6px" }}>
            <Button 
                        onClick={() => {
                          handlePrint(null, () => contentToPrint.current);
                        }}
                        >
                          
                        </Button>

            <button onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }} type="button" className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default mx-3 download-prodect"><span>Download Pdf</span></button>

            {/* <Button 
                        onClick={handleExportToPPT}
                        >
                          
                        </Button> */}

            <button type="button" className="ant-btn css-dev-only-do-not-override-11xg00t ant-btn-default mx-3 download-prodect"><span>Download PPT</span></button>

          </div>

          <Card id="catelog" ref={contentToPrint}>
          <div className='mb-18' style={{ textAlign: 'center', height: "1122px", backgroundColor: "#000", paddingTop: "300px" }}>

<div >
  <img style={{ width: "300px", paddingTop: "60px" }} src={OgioLogo}></img>
</div>

<h2 className='brand-title' style={{ paddingTop: "40px", paddingBottom: "40px", fontSize: "45px", color: "#fff", fontWeight: "500", letterSpacing: "4px", }}>Ogio</h2>

<p style={{ fontSize: "18px", paddingLeft: "30px", color: "#fff", paddingRight: "30px", fontWeight: "100", }}>
  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
</p>
</div>

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


                          <div className='product-pdf row'>
                            <div className=' col-7' style={{ borderRadius: "5px", }}>


                              <div className='prodect-images'>
                                {callout.primary_image_url !== null ? (
                                  <OgioPrimaryImages
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
                            


                            </div>

                            <div className='product-right-section col-5'>
                              {callout && 
                               callout.variation_sku_data &&
                               callout.variation_sku_data.length>0 &&
                                <GioVarationSkuInfo
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
                                    {callout?.otherInfo.category}
                                  </td>
                                </tr>

                                {/* <tr
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
                                    Product type
                                  </td>
                                  <td style={{ paddingLeft: "10px" }}>
                                    {callout.otherInfo.product_type}{" "}
                                  </td>
                                </tr> */}

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
                                  Model
                                  </td>
                                  <td style={{ paddingLeft: "10px" }}>
                                    {callout.otherInfo.product_model}
                                  </td>
                                </tr>
                                {/* <tr
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
                                </tr> */}

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
                                   {callout.otherInfo.mrp} 
                                   
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
                                    <OgioSecondaryImages
                                      record={callout}
                                    />


                              

                                  </div>
                                </>

                              </div>



                        </div>


                      </div>




                    </div>

                    {/* <div
                      style={{
                        paddingTop: "120px",
                        height: "1122px",
                        paddingRight: "25px",
                      }}
                    >
                      <div
                        className="prodect-pdf-section"
                        style={{ display: "flex", marginBottom: "60px", marginTop: "20px", }}
                      >
                        <div style={{ order: "0", }} >
                          <div className='row'>
                            <div className=' col-7' style={{ borderRadius: "5px", }}>
                              <div className='prodect-images product-img'>
                                {callout.primary_image_url !== null ? (
                                  <OgioPrimaryImages
                                    record={callout} />
                                ) : (
                                  <img
                                    alt="Special Edition Party Spas"
                                    style={{
                                      backgroundColor: "#d1d3d4",
                                      borderRadius: "10px",
                                      width: "420px",


                                    }}
                                    src={`https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/TRAVIS-Images/1MAA008_6HBS/1MAA008_6HBS_a.jpg`}
                                  />
                                )

                                }

                              </div>
                            </div>

                            <div className='col-5'>
                              <h2 className='fs-1 mb-8 brand-title'>
                                {callout?.description}
                              </h2>
                              <p className='fs-5 brand-title'> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                              {callout && callout.variation_sku_data &&
                                <GioVarationSkuInfo
                                  variation_sku_data={callout.variation_sku_data}
                                />}
                            </div>
                          </div>

                          <div className='product-pdf row'>

                            <div className='product-right-section col-12 d-flex mt-6'>


                              <table
                                style={{
                                  border: "2px dashed #ddd",
                                  width: "100%",
                                  marginTop: "10px",
                                  borderRadius: "8px",
                                  marginLeft: "24px",

                                }}
                              >
                                <tr
                                  style={{
                                    border: "2px dashed #ddd",
                                    lineHeight: "40px",
                                  }}
                                >

                                  <th
                                    style={{
                                      borderRight: "2px dashed #ddd",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    Category
                                  </th>
                                  <th
                                    style={{
                                      borderRight: "1px dashed #ddd",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    Season
                                  </th>
                                  <th
                                    style={{
                                      borderRight: "2px dashed #ddd",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    Color
                                  </th>
                                  <th
                                    style={{
                                      borderRight: "2px dashed #ddd",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    Style  Code
                                  </th>






                                  <th
                                    style={{
                                      borderRight: "2px dashed #ddd",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    MRP
                                  </th>




                                </tr>

                                <tr
                                  style={{
                                    border: "1px solid #ddd",
                                    lineHeight: "40px",
                                  }}
                                >
                                  <td style={{ paddingLeft: "10px" }}>
                                    {callout?.otherInfo?.category}
                                  </td>


                                  <td style={{ paddingLeft: "10px" }}>
                                    {callout.otherInfo.season}{" "}
                                  </td>

                                  <td style={{ paddingLeft: "10px" }}>
                                    {callout.otherInfo.color}
                                  </td>

                                  <td style={{ paddingLeft: "10px" }}>
                                    {callout.otherInfo.style_code}
                                  </td>

                                  <td style={{ paddingLeft: "10px" }}>
                                    ₹{callout.otherInfo.mrp}
                                  </td>


                                </tr>
                              </table>



                            </div>

                            <div
                              className="prodect-info-img mt-6" >

                              <>
                                <div
                                  className="prodect-images-pdf"
                                  style={{ marginRight: "10px", marginLeft: "15px", }}
                                >
                                  <OgioSecondaryImages
                                    record={callout}
                                  />
                                </div>
                              </>

                            </div>

                          </div>



                        </div>


                      </div>




                    </div> */}

                  </>
                )
              )}
          </Card>
        </Col>
      </Row>
    </div>

  </div>);
};



export default OgioPdf;
