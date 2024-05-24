import React ,{useEffect, useState}from 'react'
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel';
import { list } from 'aws-amplify/storage';

type Props={
    record:BasicModelTravis
  }
const PrimaryImage = ({record}:Props) => {

    const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const s3_url = "https://callaways3bucketd3cd9-dev.s3.ap-south-1.amazonaws.com/";

  

  return (
    <div>
       {record.primaryImage ? 
     (  <img
                            alt="Special Edition Party Spas"
                            style={{
                              backgroundColor: "#eee",
                              borderRadius: "10px",
                              width: "225px"
                            }}
                            src={`${s3_url}${record.primaryImage}`}
                          />):(
                            <img
                               alt="Special Edition Party Spas"
                               style={{
                                 backgroundColor: "#eee",
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