import React, { useEffect, useState } from 'react';
import { Steps, Popover, Button,Tooltip } from 'antd';
import type { StepsProps } from 'antd';
import { getTravisProgressStep } from '../../slice/allProducts/TravisMethewSlice';
import { getOgioProgressStep } from '../../slice/allProducts/OgioSlice';
import { getHardGoodsProgress } from '../../slice/allProducts/CallAwayGoodsSlice';



import { useSelector } from 'react-redux';
import "./ProgressCart.css";
import Note from './Note';
import { getActiveOrdertab } from '../../slice/activeTabsSlice/ActiveTabSlice';
import { getCurrentUser } from '../../slice/UserSlice/UserSlice';

type Props = {
    checkAvailability: () => void;
    submitorder: () => void;
    approveOrder: () => void;
    rejectedOrder: () => void;
    completedOrder: () => void;
    note: () => void;
    resetAvailable: () => void;
};

const ProgressCart = ({ checkAvailability, submitorder, approveOrder, rejectedOrder, completedOrder, note, resetAvailable }: Props) => {
    const [current, setCurrent] = useState(0);
    const [currentOgio, setCurrentOgio] = useState(0);
    const [currentTravis, setCurrentTravis] = useState(0);
    const [currentHardGoods, setCurrentHardGoods] = useState(0);

    const [role, setRole] = useState<string>("");

     const getCurrentUsers= useSelector(getCurrentUser)
   
     useEffect(()=>{
        if(getCurrentUsers && getCurrentUsers.role){
            setRole(getCurrentUsers.role)
        }
     },[getCurrentUsers])
    const onChange = (value: number) => {
        setCurrent(value);
    };


    const getActiveOrdertabs = useSelector(getActiveOrdertab)
    const getPregressStepstravis = useSelector(getTravisProgressStep);
    const getPregressStepsogio = useSelector(getOgioProgressStep);
    const getPregressStepshard = useSelector(getHardGoodsProgress);


    useEffect(()=>{
        setCurrent(0)
        if(getActiveOrdertabs==="Travis" &&getPregressStepstravis){
            setCurrent(getPregressStepstravis);
            console.log("getPregressStepstravis",getPregressStepstravis)
            console.log("role",role)
           // setCurrentTravis(getPregressStepstravis);
            
        } else if (getActiveOrdertabs==="Ogio" &&getPregressStepsogio){
            setCurrent(getPregressStepsogio)
        } 
         else if (getActiveOrdertabs==="hardgoods" &&getPregressStepshard){
            setCurrent(getPregressStepshard)
        }
        

    },[getActiveOrdertabs,getPregressStepstravis,getPregressStepsogio,getPregressStepshard])
  

    const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    step {index} status: {status}
                </span>
            }
        >
            {dot}
        </Popover>
    );

    const description1 = 'Add Note';
    const description2 = 'Pending / Done';
    const description3 = 'Reject Order';
    const description4 = 'Payment Done / Pending';

    const handelCheckAvailability = () => {
        checkAvailability();
    };

    const handleSubmit = () => {
        submitorder();
    };

    const handleApproveOrder = () => {
        approveOrder();
    };

    const handleRejectedOrder = () => {
        rejectedOrder();
    };

    const handleCompletedOrder = () => {
        completedOrder();
    };

    const handleNote = () => {
        note();
    };

    const handleResetAvailability = () => {
        resetAvailable();
    };


    return (
        <>
            <Steps 
            current={current} 
            labelPlacement="vertical">
                <Steps.Step
                    className="progress-step"
                    title={
                        <>
                            <span className="step">Step 1</span>
                            <Tooltip title="First check the availability of product quantity">
                            <Button
                                className="btn px-6 p-0 btn-travis mx-3 hover-elevate-up"
                                onClick={handelCheckAvailability}
                                disabled={current !== 0}
                            >
                                <i style={{ paddingRight: '6px', verticalAlign: 'initial' }} className="bi bi-clipboard2-check"></i>
                                Check Live Availability
                            </Button>
                            </Tooltip>

                            <span className="note-title note-icon">
                                {current === 0 ? (
                                    <a onClick={handleNote} className="note-model">
                                        <i className="bi bi-pencil-square"></i> Add a note
                                    </a>
                                ) : (
                                    <span className="disabled-note">
                                        <i className="bi bi-pencil-square"></i> Add a note
                                    </span>
                                )}
                            </span>
                        </>
                    }
                />

                <Steps.Step
                    className="progress-step"
                    title={
                        <>
                            Step 2
                           < Tooltip title="Please submit order for further approval">
                            <Button
                                className="btn px-6 p-0 btn-travis mx-3 hover-elevate-up"
                                onClick={handleSubmit}
                                disabled={current !== 1}
                            >
                                <i style={{ paddingRight: '6px', verticalAlign: 'initial' }} className="bi bi-file-earmark-text travis-icon"></i>
                                Submit Order
                            </Button>
                            </Tooltip>
                           
                        </>
                    }
                    description={description2}
                />

                <Steps.Step
                    className="progress-step"
                    title={
                        <>
                            Step 3
                            < Tooltip title="Your order will approved by manager">
                           {role !== "Retailer"? (<Button
                                className="btn px-6 p-0 btn-travis mx-3 hover-elevate-up"
                                onClick={handleApproveOrder}
                                disabled={current !== 2 }
                            >
                                <i style={{ paddingRight: '6px', verticalAlign: 'inherit' }} className="bi bi-bag-check travis-icon"></i>
                                Approve Order
                            </Button>):(
                                <Button className="btn px-6 p-0 btn-travis mx-3 hover-elevate-up"
                                onClick={handleApproveOrder}
                                disabled={current !== 5 }
                            >
                                <i style={{ paddingRight: '6px', verticalAlign: 'inherit' }} className="bi bi-bag-check travis-icon"></i>
                                Approve Order

                                </Button>
                            )}
                            </Tooltip>
                            <span className="note-title">
                            {role !== "Retailer" ? (
                                current === 2 ? (
                                    <a onClick={handleRejectedOrder} className="note-model">
                                        <i className="bi bi-bag-x"></i> Reject Order
                                    </a>
                                ) : (
                                    <span className="disabled-note">
                                        <i className="bi bi-bag-x"></i> Reject Order
                                    </span>
                                )
                            ) : (
                                <span className="disabled-note">
                                    <i className="bi bi-bag-x"></i> Reject Order
                                </span>
                            )}
                            </span>

                           
                        </>
                    }
                />

                <Steps.Step
                    className="progress-step"
                    title={
                        <>
                            Step 4
                            <Button
                                className="btn px-6 p-0 btn-travis mx-3 hover-elevate-up"
                                onClick={handleCompletedOrder}
                                disabled={current !== 3}
                            >
                                <i style={{ paddingRight: '6px', verticalAlign: 'inherit' }} className="bi bi-cart-check travis-icon"></i>
                                Complete Order
                            </Button>
                          
                        </>
                    }
                    description={description4}
                />
            </Steps>
        </>
    );
};

export default ProgressCart;
