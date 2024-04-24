import React, { useEffect, useState } from "react";
import { Card, Table, Input, Button, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
const CartHeader = () => {
  return (
    <div>CartHeader

<div style={{ float: "right" }}>
       <span style={{ marginRight:"10px"}} >
        <Button 
        //onClick={handleNote}
        > <i style={{paddingRight:"6px", verticalAlign:"middle",}} className="icon icon-copy"></i>  Submit for Review</Button>
      </span>
      <span style={{ marginRight:"10px"}}>
        <Button 
       // onClick={handleNote}
       > 
        <svg  style={{marginRight:6, verticalAlign:"middle", marginTop:"-2px"}} viewBox="64 64 896 896" focusable="false" data-icon="shopping" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z"></path></svg>
        Approve Order
        </Button>
      </span>

      <span style={{ marginRight:"10px"}}>
        <Button 
        //onClick={handleNote}
        > 
        
        <svg style={{marginRight:7, verticalAlign:"middle", marginTop:"-3px"}} fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close-square" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 112c17.7 0 32 14.3 32 32v736c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V144c0-17.7 14.3-32 32-32zm-40 72H184v656h656V184zM640.01 338.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z"></path></svg>
        Reject Order
        
        </Button>
      </span>

      <span >
        <Button 
       // onClick={handleNote}
        >
             <i  style={{paddingRight:"6px", verticalAlign:"middle",}} className="icon icon-feedback" ></i>  Add Note</Button>
      </span>
      </div>
    </div>
  )
}

export default CartHeader