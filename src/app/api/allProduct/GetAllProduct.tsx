import React ,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getUserAccount,getAdminToken} from "../../slice/UserSlice/UserSlice"

import OgioProduct from './ogio/OgioProduct'
import TravisMethewProduct  from "../allProduct/travismethew/GetTravisMethewProduct.tsx"
import GetCallawayGoodsProduct  from "../allProduct/callaway/goods/GetCallAWayGoods.tsx"
import {LoadingStart,LoadingStop} from "../../slice/loading/LoadingSlice.tsx"

import GetAllRetailers from '../retailers/GetRetailerInfo.tsx'
import {getTravisProducts} from "../../slice/allProducts/TravisMethewSlice.tsx"

import {getTravisStartLoading,stopTravisLoading} from "../../slice/allProducts/TravisMethewSlice.tsx"
import GetAllBrands from '../brands/GetAllBrands.tsx';
import {getOgioProducts} from "../../slice/allProducts/OgioSlice.tsx"

import  GetAllApparelProducts from "../allProduct/callaway/appreal/GetAllApparelProducts.tsx"

interface UserAccount {
  attributes: {
    username: string;
    email: string;
    role:[],
    provider: string;
    Details:[]
    // Add other properties here
  }
 
}

const GetAllProduct = () => {

  const dispatch = useDispatch();
  const getUserAccounts = useSelector(getUserAccount) as UserAccount[];
  const getAdminTokens=useSelector(getAdminToken)
  const [isOgio, setIsOgio] = useState<boolean>(false)
  const [isRefetch, setIsRetech] = useState<boolean>(false)
  const [isTravis, setIsTravis] = useState<boolean>(false)
  const [isGoods, setIsGoods  ] = useState<boolean>(false)
  const [isApparel, setIsApparel ] = useState<boolean>(false)
  const [isRetailers, setIsetailers  ] = useState<boolean>(false)
  const [isBrands, setIsBrands  ] = useState<boolean>(false)
  
  
  // reload travis mathew
  const getTravisProduct= useSelector(getTravisProducts)
  
  
  useEffect(()=>{
if(getTravisProduct && getTravisProduct.length === 0)
{
  setIsTravis(true)
}else{
  setIsTravis(false)
}
  },[getTravisProduct])


  // reload ogio Product
  const getOgioProduct= useSelector(getOgioProducts)

  //  useEffect(()=>{
  //   if(getOgioProduct && getOgioProduct.length===0){
  //     setIsOgio(true)
  //     setIsRetech(false)
  //   } else{
  //     setIsOgio(false)
     
  //   }
  //  },[getOgioProduct])

  // useEffect(() => {
  //   // get_allProducts(getAdminTokens)
  //    setIsOgio(true)
  //    setIsTravis(true)
  //    setIsGoods(true)
  //    setIsetailers(true)
  //    setIsBrands(true)
  //    setIsApparel(true)
    
  // }, []);

/// if the travis array is empty start query
// const getTravisStartLoadings= useSelector(getTravisStartLoading);
// useEffect(()=>{
//   if(getTravisStartLoadings){
//     setIsTravis(true)
//   }
// },[getTravisStartLoadings])


  const handleOgio=()=>{
    setIsOgio(false)
    setIsGoods(true)

  }

  const handleResetTravis=()=>{
    setIsTravis(false)
    setIsOgio(true)
    // dispatch(stopTravisLoading())

    
  }

  const handleResetGoods=()=>{
    setIsGoods(false)
    setIsApparel(true)
  }

  const handleResetRetailer=()=>{
    setIsetailers(false)
  }


  const handleResetBrands=()=>{
    setIsBrands(false)
  }

  
  const handleResetApparel=()=>{
    setIsApparel(false)
  }
  return (
    <div>

      {<OgioProduct
      resetOgio={handleOgio}
      isRefetch={isRefetch}
      />}

      {isTravis &&<TravisMethewProduct
      resetTravis={handleResetTravis}
      
      /> }

      {isGoods && <GetCallawayGoodsProduct
      resetGoods={handleResetGoods}
      />}

    {isApparel &&
      <GetAllApparelProducts
      resetApparel={handleResetApparel}
      />
    }


     { isBrands &&<GetAllBrands
     resetBrands={handleResetBrands}
     />}
    </div>
  )
}

export default GetAllProduct