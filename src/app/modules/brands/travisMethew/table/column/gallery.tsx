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
    value?.data[0]?.attributes?.formats?.thumbnail &&
    value?.data[0]?.attributes?.formats?.thumbnail?.url
    
) {
    const thumbnailUrls = [
        value?.data[0]?.attributes?.formats?.thumbnail?.url,
        value?.data[1]?.attributes?.formats?.thumbnail?.url,
        value?.data[2]?.attributes?.formats?.thumbnail?.url
      ].filter(Boolean);
      const previewItems = thumbnailUrls.map((url) => `https://admin.callawayindiaoms.com${url}`);
    return (
        <span>
          <Image.PreviewGroup
            items={previewItems}
          >
           {value &&
           value?.data[0]&&
           value?.data[0]?.attributes &&
           value?.data[0]?.attributes?.formats &&
           value?.data[0]?.attributes?.formats?.thumbnail &&
           value?.data[0]?.attributes?.formats?.thumbnail?.url &&
            <Image
              src={`https://admin.callawayindiaoms.com${value.data[0].attributes.formats.thumbnail.url}`}
              alt="Primary Image"
              style={{ maxWidth: "30px", marginRight: "5px" }}
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
