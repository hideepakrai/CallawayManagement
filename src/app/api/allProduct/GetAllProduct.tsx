import React ,{useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getUserAccount,getAdminToken} from "../../slice/UserSlice/UserSlice"

import OgioProduct from './ogio/OgioProduct'
import TravisMethewProduct  from "../allProduct/travismethew/GetTravisMethewProduct.tsx"
import GetCallawayGoodsProduct  from "../allProduct/callaway/goods/GetCallAWayGoods.tsx"
import {LoadingStart,LoadingStop} from "../../slice/loading/LoadingSlice.tsx"

import GetAllRetailers from '../retailers/GetAllRetailers.tsx'

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
  const [isTravis, setIsTravis] = useState<boolean>(false)
  const [isGoods, setIsGoods  ] = useState<boolean>(false)
  const [isRetailers, setIsetailers  ] = useState<boolean>(false)
  useEffect(() => {
  
    if(getUserAccounts 
    ){
     console.log("userAccount ")
    // get_allProducts(getAdminTokens)
     setIsOgio(true)
     setIsTravis(true)
     setIsGoods(true)
     setIsetailers(true)
    }
  }, [getUserAccounts]);


  const handleOgio=()=>{
    setIsOgio(false)

  }

  const handleResetTravis=()=>{
    setIsTravis(false)

    
  }

  const handleResetGoods=()=>{
    setIsGoods(false)
  }

  const handleResetRetailer=()=>{
    setIsetailers(false)
  }



  

  return (
    <div>

      {isOgio &&<OgioProduct
      resetOgio={handleOgio}
      />}

      {isTravis &&<TravisMethewProduct
      resetTravis={handleResetTravis}
      /> }

      {isGoods && <GetCallawayGoodsProduct
      resetGoods={handleResetGoods}
      />}

      {<GetAllRetailers
      resetRetailer={handleResetRetailer}
      />}
    </div>
  )
}

export default GetAllProduct