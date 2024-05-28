import React, { useEffect } from "react";
import Axios from "axios";
import { ExcelModelGoods } from "../../../../../model/goods/CallawayGoodsExcel";

type Props = {
  xlData: ExcelModelGoods[];
  resetXls: () => void;
};

const ExcelUploadDB: React.FC<Props> = ({ xlData, resetXls }) => {
  useEffect(() => {
    if (xlData && xlData.length > 0) {

      const newData: ExcelModelGoods[] = [];
      xlData.map((item: ExcelModelGoods) => {
        const sdd = {
          Name: item.Name,
          Description: item.Description,
          SetType: item.SetType,
          Brand: item.Brand,
          SKU: item.SKU,
          StockAvailable: item.StockAvailable,
          StockManagement: true,
          StockStatus: "In Stock",
          MRP: item.MRP,
          AttributeSet: [
            {
              "__component": "attribute-set.equipment",
              "ProductType": item.ProductType,
              "ProductModel": item.ProductModel,
              "Category": item.Category,
              "Orientation": item.Orientation,
              "LifeCycle": item.LifeCycle,

            },
          ],
        };
        saveData(sdd)
      })
    }
  }, [xlData]);

  const saveData = async (products: ExcelModelGoods) => {
    const data = {
      data: products,
    };

    try {
      const response = await Axios.post(
        `https://aigigs.in/api/products`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        resetXls();
      }
    } catch (err) {
      alert("Error saving data");
      resetXls();
    }
  };

  return <></>;
};

export default ExcelUploadDB;
