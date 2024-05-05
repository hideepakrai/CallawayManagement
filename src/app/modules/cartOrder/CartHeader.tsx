import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {BasicModelTravis} from "../model/travis/TravisMethewModel"
import {getRetailers} from "../../slice/retailer/RetailerSlice"
import {RetailerModel,Retailer}  from "../../modules/model/retailer/RetailerModel"
import {getUserAccount} from "../.../../../slice/UserSlice/UserSlice"

type Props={
    CreateOrder: (
        retailerId:number, 

    )=>void,
    sendRetailerData:(
        retailerAddres:string,
        retailerCity:string,
        retailerName:string
    )=>void,
   
    
}
const CartHeader = ({CreateOrder,sendRetailerData}:Props) => {

    const [isNote, setIsNote] = useState(false);
    const handleNote = () => {
      setIsNote(true);
    };

  const [retailerName, setRetailerName]= useState<string>()
  const [retailerAddres, setRetailerAddress]= useState<string>()
  const [retailerId, setRetailerId]= useState<number>(0)
  const [retailerCity, setRetailerCity]= useState<string>()
  const [GST, setGST]= useState<string>()

    const handleSubmit=()=>{
        // eslint-disable-next-line no-debugger
        debugger
        if(retailerId!==0){
            CreateOrder(retailerId)
        }
        else{
            alert("Please select retailer")
        }
       
    }

    const getRetailer= useSelector(getRetailers);

    const getUserAccounts= useSelector(getUserAccount) 
    console.log("getUserAccount",getUserAccounts)
     const handleChange=(value:number)=>{
        const allData:RetailerModel[]= getRetailer.retailer.filter(retailer=>retailer.id==value)
        console.log(allData)
        if (allData && allData.length>0)  { 
           
            setRetailerAddress(allData[0]?.attributes?.Address ?? ''); 
            setRetailerCity(allData[0]?.attributes?.Location ?? '');
            setGST(allData[0]?.attributes?.GST ?? "");
            setRetailerId(allData[0]?.id ??0)
            setRetailerName(allData[0]?.attributes?.Name ??"")
        } else {
            
            setRetailerAddress('');
            setRetailerCity('');
            setGST("");
            setRetailerId(0)
            setRetailerName("")
        }
        if(retailerAddres&&retailerCity &&retailerName)
        sendRetailerData(retailerAddres,retailerCity, retailerName)
     }
  return (
    <div>
      <div className='row'>
            <div className='col-3 d-flex'>
                <h4 className='mx-3 pt-3'>
                    <a>Select Retailer</a>
                </h4>

                <Select
                    showSearch
                    placeholder="Select retailer"
                    optionFilterProp="children"
                    style={{ width: "40%", marginBottom: 10 }} 
                    onChange={handleChange}
                    options={getRetailer?.retailer?.map((item:RetailerModel) => (
                        { label: item.attributes?.Name ??"",
                             value: item.id}))}

                  

   
                    />
                    
    
                
            </div>
            <div className='col-8'>
                <span style={{ marginRight: 10 }}>
                    {" "}
                    <a style={{ color: "#000", fontSize:"14px"}}> <span style={{fontWeight:600, }}>Address City :</span> {retailerAddres} </a>
                </span>
                <span style={{ width: 100, marginRight: 20, borderRight: "1px solid #ddd", paddingRight: "10px", }}>{retailerCity}</span>
                <span>
                    <a style={{ color: "#000", fontSize:"14px" }}> <span style={{fontWeight:600}}> GSTIN NO. :</span> </a> {GST}
                </span>
            </div>



            <div className='col-12 mb-3'style={{textAlign:"end"}}>
                <span className='mx-3'  >
                    <Button  > <i style={{ paddingRight: "6px", verticalAlign: "middle", }}  className="bi bi-bag"></i>View Pdf</Button>
                  
                </span>
                <span  className='mx-3' 
                onClick={handleSubmit}
                >
                    <Button > <i style={{ paddingRight: "6px", verticalAlign: "inherit", }}  className="bi bi-file-earmark-text"></i>Submit for Review</Button>
                </span>


                <span className='mx-3' 
                 onClick={handleNote}
                >
          
                    
                    <Button > <i style={{ paddingRight: "6px", verticalAlign: "inherit", }}  className="bi bi-bag-check"></i>Approve Order</Button>
                    
              
              
                </span>

                <span className='mx-3'
                 onClick={handleNote}
                >

                    <Button > <i style={{ paddingRight: "6px", verticalAlign: "inherit", }} className="bi bi-cart"></i>      Reject Order</Button>
                  

              
                </span>

                <span className='mx-3'
                onClick={handleNote}
                >
                    <Button > <i style={{paddingRight:"6px", verticalAlign:"inherit",}} className="bi bi-pencil-square"></i>Add Note</Button>
                </span>
            </div>

            </div>
    </div>
  )
}

export default CartHeader