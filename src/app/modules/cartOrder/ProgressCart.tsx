import React, { useState } from 'react';
import { Steps, Popover, Button } from 'antd';
import type { StepsProps } from 'antd';

const ProgressCart: React.FC = () => {
    const [current, setCurrent] = useState(0);

    const onChange = (value: number) => {
        console.log('onChange:', value);
        setCurrent(value);
    };

    const customDot: StepsProps['progressDot'] = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    step {index + 1} status: {status}
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

    return (
        <>
            <Steps current={1}

                labelPlacement="vertical"
            >
                <Steps.Step
                    title={
                        <>
                             <span className='step'>Step 1</span>
                            <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '
                            >     <i style={{ paddingRight: '6px', verticalAlign: 'initial' }} className="bi bi-clipboard2-check"></i> 
                           Check Live Availability 
                             </Button>
                        
                        </>
                    }
                    description={description1}
                />

                <Steps.Step
                    title={
                        <>
                            Step 2
                          
                            <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '
                            >      <i style={{ paddingRight: '6px', verticalAlign: 'initial' }} className="bi bi-file-earmark-text travis-icon"></i>
                             Submit Order
                             </Button>
                        </>
                    }
                    description={description2}
                />
                <Steps.Step
                    title={
                        <>
                            Step 3
                            <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '
                            >        <i style={{ paddingRight: '6px', verticalAlign: 'inherit' }} className="bi bi-bag-check travis-icon"></i>
                           Approve Order
                             </Button>
                             <Button className=' btn   px-6 p-0   mx-3    fs-5'
                            >        <i style={{ paddingRight: '6px', verticalAlign: 'inherit' }} className="bi bi-bag-x travis-icon"></i>
                            Reject Order
                             </Button>
                        
                            
                        </>
                    }
            
                 
                />
                <Steps.Step
                    title={
                        <>
                            Step 4
                            

                            <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '
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
