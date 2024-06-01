import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { Timeline } from "antd";
import TextArea from 'antd/es/input/TextArea';
import "./Note.css"
import { getCurrentUser } from '../../slice/UserSlice/UserSlice';
import { useSelector } from 'react-redux';
import { getActiveOrdertab } from '../../slice/activeTabsSlice/ActiveTabSlice';
import { NoteModel } from '../model/noteModel/NoteModel';
import { getTravisNote } from '../../slice/allProducts/TravisMethewSlice';
import { getOgioNotes } from '../../slice/allProducts/OgioSlice';
type Props = {
    isModalOpen: boolean;
    handleOk: (note: string) => void;
    handleCancel: () => void;
};



const Note = ({ isModalOpen, handleOk, handleCancel }: Props) => {
    const [addNotes, setAddNotes] = useState<string>('');
    const [tabNotes, setTabNotes] = useState<NoteModel[]>([]);
    const getCurrentUsers = useSelector(getCurrentUser)
    const date= new Date();
    const getTravisNotes= useSelector(getTravisNote)
    const getOgioNote= useSelector(getOgioNotes)
     const getActiveOrdertabs= useSelector(getActiveOrdertab);
     useEffect(()=>{
        setTabNotes([])
            if(getActiveOrdertabs==='Travis' &&
            getTravisNotes &&
            getTravisNotes.length>0
            ){
                setTabNotes(getTravisNotes)
            } else if(getActiveOrdertabs==='Ogio'){
                setTabNotes(getOgioNote)
            }

     },[getActiveOrdertabs,getTravisNotes])
    
    
    const onOkHandler = () => {
        const data1={
            message: "Order Initiated",
            name: getCurrentUsers?.name,
            date: date,
            user_id:getCurrentUsers?.id,
            access:"all",
            type:"system"
}
        
        const data2={
            message:addNotes ,
            name: getCurrentUsers?.name,
            date: date,
            user_id:getCurrentUsers?.id,
            access:"all",
            type:"user"
        }
        const combinedDataObject = {
            data1: data1,
            data2: data2
        };

        handleOk(JSON.stringify(combinedDataObject));
        setAddNotes(''); // Optionally reset the notes after confirming
       
    };

    
   
    return (
        <div>
            <Modal className='timeline' title="Add Note" open={isModalOpen} onOk={onOkHandler} onCancel={handleCancel}>
            <div className='row mt-8'>
                <div className='col-7'>

                    <Timeline>
                        <Timeline.Item color="black ">
                          
                            <p className="text-gray-800 fs-5 fw-semibold">Note by <i>{getCurrentUsers?.name}</i> on {date.toUTCString()}</p>
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
