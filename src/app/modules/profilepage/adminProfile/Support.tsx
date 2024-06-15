import React from "react";
import {Badge} from "antd";
import "../managerprofile/Friend.css"
import SupportList from "./SupportList";





const Support = () => {
    



    
  return (
 
      

      <div className="  mt-3 border mx-4  mb-10 ">
  <div className="card-header " style={{backgroundColor:"#333", minHeight:"56px",}}>
      <h3 className="card-title text-white">Support</h3>
     
  </div>
  <div className="card-body py-7 ">

      <SupportList/>
  </div>
 
</div>

   
  )
};
export default Support;
