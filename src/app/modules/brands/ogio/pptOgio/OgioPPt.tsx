import React,{useEffect} from 'react'
import { TravisPdfPrint } from '../../../model/pdf/PdfModel'
import PptxGenJS from 'pptxgenjs';
import Image1 from "../../../../../../public/media/demo/1600x1200/1.png"
type Props={
    selectedRowVartionSku:TravisPdfPrint[]
    resetPPT:()=>void
}



const OgioPPt = ({ selectedRowVartionSku, resetPPT }: Props) => {
    useEffect(() => {
        console.log("ppt")
      if (selectedRowVartionSku && selectedRowVartionSku.length > 0) {
        console.log("selectedRowVartionSku",selectedRowVartionSku)
        
        const pptx = new PptxGenJS();
  
        selectedRowVartionSku.forEach((item) => {
          const slide = pptx.addSlide();
          // Add image to slide
          // slide.addImage({
          //   path: `https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/TRAVIS-Images/${item.family}/${item.primary_image_url}`,
          //   x: 0.5,
          //   y: 0.5,
          //   w: 2,
          //   h: 2,
          // });

        if(item.otherInfo){
            const tableData2 = [
              [
                { text: 'Category', options: { bold: true } },
                { text: 'MRP', options: { bold: true } },
                { text: 'Product Model', options: { bold: true } }
              ],
              [
                item.otherInfo?.category || '',
                item.otherInfo?.mrp || '',
                item.otherInfo?.product_model || ''
              ]

              ] as (string | { text: string; options?: { bold?: boolean } })[][];
              slide.addTable(tableData2, {
                x: 3,
                y: 2,
                w: 5,
                colW: [2, 3],
                border: { pt: 1, color: '000000' },
                fill: 'F1F1F1',
                fontSize: 12,
              });
        }
        
  
          // Add table to slide if variation_sku_data is defined
          if (item.variation_sku_data) {
            //item.variation_sku_data.forEach((data) => {
              const tableData = [
                [
                  { text: 'SKU', options: { bold: true } },
                  { text: 'MRP', options: { bold: true } },
                  { text: 'QTY', options: { bold: true } },
                  { text: 'Product Type', options: { bold: true } }
                ],
                ...item.variation_sku_data.map(data => [
                  data.sku || '',
                  data.mrp || '',
                  data.qty || '',
                  data.product_type || ''
                ])

              ] as (string | { text: string; options?: { bold?: boolean } })[][];
             
  
              slide.addTable(tableData, {
                x: 3,
                y: 0.5,
                w: 5,
                colW: [2, 3],
                border: { pt: 1, color: '000000' },
                fill: 'F1F1F1',
                fontSize: 12,
              });
            //});
          }
        });
  
        pptx.writeFile({ fileName: 'Ogio_Presentation.pptx' });
        resetPPT();
      }
    }, [selectedRowVartionSku]);
  
    return null;
  };
  
  

export default OgioPPt