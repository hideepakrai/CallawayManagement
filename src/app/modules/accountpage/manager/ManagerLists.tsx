import React from "react";
import {Col, Row} from "antd";
import FirstItem from "./FirstItem";
import SecondItem from "./SecondItem";
import ThirdItem from "./ThirdItem";

import "./ManagerList.css"

const ManagerList = () => {
  return (
    <div className="gx-price-tables gx-pt-default">
      <Row>
        <Col xl={6} lg={24} md={8} xs={24}>
          <FirstItem
            
          />
        </Col>

        <Col xl={6} lg={24} md={8} xs={24}>
          <SecondItem
          
          />
        </Col>

        <Col xl={6} lg={24} md={8} xs={24}>
          <ThirdItem
           
          />
        </Col>
        <Col xl={6} lg={24} md={8} xs={24}>
          <FirstItem
          
          />
        </Col>
        <Col xl={6} lg={24} md={8} xs={24}>
          <FirstItem
           
          />
        </Col>

        <Col xl={6} lg={24} md={8} xs={24}>
          <SecondItem
          
          />
        </Col>

        <Col xl={6} lg={24} md={8} xs={24}>
          <ThirdItem
           
          />
        </Col>
        <Col xl={6} lg={24} md={8} xs={24}>
          <FirstItem
           
          />
        </Col>
        <Col xl={6} lg={24} md={8} xs={24}>
          <FirstItem
          
          />
        </Col>

        <Col xl={6} lg={24} md={8} xs={24}>
          <SecondItem
          
          />
        </Col>

        <Col xl={6} lg={24} md={8} xs={24}>
          <ThirdItem
           
          />
        </Col>
        <Col xl={6} lg={24} md={8} xs={24}>
          <ThirdItem
          
          />
        </Col>
      </Row>
    </div>
  )
};

export default ManagerList;

