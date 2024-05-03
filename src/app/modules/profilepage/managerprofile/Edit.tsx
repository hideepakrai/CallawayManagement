import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input,Timeline } from "antd";
import { Select } from "antd";

type Props={
    isEdit:boolean
    onClose:() => void,
    changeStatus:(status:string) => void
    
}
const Edit = ({ isEdit, onClose,changeStatus}:Props) => {
  const handleOk = () => {
    //setIsModalOpen(false);
    if(status!==""){
      changeStatus(status)
    }else{
      alert("Please select status")
      return
    }
    setStatus("")
    onClose();
  };
  const handleCancel = () => {
    // setIsModalOpen(false);
    onClose();
  };
 const [status, setStatus]= useState<string>("")
  const handleOnChange = (value:string) => {
       setStatus(value)
    // console.log(`selected ${value}`);
  };
  return (
    <>
    <div>
      <Modal
        // title="Basic Modal"
        open={isEdit}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <h3 className=" pb-1">Edit Status</h3>

        <Select className="status-select" style={{width: '100%',}}
          showSearch
          placeholder="Update status"
          optionFilterProp="children"
          onChange={handleOnChange}
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

<div  className="mt-8">
            <h3 className="pb-4">Timeline</h3>

            {/* <span className="gx-mb-3">Timeline</span> */}
            <Timeline>
              <Timeline.Item color="green">
                <h3>  Comment  <span className="fs-6">by</span> <span className="text-primary">Deepak Rai</span> <span className="fs-6 ">on</span><span className="fs-6"><i className="text-primary"> 21-01-2024 01:00AM</i> </span></h3>
                <p>Cras non dolor. Praesent ac massa at ligula laoreet iaculis. </p>
              </Timeline.Item>

              <Timeline.Item color="red">
               <h3>  Approve Order <span className="fs-6">by</span> <span className="text-primary">Manish Sharma</span> <span className="fs-6 ">on</span><span className="fs-6"><i className="text-primary"> 01-10-2024 05:00AM</i> </span></h3>
                <p>Cras non dolor. Praesent ac massa at ligula laoreet iaculis. </p>
              </Timeline.Item>
              {/* <Timeline.Item>
                <h3> Reject Order <span className="fs-6">by</span> <span className="text-primary">Rahul Singh</span> <span className="fs-6 ">on</span><span className="fs-6"><i className="text-primary"> 25-06-2024 03:10AM</i> </span></h3>
                <p>Cras non dolor. Praesent ac massa at ligula laoreet iaculis. </p>
              </Timeline.Item> */}
            </Timeline>
          </div>

      </Modal>

     
    </div>
    
    </>

  );
};

export default Edit;
