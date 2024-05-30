import React from 'react'
import { OgioBasicModel } from '../../../model/ogio/OgioBrandModel';


type Props = {
    record: OgioBasicModel;
  };
const OgioSecondaryImages = ({ record }: Props) => {

    const s3_url = "https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/";

  // Use optional chaining to handle possibly undefined `gallery_images_url`
  const imagePathsArray = record.gallery_images_url?.split(',') ?? [];
  return (
    <div>
    {record.primary_image_url &&
    record.primary_image_url.startsWith("public/productimg/OGIO") &&
    imagePathsArray.length > 0 ? (
      imagePathsArray.map((path, index) => (
        <span key={index} style={{ width: "150px" }}>
          <img
            alt="Secondary"
            style={{
              backgroundColor: "#eee",
              borderRadius: "10px",
              width: "70px",
              border: "1px solid #ddd",
              marginBottom: "5px",
              height: "70px",
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