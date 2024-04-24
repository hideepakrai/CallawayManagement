import React from "react";
import {Button} from "antd";



const SecondItem = () => {

    return (
     
        <div className="card card-custom mx-8 mb-4 pb-7 card-user-list" style={{ border:"none" }} >
          <div className="card-header d-inline py-7" style={{ backgroundColor: "#038fde", color: "#fff", border:"none" }} >
            
            <h1 className=" text-center text-white pb-2" style={{fontSize:"28px"}}>Ankur Shriv</h1>
            <h4 className=" text-center text-white">MANAGER </h4>

          </div>

          <div className="card-body">

            <ul className="card-list pt-3" >
              <li>
                <i className="bi bi-person-lines-fill"></i>
                <span>+91142365478</span>
              </li>
              <li>
                <i className="bi bi-envelope"></i>
                <span>hello@ankurshriv.com</span>
              </li>
              <li>
                <i className="bi bi-person-vcard"></i>
                <span>Active</span>
              </li>

              <li>
                <i className="bi bi-calendar-event"></i>
                <span>23-01-2023</span>
              </li>
            </ul>
          </div>


          <div style={{  textAlign:"center",}}>
            <Button style={{ backgroundColor: "#038fde", color: "#fff", textAlign:"center", margin:"0 auto" }} >View</Button>
          </div>
        </div>

 
    )
  };

export default SecondItem;

