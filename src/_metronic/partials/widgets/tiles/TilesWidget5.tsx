
import clsx from 'clsx'
import {KTIcon} from '../../../helpers'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getApparelProducts } from '../../../../app/slice/allProducts/CallawayApparelSlice'
import "./TilesWidget5.css"
type Props = {
  className?: string
  svgIcon?: string
  titleClass?: string
  descriptionClass?: string
  iconClass?: string
  title?: string
  description?: string
}
const TilesWidget5 = (props: Props) => {


  const getApparelProduct= useSelector(getApparelProducts)
  const {className, svgIcon, titleClass, descriptionClass, iconClass, title, description} = props
  return (
    <Link className ={clsx('card cart-brand-section', className)} to={"/brand/callaway/apparel" }>

      <div className='card-body d-flex flex-column justify-content-between '>


        <img width={30} src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/icon_callway_f25555115b.png'></img>
        <div className='d-flex flex-column'>
          <div className={clsx(titleClass, 'fw-bold fs-1 mb-0 mt-5')}>{getApparelProduct.length}</div>
          <div className={clsx(descriptionClass, 'fw-semibold fs-6')}>Callaway Apparel</div>
        </div>
      </div>

    </Link>
             
  )
}

export {TilesWidget5}

