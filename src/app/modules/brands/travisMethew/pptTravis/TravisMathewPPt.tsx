import React,{useEffect} from 'react'
import { TravisPdfPrint } from '../../../model/pdf/PdfModel'
import PptxGenJS from 'pptxgenjs';
import Image1 from "../../../../../../public/media/demo/1600x1200/1.png"
type Props={
    selectedRowVartionSku:TravisPdfPrint[]
    resetPPT:()=>void
}



const TravisMathewPPt = ({ selectedRowVartionSku, resetPPT }: Props) => {
    useEffect(() => {
        console.log("ppt")
      if (selectedRowVartionSku && selectedRowVartionSku.length > 0) {
        console.log("selectedRowVartionSku",selectedRowVartionSku)
               // debugger
        const pptx = new PptxGenJS();
  
        selectedRowVartionSku.forEach((item) => {
          const slide = pptx.addSlide();
          // Add image to slide
          // slide.addImage({
          // //   path: `https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/TRAVIS-Images/${item.family}/${item.primary_image_url}`,
          //   x: 0.5,
          //   y: 0.5,
          //   w: 2,
          //   h: 2,
          // });

        if(item.otherInfo){
            const tableData2 = [
                // [{ text: 'category', options: { bold: true } }, { text: item.otherInfo?.category }],
                // [{ text: 'color', options: { bold: true } }, { text: item.otherInfo?.color }],
                // [{ text: 'gender', options: { bold: true } }, { text: item.otherInfo?.gender }],
                // [{ text: 'season', options: { bold: true } }, { text: item.otherInfo?.season }],
                // [{ text: 'style_id', options: { bold: true } }, { text: item.otherInfo.style_code }],
                [
                  { text: 'Category', options: { bold: true } },
                  { text: 'Color', options: { bold: true } },
                  { text: 'Gender', options: { bold: true } },
                  { text: 'Season', options: { bold: true } },
                  { text: 'Style_Id', options: { bold: true } }


                ],
                [
                  item.otherInfo?.category || '',
                  item.otherInfo?.color || '',
                  item.otherInfo?.gender || '',
                  item.otherInfo?.season || '',
                  item.otherInfo?.style_code || '',


            
                ]
              ] as (string | { text: string; options?: { bold?: boolean } })[][];
              slide.addTable(tableData2, {
                x: 0.5,
                y: 0.5,
                w: 9,  // Adjust this value to ensure the table width is properly set
                colW: [1.8, 1.8, 1.8, 1.8, 1.8],  // Ensure these values are equal for proper alignment
                border: { pt: 1, color: '000000' },
                fill: 'F1F1F1',
                fontSize: 12,
              });
        }
        
  
          // Add table to slide if variation_sku_data is defined
          if (item.variation_sku_data) {
            //item.variation_sku_data.forEach((data) => {
              const tableData = [
                // [{ text: 'SKU', options: { bold: true } }, { text: data.sku }],
                // [{ text: 'Size', options: { bold: true } }, { text: data.size }],
                // [{ text: 'MRP', options: { bold: true } }, { text: data.mrp }],
                // [{ text: 'QTY', options: { bold: true } }, { text: data.qty }],

                [
                  { text: 'SKU', options: { bold: true } },
                  { text: 'MRP', options: { bold: true } },
                  { text: 'QTY', options: { bold: true } },
                  { text: 'Size', options: { bold: true } }
                ],
                ...item.variation_sku_data.map(data => [
                  data.sku || '',
                  data.mrp || '',
                  data.qty || '',
                  data.size || ''
                ])
              ] as (string | { text: string; options?: { bold?: boolean } })[][];
             
  
              slide.addTable(tableData, {
                x: 0.5,
                y: 1.5,  // Adjust the Y position to avoid overlap with the previous table
                w: 9,  // Adjust this value to ensure the table width is properly set
                colW: [2.25, 2.25, 2.25, 2.25],  // Ensure these values are equal for proper alignment
                border: { pt: 1, color: '000000' },
                fill: 'F1F1F1',
                fontSize: 12,
              });
           // });
          }
        });
  
        pptx.writeFile({ fileName: 'Travis_Presentation.pptx' });
        resetPPT();
      }
    }, [selectedRowVartionSku]);
  
    return null;
  };
  
  

export default TravisMathewPPt