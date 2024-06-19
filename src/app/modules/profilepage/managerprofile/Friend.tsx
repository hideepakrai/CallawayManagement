import React from "react";
import {Badge} from "antd";
import "./Friend.css"
import UserList from "./UserList";


type Props={
    friendList: user[]
    
}
type user={
    image:string
    name:string
    id:number
}
const Friends = () => {
  
  return (
      <div className="  mt-3 border mx-4  mb-10 ">
  <div className="card-header " style={{backgroundColor:"#333", minHeight:"56px",}}>
      <h3 className="card-title text-white">Users </h3>
     
  </div>
  <div className="card-body py-7 ">
  
      <UserList/>
  </div>
 
</div>

   
  )
};
export default Friends;
