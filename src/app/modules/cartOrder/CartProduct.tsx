import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../model/travis/TravisMethewModel"
import "./CartProduct.css"

import TravisCart from './brand/travisMethew/TravisCarts';
import CalawayGoodsCarts from "./brand/callawayGoods/CalawayGoodsCarts"
import ApparelCart from './brand/CallawayApparal/ApparelCart';
import OdYssetCart from './brand/0dyssey/OdYssetCart';

const CartProduct = () => {
  return (
    <div className='mt-10  container'>
     








       {/* < TravisCart/> */}





       
    

<div className="card card-custom">
<div className="card-header">
<ul className="nav nav-tabs nav-line-tabs border-0 mb-5 fs-6 mt-6 ">

<li className="nav-item">  
        <a className="nav-link active-tab" data-bs-toggle="tab" href="#kt_tab_pane_11">Callaway Apparel</a>
    </li>

<li className="nav-item">  
        <a className="nav-link active-tab" data-bs-toggle="tab" href="#kt_tab_pane_12">Callaway Goods</a>
    </li>

    <li className="nav-item">  
        <a className="nav-link active-tab" data-bs-toggle="tab" href="#kt_tab_pane_13">Odyssey</a>
    </li>


    <li className="nav-item">
        <a className="nav-link active-tab" data-bs-toggle="tab" href="#kt_tab_pane_14">Ogio</a>
    </li>
    
    <li className="nav-item">
        <a className="nav-link active active-tab" data-bs-toggle="tab" href="#kt_tab_pane_15">Travis Methew</a>
    </li>
    
    


</ul>
   
</div>
<div className="card-body">
<div className="tab-content" id="myTabContent">
    <div className="tab-pane fade show active" id="kt_tab_pane_11" role="tabpanel">
    < ApparelCart/>
    </div>
    <div className="tab-pane fade show active" id="kt_tab_pane_12" role="tabpanel">
    < CalawayGoodsCarts/>
    </div>
    <div className="tab-pane fade show active" id="kt_tab_pane_13" role="tabpanel">
    < OdYssetCart/>
    </div>
    <div className="tab-pane fade show active" id="kt_tab_pane_14" role="tabpanel">
   ....
    </div>
    <div className="tab-pane fade show active" id="kt_tab_pane_15" role="tabpanel">
    < TravisCart/>
    </div>
   
    
</div>
</div>

</div>
</div>

  )
}

export default CartProduct