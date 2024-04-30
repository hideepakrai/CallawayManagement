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
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Sub Brand",
      dataIndex: "subBrand",
      key: "subBrand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "Product Name",
      dataIndex: "ProductName",
      key: "ProductName",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
  ];
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      Quantity: "1" + i.toString(),
      brand: "Callaway",
      ProductName: "Test" + i.toString(),
      productType: "T-shirt" + i.toString(),
      category: "apparel",
      subBrand: "Callaway Apparel",
    });
  }
  return (
    <div>
      <Modal
        // title="Basic Modal"
        open={isView}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <h3>View</h3>
        <Table columns={columns} dataSource={data} pagination={false} />;
      </Modal>
    </div>
  );
};

export default View;
