import React, { useEffect, useState } from 'react'
import { Image } from 'antd';
import { list } from 'aws-amplify/storage';

import { useSelector, useDispatch } from 'react-redux';
import { getTravisProducts, updatePrimarySeondaryImage } from '../../slice/allProducts/TravisMethewSlice';
import { BasicModelTravis } from '../../modules/model/travis/TravisMethewModel';

const TravisImage = () => {
   const dispatch= useDispatch()
    const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)
    
    const [primaryImage, setPrimaryImage] = useState<string | null>(null);
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    const s3_url = "https://callaways3bucketd3cd9-dev.s3.ap-south-1.amazonaws.com/";
  
    useEffect(()=>{
        if(getProduct && getProduct.length > 0) {
            getProduct.map((record) => {
              renderImage(record)
            })
          }
          //renderImage(record)
        }
      ,[getProduct])
    const renderImage=(record:BasicModelTravis)=>{
     
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
       checkFolderExists(newSKU,record.sku)
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
     setPrimaryImage(primary_image)
      //const secondary_image = imagePaths.slice(1);
      setImagePaths(imagePaths)
      dispatch(updatePrimarySeondaryImage({
        sku:sku,
        primaryImage:primary_image,
        secondaryImage:imagePaths
      }))
     
    } else {
    //  console.log(`No images found in folder ${bucketName}.`);
    }
    } else {
   // console.log(`Folder ${bucketName} does not exist.`);
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