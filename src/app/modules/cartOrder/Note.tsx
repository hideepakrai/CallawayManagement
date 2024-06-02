import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { Timeline } from "antd";
import TextArea from 'antd/es/input/TextArea';
import "./Note.css"
import { getCurrentUser } from '../../slice/UserSlice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveOrdertab } from '../../slice/activeTabsSlice/ActiveTabSlice';
import { NoteModel } from '../model/noteModel/NoteModel';
import { addTravisNote, getTravisNote } from '../../slice/allProducts/TravisMethewSlice';
import { addNote, getOgioNotes } from '../../slice/allProducts/OgioSlice';
type Props = {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
};



const Note = ({ isModalOpen, handleOk, handleCancel }: Props) => {
    const [addNotes, setAddNotes] = useState<string>('');
    const [tabNotes, setTabNotes] = useState<NoteModel[]>([]);
    const [tab, setTab] = useState<string>("");
    const getCurrentUsers = useSelector(getCurrentUser)
    const date= new Date();
    const getTravisNotes= useSelector(getTravisNote)
    const getOgioNote= useSelector(getOgioNotes)
    const dispatch= useDispatch()

     const getActiveOrdertabs= useSelector(getActiveOrdertab);
     useEffect(()=>{
        setTabNotes([])
        setTab("")
            if(getActiveOrdertabs==='Travis' &&
            getTravisNotes &&
            getTravisNotes.length>0
            ){
                setTabNotes(getTravisNotes)
                setTab("Travis")
            } else if(getActiveOrdertabs==='Ogio'){
                setTabNotes(getOgioNote)
                setTab("Ogio")
            }

     },[getActiveOrdertabs,getTravisNotes])
    
    
    const onOkHandler = () => {

        
        const data2={
            message:addNotes ,
            name: getCurrentUsers?.name,
            date: date,
            user_id:getCurrentUsers?.id,
            access:"all",
            type:"user"
        }
      if(tab==="travis"){
        dispatch(addTravisNote({
            note:data2,
        }))
      } else if (tab==="Ogio"){
        dispatch(addNote({
            note:data2,
        }))
      }
       

        handleOk();
        setAddNotes(''); // Optionally reset the notes after confirming
       
    };

    
   
    return (
        <div>
            <Modal className='timeline' title="Add Note" open={isModalOpen} onOk={onOkHandler} onCancel={handleCancel}>
            <div className='row mt-8'>
                <div className='col-7'>

                    <Timeline>
                       { tabNotes &&
                       tabNotes.length>0&&
                       tabNotes.map((note, index) => {
                        return (
                            <Timeline.Item color="black ">
                          
                            <p className="text-gray-800 fs-5 fw-semibold">{note.message}<i>{getCurrentUsers?.name}</i> on {date.toUTCString()}</p>
                        </Timeline.Item>
                        )
                       })
                    }
                      
                       
                        
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
