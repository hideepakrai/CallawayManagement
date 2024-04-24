import React from 'react';
import { Row, Col, Card, Breadcrumb } from 'antd'; // Import necessary components from Ant Design
import Index from "./index";
const SalesRepresentative = () => {
  return (
    <div>
      {/* <Row>
        <Col span={24}>
          <Card
            title="Sales Representative"
            extra={
              <div >
                <Breadcrumb separator=">">
                  <Breadcrumb.Item>
                    <span className="gx-link">Home</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <span className="gx-link">Accounts</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>Sales Representative</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            }
          >
        
          </Card>
        </Col>
      </Row> */}
     

      <div className="toolbar py-5 py-lg-15" id="kt_toolbar">
        <div id="kt_toolbar_container" className="container d-flex flex-stack">
          <div className="page-title d-flex flex-column">
            <h1 className="d-flex text-white fw-bold my-1 fs-3"> Sales Representative</h1>
          </div>

          <div className="d-flex align-items-center py-1">
            <div className="me-4">
              <a href="#" className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-white" data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end" data-kt-menu-flip="top-end">
                <i className="bi bi-pencil-fill icon-order"></i>Edit
              </a>
            </div>
          </div>

        </div>
      </div>

<Index/>

    </div>
  );
};

export default SalesRepresentative;
