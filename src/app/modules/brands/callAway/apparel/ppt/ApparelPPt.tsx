import React, { useState, useEffect, useRef } from 'react';


import type { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel';

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
      <Card title="Default category card" id="tableContainer"  ref={tableRef}style={{ width: 400}}>
        <div  >
         {selectedPPTdata &&
         selectedPPTdata.length>0 &&
         selectedPPTdata.map((item)=>{
          return(
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
