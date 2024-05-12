import React, { useEffect } from "react";
import Axios from "axios";
import { OgioExcelModel ,UploadOgioExcel} from "../../../../model/ogio/OgioExcelModel";
import {useDispatch} from "react-redux"
import {updateNewData} from "../../../../../slice/allProducts/TravisMethewSlice"
import {getOgioProducts, updateData} from "../../../../../slice/allProducts/OgioSlice"
import { useSelector } from "react-redux";
import {OgioUploadDataModel,OgioBasicModel} from "../../../../model/ogio/OgioBrandModel"
import { LoadingStart, LoadingStop } from "../../../../../slice/loading/LoadingSlice";
import { AddOgioProduct, UpdateOgioProduct } from "../../api/OgioAPI";


const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL;
type Props = {
  xlData: OgioBasicModel[];
  resetXls: () => void;
};

 const OgioExcelUploadDB: React.FC<Props> = ({ xlData, resetXls }) => {
 
    const dispatch= useDispatch()
     const getOgioProduct= useSelector(getOgioProducts)
    useEffect(() => {
      if (xlData && xlData.length > 0 &&
        
          getOgioProduct && getOgioProduct.length > 0
      ) {
        console.log(xlData);
        dispatch(LoadingStart())
         // eslint-disable-next-line no-debugger
         debugger
         dispatch(updateData({
          ogioProduct:xlData
         }));
        const newData: OgioBasicModel[] = [];
        xlData.forEach((item:OgioBasicModel, index)=>{
          const ogioIndex= getOgioProduct.findIndex(ogio=>ogio.sku===item.sku);
          const reduxprd=getOgioProduct[ogioIndex]
          console.log(ogioIndex)
          if(ogioIndex!=-1){
            
            const data={
              sku:item.sku,
              brand_id:4,
              name:item.name!=undefined?item.name:reduxprd.name,
              description: item.description!=undefined?item.description:reduxprd.description,
              mrp: item.mrp!=undefined?item.mrp:reduxprd.mrp,
              gst:item.gst!=undefined?item.gst:reduxprd.gst,
              primary_image_url:"",
              gallery_images_url:"",
              product_type:item.product_type!=undefined?item.product_type:reduxprd.product_type,
              variation_sku:"",
              stock_90:item.stock_90!=undefined?item.stock_90:reduxprd.stock_90,
              category:item.category!=undefined?item.category:reduxprd.category,
              product_model:item.product_model!=undefined?item.product_model:reduxprd.product_model
      
             }
             

             updateNewData(data,index)
             
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
             addOgioData(data, index)
          }
   
  
        
         
         
              
        })
      }
    }, [xlData,getOgioProduct]);
  
    const updateNewData = async (data:OgioBasicModel,index:number) => {
     
  
      try {
        const response = await UpdateOgioProduct(data)
        
        if (response.status === 200) {
          console.log(response);
          
        }
  
        if(index===(xlData.length-1)) {
          alert ("Data is upData successfully")
          dispatch(LoadingStop())
          resetXls();
        }
      } catch (err) {
        console.log(err);
        alert("Error saving data");
        resetXls();
        dispatch(LoadingStop())
      }
    };
    const addOgioData = async (data:OgioBasicModel,index:number) => {
     
  
      try {
        const response = await AddOgioProduct(data)
        
        if (response.status === 200) {
          console.log(response);
          
        }
  
        if(index===(xlData.length-1)) {
          alert ("Data is upData successfully")
          dispatch(LoadingStop())
          resetXls();
        }
      } catch (err) {
        console.log(err);
        alert("Error saving data");
        resetXls();
        dispatch(LoadingStop())
      }
    };
  
    return <></>;
  };

 

export default OgioExcelUploadDB;
