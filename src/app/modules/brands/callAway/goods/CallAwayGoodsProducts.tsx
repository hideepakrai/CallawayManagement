import React from 'react'
import GoodsHeader from './header/GoodsHeader';
import GooodsTable from './table/GooodsTable';
const CallAwayGoodsProducts = () => {
  return (
    <div>

      

      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="page-title d-flex flex-column">
            <h1 className="d-flex text-white fw-bold my-1 fs-3"> Callaway HardGoods</h1>
          </div>
        </div>
      </div>

      <GoodsHeader />
      <GooodsTable />
    </div>
  )
}

export default CallAwayGoodsProducts