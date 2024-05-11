import React from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
const Slider = () => {
  return (
    <div className="cway-banner cwy-banner">
          <div>

            <Carousel autoplay autoplaySpeed={5000}>
              <div className="gx-slider-1 ">
                <div className='prodect-image'>
              <img style={{height:"427px"}} src="https://admin.callawayindiaoms.com/uploads/19_582a243868.png"></img>
           
              </div>
              </div>
              <div className='prodect-image'>
        
              
                <img src="https://admin.callawayindiaoms.com/uploads/24_8d8dd65fde.png"></img>
              </div>
              <div className='prodect-image'>
              
                <img src="https://admin.callawayindiaoms.com/uploads/18_b3b08ebc11.png"></img>
              </div>
            </Carousel>

          </div>
      </div>
  )
}

export default Slider
