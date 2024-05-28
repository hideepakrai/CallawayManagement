
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'antd';
import { list } from 'aws-amplify/storage';
import { useSelector, useDispatch } from 'react-redux';
import { getOgioProducts } from '../../slice/allProducts/OgioSlice';
import { OgioBasicModel } from '../../modules/model/ogio/OgioBrandModel';
const OgioImage = () => {
  const dispatch= useDispatch()
  const renderedProductsRef = useRef<Set<string>>(new Set());
  
  const getOgioProduct= useSelector(getOgioProducts);
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const s3_url = "https://callaways3bucketd3cd9-dev.s3.ap-south-1.amazonaws.com/";
  
  useEffect(()=>{
    if(getOgioProduct && getOgioProduct.length > 0) {
        getOgioProduct.map((record) => {
          if ( record.sku &&!renderedProductsRef.current.has(record.sku)) {
            renderedProductsRef.current.add(record.sku);
          renderImage(record)
          }
        })
      }
      //renderImage(record)
    }
  ,[getOgioProduct])


  const renderImage=(record:OgioBasicModel)=>{
     
    let newSKU
  
  
    if (record &&record?.sku ) {
      const removeLastUnderscore = (str: string) => {
        const lastUnderscoreIndex = str.lastIndexOf('_');
        if (lastUnderscoreIndex !== -1) {
          return str.substring(0, lastUnderscoreIndex);
        }
        return str;
      };
      newSKU = removeLastUnderscore(record?.sku);
      const folderPath = 'https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/productimg/TRAVIS-Images/';
     //checkFolderExists(newSKU,record.sku)
    }
  
  }
  

  return (
    <div>OgioImage</div>
  )
}

export default OgioImage