import React, { useState, useEffect, useRef } from 'react';

import CallawLogo from "../../../../../../../public/media/logos/logo-white.png"
import type { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel';
import callawayimg from "../../../../../../../public/media/product/bg-3.png"
import "./PPTTable.css"
import PPTTable from './PPTTable';
import PptxGenJS from 'pptxgenjs';
import { Button, Card } from 'antd';
type Props = {
  selectedRow: BasicModelApparel[];
  resetPPt: () => void;
};

const ApparelPPt = ({ selectedRow, resetPPt }: Props) => {
  const [selectedPPTdata, setSelectdPPtData] = useState<BasicModelApparel[]>(selectedRow);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedRow && selectedRow.length > 0) {
      setSelectdPPtData(selectedRow)

    }
  }, [selectedRow]);




  const handleExportPPT = () => {
    // eslint-disable-next-line no-debugger

  };



  return (
    <div>
      <Card  id="tableContainer" className='ppt-section' ref={tableRef} style={{ width: "1046px",  margin:"20px auto" }}>

        <div className='mb-18 row ppt-sec' style={{ textAlign: 'center', height: "585px", backgroundColor: "#000", paddingTop: "50px", }}>

          <div className='right-section '>
            <div >
              <img style={{ width: "200px", paddingTop: "60px" }} src={CallawLogo}></img>
            </div>
            <h2 className='brand-title' style={{ paddingTop: "40px", paddingBottom: "40px", fontSize: "40px", color: "#fff", fontWeight: "500", letterSpacing: "4px", }}>Callaway Golf Company</h2>
            <p style={{ fontSize: "18px", paddingLeft: "30px", color: "#fff", paddingRight: "30px", fontWeight: "100", }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
          </div>

{/* <div className='left-section col-4'>
  <img src={callawayimg}></img>
</div> */}
        </div>

        <div  >
          {selectedPPTdata &&
            selectedPPTdata.length > 0 &&
            selectedPPTdata.map((item) => {
              return (

                < PPTTable
                  key={item.sku}
                  eachItem={item}

                />
              )
            })}
          <Button onClick={handleExportPPT} type="primary" style={{ marginTop: 20 }}>
            Export to PPT
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ApparelPPt;
