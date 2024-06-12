import React, { useState, useEffect, useRef } from 'react';
import type { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel';
import PptxGenJS from 'pptxgenjs';
import { Button, Card } from 'antd';

type Props = {
  selectedRow: BasicModelApparel[];
  resetPPt: () => void;
};

const ApparelPPt = ({ selectedRow, resetPPt }: Props) => {
  const [selectedPPTdata, setSelectedPPTData] = useState<BasicModelApparel[]>(selectedRow);

  useEffect(() => {
    if (selectedRow && selectedRow.length > 0) {
      setSelectedPPTData(selectedRow);
    }
  }, [selectedRow]);

  const handleExportPPT = () => {
    const pptx = new PptxGenJS();

    selectedPPTdata.forEach((item, index) => {
      const slide = pptx.addSlide();
      const tableId = `table_${index}`; // Unique table id for each object
      const tableElement = document.getElementById(tableId);

      if (tableElement) {
        pptx.tableToSlides(tableId, { x: 1.0, y: 1.0, w: 10 });
      } else {
        console.error(`Table element with id '${tableId}' not found.`);
      }
    });

    pptx.writeFile({ fileName: 'table2slides_demo.pptx' });
  };

  return (
    <div>
      <Card title="Default category card" style={{ width: 400 }}>
        <div>
          {selectedPPTdata.map((item, index) => (
            <div key={index}>
              <table
                id={`table_${index}`} // Assign unique id for each table
                style={{
                  border: '1px solid #ddd',
                  width: '300px',
                  marginTop: '10px',
                  borderRadius: '8px',
                  marginRight: '50px'
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ borderRight: '1px solid #ddd', paddingLeft: '10px' }}>SKU</td>
                    <td style={{ paddingLeft: '10px' }}>{item.sku}</td>
                  </tr>
                  <tr>
                    <td style={{ borderRight: '1px solid #ddd', paddingLeft: '10px' }}>Description</td>
                    <td style={{ paddingLeft: '10px' }}>{item.description}</td>
                  </tr>
                  <tr>
                    <td style={{ borderRight: '1px solid #ddd', paddingLeft: '10px' }}>Category</td>
                    <td style={{ paddingLeft: '10px' }}>{item.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          <Button onClick={handleExportPPT} type="primary" style={{ marginTop: 20 }}>
            Export to PPT
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ApparelPPt;
