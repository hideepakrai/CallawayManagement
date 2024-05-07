import React, { useEffect } from "react";
import Axios from "axios";
import { OgioExcelModel } from "../../../../model/ogio/OgioExcelModel";
import {useDispatch} from "react-redux"
import {updateNewData} from "../../../../../slice/allProducts/TravisMethewSlice"

const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL;
type Props = {
  xlData: OgioExcelModel[];
  resetXls: () => void;
};

const OgioExcelUploadDB: React.FC<Props> = ({ xlData, resetXls }) => {
  const dispatch= useDispatch()
  
  useEffect(() => {
    if (xlData && xlData.length > 0) {
      console.log(xlData);

      const newData: OgioExcelModel[] = [];
      xlData.forEach((item:OgioExcelModel, index)=>{

    
        
        console.log("excel data, item")
        const sdd = {
             
              Name: item.Name,
              Description: item.Description,
              SetType: item.SetType,
              Brand: 3, 
              SKU: item.SKU,
               MRP: item.MRP,
               GST:item.GST,
              AttributeSet: [
                {
                  "__component": "attribute-set.ogio",
                  ProductType:item.ProductType,
                  Category:item.Category,
                  ProductModel:item.ProductModel,
                  LifeCycle:item.LifeCycle,
                   Stock90: item.Stock90,
            

                },
              ],
            };

            //console.log("sdd",sdd)
            saveData(sdd, index)
            dispatch(updateNewData({
              ogioProduct:item
            }))
            
      })
    }
  }, [xlData]);

  const saveData = async (products: OgioExcelModel, index:number) => {
    const data = {
      data: products,
    };

    try {
      const response = await Axios.post(
        `${STRAPI_URL}/api/products`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        resetXls();
      }

      if(index===(xlData.length-1)) {
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

export default OgioExcelUploadDB;
