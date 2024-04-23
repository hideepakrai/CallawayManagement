import React from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd"
import "./GoodsHeader.css";
const GoodsHeader = () => {
  return (
    <div>
        <div className="cway-banner">
          <div className='cw-container'>
            <Carousel autoplay className='img-slider'>
              <div className="gx-slider-1 ">
                <div className='prodect-image'>
                 <img  src="https://aigigs.in/uploads/callaway_img1_1_21bbe299ad.png"></img>
                   {/* <h3 style={contentStyle}>BANNER ONE CALLAWAY</h3> */}
                 </div>

              </div>

              <div className='prodect-image'>
              
                {/* <h3 style={contentStyle}>BANNER TWO CALLAWAY</h3> */}
              
                <img  src="https://aigigs.in/uploads/callaway_img_prodect_0591416167.png"></img>
              </div>

              <div className='prodect-image'>
                {/* <h3 style={contentStyle}>BANNER TREE CALLAWAY</h3> */}
                <img   src="https://aigigs.in/uploads/image_3_1_6b31e664aa.png"></img>
              </div>
            </Carousel>
          </div>
        </div>

{/* 
        <div id="kt_carousel_1_carousel" className="carousel carousel-custom slide" data-bs-ride="carousel" data-bs-interval="8000">
   
    <div className="d-flex align-items-center justify-content-between flex-wrap">
        
        <span className="fs-4 fw-bold pe-2">Title</span>
     

      
        <ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
            <li data-bs-target="#kt_carousel_1_carousel" data-bs-slide-to="0" className="ms-1 active"></li>
            <li data-bs-target="#kt_carousel_1_carousel" data-bs-slide-to="1" className="ms-1"></li>
            <li data-bs-target="#kt_carousel_1_carousel" data-bs-slide-to="2" className="ms-1"></li>
        </ol>
       
    </div>
   

    <div className="carousel-inner pt-8">
    
        <div className="carousel-item active">
        <img src="https://aigigs.in/uploads/callaway_img1_1_21bbe299ad.png"></img>
        </div>
        

       
        <div className="carousel-item">
        <img src="https://aigigs.in/uploads/callaway_img_prodect_0591416167.png"></img>
        </div>
      
        <div className="carousel-item">
        <img src="https://aigigs.in/uploads/image_3_1_6b31e664aa.png"></img>
        </div>
      
    </div>
   
</div> */}


    </div>
  )
}

export default GoodsHeader