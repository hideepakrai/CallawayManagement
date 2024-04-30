import React from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd"
import "./GoodsHeader.css";
const GoodsHeader = () => {
  return (
    <div>
        <div className="cway-banner">
          <div className='container'>
            <Carousel autoplay className='img-slider'>
              <div className="gx-slider-1 ">
                <div className='prodect-image'>
                 <img src="https://admin.callawayindiaoms.com/uploads/image_3_2_3d5fa0ef7f.png"></img>
                   {/* <h3 style={contentStyle}>BANNER ONE CALLAWAY</h3> */}
                 </div>

              </div>

              <div className='prodect-image'>
              
                {/* <h3 style={contentStyle}>BANNER TWO CALLAWAY</h3> */}
                <img src="https://admin.callawayindiaoms.com/uploads/2024_01_03_CG_Paradym_Ai_Smoke_Driver_Intro_Banner_2560x1000_1_9a9c1b0fdc.png"></img>
               

              </div>

              <div className='prodect-image'>
                {/* <h3 style={contentStyle}>BANNER TREE CALLAWAY</h3> */}
                <img src="https://admin.callawayindiaoms.com/uploads/callaway_img1_1_3_bd66b91a82.png"></img>
              </div>
            </Carousel>
          </div>
        </div>




    </div>
  )
}

export default GoodsHeader