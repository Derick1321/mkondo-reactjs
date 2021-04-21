import React, { useState } from 'react'

export const CropperTool = (props) => {
    const { imageUrl } = props
    const [state, setstate] = useState({
        image: imageUrl,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 4 / 3,
    })
    
    return (
        <Cropper 
            image={state.image}
            crop={state.crop}
            zoom={state.zoom}
            aspect={state.aspect}
            onCropChange={() => console.log("crop changed")}
            onCropComplete={() => console.log("crop complete")}
            onZoomChange={() => console.log("zoom change")}
        />
    )
}
