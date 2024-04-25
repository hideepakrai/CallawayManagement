import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../brands/model/travis/TravisMethewModel"
import "./CartProduct.css"

import TravisCart from './brand/TravisCarts';
import CalawayGoodsCarts from "./brand/CalawayGoodsCarts"
const CartProduct = () => {
  return (
    <div className='mt-10  container'>
     








       {/* < TravisCart/> */}





       
    

<div className="card card-custom">
<div className="card-header">
<ul className="nav nav-tabs nav-line-tabs border-0 mb-5 fs-6 mt-6 ">
    <li className="nav-item">
        <a className="nav-link active active-tab" data-bs-toggle="tab" href="#kt_tab_pane_4">Travis Methew</a>
    </li>
    <li className="nav-item">  
        <a className="nav-link active-tab" data-bs-toggle="tab" href="#kt_tab_pane_5">Callaway Goods</a>
    </li>
    <li className="nav-item">
        <a className="nav-link active-tab" data-bs-toggle="tab" href="#kt_tab_pane_6">Link 3</a>
    </li>
</ul>
   
</div>
<div className="card-body">
<div className="tab-content" id="myTabContent">
    <div className="tab-pane fade show active" id="kt_tab_pane_4" role="tabpanel">
    < TravisCart/>
    </div>
    <div className="tab-pane fade" id="kt_tab_pane_5" role="tabpanel">
       <CalawayGoodsCarts/>
    </div>
    <div className="tab-pane fade" id="kt_tab_pane_6" role="tabpanel">
        ...
    </div>
</div>
</div>

</div>
</div>

  )
}

export default CartProduct