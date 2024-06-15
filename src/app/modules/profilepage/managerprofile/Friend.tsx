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
      <h3 className="card-title text-white">Support</h3>
     
  </div>
  <div className="card-body py-7 ">
  {/* <div className="gx-pt-2">
        <ul className="gx-fnd-list gx-mb-0 d-flex row user-image" >
          {friendList.map((user:user, index) =>
            <li className="gx-mb-2 col-2 pb-6" style={{width:"160px"}} key={index} >
              <div className="user-images">
                <img alt="..." src={user.image}/>
                <div className="cw-user-content">
                  
                  <h6>{user.name}</h6>
                </div>
              </div>
            </li>
          )
          }
        </ul>
      </div> */}
      <UserList/>
  </div>
 
</div>

   
  )
};
export default Friends;
