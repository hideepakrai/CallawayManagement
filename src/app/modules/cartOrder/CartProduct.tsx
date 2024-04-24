import React,{useState, useRef, useEffect} from 'react'
import { Card, Table, Carousel, Breadcrumb } from "antd";
import { Input, Radio,InputNumber, Button } from "antd";
import type { TableColumnsType } from 'antd';
import {BasicModelTravis} from "../brands/model/travis/TravisMethewModel"

import TravisCart from './model/brand/TravisCarts';
const CartProduct = () => {
  return (
    <div>
       < TravisCart/>
    </div>
  )
}

export default CartProduct