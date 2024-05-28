import React, { useEffect, useState } from 'react'
import { Image } from 'antd';
import { list } from 'aws-amplify/storage';
import { OgioBasicModel } from '../../../../model/ogio/OgioBrandModel';

type Props={
  record:OgioBasicModel
}
const OgioGallery = ({record}:Props) => {
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
   const s3_url = "https://callaways3bucketd3cd9-dev.s3.ap-south-1.amazonaws.com/";
  //const s3_url = "https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/";

   const[secondaryImage, setSecondaryImage]= useState<string[]>([])
  useEffect(()=>{
    if(record.primary_image_url &&record.gallery_images_url){
      if(record.primary_image_url.startsWith("public/productimg/OGIO")){
        const imagePathsArray = record.gallery_images_url.split(',');
        setSecondaryImage(imagePathsArray)
        setPrimaryImage(record.primary_image_url)
      }
      
    }
  },[record])
  return (
    <div>
 {primaryImage
  &&secondaryImage ?(
            <Image.PreviewGroup
            items={secondaryImage.map(path => `${s3_url}${path}`)}
            >
              <Image
                width={42}
                src={`${s3_url}${primaryImage}`}
              />
            </Image.PreviewGroup>
          ) : (
            <span>

              <img
                src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/ogio_favicon_ac591c347e_8de0fee6f4.png"
                alt="Primary Image"
                style={{ maxWidth: "30px", marginRight: "5px" }}
                width={30}
              />
            </span>
          )}

    </div>
  )
}

export default OgioGallery