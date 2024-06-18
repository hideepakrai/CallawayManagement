import React from 'react';
import { Row, Col, Card, Breadcrumb } from 'antd'; // Import necessary components from Ant Design
import SalesHome from "./SaleHome";
import Slider from '../../model/slider/Slider';
const SalesRepresentative = () => {
  return (
    <div>

      <Slider />

      <div className='content-pro'>
        <div className="toolbar  py-5 mt-12 py-lg-15" id="kt_toolbar">
          <div id="kt_toolbar_container" className="container d-flex flex-stack">
            <div className="page-title d-flex flex-column ">
              <h1 className="d-flex text-white fw-bold my-1 fs-3"> Sales Representative</h1>
            </div>

            <div className="d-flex align-items-center py-1">
              <div className="me-4">
                <ol className="breadcrumb text-muted fs-6 fw-bold">
                  <li className="breadcrumb-item pe-3 text-white">
                    <a href="#" className="pe-3 text-white">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item pe-3 text-white">
                    <a href="#" className="pe-3 text-white">
                      Accounts
                    </a>
                  </li>
                  <li className="breadcrumb-item px-3" style={{ color: "#ddd" }}>Sales Representative</li>
                </ol>
              </div>
            </div>

          </div>
        </div>

        <SalesHome />
      </div>
    </div>
  );
};

export default SalesRepresentative;
