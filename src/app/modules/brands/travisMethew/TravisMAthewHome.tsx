import React from 'react'
import TravisTable from "./table/TravisTable"
import TravisHeader from './header/TravisHeader'
import Slider from '../../model/slider/Slider'
import "./TravisMAthewHome.css";
const TravisMAthewHome = () => {
  return (
    <div>

<Slider/>

<div className='content-pro'>
<div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="page-title d-flex flex-column">
            <h1 className="d-flex text-white fw-bold my-1 fs-3">
 Travis Mathew</h1>
          </div>

        </div>
      </div>

{/* 
<TravisHeader/> */}
 <TravisTable/>
 </div>
    </div>
  )
}

export default TravisMAthewHome