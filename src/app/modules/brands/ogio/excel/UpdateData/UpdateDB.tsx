import React, { useEffect } from "react";
import Axios from "axios";
import { OgioExcelModel } from "../../../../model/ogio/OgioExcelModel";
import {useDispatch, useSelector} from "react-redux"
import {updateNewData} from "../../../../../slice/allProducts/OgioSlice"
import {getOgioProducts} from "../../../../../slice/allProducts/OgioSlice"
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

      const newData: OgioExcelModel[] = [];
      updateXlsData.forEach((item:OgioExcelModel, index)=>{

         const ogioIndex= getOgioProduct.findIndex(ogio=>ogio.SKU===item.SKU);
         if(ogioIndex!=-1){
            const ogioProduct= getOgioProduct[ogioIndex];
            const id= (ogioProduct.id);
            const Stock90= item.Stock90;
            const SalePrice= item.SalePrice;
                if(id &&Stock90 && SalePrice){
                    updateData(id,Stock90,SalePrice,item, index)
                    dispatch(updateNewData({
                      ogioProduct:item
                    }))
                }
            
         }
        
        console.log("excel data, item")
       
       
            
      })
    }
  }, [updateXlsData,getOgioProduct]);

  const updateData = async (id:number,
    stock:number,saleprice:number,
     item:OgioExcelModel,index:number) => {
    const data = {
      data: {
         Name: item.Name,
         Description: item.Description,
         SetType: item.SetType,
         Brand: 3, 
         SKU: item.SKU,
        SalePrice: saleprice,
        AttributeSet: [
            {
              "__component": "attribute-set.ogio",
              Stock90:stock,
              ProductType:item.ProductType,
                Category:item.Category,
             ProductModel:item.ProductModel,
              LifeCycle:item.LifeCycle,
            }]
        
      }
    };

    try {
      const response = await Axios.put(
        `${STRAPI_URL}/api/products/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        resetUpdateXs();
      }

      if(index===(updateXlsData.length-1)) {
        alert ("Data is upData successfully")
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
