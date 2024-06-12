import React, { useEffect, useRef } from 'react';
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel';
import Ppttable from "./PPTLeftTable"
import "./PPTTable.css"
import { url } from 'inspector';
type Props = {
  eachItem: BasicModelApparel
}
const PPTTable = ({ eachItem }: Props) => {
  return (
    <>
      



<div className='row product-img-callaway'>
  
        <div className='col-6 p-0' >
          <img style={{width:"100%",}} src='https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/TRAVIS-Images/1MZ247_0BLK/1MZ247_0BLK_A.jpg'></img>
        </div>
    
      <div className='col-6'
        style={{
          paddingTop: "20px",
          paddingLeft: "25px",
          height: "585px",
          paddingRight: "25px",
        }}
      >

<Ppttable/>
        <table className='gy-5'
          style={{
            border: "2px solid #ddd",
            width: "470px", 
            marginBottom:"10px",
            borderRadius: "8px",
            
           
          }}
        >

          <tr className='py-3'
            style={{
              border: "1px solid #ddd",
              lineHeight: "50px",
            }}
          >
            <td className='fs-4'
              style={{
                borderRight: "1px solid #ddd",
                paddingLeft: "10px",
                fontWeight: "bold",
              }}
            >
              SKU
            </td>

            <td className='fs-4' style={{ paddingLeft: "10px" }}>
              {eachItem?.sku}
            </td>
          </tr>
          <tr
            style={{
              border: "1px solid #ddd",
              lineHeight: "50px",
            }}
          >
            <td className='fs-4'
              style={{
                borderRight: "1px solid #ddd",
                paddingLeft: "10px",
                fontWeight: "bold",
              }}
            >
              Category
            </td>
            
            <td className='fs-4' style={{ paddingLeft: "10px" }}>
              {eachItem?.sku}
            </td>
          </tr>
          <tr
            style={{
              border: "1px solid #ddd",
              lineHeight: "50px",
            }}
          >
            <td className='fs-4'
              style={{
                borderRight: "1px solid #ddd",
                paddingLeft: "10px",
                fontWeight: "bold",
              }}
            >
              Description
            </td>
            <td className='fs-4' style={{ paddingLeft: "10px" }}>
              {eachItem?.description}
            </td>
          </tr>

        </table>

       


      </div>

      </div>
    </>
  )
}
export default PPTTable