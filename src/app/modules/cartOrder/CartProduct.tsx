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
const CartProduct = () => {
  const [activeTab, setActiveTab] = useState('apparel'); // Default to 'apparel' tab

  useEffect(() => {
    // Set the default active tab when the component mounts
    setActiveTab('apparel');
  }, []);

  //get travis order
  const getTravisOrders= useSelector(getTravisOrder)
  const getOgioOrders= useSelector(getOgioOrder)

  return (
    < div className='container'>
   {getTravisOrders&&
   
   getTravisOrders.length==0 &&
   getOgioOrders &&
      getOgioOrders.length==0 ?
   (<NoProdect/>):(
    <div className='mt-14 container'>
      <div className="card card-custom">
        <div className="card-header">
          <ul className="nav nav-tabs nav-line-tabs border-0 mb-5 fs-6 mt-6 ">
            {/* <li className="nav-item">  
              <a className={`nav-link active-tab ${activeTab === 'apparel' ? 'active' : ''} `} href="#kt_tab_pane_Apperal" onClick={() => setActiveTab('apparel')}>
                Callaway Apparel
              </a>
            </li> */}


            {/* <li className="nav-item">  
              <a className={`nav-link active-tab ${activeTab === 'goods' ? 'active' : ''}`} href="#kt_tab_pane_Goods" onClick={() => setActiveTab('goods')}>
                Callaway Goods
              </a>
            </li> */}


           {getOgioOrders &&
           getOgioOrders.length>0 &&
           <li className="nav-item">
              <a className={`nav-link active-tab ${activeTab === 'ogio' ? 'active' : ''}`} href="#kt_tab_pane_Ogio" onClick={() => setActiveTab('ogio')}>
                Ogio
              </a>
            </li>}


            {getTravisOrders &&
             getTravisOrders.length>0 &&
             <li className="nav-item">
              <a className={`nav-link active-tab ${activeTab === 'travis' ? 'active' : ''}`} href="#kt_tab_pane_Travis" onClick={() => setActiveTab('travis')}>
                Travis Mathew
              </a>
            </li>}
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
