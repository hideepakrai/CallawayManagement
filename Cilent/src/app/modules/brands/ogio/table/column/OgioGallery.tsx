import React, { useEffect, useState } from 'react';
import {BasicModelTravis,BasicModelTravisGraph,ImageType} from "../../../../model/travis/TravisMethewModel"
import { Image } from 'antd';
import {getAllBrands} from "../../../../../slice/brand/BrandSlice"
import { useSelector } from 'react-redux';
import {BrandModel} from "../../../../model/brand/AllBrands"
type Props = {
    value:ImageType
}


const OgioGallery = ({ value }:Props) => {

   const getAllBrand = useSelector(getAllBrands) as BrandModel[]
  const[imagePath, setImagePath]= useState<string |undefined>("")
   useEffect(()=>{
    if(getAllBrand &&
      getAllBrand.length>0
    ){
     
      const image:BrandModel[]=getAllBrand.filter(brand => brand.attributes?.Name==="Ogio");
     if(image && image.length>0)
      setImagePath(image[0].attributes?.Logo?.data.attributes?.formats?.thumbnail?.url)
     //  console.log("image: " + image[0].attributes?.Logo?.data.attributes?.formats?.thumbnail?.url);
    }
   },[getAllBrand])
  
  if (value && value.data &&
    value?.data[0]?.attributes &&
    value?.data[0]?.attributes?.formats &&
    value?.data[0]?.attributes?.formats?.medium &&
    value?.data[0]?.attributes?.formats?.medium?.url
    
) {
    const mediumUrls = [
        value?.data[0]?.attributes?.formats?.medium?.url,
        value?.data[1]?.attributes?.formats?.medium?.url,
        value?.data[2]?.attributes?.formats?.medium?.url
      ].filter(Boolean);
      const previewItems = mediumUrls.map((url) => `https://admin.callawayindiaoms.com${url}`);
    return (
        <span>
          <Image.PreviewGroup
            items={previewItems}
          >
           {value &&
           value?.data[0]&&
           value?.data[0]?.attributes &&
           value?.data[0]?.attributes?.formats &&
           value?.data[0]?.attributes?.formats?.medium &&
           value?.data[0]?.attributes?.formats?.medium?.url &&
            <Image
              src={`https://admin.callawayindiaoms.com${value.data[0].attributes.formats.medium.url}`}
              alt="Primary Image"
              style={{ maxWidth: "50px", marginRight: "5px" }}
              width={30}
            />}
          </Image.PreviewGroup>
        </span>
      );
  } else {
    
     
          return(
            <span>
           {imagePath &&   <img
                src={`https://admin.callawayindiaoms.com${imagePath}`}
                alt="Primary Image"
                style={{ maxWidth: "30px", marginRight: "5px" }}
                width={30}
              />}
            </span>
          )
      
    }
    
  }


export default OgioGallery;
