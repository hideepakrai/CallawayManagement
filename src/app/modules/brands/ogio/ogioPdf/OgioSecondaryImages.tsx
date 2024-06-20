import React from 'react'
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';


type Props = {
    record: OgioBasicModel;
  };
const OgioSecondaryImages = ({ record }: Props) => {
 // https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/OGIO-Images/5924115OG/5924115OG_A.png
  const s3_url = `https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/OGIO-Images/${record.family}/`
   console.log("record ",record)
  // Use optional chaining to handle possibly undefined `gallery_images_url`
  const updatedString = record.gallery_images_url?record.gallery_images_url.replace(/\s+/g, ''):""
  const imagePathsArray = updatedString?.split(',') ?? [];
  return (
    <div>
    {record.primary_image_url &&
   
    imagePathsArray.length > 0 ? (
      imagePathsArray.map((path, index) => (
        <span key={index} style={{ width: "150px", marginLeft:"10px" }}>
          <img
           // alt={record.family}
            style={{
              backgroundColor: "#eee",
              borderRadius: "10px",
              width: "160px",
              border: "1px solid #ddd",
              marginBottom: "5px",
              
            }}
            src={`${s3_url}${path}`}
            onError={(e) => console.error(`Failed to load image at ${s3_url}${path}`)}
          />
        </span>
      ))
    ) : (
      <p>No secondary images available</p>
    )}
  </div>
  )
}

export default OgioSecondaryImages