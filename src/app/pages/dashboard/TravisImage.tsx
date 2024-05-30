import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'antd';
import { list } from 'aws-amplify/storage';

import { useSelector, useDispatch } from 'react-redux';
import { getTravisProducts, updatePrimarySeondaryImage } from '../../slice/allProducts/TravisMethewSlice';
import { BasicModelTravis } from '../../modules/model/travis/TravisMethewModel';

const TravisImage = () => {
   const dispatch= useDispatch()
   const renderedProductsRef = useRef<Set<string>>(new Set());
    const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)
    
    const [primaryImage, setPrimaryImage] = useState<string | null>(null);
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    const s3_url = "https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/";
  
    useEffect(()=>{
        if(getProduct && getProduct.length > 0) {
            getProduct.map((record) => {
              if ( record.sku &&!renderedProductsRef.current.has(record.sku)) {
                renderedProductsRef.current.add(record.sku);
              renderImage(record)
              }
            })
          }
          //renderImage(record)
        }
      ,[getProduct])
    const renderImage=(record:BasicModelTravis)=>{
     
      if (record &&record?.sku  && record.family) {
       
       
        const folderPath = 'https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/productimg/TRAVIS-Images/';
       checkFolderExists( record.family,record.sku)
      }
    
    }
    
    const checkFolderExists = async (bucketName: string,sku:string) => {
      try {
        
        const result = await list({
          path: 'public/productimg/TRAVIS-Images/',
        
        });
     
        const folderPath = `public/productimg/TRAVIS-Images/${bucketName}/`;
    
    const folderExists = result.items.some((item) => {
    return item.path.startsWith(folderPath);
    });
    
    if (folderExists) {
    const imagePaths = result.items
      .filter((item) => item.path.startsWith(folderPath))
      .map((item) => item.path);
     
    if (imagePaths.length > 0) {
     const primary_image = imagePaths[0];
//      const parts = primary_image.split('/');
// const fileName = parts[parts.length - 1];

 console.log("primary_image",primary_image)
 console.log("allImages",imagePaths)
     setPrimaryImage(primary_image)
      //const secondary_image = imagePaths.slice(1);
      setImagePaths(imagePaths)
      dispatch(updatePrimarySeondaryImage({
        sku:sku,
        primaryImage:primary_image,
        secondaryImage:imagePaths
      }))
     
    } else {
   console.log(`No images found in folder ${bucketName}.`);
    }
    } else {
   console.log(`Folder ${bucketName} does not exist.`);
    }
        
      } catch (error) {
      //  console.error('Error checking folder existence:', error);
        return false; // Return false in case of any error
      }
    }
  return (
    <div></div>
  )
}

export default TravisImage