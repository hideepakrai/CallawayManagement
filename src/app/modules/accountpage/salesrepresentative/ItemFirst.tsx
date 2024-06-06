import React, { useState } from "react";
import { Button } from "antd";
import SalesRepFrom from "../salesrepresentative/SalesRepFrom";

import { CurentUser } from "../../model/useAccount/CurrentUser";

type Props = {
  salesRep: CurentUser;
};

const ItemFirst = ({ salesRep }: Props) => {
  const [salesRepdata, setsalesRepdata] = useState<CurentUser>();
  const [isModalVisible, setisModelVisible] = useState(false);

  const showModal = () => {
    setsalesRepdata(salesRep);
    setisModelVisible(true);
  };

  const handleModelOk = () => {
    setisModelVisible(false);
  };

  const handleCancel = () => {
    setisModelVisible(false);
  };

  const resetIsEdit = () => {
    // Add your reset logic here if needed
    setisModelVisible(false);
  };

  return (
    <>
      <div
        className="card card-custom mx-8 mb-3 pb-7 card-user-list"
        style={{ border: "none" }}
      >
        <div
          className="card-header d-inline py-7"
          style={{ backgroundColor: "#000", color: "#fff", border: "none" }}
        >
          <h1 className=" text-center text-white pb-2" style={{ fontSize: "22px" }}>
            {salesRep?.name}
          </h1>
          <h4 className=" text-center text-white cart-text">SALES REPRESENTATIVE</h4>
        </div>

        <div className="card-body px-4">
          <ul className="card-list pt-3">
            <li>
              <i className="bi bi-person-lines-fill"></i>
              <span>{salesRep?.phone}</span>
            </li>

            <li className="d-flex">
              <div>
                <i className="bi bi-envelope"></i>
              </div>
              <span className="user-cart-details">{salesRep?.email}</span>
            </li>
          </ul>
        </div>

        <div style={{ textAlign: "center" }}>
          <Button
            style={{
              backgroundColor: "#000",
              color: "#fff",
              textAlign: "center",
              margin: "0 auto",
            }}
            onClick={showModal}
          >
            Edit
          </Button>
        </div>
      </div>

      {salesRepdata && (
        <SalesRepFrom
          salesRepdata={salesRepdata}
          handleOk={handleModelOk}
          isModalVisible={isModalVisible}
          handleCancel={handleCancel}
          resetIsEdit={resetIsEdit} // Pass resetIsEdit as a prop
        />
      )}
    </>
  );
};

export default ItemFirst;
