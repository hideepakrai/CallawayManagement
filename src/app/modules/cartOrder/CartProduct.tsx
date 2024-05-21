import React, { useState, useEffect } from 'react';
import { Card } from "antd";
import ApparelCart from './brand/CallawayApparal/ApparelCart';
import CalawayGoodsCarts from "./brand/callawayGoods/CalawayGoodsCarts";
import TravisCart from './brand/travisMethew/TravisCarts';
import OgioCart from './brand/ogio/OgioCart';
import "./CartProduct.css"
import {getTravisOrder} from "../../slice/orderSlice/travis/CartOrder"
import { useSelector } from 'react-redux';
 import {getOgioOrder} from "../../slice/orderSlice/ogio/OgioCartOrderSlice"
 import { NoProdect } from './NoProdect'
import { getOgioProducts } from '../../slice/allProducts/OgioSlice';
const CartProduct = () => {
  const [activeTab, setActiveTab] = useState(''); // Default to 'apparel' tab

  useEffect(() => {
    // Set the default active tab when the component mounts
    setActiveTab('');
  }, []);

  //get travis order
  const getTravisOrders= useSelector(getTravisOrder)
  // const getOgioOrders= useSelector(getOgioOrder)
  const getOgioProduct= useSelector(getOgioProducts)
  // console.log("getOgioOrders",getOgioOrders)

  useEffect(() => {
    if (getTravisOrders && getTravisOrders.length > 0) {
      setActiveTab('travis');
    } else if (getOgioProduct && getOgioProduct.length > 0) {
      getOgioProduct.map(item=>{
        if(item.ordered){
          setActiveTab('ogio');
        }
      })
      setActiveTab('ogio');
    } else {
      setActiveTab('apparel'); // Default to 'apparel' tab if no orders found
    }
  }, [getTravisOrders, getOgioProduct]);
  return (
    < div className='container'>
   {activeTab===""?
   (<NoProdect/>):(
    <div className='mt-14 '>
      <div className="card card-custom">
        
        <div className="card-header">
          <ul className="nav nav-tabs nav-line-tabs nav-link-tab border-0 mb-5 fs-6 mt-6 ">
          

         

          
           <li className="nav-item hover-elevate-up">
              <a className={`nav-link active-tab ${activeTab === 'ogio' ? 'active' : ''}`} href="#kt_tab_pane_Ogio" onClick={() => setActiveTab('ogio')}>
              <img src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/o_1_566cb577f8.png' className='  cart-img'></img>
                Ogio
              </a>
            </li>


         
             <li className="nav-item hover-elevate-up">
              <a className={`nav-link active-tab ${activeTab === 'travis' ? 'active' : ''}`} href="#kt_tab_pane_Travis" onClick={() => setActiveTab('travis')}>
              <img src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/white_tm_15bf456bbc.png' className=' cart-img'></img>
                Travis Mathew 
              </a>
            </li>
          </ul>
        </div>


        <div className="card-body">
          <div className="tab-content" id="myTabContent">
            {/* <div className={`tab-pane fade ${activeTab === 'apparel' ? 'show active' : ''}`} id="kt_tab_pane_Apperal" role="tabpanel">
              <ApparelCart />
            </div> */}
            <div className={`tab-pane fade ${activeTab === 'goods' ? 'show active' : ''}`} id="kt_tab_pane_Goods" role="tabpanel">
              <CalawayGoodsCarts />
            </div>
            <div className={`tab-pane fade ${activeTab === 'ogio' ? 'show active' : ''}`} id="kt_tab_pane_Ogio" role="tabpanel">
              {/* Render Ogio component here */}
              <OgioCart/>
            </div>
            <div className={`tab-pane fade ${activeTab === 'travis' ? 'show active' : ''}`} id="kt_tab_pane_Travis" role="tabpanel">
              <TravisCart />
            </div>
          </div>
        
        </div>

      </div>

      
    </div>
   )
   }
    </div>
    
  );
}

export default CartProduct;
