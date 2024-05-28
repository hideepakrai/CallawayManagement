import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OgioBasicModel } from "../../../../model/ogio/OgioBrandModel";
import { getOgioProducts, updateNewData } from "../../../../../slice/allProducts/OgioSlice";
import { LoadingStart, LoadingStop } from "../../../../../slice/loading/LoadingSlice";
import { AddOgioProduct, UpdateOgioProduct } from "../../api/OgioAPI";

type Props = {
  xlData: OgioBasicModel[];
  resetXls: () => void;
};

const OgioExcelUploadDB: React.FC<Props> = ({ xlData, resetXls }) => {
  const dispatch = useDispatch();
  const getOgioProduct = useSelector(getOgioProducts)
  useEffect(() => {
    const newData: OgioBasicModel[] = [];
    const oldData: OgioBasicModel[] = [];
    if (xlData && xlData.length > 0 &&

      getOgioProduct && getOgioProduct.length > 0
    ) {
      dispatch(LoadingStart())


      dispatch(updateNewData({
        ogioProduct: xlData
      }));

      xlData.forEach((item: OgioBasicModel, index) => {
        const ogioIndex = getOgioProduct.findIndex(ogio => ogio.sku === item.sku);
        const reduxprd = getOgioProduct[ogioIndex]
        if (ogioIndex != -1) {

          const data = {
            sku: item.sku,

            name: item.name != undefined ? item.name : reduxprd.name,
            description: item.description != undefined ? item.description : reduxprd.description,
            mrp: item.mrp != undefined ? item.mrp : reduxprd.mrp,
            gst: item.gst != undefined ? item.gst : reduxprd.gst,
            primary_image_url: "",
            gallery_images_url: "",
            product_type: item.product_type != undefined ? item.product_type : reduxprd.product_type,
            variation_sku: "",
            stock_90: item.stock_90 != undefined ? item.stock_90 : reduxprd.stock_90,
            category: item.category != undefined ? item.category : reduxprd.category,
            product_model: item.product_model != undefined ? item.product_model : reduxprd.product_model

          }

          newData.push(data)
          // updateData(data,index)

        }
        else if (ogioIndex === -1) {
          const data = {
            sku: item.sku,

            name: item.name,
            description: item.description,
            mrp: item.mrp,
            gst: item.gst,
            primary_image_url: "",
            gallery_images_url: "",
            product_type: item.product_type,
            variation_sku: "",
            stock_90: item.stock_90,
            category: item.category,
            product_model: item.product_model

          }
          // addOgioData(data, index)
          oldData.push(data)
        }







      })

    }

    if (newData && newData.length > 0) {
      addOgioData(newData)
    }
  }, [xlData, getOgioProduct]);

  
  const addOgioData = async (data: OgioBasicModel[]) => {


    try {
      const response = await AddOgioProduct(data)

      if (response && response.status === 200) {
        alert("Data is upData successfully")
        dispatch(LoadingStop())
        if (response) {
          resetXls();
        }

      }


    } catch (err) {
      alert("Error saving data");
      resetXls();

    }
    return <></>;
  };
  return <></>;
};

export default OgioExcelUploadDB;
