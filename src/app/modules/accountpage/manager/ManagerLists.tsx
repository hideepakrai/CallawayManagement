import React,{useState, useEffect} from "react";
import {Col, Row} from "antd";
import FirstItem from "./FirstItem";
import SecondItem from "./SecondItem";
import ThirdItem from "./ThirdItem";
import {useSelector} from "react-redux"
import "./ManagerList.css"
import { RetailerModel } from "../../model/AccountType/retailer/RetailerModel";
import { getUserProfile ,getUserRetailer} from "../../../slice/UserSlice/UserSlice";
import { CurentUser } from "../../model/useAccount/CurrentUser";

const ManagerList = () => {



  const getUserRetailers= useSelector(getUserRetailer)
const [allManager, setAllmanager]= useState<CurentUser[]>([])

  useEffect (()=>{
    const alladat:CurentUser[]=[]
    if(getUserRetailers && getUserRetailers.length>0){
      getUserRetailers.map((item:CurentUser)=>{
        if(item &&item.role &&item.role==="Manager"){
          alladat.push(item)
        }
    })
setAllmanager(alladat)

  }
  },[getUserRetailers])
  return (
    <div className="gx-price-tables gx-pt-default mt-20 pt-20 ">
      <Row className="mt-6">
   
       { allManager &&
       allManager.length>0 &&
       allManager.map((item:CurentUser)=>{

        return(
          <Col xl={6} lg={24} md={8} xs={24}>
          <FirstItem
          manager={item}
            
          />
       </Col>
        )
       })
      }

       

      </Row>
    </div>
  )
};

export default ManagerList;

