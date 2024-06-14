import React, { useState , useEffect} from "react";
import { Modal, Select, Timeline } from "antd";
import "./Edit.css";
import Note from "./Note";
import { CartModel } from "../../model/CartOrder/CartModel";

type Props = {
  isEdit: boolean;
  onClose: () => void;
  changeStatus: (status: string) => void;
  selectedOrder:CartModel
};

  type  notetimeLine={
    message?:string,
    date?:string,
    name?:string
  }
const Edit = ({ isEdit, onClose, changeStatus,selectedOrder }: Props) => {
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

  const [timeLine, settimeLime]= useState<notetimeLine[]>([])
  useEffect(()=>{
    if(selectedOrder && selectedOrder.note&& selectedOrder.status ){
      const note = JSON.parse(selectedOrder.note);
      settimeLime(note)
      setStatus(selectedOrder.status)
    }
  },[selectedOrder])

  console.log("timeLine",timeLine)
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
           { timeLine && 
           timeLine.map((item)=>{

            return(
          <Timeline.Item color="black">
              <h3 className="note-text">{item?.message}</h3>
              <p className="text-gray-600 fs-5 note-details">Note by <i>{item.name}</i> {item.date}</p>
            </Timeline.Item>
            )
           }

           )
           }
            {/* <Timeline.Item color="gray">
              <h3 className="note-text">Cras non dolor. Praesent ac massa at ligula laoreet iaculis.</h3>
              <p className="text-gray-600 fs-5 note-details">Note by <i>Manish Sharma</i> on 22-01-2024 01:00AM</p>
            </Timeline.Item> */}
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
            value={status}
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
