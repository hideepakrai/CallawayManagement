
import clsx from 'clsx'
import {KTIcon} from '../../../helpers'
import { getOgioProducts } from '../../../../app/slice/allProducts/OgioSlice'
import { useSelector } from 'react-redux'
import { useState , useEffect} from 'react'
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
const TilesWidget7 = (props: Props) => {
  
  const {className, svgIcon, titleClass, descriptionClass, iconClass, title, description} = props

  const getOgioProduct= useSelector(getOgioProducts)
  const [ogioQuantity,setOgioQuantity]= useState<number>()

  useEffect(()=>{
    if(getOgioProduct){
      setOgioQuantity(getOgioProduct.length)
    }
  },[getOgioProduct])
  return (
    <Link className ={clsx('card cart-brand-section', className)} to={"/brand/ogio" }>      
      <div className='card-body d-flex flex-column justify-content-between'>
       
        <img width={30} src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/ogio_favicon_ac591c347e_8de0fee6f4.png'></img>
        <div className='d-flex flex-column'>
          <div className={clsx(titleClass, 'fw-bold fs-1 mb-0 mt-5')}>{ogioQuantity}</div>
          <div className={clsx(descriptionClass, 'fw-semibold fs-6')}>Ogio</div>
        </div>
      </div>

    </Link>

  )
}

export {TilesWidget7}
