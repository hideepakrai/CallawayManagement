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
        <h4 className='text-secondary mb-2 mx-1 pro-time'>
          <span className='time-title'>HRS</span> <span className='time'>{formatTime(hours)[0]}</span> <span className='time'>{formatTime(hours)[1]}</span> : 
          <span className='time-min'>MIN</span> <span className='time'>{formatTime(minutes)[0]}</span> <span className='time'>{formatTime(minutes)[1]}</span> : 
          <span className='time-sec'>SEC</span> <span className='time'>{formatTime(seconds)[0]}</span> <span className='time'>{formatTime(seconds)[1]}</span>
        </h4>
      </div>
    );
  };

  return (
    <div
      className={clsx('card time-section pt-3 bgi-no-repeat bgi-size-contain', className)}
      style={{
        backgroundColor: bgColor,
        backgroundPosition: 'right',
        // backgroundImage: `url("${toAbsoluteUrl('media/svg/misc/taieri.svg')}")`,
      }}
    >
      <div className='card-body d-flex flex-column justify-content-center text-center'>
        <h4 className='text-white fw-bold mb-0 fs-3'></h4>

        <div className='text-white fw-bold mb-0 pt-1 fs-2 calendar-var mb-3 '>
          <span className='var-title'> DAY </span> <span className='var'>{dayOfWeek}</span>  
        </div>

        <h2 className='text-white time-date'>
          <div className='text-white mb-5 time-date mt-5 pt-2 d-flex'>
            <div className='date-calendar pt-2'>
              <span className='month-title'>MONTH </span> <span className='date'>{month}</span> :   
            </div>
            <div className='date-calendar pt-0'>
              <span className='day-title'>DAY</span> <span className='calendar-day'>{day[0]}</span> <span className='calendar-day'>{day[1]}</span> :  
            </div>
            <div className='date-calendar pt-2'>  
              <span className='year-title'>YEAR</span> 
              <span className='date'>{year[0]}</span> <span className='date'>{year[1]}</span> <span className='date'>{year[2]}</span> <span className='date'>{year[3]}</span> 
            </div>
          </div>
        </h2>
        <Timer />
      </div>
    </div>
  );
};

export { TilesWidget2 };
