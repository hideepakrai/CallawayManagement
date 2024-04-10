import React, { useState, useEffect } from "react";
import {
  Space,
  Card,
  Divider,
  Form,
  Radio,
  Switch,
  Table,
  Tooltip,
  Breadcrumb,
} from "antd";
import Icon from "@ant-design/icons";
import Edit from "./Edit";
import Notes from "./Notes";
import View from "./View";
import type { TableProps } from 'antd';
import { number } from "yup";
import { ColumnGroupType, ColumnType } from "antd/es/table";

const colors = ["blue"];
const customColors = ["#f50", "#2db7f5", "#87d068", "#108ee9"];
const FormItem = Form.Item;

interface DataType {
  title: string;
  dataIndex: string;
  key: number;
  width: number;
  paddingLeft:number;
  
}

interface DatasType{
  key: string;
  orderId: string;
  status: string;
  retailer:string;
  manager: string;
  amount:number;
  date: string;
  description:string;
}

const columns: (ColumnType<DatasType> | ColumnGroupType<DatasType>)[]  = [
  {
    title: "Order Id",
    dataIndex: "orderId",
    key: "orderId",
    width: 100,
    
    
    // //render: (text) => <span className="gx-link">{text}</span>,
  },



  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 50,
    //paddingLeft: 50,
  },

  {
    title: "Retailer",
    dataIndex: "retailer",
    key: "retailer",
    width: 100,
  },
  {
    title: "Manager",
    dataIndex: "manager",
    key: "manager",
    width: 100,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 100,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: 120,
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    width: 100,
    render: () => (
      <>
        <Space wrap>
          <Tooltip placement="bottom" title="Edit" 
          // color={colors} key={colors}
          >
            <span
              style={{ paddingRight: "8px", borderRight: "1px solid #ddd" }}
            >
              <i className="icon icon-edit"></i>
            </span>
          </Tooltip>
        </Space>
        <Space wrap>
          <Tooltip placement="bottom" title="View" 
          // color={colors} key={colors}
          >
            <span
              style={{
                paddingRight: "8px",
                paddingLeft: "8px",
                borderRight: "1px solid #ddd",
              }}
            >
              <i className="icon icon-map-popup-info"></i>
            </span>
          </Tooltip>
        </Space>

        <Space wrap>
          <Tooltip placement="bottom" title="Note" 
          // color={colors} key={colors}
          >
            <span style={{ paddingLeft: "8px" }}>
              <i className="icon icon-copy"></i>
            </span>
          </Tooltip>
        </Space>
      </>
    ),
  },
];

const data :DatasType[] = [
  {
    key: "1",
    orderId: "001",
    status: "Completed",
    retailer: "Retailer 1",
    manager: "Alok Singh",
    amount: 1234,
    date: "08/05/2006 03:05:15 PM",
    description: "Description 1",
  },
  {
    key: "2",
    orderId: "002",
    status: "Rejected",
    retailer: "Retailer 2",
    manager: "Rahul yadav",
    amount: 45698,
    description: "Description 2",
    date: "08/05/2006 03:05:15 PM",
  },
  {
    key: "3",
    orderId: "003",
    status: "Approved",
    retailer: "Retailer 2",
    manager: "Jitendra Gupta",
    amount: 4569,
    description: "Description 2",
    date: "08/05/2006 03:05:15 PM",
  },
  {
    key: "4",
    orderId: "004",
    status: " Under Review ",
    retailer: "Retailer 2",
    manager: "Manish Gupta",
    amount: 1256,
    description: "Description 2",
    date: "08/05/2006 03:05:15 PM",
  },
  // Add more data as needed
];

const expandedRowRender = () => {
  // const columns = [
  //   {
  //     title: "Brand",
  //     dataIndex: "brand",
  //     key: "brand",
  //   },
  //   {
  //     title: "Sub Brand",
  //     dataIndex: "subBrand",
  //     key: "subBrand",
  //   },
  //   {
  //     title: "Category",
  //     dataIndex: "category",
  //     key: "category",
  //   },
  //   {
  //     title: "Product Type",
  //     dataIndex: "productType",
  //     key: "productType",
  //   },
  //   {
  //     title: "Product Name",
  //     dataIndex: "ProductName",
  //     key: "ProductName",
  //   },
  //   {
  //     title: "Quantity",
  //     dataIndex: "Quantity",
  //     key: "Quantity",
  //   },
  // ];



  const data = [];
  // for (let i = 0; i < 3; ++i) {
  //   data.push({
  //     key: i.toString(),
  //     Quantity: "1" + i.toString(),
  //     brand: "Callaway",
  //     ProductName: "Test" + i.toString(),
  //     productType: "T-shirt" + i.toString(),
  //     category: "apparel",
  //     subBrand: "Callaway Apparel",
  //   });
  // }
  // return <Table columns={columns} dataSource={data} pagination={false} />;
};


const OrderPage = () => {
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(true);
  };
  const handleCloseEdit = () => {
    setIsEdit(false);
  };

  //notes
  const [isNote, setIsNote] = useState(false);
  const handleNote = () => {
    setIsNote(true);
  };
  const handleCloseNote = () => {
    setIsNote(false);
  };

  // view
  const [isView, setIsView] = useState(false);
  const handleView = () => {
    setIsView(true);
  };

  const handleCloseView = () => {
    setIsView(false);
  };
  return (
    <>
      <Card title="Orders Page" 
      extra={
        <div >
        <Breadcrumb separator=">">
        <Breadcrumb.Item>
            <span className="gx-link">Home</span>
          </Breadcrumb.Item>

          
          <Breadcrumb.Item>Order</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      }
      >
        <div className="components-table-demo-control-bar">
          {/* ... (same as your original form) */}
        </div>
        <Table
          className="gx-table-responsive"
          expandable={{
           // // expandedRowRender,
            defaultExpandedRowKeys: ["0"],
          }}
          columns={[
            ...columns.map((column) => {
              // Wrap the render function to include a click event for the 'Edit' icon
              if (column.key === "action") {
                return {
                  ...column,
                  render: () => (
                    <>
                      <Space wrap>
                        <Tooltip
                          placement="bottom"
                          title="Edit"
                          // color={colors}
                          // key={colors}
                        >
                          <span
                            style={{
                              paddingRight: "8px",
                              borderRight: "1px solid #ddd",
                            }}
                            onClick={() => handleEdit()}
                          >
                            <i className="icon icon-edit"></i>
                          </span>
                        </Tooltip>
                      </Space>
                      <Space wrap>
                        <Tooltip
                          placement="bottom"
                          title="View"
                          // color={colors}
                          // key={colors}
                        >
                          <span
                            style={{
                              paddingRight: "8px",
                              paddingLeft: "8px",
                              borderRight: "1px solid #ddd",
                            }}
                          >
                            <i
                              className="icon icon-map-popup-info"
                              onClick={handleView}
                            ></i>
                          </span>
                        </Tooltip>
                      </Space>

                      <Space wrap>
                        <Tooltip
                          placement="bottom"
                          title="Note"
                          // color={colors}
                          // key={colors}
                        >
                          <span style={{ paddingLeft: "8px" }}>
                            <i className="icon icon-copy" onClick={handleNote}></i>
                          </span>
                        </Tooltip>
                      </Space>
                    </>
                  ),
                };
              }
              return column;
            }),
          ]}
          dataSource={data}
        />
      </Card>
      
      <Edit isEdit={isEdit} onClose={handleCloseEdit} />
      <Notes isNote={isNote} onCloseNote={handleCloseNote} />
      <View isView={isView} onCloseView={handleCloseView} />
    </>
  );
};

export default OrderPage;
