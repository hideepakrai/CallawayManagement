import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Input, Timeline } from "antd";
import { Select } from "antd";
import "./Edit.css";
type Props = {
  isEdit: boolean
  onClose: () => void,
  changeStatus: (status: string) => void

}
const Edit = ({ isEdit, onClose, changeStatus }: Props) => {
  const handleOk = () => {
    //setIsModalOpen(false);
    if (status !== "") {
      changeStatus(status)
    } else {
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
  const [status, setStatus] = useState<string>("")
  const handleOnChange = (value: string) => {
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
          title="Note"
          className="note-modal"

        >

 <div className="mt-8">
            {/* <h3 className="pb-4">Note <i className="bi bi-pencil-fill"></i></h3>  */}
            <Timeline>
              <Timeline.Item color="black">
              <h3 className="note-text">Cras non dolor. Praesent ac massa at ligula laoreet iaculis. </h3>
                {/* <h3 > <span className="fs-1"> Note</span>  <span className="fs-6">by</span> <span className=" fs-5 text-black">Deepak Rai</span> <span className="fs-6 ">on</span><span className="fs-6"><i className=" text-black"> 21-01-2024 01:00AM</i> </span></h3> */}
                <p className="text-gray-600 fs-5 note-details">Note by <i>Deepak Rai</i> on 21-01-2024 01:00AM</p>
              </Timeline.Item>
              <Timeline.Item color="gray">
              <h3 className="note-text">Cras non dolor. Praesent ac massa at ligula laoreet iaculis. </h3>
                {/* <h3 > <span className="fs-1"> Note</span>  <span className="fs-6">by</span> <span className=" fs-5 text-black">Deepak Rai</span> <span className="fs-6 ">on</span><span className="fs-6"><i className=" text-black"> 21-01-2024 01:00AM</i> </span></h3> */}
                <p className="text-gray-600 fs-5 note-details">Note by <i>Manish Sharma</i> on 22-01-2024 01:00AM</p>
              </Timeline.Item>

            </Timeline>

           

          </div>

          <div className="d-flex">
          <h3 className=" pb-1 fs-3 text-gray-900"> Status </h3>

          <Select className="status-select" style={{ width: '35%', marginLeft:"20px", marginTop:"-5px" }}
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

</div>
         

          {/* <div  className="mt-8">
            <h3 className="pb-4">Timeline</h3>

         
            <Timeline>
              <Timeline.Item color="green">
                <h3>  Comment  <span className="fs-6">by</span> <span className="text-primary">Deepak Rai</span> <span className="fs-6 ">on</span><span className="fs-6"><i className="text-primary"> 21-01-2024 01:00AM</i> </span></h3>
                <p>Cras non dolor. Praesent ac massa at ligula laoreet iaculis. </p>
              </Timeline.Item>

              <Timeline.Item color="red">
               <h3>  Approve Order <span className="fs-6">by</span> <span className="text-primary">Manish Sharma</span> <span className="fs-6 ">on</span><span className="fs-6"><i className="text-primary"> 01-10-2024 05:00AM</i> </span></h3>
                <p>Cras non dolor. Praesent ac massa at ligula laoreet iaculis. </p>
              </Timeline.Item>
             
            </Timeline>
          </div> */}

        </Modal>


      </div>

    </>

  );
};

export default Edit;
