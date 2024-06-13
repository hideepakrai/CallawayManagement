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
import { getGoodsProducts } from '../../slice/allProducts/CallAwayGoodsSlice';
import { getApparelProducts } from '../../slice/allProducts/CallawayApparelSlice';
import  Callawaygoods from "../../../../public/media/logos/icon-profile.png"
import { Route, Routes } from 'react-router-dom';
import { getPreOrderId, getTravisProducts } from '../../slice/allProducts/TravisMethewSlice';
import { useNavigate } from 'react-router-dom';
import { setActiveOrderTab } from '../../slice/activeTabsSlice/ActiveTabSlice';
import {useDispatch} from "react-redux"
const CartProduct = () => {
  const [activeTab, setActiveTab] = useState(''); // Default to 'apparel' tab
   const navigate = useNavigate()
   const dispatch = useDispatch()
  useEffect(() => {
    // Set the default active tab when the component mounts
    setActiveTab('');
  }, []);

  //get travis order
  const getTravisOrders= useSelector(getTravisOrder)
  const getTravisProduct= useSelector(getTravisProducts)
 
  // get ogio order
  const getOgioProduct= useSelector(getOgioProducts)

  // get goods order
  const getGoodsProduct= useSelector(getGoodsProducts)

  // get apparel order
  const getApparelProduct= useSelector(getApparelProducts)



  const travisorderId= useSelector(getPreOrderId)
  const [travisId, setTravisId]= useState<number>()
  useEffect(() => {
// eslint-disable-next-line no-debugger
debugger
    if (travisorderId &&getTravisProduct &&getTravisProduct.length>0){
      getTravisProduct.map((item)=>{
        if(item.ordered){
          setActiveTab('travis');
      setTravisId(travisorderId)
      dispatch(setActiveOrderTab({
        activeOrderTab:"Travis"
       })) 
        }
      })  
    
      
    } 
     if (getOgioProduct && getOgioProduct.length > 0) {
      getOgioProduct.map(item=>{
        if(item.ordered){
          setActiveTab('ogio');
          dispatch(setActiveOrderTab({
            activeOrderTab:"Ogio"
           })) 
        }
      })
      

    } if (getGoodsProduct &&getGoodsProduct.length>0){
       getGoodsProduct.map(item=>{
        if(item.ordered){
          setActiveTab('hardgood');
          dispatch(setActiveOrderTab({
            activeOrderTab:"hardgood"
           })) 
        }
       })    
      
         
    } 
     if (getApparelProduct && getApparelProduct.length>0){
      getApparelProduct.map((item)=>{
        if(item.ordered){
          dispatch(setActiveOrderTab({
            activeOrderTab:"softgood"
           })) 
          setActiveTab('softgood');
          console.log("apparel tab")
        }
       })
    }
    
  }, [getTravisProduct, getOgioProduct,getGoodsProduct,getApparelProduct,travisorderId]);


  const gettravisPreOrderId= useSelector(getPreOrderId)
const handleTravisCart=() => {
  setActiveTab('travis');
   dispatch(setActiveOrderTab({
    activeOrderTab:"Travis"
   }))
 
}

const handleOgioCart=() => {
  setActiveTab('ogio');
  dispatch(setActiveOrderTab({
   activeOrderTab:"Ogio"
  })) 
}
const handleSoftGoodCart=() => {
  setActiveTab('softgood');
  dispatch(setActiveOrderTab({
   activeOrderTab:"softgood"
  })) 
}

const handleHardGoodCart=() => {
  setActiveTab('hardgood');
  dispatch(setActiveOrderTab({
   activeOrderTab:"hardgood"
  })) 
}



  return (
    < div className='container'>
   {activeTab===""?
   (<NoProdect/>):(
    <div className='mt-14 '>
      <div className="card card-custom">
        
        <div className="card-header">
          <ul className="nav nav-tabs nav-line-tabs nav-link-tab border-0 mb-5 fs-6 mt-6 ">
          

          <li className="nav-item hover-elevate-up cursor-pointer">
              <a className={`nav-link active-tab ${activeTab === 'softgood' ? 'active' : ''}`}  onClick={handleSoftGoodCart}>
              <img src={Callawaygoods} className='cart-img'></img>
              Callaway Softgoods
              </a>
            </li>


          <li className="nav-item hover-elevate-up cursor-pointer">
              <a className={`nav-link active-tab ${activeTab === 'hardgood' ? 'active' : ''}`} onClick={handleHardGoodCart}>
              <img src={Callawaygoods} className='  cart-img'></img>
              Callaway Hardgoods
              </a>
            </li>



            <li className="nav-item hover-elevate-up cursor-pointer">
              <a className={`nav-link active-tab ${activeTab === 'travis' ? 'active' : ''}`} 
              
              // onClick={() => setActiveTab('travis')}
              onClick={handleTravisCart}
              >
              <img src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/white_tm_15bf456bbc.png' className=' cart-img'></img>
                Travis Mathew 
              </a>
            </li>
            
          
           <li className="nav-item hover-elevate-up cursor-pointer">
              <a className={`nav-link active-tab ${activeTab === 'ogio' ? 'active' : ''}`} onClick={handleOgioCart}>
              <img src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/o_1_566cb577f8.png' className='  cart-img'></img>
                Ogio
              </a>
            </li>


         
            
          </ul>
        </div>


        <div className="card-body">
          <div className="tab-content" id="myTabContent">
            <div className={`tab-pane fade ${activeTab === 'softgood' ? 'show active' : ''}`} id="kt_tab_pane_Apperal" role="tabpanel">
              <ApparelCart />
            </div>
            <div className={`tab-pane fade ${activeTab === 'hardgood' ? 'show active' : ''}`} id="kt_tab_pane_Goods" role="tabpanel">
              <CalawayGoodsCarts />
            </div>

            
            <div className={`tab-pane fade ${activeTab === 'ogio' ? 'show active' : ''}`} id="kt_tab_pane_Ogio" role="tabpanel">
            
              <OgioCart/>
            </div>


            <div className={`tab-pane fade ${activeTab === 'travis' ? 'show active' : ''}`} id="kt_tab_pane_Travis" role="tabpanel">
              <TravisCart />
            </div>
          </div>
            {/* <Routes>
         <Route path="apparel" element={<ApparelCart />} />
                <Route path="goods" element={<CalawayGoodsCarts />} />
                <Route path="ogio" element={<OgioCart />} />
                <Route path="travis/:id" element={<TravisCart />} />
              </Routes> */}
        </div>

      </div>

      
    </div>
   )
   }
    </div>
    
  );
}

export default CartProduct;
