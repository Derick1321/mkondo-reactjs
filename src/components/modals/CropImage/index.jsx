import React from 'react'
import { CroppingTool } from '../../common/CroppingTool/index';
import { useSelector, useDispatch } from 'react-redux';
import { updateCroppedImage } from '../../../redux/features/croptool';
import { getFileURL } from '$common/utils';

export const CropImageModal = ({
    src,
    aspectRatio,
    width,
    locked
}) => {
    //redux
    const dispatch = useDispatch();
    // aspectRatio, width, locked, onChange
    //redux
    // const modalProps = useSelector((store) => store.modal.modalProps);

    return (
        <div className="row">
            <div className="col-md-auto mx-auto">
            <h1>Image Cropping</h1>
            <CroppingTool 
                src={src}
                aspectRatio={aspectRatio} 
                width={width} 
                locked={locked} 
                onChange={(blob) => {
                    let fileUrl = getFileURL(blob)
                    console.log("Image Cropped", fileUrl);
                    dispatch(updateCroppedImage(fileUrl));
                }} />
            </div>
        </div>
    )
}
