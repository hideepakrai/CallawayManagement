import React from "react";
import { Badge } from "antd";
import "./Friend.css"
type Props = {
  friendList: user[]
}
type user = {
  image: string
  name: string
  id: number
}
const Friends = ({ friendList }: Props) => {

  return (
    <div className="card card-custom">
      <div className="card-header">
        <h3 className="card-title">Support</h3>

      </div>
      <div className="card-body">
        <div className="gx-pt-2">
          <ul className="gx-fnd-list gx-mb-0 d-flex row user-image" >
            {friendList.map((user: user, index) =>
              <li className="gx-mb-2 col-4 " key={index} >
                <div className="">
                  <img alt="..." src={user.image} />
                  <div className="gx-user-fnd-content">

                    <h6>{user.name}</h6>
                  </div>
                </div>
              </li>
            )
            }
          </ul>
        </div>
      </div>

    </div>


  )
};
export default Friends;
