import React, { useEffect } from "react";
import Axios from "axios";
import { OgioExcelModel } from "../../../../model/ogio/OgioExcelModel";
import {useDispatch, useSelector} from "react-redux"
import {updateNewData} from "../../../../../slice/allProducts/OgioSlice"
import {getOgioProducts} from "../../../../../slice/allProducts/OgioSlice"
  import {LoadingStart,LoadingStop} from "../../../../../slice/loading/LoadingSlice"
import { OgioBasicModel } from "../../../../model/ogio/OgioBrandModel";
import { UpdateOgioProduct } from "../../api/OgioAPI";

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
      updateXlsData.forEach((item:OgioExcelModel, index)=>{

       const data={
        sku:item.SKU,
        brand_id:4,
        name:item.Name,
        description: item.Description,
        mrp: item.MRP,
        gst:item.GST,
        primary_image_url:"",
        gallery_images_url:"",
        product_type:item.ProductType,
        variation_sku:"",
        stock_90:item.Stock90,
        category:item.Category,
        product_model:item.ProductType

       }
       
       
            
      })
    }
  }, [updateXlsData,getOgioProduct]);

  const updateData = async (data:OgioBasicModel,index:number) => {
   

    try {
      const response = await UpdateOgioProduct(data)
      
      if (response.status === 200) {
        console.log(response);
        
      }

      if(index===(updateXlsData.length-1)) {
        alert ("Data is upData successfully")
        dispatch(LoadingStop())
        resetUpdateXs();
      }
    } catch (err) {
      console.log(err);
      alert("Error saving data");
      resetUpdateXs();
    }
  };

  return <></>;
};

export default UploadDB;
