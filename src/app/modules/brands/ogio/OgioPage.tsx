import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
//import { OgioModel } from '../model/OgioBrandModel';

import {useSelector, useDispatch} from "react-redux"
import {getOgioProducts} from "../../../slice/allProducts/OgioSlice"
import OgioHeader from './header/OgioHeader';
import OgioTable from './table/OgioTable';


  const OgioPage= () => {
  




  return (
    <>
    <OgioHeader/>
    <OgioTable/>

    
    </>
    
  )
}


export default OgioPage