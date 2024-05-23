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
  const s3_url = "https://callaways3bucketd3cd9-dev.s3.ap-south-1.amazonaws.com/";

  

  useEffect(()=>{
    if(record){
      renderImage(record)
    }
  },[record])
const renderImage=(record:BasicModelTravis)=>{
 
  let newSKU


  if (record &&record?.sku ) {
    const removeLastUnderscore = (str: string) => {
      const lastUnderscoreIndex = str.lastIndexOf('_');
      if (lastUnderscoreIndex !== -1) {
        return str.substring(0, lastUnderscoreIndex);
      }
      return str;
    };
    newSKU = removeLastUnderscore(record?.sku);
    const folderPath = 'https://callawaytech.s3.ap-south-1.amazonaws.com/omsimages/productimg/TRAVIS-Images/';
   checkFolderExists(newSKU)
  }

}

const checkFolderExists = async (bucketName: string,) => {
  try {
     
    const result = await list({
      path: 'public/productimg/TRAVIS-Images/',
    
    });
 
    const folderPath = `public/productimg/TRAVIS-Images/${bucketName}/`;

const folderExists = result.items.some((item) => {
return item.path.startsWith(folderPath);
});

if (folderExists) {
const imagePaths = result.items
  .filter((item) => item.path.startsWith(folderPath))
  .map((item) => item.path);
 
if (imagePaths.length > 0) {
 const primary_image = imagePaths[0];
 setPrimaryImage(primary_image)
  //const secondary_image = imagePaths.slice(1);
  setImagePaths(imagePaths)
 
} else {
  console.log(`No images found in folder ${bucketName}.`);
}
} else {
console.log(`Folder ${bucketName} does not exist.`);
}
    
  } catch (error) {
    console.error('Error checking folder existence:', error);
    return false; // Return false in case of any error
  }
}
  return (
    <div>
 {primaryImage?(
            <Image.PreviewGroup
            items={imagePaths.map(path => `${s3_url}${path}`)}
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