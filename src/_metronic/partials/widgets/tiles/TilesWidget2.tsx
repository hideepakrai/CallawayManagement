import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import './TilesWidget2.css';
import { Link } from 'react-router-dom';

import { Space } from 'antd';

type Props = {
  className?: string;
  bgColor?: string;
  title?: string;
  title2?: string;
};

const TilesWidget2 = ({
  className,
  bgColor = '#000000',
  title = 'Create SaaS 1',
  title2 = 'Based Reports',
}: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get the current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[currentTime.getDay()];
  
  // Get the current month, day, and year
  const month = currentTime.toLocaleString('default', { month: 'long' });
  const day = currentTime.getDate().toString().padStart(2, '0');
  const year = currentTime.getFullYear().toString();
  
  // Timer component definition
  const Timer = () => {
    const [time, setTime] = React.useState(new Date());
  
    React.useEffect(() => {
      const timerInterval = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return () => clearInterval(timerInterval);
    }, []);
  
    const formatTime = (unit: number) => unit.toString().padStart(2, '0');
    
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
  
    return (
      <div className='d-flex mt-3 text-center calendar'>
        <h4 className='text-secondary mb-1 mx-1 pro-time digital-font'>
          <span className='time-title'>HRS</span> <span className='time'>{formatTime(hours)[0]}</span> <span className='time'>{formatTime(hours)[1]}</span> : 
          <span className='time-min'>MIN</span> <span className='time'>{formatTime(minutes)[0]}</span> <span className='time'>{formatTime(minutes)[1]}</span> : 
          <span className='time-sec'>SEC</span> <span className='time'>{formatTime(seconds)[0]}</span> <span className='time'>{formatTime(seconds)[1]}</span>
        </h4>
      </div>
    );
  };

  return (
    <div
      className={clsx('card time-section pt-2 bgi-no-repeat bgi-size-contain', className)}
      style={{
        backgroundColor: bgColor,
        backgroundPosition: 'right',
        // backgroundImage: `url("${toAbsoluteUrl('media/svg/misc/taieri.svg')}")`,
      }}
    >
      <div className='card-body d-flex flex-column justify-content-center text-center'>
      

        <div className='text-white fw-bold mb-0 pt-0 fs-1 calendar-var mb-3 '>
           
           <h4 className='text-white fw-bold mb-0 fs-1 day-cart'> {dayOfWeek}</h4>
        </div>

        <h2 className='text-white time-date'>
          <div className='text-white mb-6 time-date mt-3 pt-2'>
         
              <span className='date digital-font'>0</span><span className='date digital-font'>5</span> : <span className='calendar-day digital-font'>{day[0]}</span><span className='calendar-day digital-font'>{day[1]}</span> : <span className='date digital-font'>{year[0]}</span><span className='date digital-font'>{year[1]}</span><span className='date digital-font'>{year[2]}</span><span className='date digital-font'>{year[3]}</span> 

          </div>
        </h2>
        <Timer />
      </div>
    </div>
  );
};

export { TilesWidget2 };
