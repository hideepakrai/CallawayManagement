import React, { useEffect } from "react";
import Axios from "axios";
import { ExcelModelTravis } from "../../../../model/travis/TravisExcel";
import {useDispatch, useSelector} from "react-redux"
import {updateNewData} from "../../../../../slice/allProducts/TravisMethewSlice"
import {getTravisProducts} from "../../../../../slice/allProducts/TravisMethewSlice"

const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL;
type Props = {
  xlData: ExcelModelTravis[];
  resetXls: () => void;
};



const TravisExcelUploadDB: React.FC<Props> = ({ xlData, resetXls }) => {
  const dispatch= useDispatch()
  const getTravisProduct= useSelector(getTravisProducts)
  useEffect(() => {
    if (xlData && xlData.length > 0) {
      console.log(xlData);

      const newData: ExcelModelTravis[] = [];
      xlData.forEach((item:ExcelModelTravis)=>{
       
        const travisIndex= getTravisProduct.findIndex(travis=>travis.SKU===item.SKU);
    
        if(travisIndex!==1 &&getTravisProduct[travisIndex] &&getTravisProduct[travisIndex].TravisAttributes){
  const travispr= getTravisProduct[travisIndex];
const id:number= travispr?.id??0;

    const update={       
        Name: item.Name!==null?item.Name:travispr.Name,
        Description: item.Description!=null?item.Description:travispr.Description,
        SetType: item.SetType!==null?item.SetType:travispr.SetType,
        Brand: 2, 
        SKU: item.SKU,
         MRP: item.MRP!==null?item.MRP:travispr.MRP,
         GST:item.GST!=null?item.GST:travispr.GST ,
        AttributeSet: [
          {
            "__component": "attribute-set.travis-mathew",
            StyleCode:item.StyleCode!==null? item.StyleCode:(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].StyleCode? travispr?.TravisAttributes[0]?.StyleCode:""),
            Length:item.Length!==null? item.Length:(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].Length? travispr?.TravisAttributes[0]?.Length:""),
            Category:item.Category!==null? item.Category:(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].Category? travispr?.TravisAttributes[0]?.Category:""),
            Season:item.Season!==null? item.Season:(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].Season? travispr?.TravisAttributes[0]?.Season:""),
            Line:item.Line!==null? item.Line:(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].Line? travispr?.TravisAttributes[0]?.Line:""),
            Color:item.Color!==null? item.Color:(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].Color? travispr?.TravisAttributes[0]?.Color:""),
            ColorCode:item.ColorCode!==null? item.ColorCode:(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].ColorCode? travispr?.TravisAttributes[0]?.ColorCode:""),
            // Size:item.Size?.toString(),
            Size:item.Size!==null? item.Size?.toString():(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].Size? travispr?.TravisAttributes[0]?.Size:""),
            Gender:item.Gender!==null? item.Gender:(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].Gender? travispr?.TravisAttributes[0]?.Gender:""),
            Stock88: item.Stock88!==null? item.Stock88:(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].Stock88? travispr?.TravisAttributes[0]?.Stock88:""),
             Stock90: item.Stock90!==null? item.Stock90:(travispr?.TravisAttributes  && travispr?.TravisAttributes[0].Stock90? travispr?.TravisAttributes[0]?.Stock90:""),
      

          },
        ],
      
      
    }
    updateData(update,id)
    dispatch(updateNewData({
      travisProduct:item
    }))


        }else{
          console.log("excel data, item")
          const sdd = {
               
                Name: item.Name,
                Description: item.Description,
                SetType: item.SetType,
                Brand: 2, 
                SKU: item.SKU,
                 MRP: item.MRP,
                 GST:item.GST,
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

        }
       
      })
    }
  }, [xlData]);

  const saveData = async (products: ExcelModelTravis) => {
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
        console.log("newly upload",response);
        resetXls();
      }
    } catch (err) {
      console.log(err);
      alert("Error saving data");
      resetXls();
    }
  };
  const updateData = async (products: ExcelModelTravis, id:number) => {
    const data = {
      data: products,
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
        console.log(`update ${id}`,response);
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
