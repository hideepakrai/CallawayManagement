import React from 'react'
import {Badge, Button} from "antd";
import { color } from 'html2canvas/dist/types/css/types/color';
const UserList = () => {
  return (
    <div className='d-flex row'>

<div className="card card-custom card-user-list mx-1" style={{width:"270px", padding:"0"}}  >
          <div className="card-header d-inline py-5" style={{ backgroundColor: "#000", color: "#fff", border:"none" }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"22px"}} >Alok Singh</h1>
            <h4 className=" text-center text-white">MANAGER </h4>

          </div>

          <div className="card-body" style={{backgroundColor:"#fafafa", padding:"18px 20px 5px 8px"}}>

            <ul className="card-list m-0" >
              <li>
                <i className="bi bi-person-lines-fill"></i>
                <span>+9114829659</span>
              </li>
              <li>
                <i className="bi bi-envelope"></i>
                <span>hell0@aloksingh.com</span>
              </li>
           

              
            </ul>
          </div>


        
</div>

<div className="card card-custom    card-user-list " style={{width:"270px", padding:"0"}}  >
          <div className="card-header d-inline py-5" style={{ backgroundColor: "#000", color: "#fff", border:"none" }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"22px"}} >Ankur Shriv</h1>
            <h4 className=" text-center text-white">MANAGER </h4>

          </div>

          <div className="card-body" style={{backgroundColor:"#fafafa", padding:"18px 20px 5px 8px"}}>

            <ul className="card-list m-0" >
              <li>
                <i className="bi bi-person-lines-fill"></i>
                <span>+91142365478</span>
              </li>
              <li>
                <i className="bi bi-envelope"></i>
                <span>hello@ankurshriv.com</span>
              </li>
           

              
            </ul>
          </div>


        
</div>


<div className="card card-custom    card-user-list " style={{width:"270px", padding:"0"}} >
          <div className="card-header d-inline py-5" style={{ backgroundColor: "#000", color: "#fff", border:"none" }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"22px"}} >Manish Sharma</h1>
            <h4 className=" text-center text-white">MANAGER </h4>

          </div>

          <div className="card-body" style={{backgroundColor:"#fafafa", padding:"18px 20px 5px 8px"}}>

            <ul className="card-list m-0" >
              <li>
                <i className="bi bi-person-lines-fill"></i>
                <span>+9114829659</span>
              </li>
              <li>
                <i className="bi bi-envelope"></i>
                <span>hello@manishsharma.com</span>
              </li>
           

              
            </ul>
          </div>


        
</div>


<div className="card card-custom    card-user-list " style={{width:"270px", padding:"0"}} >
          <div className="card-header d-inline py-5" style={{ backgroundColor: "#000", color: "#fff", border:"none" }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"22px"}} >Manish Gupta</h1>
            <h4 className=" text-center text-white">MANAGER </h4>

          </div>

          <div className="card-body" style={{backgroundColor:"#fafafa", padding:"18px 20px 5px 8px"}}>

            <ul className="card-list m-0" >
              <li>
                <i className="bi bi-person-lines-fill"></i>
                <span>+9114829659</span>
              </li>
              <li>
                <i className="bi bi-envelope"></i>
                <span>hello@manishgupta.com</span>
              </li>         
            </ul>
          </div>        
</div>

<div className="card card-custom    card-user-list col-lg-2" style={{width:"270px", padding:"0"}}  >
          <div className="card-header d-inline py-5" style={{ backgroundColor: "#000", color: "#fff", border:"none" }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"22px"}} >Deepak Sharma</h1>
            <h4 className=" text-center text-white">MANAGER </h4>

          </div>

          <div className="card-body" style={{backgroundColor:"#fafafa", padding:"18px 20px 5px 8px"}}>

            <ul className="card-list m-0" >
              <li>
                <i className="bi bi-person-lines-fill"></i>
                <span>+9114829659</span>
              </li>
              <li>
                <i className="bi bi-envelope"></i>
                <span>hello@deepaksharma.com</span>
              </li>
           

              
            </ul>
          </div>


        
</div>









      
    </div>
  )
}

export default UserList
