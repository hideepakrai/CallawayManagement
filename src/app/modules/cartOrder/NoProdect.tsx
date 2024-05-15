
import clsx from 'clsx'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import "./NoProdect.css"
import { Link } from 'react-router-dom'
type Props = {
  className?: string
  bgColor?: string
  title?: string
  title2?: string
}
const NoProdect = ({
  className,
  bgColor = '#fff',
  title = 'Create SaaS',
  title2 = 'Based Reports',
}: Props) => {
  return (
    <div
      className={clsx('container card no-order-section no-order-image bgi-no-repeat bgi-size-contain ', className)}
      style={{
        backgroundColor: bgColor,
        backgroundPosition: 'right',
        backgroundImage: `url("${toAbsoluteUrl('media/svg/misc/taieri.svg')}")`,
      }}
    >
      <div className='card-body mt-8 mb-6 d-flex flex-column' style={{justifyContent:'space-around'}}>
      <img src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/no_prodect_e1c5895009.png' className='cart-no-product-image' style={{margin:"0 auto"}}></img>
      
        <h2 className='text-muted   fs-2 fw-light mb-0 pt-4'>
        Your cart is empty. Please create an order by selecting the below categories. 
        </h2>

        <div className='mt-15 mb-3 d-flex justify-content-center'>

          <div>
            
          <Link className="btn btn-dark fw-semibold px-6 py-3 mx-3 hover-elevate-up" to="/brand/callaway/apparel">
          <a
          >

            <img src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/callaway_c_bfb3e34faf.png' className=' w-20px brand-icon'></img>
          Callaway Apparel
          </a>
          </Link>

        

          </div>

          <div>

          <Link className="btn btn-dark fw-semibold px-6 py-3 mx-3 hover-elevate-up" to="/brand/callaway/goods">
          <a       
          >
           <img src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/callaway_c_bfb3e34faf.png' className=' w-20px brand-icon'></img>
           Callaway Hardgoods
          </a>
          </Link>

          </div>


          <div>
          <Link className="btn btn-dark fw-semibold px-6 py-3 mx-3 hover-elevate-up" to="/brand/ogio">
          <a
          >
             <img src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/o_1_566cb577f8.png' className=' w-20px brand-icon'></img>
           Ogio 
          </a>

          </Link>
         
          </div>



          <div>
          <Link className="btn btn-dark fw-semibold px-6 py-3 mx-3 hover-elevate-up" to="/brand/travis-methew">
          <a
          >
             <img src='https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/white_tm_15bf456bbc.png' className=' w-20px brand-icon'></img>
          Travis Mathew 
          </a>
          </Link>
        

          </div>


          


          
        </div>
      </div>
    </div>
  )
}

export {NoProdect}
