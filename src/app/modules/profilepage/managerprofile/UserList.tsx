import React,{useState, useEffect} from 'react'
import {Badge, Button} from "antd";
import { color } from 'html2canvas/dist/types/css/types/color';
import { getUserProfile } from '../../../slice/UserSlice/UserSlice';
import { useSelector } from 'react-redux';
import "./UserList.css"
const UserList = () => {


  const getUserProfiles= useSelector(getUserProfile)

  return (
    <div className='d-flex row'>

{getUserProfiles &&
getUserProfiles.length>0 &&
getUserProfiles.map((item)=>{
  return (
    <div className="card card-custom    card-user-list " style={{width:"260px", padding:"0"}}  >
          <div className="card-header d-inline py-5 p-0 px-2 " style={{ backgroundColor: "#000", color: "#fff", border:"none", height:"107px",  }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"14px", lineHeight:"20px"}} >{item.name}</h1>
            <h4 className=" text-center text-white">{item.role} </h4>

          </div>

          <div className="card-body" style={{backgroundColor:"#fafafa", padding:"18px 0px 5px 0px"}}>

            <ul className="card-list m-0" >
              <li >
                <i  className="bi bi-person-lines-fill "></i>
                <span>{item.phone}</span>
              </li>
              <li className='list-support'>
                <i className="bi bi-envelope list-icon"></i>
                <span className='list-text'>{item.email}</span>
              </li>
           

              
            </ul>
          </div>


        
</div>

  )
  
})

}

{/* 
<div className="card card-custom    card-user-list " style={{width:"260px", padding:"0"}}  >
          <div className="card-header d-inline py-5" style={{ backgroundColor: "#000", color: "#fff", border:"none" }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"22px"}} >Ankur Shriv</h1>
            <h4 className=" text-center text-white">MANAGER </h4>

          </div>

          <div className="card-body" style={{backgroundColor:"#fafafa", padding:"18px 0px 5px 0px"}}>

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


<div className="card card-custom    card-user-list " style={{width:"260px", padding:"0"}} >
          <div className="card-header d-inline py-5" style={{ backgroundColor: "#000", color: "#fff", border:"none" }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"22px"}} >Manish Sharma</h1>
            <h4 className=" text-center text-white">MANAGER </h4>

          </div>

          <div className="card-body" style={{backgroundColor:"#fafafa", padding:"18px 0px 5px 0px"}}>

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


<div className="card card-custom    card-user-list " style={{width:"260px", padding:"0"}} >
          <div className="card-header d-inline py-5" style={{ backgroundColor: "#000", color: "#fff", border:"none" }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"22px"}} >Manish Gupta</h1>
            <h4 className=" text-center text-white">MANAGER </h4>

          </div>

          <div className="card-body" style={{backgroundColor:"#fafafa", padding:"18px 0px 5px 0px"}}>

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

<div className="card card-custom    card-user-list col-lg-2" style={{width:"260px", padding:"0"}}  >
          <div className="card-header d-inline py-5" style={{ backgroundColor: "#000", color: "#fff", border:"none" }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"22px"}} >Deepak Sharma</h1>
            <h4 className=" text-center text-white">MANAGER </h4>

          </div>

          <div className="card-body" style={{backgroundColor:"#fafafa", padding:"18px 0px 5px 0px"}}>

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


        
</div> */}









      
    </div>
  )
}

export default UserList

