import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';

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
            <Modal title="Note" open={isModalOpen} onOk={onOkHandler} onCancel={handleCancel}>
                <TextArea
                    rows={4}
                    placeholder="maxLength is 6"
                   
                    value={addNotes}
                    onChange={(e) => setAddNotes(e.target.value)}
                />
            </Modal>
        </div>
    );
};

export default Note;
