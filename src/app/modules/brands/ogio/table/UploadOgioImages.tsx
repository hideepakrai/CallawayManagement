import React from 'react'
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { getOgioProducts } from '../../../../slice/allProducts/OgioSlice';
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';
import { UpDateOgioImages } from '../api/OgioAPI';


type Props={
    resetOgioImages:()=>void
}
const UploadOgioImages = ({   resetOgioImages}:Props) => {

      
  const getOgioProduct= useSelector(getOgioProducts);
  
  useEffect(()=>{
    const allOgioImges: OgioBasicModel[] = []

    if(getOgioProduct && 
        getOgioProduct.length > 0) {
        getOgioProduct.map((record) => {
            if (record.sku && record.primaryImage && record.secondaryImage) {
                const data = {
                    sku: record.sku,
                    primary_image_url: record.primaryImage,
                    gallery_images_url: record.secondaryImage.toString()

                }
                allOgioImges.push(data)
                console.log("ogio image", data)
            }
        })
      }
      if(allOgioImges && allOgioImges.length>0){
        updateOgioImages(allOgioImges)
      }
   
    }
  ,[getOgioProduct])


  const updateOgioImages=async(allOgioImges:OgioBasicModel[])=>{

     try{
        const response= await UpDateOgioImages(allOgioImges)
        if(response.status==200){
            console.log("updted ogio images successfully")
            resetOgioImages()
        }

     }catch(err){
        console.log(err)
        resetOgioImages()
     }
  }
  return (
    <div>UploadOgioImages</div>
  )
}

export default UploadOgioImages
