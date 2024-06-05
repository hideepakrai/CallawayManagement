import React,{useState, useEffect} from "react";
import {Col, Row} from "antd";
import ItemFirst from "./ItemFirst";
import SecondItem from "./SecondItem";
import ThirdItem from "./ThirdItem";
import { RetailerModel } from "../../model/AccountType/retailer/RetailerModel";
import { getUserProfile ,getUserRetailer} from "../../../slice/UserSlice/UserSlice";
import { CurentUser } from "../../model/useAccount/CurrentUser";
import {useSelector} from "react-redux"
import "./index.css"

const SalesHome = () => {

  const getUserRetailers= useSelector(getUserRetailer)
  const [allSalesRep, setAllSalesRep]= useState<CurentUser[]>([])
  
    useEffect (()=>{
      const alladat:CurentUser[]=[]
      if(getUserRetailers && getUserRetailers.length>0){
        getUserRetailers.map((item:CurentUser)=>{
          if(item &&item.role &&item.role==="Sales Representative"){
            alladat.push(item)
          }
      })
      setAllSalesRep(alladat)
  
    }
    },[getUserRetailers])
  return (
    <div className="gx-price-tables gx-pt-default mt-20 pt-20">
      <Row className="mt-6">

      { allSalesRep &&
       allSalesRep.length>0 &&
       allSalesRep.map((item:CurentUser)=>{
        return (
        <Col xl={6} lg={24} md={8} xs={24}>
          <ItemFirst
          salesRep={item}
            
          />
        </Col>
        )
        })}

      </Row>
    </div>
  )
};

export default SalesHome;

