import React, { useEffect, useState } from "react";
import Axios from "axios";
import { BasicModelGoods } from "../../../../../model/goods/CallawayGoodsModel";

import { useDispatch, useSelector } from "react-redux"
import {updateReduxData} from "../../../../../../slice/allProducts/CallAwayGoodsSlice"
import {getHardGoodsProducts} from "../../../../../../slice/allProducts/CallAwayGoodsSlice"
import {UpdateGoodsProduct,AddNewProduct} from "../../api/UpdateProductData"
//import { debug } from "console";


const STRAPI_URL = import.meta.env.VITE_APP_STRAPI_URL;
type Props = {
  xlData: BasicModelGoods[];
  resetXls: () => void;
};



const HardGoodsExcelUploadDb: React.FC<Props> = ({ xlData, resetXls }) => {
  const dispatch = useDispatch()
  const [isUpdate, setIsUpdate] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  const getTravisProduct = useSelector(getHardGoodsProducts)
  
  useEffect(() => {
    console.log("indb",xlData)
    //debugger

    const addTravisData: BasicModelGoods[] = []
    const updateTravisData: BasicModelGoods[] = []
    if (xlData && xlData.length > 0) {

      const newData: BasicModelGoods[] = [];
      xlData.forEach((item: BasicModelGoods, index) => {

        const travisIndex = getTravisProduct.findIndex(travis => travis.sku === item.sku);

        if (travisIndex !== -1 && getTravisProduct[travisIndex]) {
          const travispr = getTravisProduct[travisIndex];
   
          const update = {
            sku: item.sku,
            name: item.name !== undefined ? item.name : travispr.name,
            description: item.description != undefined ? item.description : travispr.description,
          
            mrp: item.mrp !== undefined ? item.mrp : travispr.mrp,
            gst: item.gst != undefined ? item.gst : travispr.gst,
       
            category: item.category !== undefined ? item.category : travispr.category,
          
            stock_88: item.stock_88 !== undefined ? item.stock_88 : travispr.stock_88,
           
            product_type: item.product_type !== undefined ? item.product_type : travispr.product_type,
            product_model: item.product_model !== undefined ? item.product_model : travispr.product_model,
            orientation: item.orientation !== undefined ? item.orientation : travispr.orientation,



            //variation_sku: item.variation_sku !== undefined ? item.variation_sku : travispr.variation_sku,

          }
          updateTravisData.push(update)
         


        } else if (travisIndex === -1) {

          const sdd = {

            name: item.name,
            description: item.description,
          
            sku: item.sku,
            mrp: item.mrp,
            gst: item.gst,
        
            category: item.category,
          
            stock_88: item.stock_88,
      
            product_type:item.product_type,
            product_model:item.product_model,
            orientation:item.orientation,


      
            //variation_sku: item.variation_sku != undefined ? item.variation_sku : ""


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

  const saveData = async (products: BasicModelGoods[]) => {
    console.log("add new data HardGoods", products);

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


  const updateData = async (products: BasicModelGoods[]) => {
    console.log("Update HardGoods", products);
    setIsUpdate(true)
    try {
      const response = await UpdateGoodsProduct(products);
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

export default HardGoodsExcelUploadDb;
                                