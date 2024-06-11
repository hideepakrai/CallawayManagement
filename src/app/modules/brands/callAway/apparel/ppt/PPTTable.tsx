import React, { useEffect, useRef } from 'react';
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel';



type Props={
    eachItem:  BasicModelApparel
}
const PPTTable =({eachItem}:Props)=>{





    return(
        <>

<div
                      style={{
                       
                        paddingTop: "120px",
                        paddingLeft: "25px",
                        height: "1122px",
                        paddingRight: "25px",
                      }}
                      >

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
                                    SKU
                                  </td>
                                  <td style={{ paddingLeft: "10px" }}>
                                    {eachItem?.sku}
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
                                    Description
                                  </td>
                                  <td style={{ paddingLeft: "10px" }}>
                                    {eachItem?.description}
                                  </td>
                                </tr>

                                </table>

                      </div>
        </>
    )
}
export default PPTTable