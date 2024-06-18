import React, { useEffect, useState } from 'react'
import { BasicModelApparel } from '../../../../model/apparel/CallawayApparelModel';
import { list } from 'aws-amplify/storage';

type Props = {
  record: BasicModelApparel
}
const PrimaryImage = ({ record }: Props) => {

  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
   const s3_url = "https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/TRAVIS-Images/";
  //const s3_url = `https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/TRAVIS-Images/${record.family}/`;


  return (
    <div>
      {record.primary_image_url ?
        (<img
          alt={record.name}
          style={{
            backgroundColor: "#d1d3d4",
            borderRadius: "10px",
            width: "400px"
          }}
          src={`${s3_url}${record.primary_image_url}`}
        />) : (
          <img
            alt="Special Edition Party Spas"
            style={{
              backgroundColor: "#d1d3d4",
              borderRadius: "10px",
              width: "225px"
            }}
            src={`https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/large_51xntqlp_Sy_L_AC_SL_1500_a17350c6f1_d08da64450.jpg`}
          />

        )
      }
    </div>
  )
}

export default PrimaryImage