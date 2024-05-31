import React, { useEffect, useState } from 'react'
import { Image } from 'antd';
import { list } from 'aws-amplify/storage';
import { BasicModelTravis } from '../../../../model/travis/TravisMethewModel';

type Props={
  record:BasicModelTravis
}
const ImageRenderer = ({record}:Props) => {
  const [primaryImage, setPrimaryImage] = useState<string | null>(null);
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const s3_url = `https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/TRAVIS-Images/${record.family}/`;
  //const s3_url = `https://callaways3bucketcc001-prod.s3.ap-south-1.amazonaws.com/public/productimg/TRAVIS-Images/`;

   const[secondaryImage, setSecondaryImage]= useState<string[]>([])
  useEffect(()=>{
    if(record.primary_image_url &&record.gallery_images_url){

        const imagePathsArray = record.gallery_images_url.split(',');
        setSecondaryImage(imagePathsArray)
        setPrimaryImage(record.primary_image_url)
      
      
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
                src="https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/uploads/thumbnail_tm_logo_52e3761629.png"
                alt="Primary Image"
                style={{ maxWidth: "30px", marginRight: "5px" }}
                width={30}
              />
            </span>
          )}

    </div>
  )
}

export default ImageRenderer