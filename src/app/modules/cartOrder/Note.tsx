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
import { addSoftGoodNote, getApparelNote } from '../../slice/allProducts/CallawayApparelSlice';
import { addHardGoodsNote, getHardGoodsNote } from '../../slice/allProducts/CallAwayGoodsSlice';
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
    const getApparelNotes= useSelector(getApparelNote)
    const getHardGoodsNotes= useSelector(getHardGoodsNote)
    const dispatch= useDispatch()

     const getActiveOrdertabs= useSelector(getActiveOrdertab);
     useEffect(()=>{
        console.log("note",getActiveOrdertab)
        setTabNotes([])
        setTab("")
            if(getActiveOrdertabs==='travis' &&
            getTravisNotes &&
            getTravisNotes.length>0
            ){
                setTabNotes(getTravisNotes)
                setTab("travis")
            } else if(getActiveOrdertabs==='ogio'){
                setTabNotes(getOgioNote)
                setTab("ogio")
            }
             else if(getActiveOrdertabs==='softgood'){
                setTabNotes(getApparelNotes)
                setTab("softgood")
            }
             else if(getActiveOrdertabs==='hardgood'){
               setTabNotes(getHardGoodsNotes)
                setTab("hardgood")
            }

     },[getActiveOrdertabs,getTravisNotes,getApparelNotes,getOgioNote,getHardGoodsNotes])
    
      console.log("")
    const onOkHandler = () => {
        const checkNote = addNotes.trim().length > 0;
        
    if(checkNote){
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
      } else if (tab==="ogio"){
        dispatch(addNote({
            note:data2,
        }))
      } else if (tab==="softgood"){
        dispatch(addSoftGoodNote({
            note:data2,
        }))
      } else if (tab==="hardgood"){
        dispatch(addHardGoodsNote({
            note:data2,
        }))
      }
       
        
    }
       

        handleOk();
        setAddNotes(''); // Optionally reset the notes after confirming
       
    };

    
   
    return (
        // <div>
        //     <Modal className='timeline' title="Add Note" open={isModalOpen} onOk={onOkHandler} onCancel={handleCancel}>
        //     <div className='row mt-8'>
        //         <div className='col-7'>

        //             <Timeline>
        //                { tabNotes &&
        //                tabNotes.length>0&&
        //                tabNotes.map((note, index) => {
        //                 return (
        //                     <Timeline.Item color="black ">
                          
        //                     <p className="text-gray-800 fs-5 m-0 fw-bold">{note.message}</p>
        //                     <p className="text-gray-900 fs-6 "><i>{getCurrentUsers?.name}</i> on {date.toUTCString()}</p>
        //                 </Timeline.Item>
        //                 )
        //                })
        //             }
                      
                       
                        
        //             </Timeline>








        //         </div>

        //         <div className='col-5'>
        //             <TextArea
        //                 rows={5}
        //                 placeholder="Note"
        //                 value={addNotes}
        //                 onChange={(e) => setAddNotes(e.target.value)}
        //             />
        //         </div>
        //         </div>
        //     </Modal>
        // </div>

        <div>
        <Modal className='timeline' title="Add Note" open={isModalOpen} onOk={onOkHandler} onCancel={handleCancel}>
            <div className='row mt-8'>
                <div className='col-7'>
                    <Timeline>
                        {tabNotes && tabNotes.length > 0 && tabNotes.map((note, index) => {
                            if (!note.date) {
                                return (
                                    <Timeline.Item color="black" key={index}>
                                        <p className="text-gray-800 fs-5 m-0 fw-bold">{note.message}</p>
                                        <p className="text-gray-900 fs-6">
                                            <i>{getCurrentUsers?.name}</i> on unknown date
                                        </p>
                                    </Timeline.Item>
                                );
                            }
    
                            const date = new Date(note.date);
    
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
                                    <p className="text-gray-800 fs-5 m-0 fw-bold">{note.message}</p>
                                    <p className="text-gray-900 fs-6">
                                        <i>{getCurrentUsers?.name}</i> on {formattedDate}, {formattedTime}
                                    </p>
                                </Timeline.Item>
                            );
                        })}
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
