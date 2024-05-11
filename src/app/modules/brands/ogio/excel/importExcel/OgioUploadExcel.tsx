import React, { useEffect } from "react";
import Axios from "axios";
import { OgioExcelModel ,UploadOgioExcel} from "../../../../model/ogio/OgioExcelModel";
import {useDispatch} from "react-redux"
import {updateNewData} from "../../../../../slice/allProducts/TravisMethewSlice"
import {getOgioProducts} from "../../../../../slice/allProducts/OgioSlice"
import { useSelector } from "react-redux";
import {OgioUploadDataModel,OgioBasicModel} from "../../../../model/ogio/OgioBrandModel"


const STRAPI_URL= import.meta.env.VITE_APP_STRAPI_URL;
type Props = {
  xlData: OgioExcelModel[];
  resetXls: () => void;
};

 const OgioExcelUploadDB: React.FC<Props> = ({ xlData, resetXls }) => {
//   const dispatch= useDispatch()
//   const getOgioProduct= useSelector(getOgioProducts)
//   useEffect(() => {
//     if (xlData && xlData.length > 0) {
//       console.log(xlData);

//       const newData: OgioExcelModel[] = [];
//       xlData.forEach((item:OgioExcelModel, index)=>{

//         const ogioIndex= getOgioProduct.findIndex(ogio=>ogio.SKU===item.SKU);
          
//         console.log("excel data, item",ogioIndex)
//         if(ogioIndex!=-1){
//           const ogioProduct= getOgioProduct[ogioIndex];
         
//           if(ogioProduct){
//             const id= ogioProduct.id?? 0
//             const   updatedata={
//               Name: item.Name!==undefined?item.Name:ogioProduct.Name,
//               Description:item.Description!==undefined?item.Description:ogioProduct.Description,
//               SetType: item.SetType!==undefined?item.SetType:ogioProduct.SetType,
//               Brand: 3, 
           
//              MRP:item.MRP!==undefined?item.MRP:ogioProduct.MRP,
//              GST:item.GST!==undefined?item.GST:ogioProduct.GST,
//              AttributeSet: [
//                  {
//                    "__component": "attribute-set.ogio",
//                    Stock90:item.Stock90!==undefined? item.Stock90:((ogioProduct?.OgiAttributes  && ogioProduct?.OgiAttributes[0].Stock90 )? ogioProduct?.OgiAttributes[0].Stock90:0),
//                    ProductType:item.ProductType!==undefined? item.ProductType:((ogioProduct?.OgiAttributes  && ogioProduct?.OgiAttributes[0].ProductType )? ogioProduct?.OgiAttributes[0].ProductType:""),
//                      Category:item.Category!==undefined? item.Category:((ogioProduct?.OgiAttributes  && ogioProduct?.OgiAttributes[0].Category )? ogioProduct?.OgiAttributes[0].Category:""),
//                   ProductModel:item.ProductModel!==undefined? item.ProductModel:((ogioProduct?.OgiAttributes  && ogioProduct?.OgiAttributes[0].ProductModel )? ogioProduct?.OgiAttributes[0].ProductModel:""),
//                    LifeCycle:item.LifeCycle!==undefined? item.LifeCycle:((ogioProduct?.OgiAttributes  && ogioProduct?.OgiAttributes[0].LifeCycle )? ogioProduct?.OgiAttributes[0].LifeCycle:""),
//                  }]
             
//            }
//            updateData(updatedata,id,index)
//           dispatch(updateNewData({
//             ogioProduct:item
//           }))

//           console.log("updatedata",updatedata)
//           console.log("updatedata id",id)
//           }
          
//        }  else if(ogioIndex==-1){
//         const sdd = {
             
//           Name: item.Name,
//           Description: item.Description,
//           SetType: item.SetType,
//           Brand: 3, 
//           SKU: item.SKU,
//            MRP: item.MRP,
//           GST:item.GST,
//           AttributeSet: [
//             {
//               "__component": "attribute-set.ogio",
//               ProductType:item.ProductType,
//               Category:item.Category,
//               ProductModel:item.ProductModel,
//               LifeCycle:item.LifeCycle,
//                Stock90: item.Stock90,
        

//             },
//           ],
//         };

//         console.log("sdd",sdd)
//         saveData(sdd, index)
//         dispatch(updateNewData({
//           ogioProduct:item
//         }))

//        }
        
            
//       })
//     }
//   }, [xlData]);

//   const saveData = async (products: UploadOgioExcel, index:number) => {
//     const data = {
//       data: products,
//     };

//     try {
//       const response = await AddnewOgioProduct(data);
//       if (response.status === 200) {
//         console.log(response);
//         resetXls();
//       }

//       if(index===(xlData.length-1)) {
//         alert ("Data is uploaded successfully")
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Error saving data");
//       resetXls();
//     }
//   };

 
//   const updateData = async (products:OgioBasicModel , id:number,index:number) => {
//     const data = {
//       data: products,
//     };

//     try {
//       const response = await UpdateOgioProduct( data, id);
//       if (response.status === 200) {
//         console.log(`update ${id}`,response);
//         resetXls();
//       }

//       if(index===(xlData.length-1)) {
//         alert ("Data is uploaded successfully")
//       }
//     } catch (err) {
//       console.log(err);
//       alert("Error saving data");
//       resetXls();
//     }
//   };

  return <></>;
};

export default OgioExcelUploadDB;
