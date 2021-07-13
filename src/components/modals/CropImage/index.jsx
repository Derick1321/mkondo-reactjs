import React from 'react'
import { CroppingTool } from '../../common/CroppingTool/index';
import { useSelector } from 'react-redux';
import { updateCroppedImage } from '../../../redux/features/croptool';

export const CropImageModal = () => {
    // aspectRatio, width, locked, onChange
    //redux
    const modalProps = useSelector((store) => store.modal.modalProps);
    return (
        <div className="row">
            <div className="col-md-auto mx-auto">
            <h1>Image Cropping</h1>
            <CroppingTool 
                src={modalProps.src}
                aspectRatio={modalProps.aspectRatio} 
                width={modalProps.width} 
                locked={modalProps.locked} 
                onChange={(blob) => {
                    
                }} />
            </div>
        </div>
    )
}
