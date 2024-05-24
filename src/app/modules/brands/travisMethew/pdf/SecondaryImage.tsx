import React ,{useEffect, useState}from 'react'
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel';
import { list } from 'aws-amplify/storage';


type Props={
    record:BasicModelTravis
  }
const SecondaryImage = ({record}:Props) => {

    const [primaryImage, setPrimaryImage] = useState<string | null>(null);
    const [imagePaths, setImagePaths] = useState<string[]>([]);
    const s3_url = "https://callaways3bucketd3cd9-dev.s3.ap-south-1.amazonaws.com/";
  
    
  
    useEffect(()=>{
      if(record){
         // console.log("record",record)
        renderImage(record)
      }
    },[record])
  const renderImage=(record:BasicModelTravis)=>{
   
   
  
  }
  
  
  return (
    <div>
        {record &&
         record.secondaryImage&&
         record.secondaryImage.length>0 &&
         record.secondaryImage.map(path => {
            return(
                <span style={{ width: "150px" }} className="">
                <img
                  alt="Special Edition Party Spas"
                  style={{
                    backgroundColor: "#eee",
                    borderRadius: "10px",
                    width: "70px",
                    border: "1px solid #ddd",
                    marginBottom: "5px",
                    height: "70px",
                  }}

                  src={`${s3_url}${path}`}

                />
              </span>
            )
         })
        }
    </div>
  )
}

export default SecondaryImage