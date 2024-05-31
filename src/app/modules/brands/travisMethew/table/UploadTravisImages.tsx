import React from 'react'
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from "react-redux"
import { BasicModelTravis } from '../../../model/travis/TravisMethewModel';
import { getTravisProducts } from '../../../../slice/allProducts/TravisMethewSlice';
import { UpDateTravisImages } from '../api/UpdateProductData';
import { UploadImageModel } from '../../../model/uploadImage/UploadImageModel';


type Props = {
    resetUploadImages: () => void
}
const UploadTravisImages = ({ resetUploadImages }: Props) => {
    const getProduct: BasicModelTravis[] = useSelector(getTravisProducts)


    // useEffect(() => {
    //     const alltravisImges: BasicModelTravis[] = []
    //     if (getProduct &&
    //         getProduct.length > 0
    //     ) {
    //         getProduct.map((item: BasicModelTravis) => {
    //             if (item.sku && item.primaryImage && item.secondaryImage) {
    //                 const data = {
    //                     sku: item.sku,
    //                     primary_image_url: item.primaryImage,
    //                     gallery_images_url: item.secondaryImage.toString()

    //                 }
    //                 alltravisImges.push(data)
    //             }

    //         })
    //     }
    //     UpdateTravisImage(alltravisImges)
    // }, [getProduct])

    // const UpdateTravisImage = async (travisImages: UploadImageModel) => {
    //     try {
    //         const response = await UpDateTravisImages(travisImages);

    //         resetUploadImages()

    //     } catch (error) {
    //         resetUploadImages()
    //     }
    // }


    return (
        <div></div>
    )
}

export default UploadTravisImages