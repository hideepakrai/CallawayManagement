import React from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
const TravisHeader = () => {
  return (
    <div>
        <div className="cway-banner">
          <div className='cw-container'>
            <Carousel autoplay autoplaySpeed={3000}>
              <div className="gx-slider-1 ">
                <div className='prodect-image'>
              <img src="https://aigigs.in/uploads/callaway_img1_1_21bbe299ad.png"></img>
                {/* <h3 style={contentStyle}>BANNER ONE CALLAWAY</h3> */}
              </div>
              </div>
              <div className='prodect-image'>
                {/* <h3 style={contentStyle}>BANNER TWO CALLAWAY</h3> */}
              
                <img src="https://aigigs.in/uploads/callaway_img_prodect_0591416167.png"></img>
              </div>
              <div className='prodect-image'>
                {/* <h3 style={contentStyle}>BANNER TREE CALLAWAY</h3> */}
                <img src="https://aigigs.in/uploads/image_3_1_6b31e664aa.png"></img>
              </div>
            </Carousel>
          </div>
        </div>

    </div>
  )
}

export default TravisHeader