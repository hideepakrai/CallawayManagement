
import clsx from 'clsx'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import "./NoProdect.css"
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
      <div className='card-body d-flex flex-column  ' style={{justifyContent:'space-around'}}>
      <img src='https://admin.callawayindiaoms.com/uploads/image_101_removebg_preview_73aeaa96b4.png' className='w-300px' style={{margin:"0 auto"}}></img>
        <h2 className='text-muted fs-2 fw-light mb-0 '>
          No Prodect Selected
        </h2>

        <div className='mt-12 mb-3'>
          <a
            href='#'
            className='btn btn-dark fw-semibold px-6 py-3'
            data-bs-toggle='modal'
            data-bs-target='#kt_modal_create_app'
          >
           Create Order 
          </a>
        </div>
      </div>
    </div>
  )
}

export {NoProdect}
