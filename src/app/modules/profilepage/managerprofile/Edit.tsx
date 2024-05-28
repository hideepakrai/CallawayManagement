import React, { useState } from "react";
import { Modal, Select, Timeline } from "antd";
import "./Edit.css";
import Note from "./Note";

type Props = {
  isEdit: boolean;
  onClose: () => void;
  changeStatus: (status: string) => void;
};

const Edit = ({ isEdit, onClose, changeStatus }: Props) => {
  const [status, setStatus] = useState<string>("");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false);

  const handleOk = () => {
    if (status !== "") {
      changeStatus(status);
    } else {
      alert("Please select a status");
      return;
    }
    setStatus("");
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleNoteOk = (note: string) => {
    setIsNoteModalOpen(false);
  };

  const handleNoteCancel = () => {
    setIsNoteModalOpen(false);
  };

  return (
    <>
      <Modal
        open={isEdit}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Edit Status"
        className="note-modal"
      >
        <div className="mt-8">
          <Timeline>
            <Timeline.Item color="black">
              <h3 className="note-text">Cras non dolor. Praesent ac massa at ligula laoreet iaculis.</h3>
              <p className="text-gray-600 fs-5 note-details">Note by <i>Deepak Rai</i> on 21-01-2024 01:00AM</p>
            </Timeline.Item>
            <Timeline.Item color="gray">
              <h3 className="note-text">Cras non dolor. Praesent ac massa at ligula laoreet iaculis.</h3>
              <p className="text-gray-600 fs-5 note-details">Note by <i>Manish Sharma</i> on 22-01-2024 01:00AM</p>
            </Timeline.Item>
          </Timeline>
        </div>

        <Note
          isModalOpen={isNoteModalOpen}
          handleOk={handleNoteOk}
          handleCancel={handleNoteCancel}
        />

        <div className="d-flex">
          <h3 className="pb-1 fs-3 text-gray-900">Status</h3>
          <Select
            className="status-select"
            style={{ width: '35%', marginLeft: "20px", marginTop: "-5px" }}
            showSearch
            placeholder="Update status"
            optionFilterProp="children"
            onChange={handleStatusChange}
            options={[
              { value: "Completed", label: "Completed" },
              { value: "Rejected", label: "Rejected" },
              { value: "Approved", label: "Approved" },
              { value: "Under Review", label: "Under Review" },
            ]}
          />
        </div>
      </Modal>



    </>
  );
};

export default Edit;
