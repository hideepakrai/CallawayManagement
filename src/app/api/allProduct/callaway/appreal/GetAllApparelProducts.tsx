import React, { useEffect, useState } from 'react';
import { useQuery, useApolloClient } from "@apollo/client";

import { useDispatch } from 'react-redux';
import { GetCallawayApprealProduct } from './CallawayAppreal';
import { addCallawayApparelProduct } from '../../../../slice/allProducts/CallawayApparelSlice';

type Props = {

  resetApparel: () => void
}

const GetAllApparelProducts = ({ resetApparel }: Props) => {

  const dispatch = useDispatch();
  useEffect(() => {
    getAllApparelProduct()
  }, [])


  const getAllApparelProduct = async () => {
    try {
      const response = await GetCallawayApprealProduct();
       console.log("appareal ", response)
       
      if (response ) {

        dispatch(addCallawayApparelProduct({
          apparelProduct: response

        }))
        resetApparel();
      }





    } catch (err) {
      // alert("Error in getting ogio product")
      resetApparel()
    }

  }

  return (
    <div></div>
  )
}

export default GetAllApparelProducts