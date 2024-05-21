import clsx from 'clsx'
import { toAbsoluteUrl } from '../../../helpers'
import "./TilesWidget2.css";
import { Link } from 'react-router-dom'

type Props = {
  className?: string
  bgColor?: string
  title?: string
  title2?: string
}

const TilesWidget2 = ({
  className,
  bgColor = '#202020',
  title = 'Create SaaS 1',
  title2 = 'Based Reports',
}: Props) => {
  const currentDate = new Date();
  
  // Get the current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  
  // Get the current month and day
  const month = currentDate.toLocaleString('default', { month: 'short' });
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  
  // Format the time
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${hours < 12 ? 'AM' : 'PM'}`;

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
        <h2 className='text-white mb-7 time-date'>
          {month} <span className='date text-secondary'>{day}</span>, {year}
        </h2>

        <div className='d-flex text-center calendar'>
          <i className="bi bi-table fs-1 text-white mt-3"></i>
          <h4 className='text-secondary mb-2 mx-1 pro-time'>{formattedTime}</h4>
          <i className="bi bi-clock fs-1 text-secondary mt-3"></i>
        </div>
      </div>
    </div>
  )
}

export { TilesWidget2 }
