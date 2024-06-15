import React from "react";
import {Badge} from "antd";
import "./Friend.css"
import UserRetail from "./UserRetail";


type Props={
    friendList: user[]
    
}
type user={
    image:string
    name:string
    id:number
    
}
const Friends = ({friendList}: Props) => {
    



    
  return (
 
 
    

//       <div className="card card-custom">
//   <div className="card-header">
//       <h3 className="card-title">Support</h3>
     
//   </div>
//   <div className="card-body py-7 px-3">
//   <div className="gx-pt-2">
//         <ul className="gx-fnd-list gx-mb-0 d-flex row user-image" >
//           {friendList.map((user:user, index) =>
//             <li className="gx-mb-2 col-4 pb-6" key={index} >
//               <div className="user-images">
//                 <img alt="..." src={user.image}/>
//                 <div className="cw-user-content">
                  
//                   <h6>{user.name}</h6>
//                 </div>
//               </div>
//             </li>
//           )
//           }
//         </ul>
//       </div>
//   </div>
 
// </div>


<div className="mt-3 border mx-4  mb-10">
<div className="card-header" style={{backgroundColor:"#333", minHeight:"56px",}}>
    <h3 className="card-title text-white">Support</h3>
   
</div>
<div className="card-body py-7 mx-1">
    <UserRetail/>
</div>

</div>
   
  )
};
export default Friends;
