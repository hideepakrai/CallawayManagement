import React, { useEffect } from "react";
import Axios from "axios";
import { ExcelModelGoods } from "../../../../model/goods/CallawayGoodsExcel";

type Props = {
  xlData: ExcelModelGoods[];
  resetXls: () => void;
};

const ExcelUploadDB: React.FC<Props> = ({ xlData, resetXls }) => {
  useEffect(() => {
    if (xlData && xlData.length > 0) {
      console.log(xlData);

      const newData: ExcelModelGoods[] = [];
      // Object.keys(xlData).map((key) => {
      //   let value = xlData[key];

      //   let sdd = {
      //     Name: value.Name,
      //     Description: value.Description,
      //     SetType: value.SetType,
      //     Brand: value.brand,
      //     SKU: value.SKU,
      //     StockAvailable: value.StockAvailable,
      //     StockManagement: true,
      //     StockStatus: "In Stock",
      //     RegularPrice: value.RegularPrice,
      //     AttributeSet: [
      //       {
      //         "__component": "attribute-set.travis-mathew",
      //         "Category": value.Category,
      //         "Length": value.Length,
      //         "Season": value.Season,
      //         "Line": value.Line,
      //         "Gender": value.Gender,
      //         "Color": value.Color,
      //         "ColorCode": value.ColorCode,
      //         "Size": value.Size,
      //         "StyleCode": value.StyleCode,
      //       },
      //     ],
      //   };
      //   console.log(sdd);
      //   saveData(sdd);
      // });


      xlData.map((item:ExcelModelGoods)=>{
        const sdd = {
              Name: item.Name,
              Description: item.Description,
              SetType: item.SetType,
              Brand: item.Brand,
              SKU: item.SKU,
              StockAvailable: item.StockAvailable,
              StockManagement: true,
              StockStatus: "In Stock",
              RegularPrice: item.RegularPrice,
              AttributeSet: [
                {
                  "__component": "attribute-set.equipment",
                  "ProductType":item.ProductType,
                   "ProductModel":item.ProductModel,
                    "Category":item.Category,
                    "Orientation":item.Orientation,
                    "LifeCycle":item.LifeCycle,

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

export default ExcelUploadDB;
