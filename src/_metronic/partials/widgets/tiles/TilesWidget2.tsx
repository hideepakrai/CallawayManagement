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
  const month = currentTime.getMonth() + 1; // months are 0-indexed, add 1 to get 1-12 range
  const monthStr = month.toString().padStart(2, '0'); // Ensure month is two digits
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

    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;

    return (
      <div className='d-flex mt-3 text-center calendar text-secondary '>
        <div className='mb-1 digital-font'>
           {/* <div>
            <span className='time-title'>HRS</span> 
            <span className='time-title'>MIN</span> 
            <span className='time-title'>SEC</span>
          </div> 
          
          <div>
            <span className='time'> {formatTime(hours12)[0]}</span> <span className='time'>{formatTime(hours12)[1]}</span> <span className='dot-time'>:</span> 
            <span className='time'>{formatTime(minutes)[0]}</span> <span className='time'>{formatTime(minutes)[1]}</span> <span className='dot-time'>:</span> 
            <span className='time'>{formatTime(seconds)[0]}</span> <span className='time'>{formatTime(seconds)[1]}</span> <span className='ampm'>{ampm}</span>
          </div> */}
            <span className='time-title'>HRS</span><span className='time'> {formatTime(hours12)[0]}</span> <span className='time'>{formatTime(hours12)[1]}</span> <span className='dot-time'>:</span> 
          <span className='time-min'>MIN</span> <span className='time'>{formatTime(minutes)[0]}</span> <span className='time'>{formatTime(minutes)[1]}</span> <span className='dot-time'>:</span> 
          <span className='time-sec'>SEC</span> <span className='time'>{formatTime(seconds)[0]}</span> <span className='time'>{formatTime(seconds)[1]}</span> <span className='ampm'>{ampm}</span> 

        </div> 
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
      <div className='card-body d-flex flex-column justify-content-center text-center '>
        <div className='text-white fw-bold mb-0 pt-0 fs-1 calendar-var mb-3 '>
           <h4 className='text-white fw-bold mb-0 fs-1 day-cart'> {dayOfWeek}</h4>
        </div>

     

          <div className='text-white mb-3 time-date digital-font mt-0 pt-0 digital-font'>
              <span className='date digital-font'>{monthStr[0]}</span><span className='date digital-font'>{monthStr[1]}</span><span className='dots'>:</span><span className='calendar-day digital-font'>{day[0]}</span><span className='calendar-day digital-font'>{day[1]}</span><span className='dots'>:</span><span className='date digital-font'>{year[0]}</span><span className='date digital-font'>{year[1]}</span><span className='date digital-font'>{year[2]}</span><span className='date digital-font'>{year[3]}</span> 
          </div>

          {/* <div className='DigitalFont'>
              <span className='date-1'>{monthStr[0]}</span><span className='date-1'>{monthStr[1]}</span><span className='date-1'>:</span><span className='date-1'>{day[0]}</span><span className='date-1'>{day[1]}</span><span className='date-1'>:</span><span className='date-1'>{year[0]}</span><span className='date-1'>{year[1]}</span><span className='date-1'>{year[2]}</span><span className='date-1'>{year[3]}</span>
          </div> */}
      
        <Timer />
      </div>
    </div>
  );
};

export { TilesWidget2 };
