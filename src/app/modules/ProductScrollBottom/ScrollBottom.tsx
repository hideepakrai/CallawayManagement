
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
import { Input, Radio, InputNumber, Button } from "antd";
// import { getCurrentUser } from '../../../../slice/UserSlice/UserSlice';
import { getCurrentUser } from '../../../app/slice/UserSlice/UserSlice';
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import "./ScrollBottom.css"
import { DrawerComponent, ScrollTopComponent, StickyComponent, ToggleComponent } from '../../../_metronic/assets/ts/components';
const ScrollBottom = () => {
    const navigate = useNavigate()
    const {pathname} = useLocation()
  const [initialized, setInintialized] = useState(false)

  const pluginsReinitialization = () => {
    setTimeout(() => {
      StickyComponent.reInitialization()
      setTimeout(() => {
        ToggleComponent.reinitialization()
        DrawerComponent.reinitialization()
      }, 70)
    }, 140)
  }

  const scrollTop = () => {
    ScrollTopComponent.goTop()
  }

  const updateHeaderSticky = () => {
    const stickyHeader = document.body.querySelectorAll(`[data-kt-sticky-name="header"]`)
    if (stickyHeader && stickyHeader.length > 0) {
      const sticky = StickyComponent.getInstance(stickyHeader[0] as HTMLElement)
      if (sticky) {
        sticky.update()
      }
    }
  }

  useEffect(() => {
    if (!initialized) {
      setInintialized(true)
    } else {
      pluginsReinitialization()
    }

    updateHeaderSticky()
    setTimeout(() => {
      scrollTop()
    }, 0)
  }, [initialized, pathname])

    const [isQtyImport, setIsQtyImport] = useState(false);
const [isImport, setIsImport] = useState(false);
const [isProduct, setIsProduct] = useState(false);

const getCurrentUsers = useSelector(getCurrentUser)
 
  const handleViewCard = () => {
    navigate("/cart")
  }


  const handleProduct = () => {
    setIsProduct(true);
  };
  const handleCloseProduct = () => {
    setIsProduct(false);
  };


  
  const handleImport = () => {
    setIsImport(true);
  };

  const handleCloseImport = () => {
    setIsImport(false);
  };

  // handle update quantity Data
  const handleQtyImport = () => {
    setIsQtyImport(true);
  };
  const handleCloseQtyImport = () => {
    setIsQtyImport(false);
  };

  return (
    <div id='kt_scrolltop' className='scrolltop scroll-bottom' data-kt-scrolltop='true'>
        <div className='scroll-bar-section'>
  <Button className=' btn   px-6 p-0  btn-travis mx-3 hover-elevate-up  '

onClick={handleViewCard}
> <i className="bi bi-bag fs-3"></i> View Cart</Button>


{getCurrentUsers && getCurrentUsers.role !== "Retailer" && <Button className=' btn  px-6 p-0  btn-travis mx-3 hover-elevate-up '
onClick={handleImport}
> <i className="bi bi-file-earmark-arrow-down fs-3"></i>Import Products</Button>
}


{getCurrentUsers && getCurrentUsers.role !== "Retailer" && <Button className=' btn px-6 p-0  btn-travis mx-3 hover-elevate-up '
onClick={handleQtyImport}
> <i className="bi bi-file-earmark-arrow-up fs-3"></i> Update Qty </Button>}

<Button className=' btn  px-6 p-0  btn-travis mx-3 hover-elevate-up'
onClick={handleProduct}
//  onClick={handleSampleExcel}
> <i className="bi bi-file-earmark-arrow-up fs-3"></i>Export Products </Button>
</div>
      </div>


  )
}

export default ScrollBottom
