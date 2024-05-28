
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'antd';
import { list } from 'aws-amplify/storage';
import { useSelector, useDispatch } from 'react-redux';
import { getOgioProducts, updateOgioImages } from '../../slice/allProducts/OgioSlice';
import { OgioBasicModel } from '../../modules/model/ogio/OgioBrandModel';
const OgioImage = () => {
  const dispatch= useDispatch()
  const renderedProductsRef = useRef<Set<string>>(new Set());
  
  const getOgioProduct= useSelector(getOgioProducts);
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const s3_url = "https://callaways3bucketd3cd9-dev.s3.ap-south-1.amazonaws.com/";
     const heck ="https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/OGIO-Images/5924122OG/5924122OG_L.jpg"
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
      const folderPath = 'https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/productimg/OGIO-Images/';
     
      checkFolderExists(newSKU,record.sku)
    }
  
  }
  const checkFolderExists = async (bucketName: string,sku:string) => {
    try {
       
      const result = await list({
        path: 'public/productimg/OGIO-Images/',
      
      });
   
      const folderPath = `public/productimg/OGIO-Images/${bucketName}/`;
  
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
   setPrimaryImage(primary_image)
   console.log("primary image",primary_image)
    //const secondary_image = imagePaths.slice(1);
    setImagePaths(imagePaths)
    dispatch(updateOgioImages({
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

export default OgioImage