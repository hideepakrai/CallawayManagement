import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import "./TilesWidget2.css";
import { Link } from 'react-router-dom';

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

  // Format the time
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${hours < 12 ? 'AM' : 'PM'}`;

  return (
    <div
      className={clsx('card time-section bgi-no-repeat bgi-size-contain', className)}
      style={{
        backgroundColor: bgColor,
        backgroundPosition: 'right',
        // backgroundImage: `url("${toAbsoluteUrl('media/svg/misc/taieri.svg')}")`,
      }}
    >
      <div className='card-body d-flex flex-column justify-content-center text-center'>
        <h4 className='text-white fw-bold mb-6 fs-3'>{dayOfWeek}</h4>
        <h2 className='text-white mb-7 time-date'>{formattedTime}</h2>
      </div>
    </div>
  );
};

export { TilesWidget2 };
