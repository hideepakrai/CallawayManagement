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
    console.log("ppt page")
    const pptx = new PptxGenJS();

    pptx.tableToSlides("tabAutoPaging", { x: 1, y: 0.5, w: 5 });

    pptx.writeFile({ fileName: 'Apparel_Presentation.pptx' });

  };



  return (
    <div>
      <Card title="Default category card" style={{ width: 700 }}>
        <div>
        <table id="tabAutoPaging">
        <thead>
    <tr>
      <th ></th>
      <th > </th>
      
    </tr>
  </thead>
  <tbody>
  {selectedPPTdata.map((item, index) => (
    <tr key={index}>
      <td><img src={callawayimg} style={{ width: 100, height: 100 }} /></td>
      <td>
        <tr>
          <table>
            <tbody>
              <tr>
                <td>
                  <PPTTable 
                  eachItem={item}/>
                </td>
              </tr>
            </tbody>
          </table>
        </tr>
      </td>
    </tr>
    
  ))}

  </tbody>
          
              </table>
              </div>
              <Button onClick={handleExportPPT} type="primary" style={{ marginTop: 20 }}>
            Export to PPT
          </Button>
          </Card>
          </div>

  );
};

export default ApparelPPt;
