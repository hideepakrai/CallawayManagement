import React, { useEffect , useRef} from 'react';
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { Row,Col,Card, Button } from 'react-bootstrap';
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';
import { useReactToPrint } from 'react-to-print';
type Props = {
  selectedRow: BasicModelTravis[];
  resetSelectedRow: () => void;
};

const TravisPdf: React.FC<Props> = ({ selectedRow, resetSelectedRow }: Props) => {
 
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => resetSelectedRow(),
    removeAfterPrint: true,
    
  });
  
  

 

  return (<div>
<div>
        <Row>
          <Col xs={24} >
            <Card id="catelog" ref={contentToPrint}>
              <div>
                <div>
                  <div>
                    <div
                      style={{
                         paddingBottom: "600px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ textAlign: "left" }}>
                        <Button 
                        onClick={() => {
                          handlePrint(null, () => contentToPrint.current);
                        }}
                        >
                          Download Pdf
                        </Button>
                        <Button 
                        //onClick={handleExportToPPT}
                        >
                          Download PPT
                        </Button>
                      </div>

                      <div>
                        <img
                          style={{ width: "300px", paddingTop: "80px" }}
                          src="https://callaway-f6bd2.web.app/images/logo.png"
                        ></img>
                      </div>
                      <div>
                        <h2
                          style={{
                            paddingTop: "50px",
                           // fontweight: "400px",
                            fontSize: "36px",
                          }}
                        >
                          CALLAWAY
                        </h2>
                        <p style={{ fontSize: "18px" }}>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged.
                        </p>
                      </div>
                    </div>
                  
                  </div>

                  {/* prodect two  start*/}
                </div>
              </div>

              {selectedRow &&
                selectedRow.length > 0 &&
                selectedRow.map(
                  (callout) => (
                    <>
                      <div
                        style={{
                          borderBottom: "1px solid #ddd",
                          paddingTop: "10px",
                          paddingLeft: "50px",
                        }}
                      >
                        <div
                          className="prodect-pdf-section"
                          style={{ display: "flex" }}
                        >
                          <div
                            className="gx-product-col gx-product-content1"
                            style={{ order: "0", width: "53%" }}
                          >
                            <h2 style={{ fontSize: "24px", 
                            //fontweight: "500" 
                            }}>
                              <span> Name :</span> {callout?.Name}
                            </h2>
                            <p
                              style={{
                                fontSize: "14px",
                                paddingRight: "10px",
                              }}
                            >
                              <span> Description :</span> {callout?.Description}
                            </p>

                            <div>
                              <table
                                style={{
                                  border: "1px solid #ddd",
                                  width: "500px",
                                  marginTop: "10px",
                                }}
                              >
                                <tr
                                  style={{
                                    border: "1px solid #ddd",
                                    lineHeight: "40px",
                                  }}
                                >
                                  <th
                                    style={{
                                      borderRight: "1px solid #ddd",
                                      fontFamily: "'NoirPro',sans-serif",
                                      fontSize: " 16px",
                                      fontWeight: "500",
                                      textAlign: "left",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    SKU
                                  </th>
                                  <th
                                    style={{
                                      fontFamily: "'NoirPro',sans-serif",
                                      fontSize: " 16px",
                                      fontWeight: "500",
                                      textAlign: "left",
                                      paddingLeft: "10px",
                                    }}
                                  >
                                    {" "}
                                    {callout?.SKU}
                                  </th>
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
                                    Category
                                  </td>
                                  <td style={{ paddingLeft: "10px" }}>
                                  {callout.TravisAttributes && callout.TravisAttributes[0].Category}
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
                                    {callout.TravisAttributes && callout.TravisAttributes[0].Season}{" "}
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
                                    {callout.TravisAttributes && callout.TravisAttributes[0].Color}
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
                                    {callout.TravisAttributes &&callout?.TravisAttributes[0]?.StyleCode}
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
                                  {callout.TravisAttributes &&callout?.TravisAttributes[0]?.Color}
                                  </td>
                                </tr>
                              </table>
                            </div>
                          </div>

                          <div style={{ width: "45%", borderRadius: "5px" }}>
                            <img
                              alt="Special Edition Party Spas"
                              style={{
                                backgroundColor: "#eee",
                                borderRadius: "10px",
                                width:"240px"
                              }}
                              src={`https://admin.callawayindiaoms.com/uploads/large_51xntqlp_Sy_L_AC_SL_1500_a17350c6f1_d08da64450.jpg`}
                            />
                          </div>
                        </div>

                        <div
                          className="prodect-info-img"
                          style={{
                            display: "flex",
                            height: "180px",
                            marginTop: "30px",
                          }}
                        >
                          {callout?.Gallery &&
                            callout?.Gallery.data.length > 0 &&
                            callout?.Gallery.data.map((item) => (
                              <>
                                <div
                                  className="prodect-images-pdf"
                                  style={{ marginRight: "10px" }}
                                >
                                  <span style={{ width: "150px" }} className="">
                                    <img
                                      alt="Special Edition Party Spas"
                                      style={{
                                        backgroundColor: "#eee",
                                        borderRadius: "10px",
                                        width: "150px",
                                        border: "1px solid #ddd",
                                       
                                        height: "150px",
                                      }}
                                     
                                      src={`https://admin.callawayindiaoms.com${item?.attributes?.formats?.medium?.url}`}
                                    />
                                  </span>
                                </div>
                              </>
                            ))}
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
