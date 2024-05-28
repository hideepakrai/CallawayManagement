import React, { useEffect, useState } from 'react';
import { Steps, Popover, Button } from 'antd';
import type { StepsProps } from 'antd';
import { getPregressStep } from '../../slice/allProducts/TravisMethewSlice';
import { useSelector } from 'react-redux';
import "./ProgressCart.css";
import Note from './Note';

type Props = {

    checkAvailability: () => void
    submitorder: () => void
    approveOrder: () => void
    rejectedOrder: () => void
    completedOrder: () => void
    note: () => void
}
const ProgressCart = ({ checkAvailability, submitorder, approveOrder, rejectedOrder, completedOrder,note }: Props) => {
    const [current, setCurrent] = useState(0);

    const onChange = (value: number) => {
        setCurrent(value);
    };

    const getPregressSteps = useSelector(getPregressStep)
    // update progress step
    useEffect(() => {
        if (getPregressSteps) {
            setCurrent(getPregressSteps)
        }
    }, [getPregressSteps])


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

    const description1 = 'Pending/Completed';
    const description2 = 'Pending / Done';
    const description3 = ' Reject Order';
    const description4 = 'Payment Done / Pending';


    const handelCheckAvailability = () => {
        checkAvailability()

    }

    const handleSubmit = () => {
        submitorder()
    }

    const handleApproveOrder = () => {
        approveOrder()
    }

    const handleRejectedOrder = () => {
        rejectedOrder()
    }

    const handleCompletedOrder = () => {
        completedOrder()

    }

    const handleNote=()=>{
       note()
    }
    return (
        <>
            <Steps current={current}

                labelPlacement="vertical"
            >
                <Steps.Step className='progress-step'
                    title={
                        <>
                            <span className='step'>Step 1</span>
                            <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '

                                onClick={handelCheckAvailability}
                                disabled={current !== 0}
                            >     <i style={{ paddingRight: '6px', verticalAlign: 'initial' }} className="bi bi-clipboard2-check"></i>
                                Check Live Availability
                            </Button>
                            <a onClick={handleNote}>Add a note</a>

                        </>
                    }
                     description={description1}
                    
                />

                <Steps.Step className='progress-step'
                    title={
                        <>
                            Step 2
                            <i className="bi bi-pencil-fill"></i>
                            <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '

                                onClick={handleSubmit}
                                disabled={current !== 1}
                            >      <i style={{ paddingRight: '6px', verticalAlign: 'initial' }} className="bi bi-file-earmark-text travis-icon"></i>
                                Submit Order
                            </Button>

                        </>
                    }

                    description={description2}
                />
                <Steps.Step className='progress-step'
                    title={
                        <>
                            Step 3
                            <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '
                                onClick={handleApproveOrder}
                                disabled={current !== 2}
                            >        <i style={{ paddingRight: '6px', verticalAlign: 'inherit' }} className="bi bi-bag-check travis-icon"></i>
                                Approve Order
                            </Button>
                            <Button className=' btn   px-6 p-0   mx-3  fs-5 cancel-order-btn'
                                onClick={handleRejectedOrder}

                                disabled={current !== 2}

                            >        <i style={{ paddingRight: '6px', verticalAlign: 'inherit' }} className="bi bi-bag-x travis-icon"></i>
                                Reject Order
                            </Button>


                        </>
                    }


                />
                <Steps.Step className='progress-step'
                    title={
                        <>
                            Step 4


                            <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '
                                onClick={handleCompletedOrder}
                                disabled={current !== 3}
                            >        <i style={{ paddingRight: '6px', verticalAlign: 'inherit' }} className="bi bi-cart-check travis-icon"></i>
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
