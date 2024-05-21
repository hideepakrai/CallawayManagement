import React from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import prodecbanner from "../../../../../public/media/product/black-banner.png"
const ManagerSlider = () => {
  return (
    

       <div className="cway-banner cwy-banner">
        
            <Carousel autoplay autoplaySpeed={5000}>
              <div className="gx-slider-1 ">
                <div className='prodect-image'>
              <img style={{height:"427px"}} src={prodecbanner}></img>
           
              </div>
              </div>
              <div className='prodect-image'>
        
              
                <img style={{height:"427px"}} src={prodecbanner}></img>
              </div>
              <div className='prodect-image'>
              
                <img style={{height:"427px"}} src={prodecbanner}></img>
              </div>
            </Carousel>
          </div>
     

    
  )
}

export default ManagerSlider
