import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BasicModelApparel } from "../../../../../model/apparel/CallawayApparelModel"

import { useDispatch, useSelector } from "react-redux"
import {updateReduxData} from "../../../../../../slice/allProducts/CallawayApparelSlice"
import {getAppaProducts} from "../../../../../../slice/allProducts/CallawayApparelSlice"
import {UpdateApparelProduct,AddNewProduct} from "../../api/UpdateProductData"
//import { debug } from "console";

//import { BasicModelApparel, UpdateTravisModel } from "../../../../model/travis/TravisMethewModel"

const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;
type Props = {
  xlData: BasicModelApparel[];
  resetXls: () => void;
};



const ApparelExcelUploadDb: React.FC<Props> = ({ xlData, resetXls }) => {
  const dispatch = useDispatch()
  const [isUpdate, setIsUpdate] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const getTravisProduct = useSelector(getAppaProducts)
  
  useEffect(() => {
    //console.log("indb",xlData)
    //debugger

    const addTravisData: BasicModelApparel[] = []
    const updateTravisData: BasicModelApparel[] = []
    if (xlData && xlData.length > 0) {

      const newData: BasicModelApparel[] = [];
      xlData.forEach((item: BasicModelApparel, index) => {

        const travisIndex = getTravisProduct.findIndex(travis => travis.sku === item.sku);

        if (travisIndex !== -1 && getTravisProduct[travisIndex]) {
          const travispr = getTravisProduct[travisIndex];
         // const id: number = travispr?.id ?? 0;

          const update = {
            sku: item.sku,
            name: item.name !== undefined ? item.name : travispr.name,
            description: item.description != undefined ? item.description : travispr.description,
            //brand_id: 3,
            mrp: item.mrp !== undefined ? item.mrp : travispr.mrp,
            gst: item.gst != undefined ? item.gst : travispr.gst,
           // style_code: item.style_code !== undefined ? item.style_code : travispr.style_code,
           // length: item.length !== undefined ? item.length : travispr.length,
            category: item.category !== undefined ? item.category : travispr.category,
            season: item.season !== undefined ? item.season : travispr.season,
           // line: item.line !== undefined ? item.line : travispr.line,
            color: item.color !== undefined ? item.color : travispr.color,
           // color_code: item.color_code !== undefined ? item.color_code : travispr.color_code,
            // Size:item.Size?.toString(),
            size: item.size !== undefined ? item.size : travispr.size,
            gender: item.gender !== undefined ? item.gender : travispr.gender,
            stock_88: item.stock_88 !== undefined ? item.stock_88 : travispr.stock_88,
            stock_90: item.stock_90 !== undefined ? item.stock_90 : travispr.stock_90,
            variation_sku: item.variation_sku !== undefined ? item.variation_sku : travispr.variation_sku,
            brand_id: item.brand_id !== undefined ? item.brand_id : travispr.brand_id,
            style_id: item.style_id !== undefined ? item.style_id : travispr.style_id,
            series: item.series !== undefined ? item.series : travispr.series,
            type: item.type !== undefined ? item.type : travispr.type,


            



          }
          updateTravisData.push(update)
          // dispatch(updateReduxData({
          //   travisProduct:update  
          // }))
          // updateData(update,id,index)


        } else if (travisIndex === -1) {

          const sdd = {

            name: item.name,
            description: item.description,
            brand_id: item.brand_id,
            sku: item.sku,
            mrp: item.mrp,
            gst: item.gst,
           // style_code: item.style_code,
            //length: item.length,
            category: item.category,
            season: item.season,
           // line: item.line,
            color: item.color,
           // color_code: item.color_code,
            size: item.size?.toString(),
            gender: item.gender,
            stock_88: item.stock_88,
            stock_90: item.stock_90,
            variation_sku: item.variation_sku != undefined ? item.variation_sku : "",
            style_id: item.style_id,
            series: item.series,
            type: item.type,





          };

          addTravisData.push(sdd)


        }

      })
    }
    if (addTravisData.length > 0) {
      saveData(addTravisData)
    }
    if (updateTravisData.length > 0) {
      updateData(updateTravisData)
    }
  }, [xlData]);
  console.log("use",xlData)

  const saveData = async (products: BasicModelApparel[]) => {
    console.log("add new data apparel", products);

    try {
      setIsAdd(true)
      const response = await AddNewProduct(products);
      if (response.status === 200) {
        dispatch(updateReduxData({
          travisProduct: products
        }))
        resetXls();
        alert("Data is uploaded successfully")
        setIsAdd(false)
      }

    } catch (err) {
      alert("Error saving data");
      resetXls();
    }
  };


  const updateData = async (products: BasicModelApparel[]) => {
    console.log("Update SoftGoods", products);
    setIsUpdate(true)
    try {
      const response = await UpdateApparelProduct(products);
      if (response.status === 200) {
        dispatch(updateReduxData({
          travisProduct: products
        }))
        alert("Data is uploaded successfully")
        resetXls();
        setIsUpdate(false)
      }


    } catch (err) {
      alert("Error saving data");
      resetXls();
    }
  };



  return <></>;
};

export default ApparelExcelUploadDb;
                                