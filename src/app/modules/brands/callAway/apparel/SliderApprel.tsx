import React from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
const SliderApprel = () => {
  return (
    <div>
        <div className="cway-banner">
          <div >
            <Carousel autoplay autoplaySpeed={3000}>
              <div className="gx-slider-1 ">
                <div className='prodect-image'>
              <img src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/image_3_2_3d5fa0ef7f.png"></img>
                {/* <h3 style={contentStyle}>BANNER ONE CALLAWAY</h3> */}
              </div>
              </div>
              <div className='prodect-image'>
                {/* <h3 style={contentStyle}>BANNER TWO CALLAWAY</h3> */}
              
                <img src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/2024_01_03_CG_Paradym_Ai_Smoke_Driver_Intro_Banner_2560x1000_1_9a9c1b0fdc.png"></img>
              </div>
              <div className='prodect-image'>
                {/* <h3 style={contentStyle}>BANNER TREE CALLAWAY</h3> */}
                <img src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/callaway_img1_1_3_bd66b91a82.png"></img>
              </div>
            </Carousel>
          </div>
        </div>

    </div>
  )
}

export default SliderApprel