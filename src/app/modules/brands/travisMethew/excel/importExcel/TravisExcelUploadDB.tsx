import React, { useEffect } from "react";
import Axios from "axios";
import { ExcelModelTravis } from "../../../../model/travis/TravisExcel";
import {useDispatch, useSelector} from "react-redux"
import {updateReduxData} from "../../../../../slice/allProducts/TravisMethewSlice"
import {getTravisProducts} from "../../../../../slice/allProducts/TravisMethewSlice"
import {UpdateTravisProduct,AddNewProduct} from "../../api/UpdateProductData"
import {BasicModelTravis,UpdateTravisModel} from "../../../../model/travis/TravisMethewModel"

const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL;
type Props = {
  xlData: BasicModelTravis[];
  resetXls: () => void;
};



const TravisExcelUploadDB: React.FC<Props> = ({ xlData, resetXls }) => {
  const dispatch= useDispatch()
  const getTravisProduct= useSelector(getTravisProducts)
  useEffect(() => {
    if (xlData && xlData.length > 0) {
      console.log(xlData);

      const newData: BasicModelTravis[] = [];
      xlData.forEach((item:BasicModelTravis, index)=>{
       
        const travisIndex= getTravisProduct.findIndex(travis=>travis.sku===item.sku);
    
        if(travisIndex!==-1 &&getTravisProduct[travisIndex] ){
  const travispr= getTravisProduct[travisIndex];
const id:number= travispr?.id??0;

    const update={       
        name: item.name!==undefined?item.name:travispr.name,
        description: item.description!=undefined?item.description:travispr.description,
         brand_id:3,
         mrp: item.mrp!==undefined?item.mrp:travispr.mrp,
         gst:item.gst!=undefined?item.gst:travispr.gst ,
          style_code:item.style_code!==undefined? item.style_code:travispr.style_code,
            length:item.length!==undefined? item.length:travispr.length,
            category:item.category!==undefined? item.category:travispr.category,
            season:item.season!==undefined?item.season:travispr.season, 
            line:item.line!==undefined? item.line:travispr.line,
            color:item.color!==undefined?item.color:travispr.color,
            color_code:item.color_code!==undefined? item.color_code:travispr.color_code,
            // Size:item.Size?.toString(),
            size:item.size!==undefined? item.size:travispr.size,
            gender:item.gender!==undefined? item.gender:travispr.gender,
            stock_88: item.stock_88!==undefined?item.stock_88:travispr.stock_88, 
             stock_90: item.stock_90!==undefined? item.stock_90:travispr.stock_90,
             variation_sku: item.variation_sku!==undefined? item.variation_sku:travispr.variation_sku,
   
    }
    dispatch(updateReduxData({
      travisProduct:update  
    }))
    updateData(update,id,index)
   

        }else if(travisIndex===-1){
          
          const sdd = {
               
                name: item.name,
                description: item.description,
                brand_id:3,
                sku: item.sku,
                 mrp: item.mrp,
                 gst:item.gst,
               
                    style_code:item.style_code,
                    length:item.length,
                    category:item.category,
                    season:item.season,
                    line:item.line,
                    color:item.color,
                    color_code:item.color_code,
                    size:item.size?.toString(),
                    gender:item.gender,
                    stock_88: item.stock_88,
                     stock_90: item.stock_90,
                     variation_sku:item.variation_sku!=undefined?item.variation_sku:""
              
  
              };
  
              dispatch(updateReduxData({
                travisProduct:sdd  
              }))
              saveData(sdd,index)
              
        }
       
      })
    }
  }, [xlData]);

  const saveData = async (products: BasicModelTravis,index:number) => {
    

    try {
      const response = await AddNewProduct( products);
      if (response.status === 200) {
        console.log("newly upload",response);
        resetXls();
      }

      if(index===xlData.length-1){
        alert ("Data is uploaded successfully")
      
      }
    } catch (err) {
      console.log(err);
      alert("Error saving data");
      resetXls();
    }
  };
  const updateData = async (products:BasicModelTravis , id:number, index:number) => {
   
    try {
      const response = await UpdateTravisProduct( products, id);
      if (response.status === 200) {
        console.log(`update ${id}`,response);
        resetXls();
      }

      if(index===xlData.length-1){
        alert ("Data is uploaded successfully")
      
      }
    } catch (err) {
      console.log(err);
      alert("Error saving data");
      resetXls();
    }
  };



  return <></>;
};

export default TravisExcelUploadDB;
