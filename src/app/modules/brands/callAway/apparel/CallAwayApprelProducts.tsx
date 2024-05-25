import React from 'react'

import Slider from '../../../model/slider/Slider';
import ApparelTable from './table/ApparelTable';
const CallAwayApparelProducts = () => {
  return (
    <div>
<Slider/>
      
<div className='content-pro'>
      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="page-title d-flex flex-column">
            <h1 className="d-flex text-white fw-bold my-1 fs-3"> Callaway HardGoods</h1>
          </div>
        </div>
      </div>

  
      {/* <GoodsHeader /> */}
      <ApparelTable />
      </div>
    </div>
  )
}

export default CallAwayApparelProducts