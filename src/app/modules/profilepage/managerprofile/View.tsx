import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Flex, Input, Table } from "antd";
const { TextArea } = Input;
type Props={
    isView:boolean,
    onCloseView:() => void
}

const View = ({ isView, onCloseView }:Props) => {
  const handleOk = () => {
    //setIsModalOpen(false);
    onCloseView();
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    onCloseView();
  };

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Description ",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Name ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Style",
      dataIndex: "style",
      key: "style",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },

    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const data = [
    {
   
      dataIndex: "sku",
   
    },
    {
      title: "Description ",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Name ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Style",
      dataIndex: "style",
      key: "style",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
    },

    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
    },

    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  
  return (
    <div>
      <Modal
        // title="Basic Modal"
        open={isView}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <h3>Order Id</h3>
        <Table columns={columns} dataSource={data} pagination={false} />;
      </Modal>
    </div>
  );
};

export default View;
