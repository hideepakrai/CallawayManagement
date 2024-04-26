import React, { useEffect } from "react";
import Axios from "axios";
import { ExcelModelTravis } from "../../../../model/travis/TravisExcel";
import {useDispatch} from "react-redux"
import {updateNewData} from "../../../../../slice/allProducts/TravisMethewSlice"
const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL;
type Props = {
  xlData: ExcelModelTravis[];
  resetXls: () => void;
};

const TravisExcelUploadDB: React.FC<Props> = ({ xlData, resetXls }) => {
  const dispatch= useDispatch()
  
  useEffect(() => {
    if (xlData && xlData.length > 0) {
      console.log(xlData);

      const newData: ExcelModelTravis[] = [];
      xlData.forEach((item:ExcelModelTravis)=>{

    
        
        console.log("excel data, item")
        const sdd = {
             
              Name: item.Name,
              Description: item.Description,
              SetType: item.SetType,
              Brand: 4, 
              SKU: item.SKU,
               MRP: item.MRP,
              AttributeSet: [
                {
                  "__component": "attribute-set.travis-mathew",
                  StyleCode:item.StyleCode,
                  Length:item.Length,
                  Category:item.Category,
                  Season:item.Season,
                  Line:item.Line,
                  Color:item.Color,
                  ColorCode:item.ColorCode,
                  Size:item.Size?.toString(),
                  Gender:item.Gender,
                  Stock88: item.Stock88,
                   Stock90: item.Stock90,
            

                },
              ],
            };

            //console.log("sdd",sdd)
            saveData(sdd)
            dispatch(updateNewData({
              travisProduct:item
            }))
      })
    }
  }, [xlData]);

  const saveData = async (products: ExcelModelTravis) => {
    const data = {
      data: products,
    };

    try {
      const response = await Axios.post(
        `${STRAPI_URL}/api/new-products`,
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
    } catch (err) {
      console.log(err);
      alert("Error saving data");
      resetXls();
    }
  };

  return <></>;
};

export default TravisExcelUploadDB;
