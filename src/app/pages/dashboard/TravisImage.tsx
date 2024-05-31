import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'antd';
import { list } from 'aws-amplify/storage';

import { useSelector, useDispatch } from 'react-redux';
import { getTravisFamily, getTravisProducts, stopUploadTravisImage, updatePrimarySeondaryImage } from '../../slice/allProducts/TravisMethewSlice';
import { BasicModelTravis } from '../../modules/model/travis/TravisMethewModel';
import { UploadImageModel } from '../../modules/model/uploadImage/UploadImageModel';
import { NoTravisImages, UpDateTravisImages } from '../../modules/brands/travisMethew/api/UpdateProductData';
import { LoadingStop } from '../../slice/loading/LoadingSlice';

const TravisImage = () => {
  console.log("I am here in travis images")
  const dispatch = useDispatch()
  const renderedProductsRef = useRef<Set<string>>(new Set());
  const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)

  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const s3_url = "https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/";


  const getTravisFamilys = useSelector(getTravisFamily)
  // useEffect(()=>{
  //     if(getProduct && getProduct.length > 0) {
  //         getProduct.map((record) => {
  //           if ( record.sku &&!renderedProductsRef.current.has(record.sku)) {
  //             renderedProductsRef.current.add(record.sku);
  //           renderImage(record)
  //           }
  //         })
  //       }
  //       //renderImage(record)
  //     }
  //   ,[getProduct])
  useEffect(() => {
    if (getTravisFamilys && getTravisFamilys.length > 0) {
      getTravisFamilys.map((record, index) => {

        if (record) {
          renderedProductsRef.current.add(record);
          //renderImage(record)
          // console.log("record ------>", record)
          // console.log("index ------>", index)
          checkFolderExists(record, index)
        }
      })
    }
    //renderImage(record)
  }
    , [getTravisFamilys])


  const checkFolderExists = async (bucketName: string, index: number) => {
    // console.log("bucketName ------>", bucketName)
    // console.log("index ------>", index)
    try {
      const result = await list({
        path: 'public/productimg/TRAVIS-Images/',
      });
      // console.log("result ------->", result)
      const folderPath = `public/productimg/TRAVIS-Images/${bucketName}/`;
      // console.log("folderPath ------->", folderPath)
      const folderExists = result.items.some((item) => {
        return item.path.startsWith(folderPath);
      });
      // console.log("folderExists ------->", folderExists)
      if (folderExists) {
        // console.log("folderExists inside if ------->", folderExists)
        const imagePaths = result.items
          .filter((item) => item.path.startsWith(folderPath))
          .map((item) => item.path);
        // console.log("imagePaths ------->", imagePaths)
        if (imagePaths.length > 0) {
          // console.log("imagePaths inside length ------->", imagePaths)
          const primary_image = imagePaths[0];
          // console.log("primary_image ------->", primary_image)
          const newprimary = primary_image.split('/').pop();
          // console.log("primary_image", primary_image)
          // console.log("newPrimaryImage", newprimary)
          // console.log("All images", imagePaths)
          const nesSec: string[] = [];
          imagePaths.map((item: string) => {
            const parts = item.split('/').pop();
            if (parts) {
              nesSec.push(parts)
            }
          })
          // console.log("new secondary image", nesSec)
          if (newprimary && nesSec) {
            const data = {
              family: bucketName,
              primary_image_url: newprimary,
              gallery_images_url: nesSec.toString(),
              has_image: 1
            }
            const response = await UpDateTravisImages(data)
            if (response.status === 200) {
              // console.log("update images", response)
            }
            if (index === getTravisFamilys.length - 1) {
              dispatch(stopUploadTravisImage())
              dispatch(LoadingStop())
            }
          }
        } else {
          console.log(`No images found in folder ${bucketName}.`);
          const data = {
            family: bucketName,
            has_image: 0
          }
          console.log("data ------>", data)
          const response = await NoTravisImages(data)
          if (response.status === 200) {
            console.log("no images update", response)
          }
        }
      } else {
        const data = {
          family: bucketName,
          has_image: 0
        }
        console.log("data1 ------>", data)
        const response = await NoTravisImages(data)
        if (response.status === 200) {
          console.log("no images update", response)
        }
        console.log("no images update", response)
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