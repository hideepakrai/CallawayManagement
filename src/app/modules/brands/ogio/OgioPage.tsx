import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
//import { OgioModel } from '../model/OgioBrandModel';

import {useSelector, useDispatch} from "react-redux"
import {getOgioProducts} from "../../../slice/allProducts/OgioSlice"
import OgioHeader from './header/OgioHeader';
import OgioTable from './table/OgioTable';
import Slider from '../../model/slider/Slider';

  const OgioPage= () => {
  




  return (
    <>

    
   <Slider/>

    <div className='content-pro'>
      
    <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="page-title d-flex flex-column">
            <h1 className="d-flex text-white fw-bold my-1 fs-3">Ogio</h1>
          </div>

       
        </div>
      </div>

    {/* <OgioHeader/> */}
    <OgioTable/>
  </div>
    
    </>
    
  )
}


export default OgioPage