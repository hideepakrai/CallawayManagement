import React, { useEffect, useState } from 'react'
import { UpdateOgioProduct } from '../../../brands/ogio/api/OgioAPI'
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel'
import { getOgioProducts } from '../../../../slice/allProducts/OgioSlice'
import { useSelector } from 'react-redux'



type Props={
    resetUPdateDB:()=>void
}
const UpDateDB = ({resetUPdateDB}:Props) => {


  const getOgioProduct= useSelector(getOgioProducts)
    const [ allOgioOrders, setGetAllOgioOrders]= useState<OgioBasicModel[]>([])
 
  
    useEffect(()=>{
      const ogio:OgioBasicModel[]=[];
      if(getOgioProduct &&getOgioProduct.length>0){
        getOgioProduct.map((item,index)=>{
          if(item.ordered && item.error===""){
            ogio.push(item)
            
          }
        })
        console.log("Ogio order",getOgioProduct)
  
         setGetAllOgioOrders(ogio)
      }
    },[getOgioProduct]);

    // call fro update
    useEffect(()=>{
   
      if(allOgioOrders &&allOgioOrders.length>0){
        allOgioOrders.map((item,index)=>{
          if(item.ordered && item.error===""){
            
            updateQuantity(item,index); // update in strapi
            
          }
        })
      
      }
    },[allOgioOrders]);

    const updateQuantity= async (data:OgioBasicModel, index:number) => {
        console.log("updating ")
    
      const rdx= data.OgiAttributes;
      const id=data.id
        if(rdx && rdx[0]&&rdx[0].Stock90 && data.Quantity90 &&id){
          const   updatedata={
            AttributeSet: [
                {
                  "__component": "attribute-set.ogio",
                  Stock90:rdx[0].Stock90-data.Quantity90,
                  ProductType:rdx[0].ProductType,
                  Category:rdx[0].Category,
                  ProductModel:rdx[0].ProductModel,
                  LifeCycle:rdx[0].LifeCycle,
                
                }]
            
          }
    
          const updateDb={
            data:updatedata
          }
    
       try{
        const response= await UpdateOgioProduct(updateDb,id)
        if(response.state===200){
            console.log("update quantity",response)   
        }
        // eslint-disable-next-line no-debugger
        debugger
        if((allOgioOrders.length-1)===index){
            resetUPdateDB();
            console.log("update quantity in strapi")
        }
        
        }
        catch(err){
            resetUPdateDB();
          console.log("error on updateing quantity")
          alert("Error updating quantity")
        }
        }
    
        }
  return (
    <div></div>
  )
}

export default UpDateDB