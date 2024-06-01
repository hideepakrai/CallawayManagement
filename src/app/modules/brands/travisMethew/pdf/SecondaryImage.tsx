import React from 'react';
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel';

type Props = {
  record: BasicModelTravis;
};

const SecondaryImage = ({ record }: Props) => {
  const s3_url = "https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/TRAVIS-Images/";

  // Use optional chaining to handle possibly undefined `gallery_images_url`
  const imagePathsArray = record.gallery_images_url?.split(',') ?? [];

  return (
    <div>
      {record.primary_image_url &&
      imagePathsArray.length > 0 ? (
        imagePathsArray.map((path, index) => (
          // <span key={index} style={{ width: "180px", marginLeft:"10px",  }}>
          <span key={index} style={{ width: "180px", marginLeft:"10px",  }}>
            <img
              alt="Secondary"
              style={{
                backgroundColor: "#eee",
                borderRadius: "10px",
                width: "90px",
                border: "1px solid #ddd",
                marginBottom: "5px",
                height: "90px",
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
  );
};

export default SecondaryImage;
