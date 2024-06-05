import React, { useState } from "react";
import { Button } from "antd";
import { CurentUser } from "../../model/useAccount/CurrentUser";
import "./FirstItem.css";
import ManagerForm from "./ManagerFrom";
type Props = {
  manager: CurentUser;
};



const FirstItem = ({ manager }: Props) => {
  const [isModalVisible, setisModelVisible] = useState(false);

  const showModal = () => {
    setisModelVisible(true)
  }

  const handleModelOk = () => {
    setisModelVisible(false)
  }

  const handleCancel = () => {
    setisModelVisible(false)
  }




  return (

    <>
      <div className="card card-custom mx-8 mb-3 pb-7 card-user-list" style={{ border: "none" }}>
        <div className="card-header d-inline py-7" style={{ backgroundColor: "#000", color: "#fff", border: "none" }}>
          <h1 className="text-center text-white pb-2" style={{ fontSize: "22px" }}>{manager.name}</h1>
          <h4 className="text-center text-white cart-text">MANAGER</h4>
        </div>
        <div className="card-body px-4">
          <ul className="card-list pt-3">
            <li>
              <i className="bi bi-person-lines-fill"></i>
              <span>+91{manager.phone}</span>
            </li>

            <li className="d-flex">
              <div>
                <i className="bi bi-envelope"></i>
              </div>
              <span className="email-manager user-cart-details">{manager.email}</span>
            </li>


            {/* <li>
              <i className="bi bi-person-vcard"></i>
              <span>Mukesh 1</span>
            </li> */}
          </ul>
        </div>


        <div style={{ textAlign: "center" }}>
          <Button style={{ backgroundColor: "#000", color: "#fff", textAlign: "center", margin: "0 auto" }} onClick={showModal}>Edit</Button>
        </div>
      </div>

      <ManagerForm
        handleOk={handleModelOk}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}

      />
    </>
  );
};

export default FirstItem;
