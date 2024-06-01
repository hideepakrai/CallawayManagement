
import clsx from 'clsx'
import {KTIcon} from '../../../helpers'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getTravisProducts } from '../../../../app/slice/allProducts/TravisMethewSlice'
import {Link} from 'react-router-dom'
type Props = {
  className?: string
  svgIcon?: string
  titleClass?: string
  descriptionClass?: string
  iconClass?: string
  title?: string
  description?: string
}
const TilesWidget8 = (props: Props) => {
  
  const {className, svgIcon, titleClass, descriptionClass, iconClass, title, description} = props
  const getTravisProduct= useSelector(getTravisProducts)
  const [travisQuantity,setTravisQuantity]= useState<number>()

  useEffect(()=>{
    if(getTravisProduct){
      setTravisQuantity(getTravisProduct.length)
    }
  },[getTravisProduct])
  return (
   
      <Link className ={clsx('card cart-brand-section', className)} to={"/brand/travis-methew"}>
      <div className='card-body d-flex flex-column justify-content-between'>
      {/* <KTIcon iconName={svgIcon || ''} className={clsx(iconClass, 'fs-2hx ms-n1 flex-grow-1')} /> */}
       <img width={30} src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/tm_thum_23fdeb8c29.png'></img>
        <div className='d-flex flex-column'>
          <div className={clsx(titleClass, 'fw-bold fs-1 mb-0 mt-5')}>{travisQuantity}</div>
          <div className={clsx(descriptionClass, 'fw-semibold fs-6')}> 
        Travis Mathew</div>
        </div>
      </div>
    </Link>
  )
}

export {TilesWidget8}