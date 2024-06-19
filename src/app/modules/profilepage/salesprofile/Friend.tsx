import React from "react";
import { Badge } from "antd";
import "./Friend.css"
import UserList from "../managerprofile/UserList";
type Props = {
  friendList: user[]
}
type user = {
  image: string
  name: string
  id: number
}
const Friends = () => {

  return (
    <div className="  mt-3 border   mb-10 mx-4 ">
  <div className="card-header" style={{backgroundColor:"#333", minHeight:"56px", borderRadius:"10px 10px 0 0", }}>
      <h3 className="card-title text-white pt-5 px-9">Users</h3>
     
  </div>

  <div className="card-body py-7 px-9">
  
      <UserList/>
  </div>
 
</div>


  )
};
export default Friends;
