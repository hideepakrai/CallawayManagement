import React, { useState , useEffect} from "react";
import { Modal, Select, Timeline,Button,message, Popconfirm } from "antd";
import "./Edit.css";
import Note from "./Note";
import { CartModel } from "../../model/CartOrder/CartModel";
import type { PopconfirmProps } from 'antd';
import { useSelector } from "react-redux";
import { getCurrentUser } from "../../../slice/UserSlice/UserSlice";


type Props = {
  isEdit: boolean;
  onClose: () => void;
  changeStatus: (status: string) => void;
  selectedOrder:CartModel,
  deletedYes:()=>void
};

  type  notetimeLine={
    message?:string,
    date?:string,
    name?:string
  }
const Edit = ({ isEdit, onClose, changeStatus,selectedOrder ,deletedYes}: Props) => {
  const [status, setStatus] = useState<string>("");
  const [isNoteModalOpen, setIsNoteModalOpen] = useState<boolean>(false);
    const getCurrentUsers = useSelector(getCurrentUser)
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
    console.log("statis", value)
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

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
  
     deletedYes()
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.error('Click on No');
  };
  return (
    <>
      <Modal
        open={isEdit}
        onOk={handleOk}
        onCancel={handleCancel}
        title="Edit Status "
        className="note-modal"

        footer={ getCurrentUsers &&
          getCurrentUsers && getCurrentUsers.role && ["Admin", "Manager"].includes(getCurrentUsers.role) ?
          [
          <Popconfirm
    title="Delete the Order"
    description="Are you sure to delete this Order?"
    onConfirm={confirm}
    onCancel={cancel}
    okText="Yes"
    cancelText="No"
  >
    <Button danger >Delete Order</Button>
  </Popconfirm>,

          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            Ok
          </Button>,
        ] :null
      }

      >
        <div className="mt-8">
          {/* <Timeline>
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
           
          </Timeline> */}
          <Timeline>
    {timeLine && 
        timeLine.map((item, index) => {
            if (!item.date) {
                return (
                    <Timeline.Item color="black" key={index}>
                        <h3 className="note-text">{item?.message}</h3>
                        <p className="text-gray-600 fs-5 note-details">
                            Note by <i>{item.name}</i> on unknown date
                        </p>
                    </Timeline.Item>
                );
            }

            const date = new Date(item.date);

            // Options for the date part
            const dateOptions: Intl.DateTimeFormatOptions = { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric', 
                timeZone: 'Asia/Kolkata'
            };

            // Options for the time part
            const timeOptions: Intl.DateTimeFormatOptions = { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true, 
                timeZone: 'Asia/Kolkata' 
            };

            const formattedDate = date.toLocaleDateString('en-US', dateOptions);
            const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

            return (
                <Timeline.Item color="black" key={index}>
                    <h3 className="note-text">{item?.message}</h3>
                    <p className="text-gray-600 fs-5 note-details">
                        Note by <i>{item.name}</i> on {formattedDate}, {formattedTime}
                    </p>
                </Timeline.Item>
            );
        })
    }
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
              { value: "Pending", label: "Pending" },
              { value: "Submitted", label: "Submitted" },
              { value: "Approved", label: "Approved" },

              { value: "Rejected", label: "Rejected" },
              { value: "Completed", label: "Completed" },
            ]}
          />
        </div>
      </Modal>

     

    </>
  );
};

export default Edit;
