import React from 'react';
import {BasicModelTravis,BasicModelTravisGraph,ImageType} from "../../../../model/travis/TravisMethewModel"
import { Image } from 'antd';



type Props = {
    value:ImageType
}


const ImageRenderer = ({ value }:Props) => {

   

  if (value && value.data &&
    value?.data[0]?.attributes &&
    value?.data[0]?.attributes?.formats &&
    value?.data[0]?.attributes?.formats?.medium &&
    value?.data[0]?.attributes?.formats?.medium?.url
    
) {
    const mediumUrls = [
        value?.data[0]?.attributes?.formats?.medium?.url,
        value?.data[1]?.attributes?.formats?.medium?.url,
        value?.data[2]?.attributes?.formats?.medium?.url
      ].filter(Boolean);
      const previewItems = mediumUrls.map((url) => `https://admin.callawayindiaoms.com${url}`);
    return (
        <span>
          <Image.PreviewGroup
            items={previewItems}
          >
           {value &&
           value?.data[0]&&
           value?.data[0]?.attributes &&
           value?.data[0]?.attributes?.formats &&
           value?.data[0]?.attributes?.formats?.medium &&
           value?.data[0]?.attributes?.formats?.medium?.url &&
            <Image
              src={`https://admin.callawayindiaoms.com${value.data[0].attributes.formats.medium.url}`}
              alt="Primary Image"
              style={{ maxWidth: "50px", marginRight: "5px" }}
              width={30}
            />}
          </Image.PreviewGroup>
        </span>
      );
  } else {
    return (
      <span>
        <img
          src="/media/icons/icon-callway.png"
          alt="Primary Image"
          style={{ maxWidth: "30px", marginRight: "5px" }}
        />
      </span>
    );
  }
};

export default ImageRenderer;
