import React from "react";
import {Col, Row} from "antd";
import ItemFirst from "./ItemFirst";
import SecondItem from "./SecondItem";
import ThirdItem from "./ThirdItem";

import "./index.css"

const index = () => {
  return (
    <div className="gx-price-tables gx-pt-default">
      <Row>
        <Col xl={6} lg={24} md={8} xs={24}>
          <ItemFirst
            
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
          <ItemFirst
          
          />
        </Col>
        <Col xl={6} lg={24} md={8} xs={24}>
          <ItemFirst
           
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
          <ItemFirst
           
          />
        </Col>
        <Col xl={6} lg={24} md={8} xs={24}>
          <ItemFirst
          
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

export default index;

