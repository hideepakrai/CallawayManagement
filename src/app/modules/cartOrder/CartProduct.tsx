import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../brands/model/travis/TravisMethewModel"

import TravisCart from './brand/TravisCarts';
import CalawayGoodsCarts from "./brand/CalawayGoodsCarts"
const CartProduct = () => {
  return (
    <div>
      <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
    <li className="nav-item">
        <a className="nav-link active" data-bs-toggle="tab" href="#kt_tab_pane_4">Travis Methew</a>
    </li>
    <li className="nav-item">
        <a className="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_5">Callaway Goods</a>
    </li>
    <li className="nav-item">
        <a className="nav-link" data-bs-toggle="tab" href="#kt_tab_pane_6">Link 3</a>
    </li>
</ul>

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
       {/* < TravisCart/> */}
    </div>
  )
}

export default CartProduct