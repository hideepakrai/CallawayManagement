import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input } from "antd";
import { Select } from "antd";

type Props={
    isEdit:boolean
    onClose:() => void,
}
const Edit = ({ isEdit, onClose }:Props) => {
  const handleOk = () => {
    //setIsModalOpen(false);
    onClose();
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    onClose();
  };

  const onChange = (value:unknown) => {
    // console.log(`selected ${value}`);
  };
  return (
    <div>
      <Modal
        // title="Basic Modal"
        open={isEdit}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3>Edit Status</h3>

        <Select
          showSearch
          placeholder="Update status"
          optionFilterProp="children"
          onChange={onChange}
          // onSearch={onSearch}
          //filterOption={filterOption}
          options={[
            {
              value: "Completed",
              label: "Completed",
            },
            {
              value: "Rejected",
              label: "Rejected",
            },
            {
              value: "Approved",
              label: "Approved",
            },
            {
              value: "Under Review",
              label: "Under Review",
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default Edit;
