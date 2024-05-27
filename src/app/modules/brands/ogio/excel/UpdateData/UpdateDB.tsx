import React, { useEffect } from "react";
import Axios from "axios";
import { OgioExcelModel } from "../../../../model/ogio/OgioExcelModel";
import {useDispatch, useSelector} from "react-redux"

import {getOgioProducts} from "../../../../../slice/allProducts/OgioSlice"
  import {LoadingStart,LoadingStop} from "../../../../../slice/loading/LoadingSlice"
import { OgioBasicModel } from "../../../../model/ogio/OgioBrandModel";
import { AddOgioProduct, UpdateOgioProduct } from "../../api/OgioAPI";

const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL;
type Props = {
    updateXlsData: OgioExcelModel[];
  resetUpdateXs: () => void;
};

const UploadDB: React.FC<Props> = ({ updateXlsData, resetUpdateXs }) => {
  const dispatch= useDispatch()
   const getOgioProduct= useSelector(getOgioProducts)
  useEffect(() => {
    if (updateXlsData && updateXlsData.length > 0 &&
      
        getOgioProduct && getOgioProduct.length > 0
    ) {
      console.log(updateXlsData);
      dispatch(LoadingStart())
       
     
      const newData: OgioExcelModel[] = [];
      updateXlsData.forEach((item:OgioBasicModel, index)=>{
        const ogioIndex= getOgioProduct.findIndex(ogio=>ogio.sku===item.sku);
        console.log(ogioIndex)
        if(ogioIndex!=-1){
          
          const data={
            sku:item.sku,
            brand_id:4,
            name:item.name,
            description: item.description,
            mrp: item.mrp,
            gst:item.gst,
            primary_image_url:"",
            gallery_images_url:"",
            product_type:item.product_type,
            variation_sku:"",
            stock_90:item.stock_90,
            category:item.category,
            product_model:item.product_model
    
           }
          // updateNewData(data,index)
        }else if(ogioIndex==-1){
          const data={
            sku:item.sku,
            brand_id:4,
            name:item.name,
            description: item.description,
            mrp: item.mrp,
            gst:item.gst,
            primary_image_url:"",
            gallery_images_url:"",
            product_type:item.product_type,
            variation_sku:"",
            stock_90:item.stock_90,
            category:item.category,
            product_model:item.product_model
    
           }
          // addOgioData(data, index)
        }
 

      
       
       
            
      })
    }
  }, [updateXlsData,getOgioProduct]);




  return <></>;
};

export default UploadDB;
