
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
  // #663259
  title = 'Create SaaS 1',
  title2 = 'Based Reports',
}: Props) => {
  return (
    <div
      className={clsx('card time-section bgi-no-repeat bgi-size-contain', className)}
      style={{
        backgroundColor: bgColor,
        backgroundPosition: 'right',
        // backgroundImage: `url("${toAbsoluteUrl('media/svg/misc/taieri.svg')}")`,
      }}
    >



      <div className='card-body d-flex flex-column justify-content-center text-center '>
        <h4 className='text-white fw-bold mb-6 fs-3 '>Monday</h4>

        <h2 className='text-white  mb-7 time-date'>Dec <span className='date   text-secondary'>10</span>, 2024</h2>


        {/* <div className='d-flex'> */}
        <div className='d-flex text-center calendar'>
          <i className="bi bi-table fs-1 text-white mt-3"></i>
          <h4 className=' text-secondary mb-2  mx-1 pro-time'> 10:25 AM</h4>
          <i className="bi bi-clock fs-1 text-secondary mt-3"></i>
        </div>
        {/* </div> */}



        {/* <form >
        <div className="custom-date-picker">
          <input value="2024-05-19" type="date" id="date-prodect" name="date-prodect" />
        </div>

        </form> */}


        {/* <h2 className='text-white fw-bold mb-5'>
          {title} <br /> {title2}{' '}
        </h2> */}

        {/* <div className='m-0'>
          
          <Link className={clsx('btn btn-danger fw-semibold px-6 py-3 ')} to={"/profilepage/managerprofile"}>
          View Order
            </Link>
        </div> */}
      </div>
    </div>
  )
}

export { TilesWidget2 }
