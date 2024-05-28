import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Timeline } from "antd";
import TextArea from 'antd/es/input/TextArea';
import "./Note.css"
type Props = {
    isModalOpen: boolean;
    handleOk: (note: string) => void;
    handleCancel: () => void;
};

const Note = ({ isModalOpen, handleOk, handleCancel }: Props) => {
    const [addNotes, setAddNotes] = useState<string>('');

    const onOkHandler = () => {
        handleOk(addNotes);
        setAddNotes(''); // Optionally reset the notes after confirming
        
    };

    return (
        <div>
            <Modal className='timeline' title="Add Note" open={isModalOpen} onOk={onOkHandler} onCancel={handleCancel}>
            <div className='row mt-8'>
                <div className='col-7'>

                    <Timeline>
                        <Timeline.Item color="black ">
                            {/* <h3 className="note-text fs-4">Cras non dolor. Praesent ac massa at </h3> */}
                            <p className="text-gray-800 fs-5 fw-semibold">Note by <i>Deepak Rai</i> on 21-01-2024 01:00AM</p>
                        </Timeline.Item>
                        <Timeline.Item color="black ">
                            {/* <h3 className="note-text fs-4">Cras non dolor. Praesent ac massa at </h3> */}
                            <p className="text-gray-800 fs-5 fw-semibold ">Note by <i>Deepak Rai</i> on 21-01-2024 01:00AM</p>
                        </Timeline.Item>

                        <Timeline.Item color="gray" className='p-0'>
                            {/* <h3 className="fs-4">Cras non dolor. Praesent ac massa at</h3> */}
                            <p className="text-gray-800 fs-5 fw-semibold ">Note by <i>Manish Sharma</i> on 22-01-2024 01:00AM</p>
                            
                        </Timeline.Item>
                    </Timeline>
                </div>

                <div className='col-5'>
                    <TextArea
                        rows={5}
                        placeholder="Note"
                        value={addNotes}
                        onChange={(e) => setAddNotes(e.target.value)}
                    />
                </div>
                </div>
            </Modal>
        </div>
    );
};

export default Note;
