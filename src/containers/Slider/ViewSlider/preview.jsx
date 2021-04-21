import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { handleFetch } from '../../../common/requestUtils'
import { Carousel } from '../../../components/common/Carousel'
import { selectAllSliderPictures } from '../../../redux/features/slider'

export const Preview = ({ slider_id }) => {
    const { token } = useSelector(state => state.authentication)
    const pictures = useSelector(state => selectAllSliderPictures(state, slider_id))
    const [images, setImages] = useState([])
    
    const loadImage = async (item) => {
        const res = await handleFetch('GET', `media/presigned-get-url?file_name=${item.image_url}`, null, token)
        return res.response
    }

    useEffect(async () => {
        const items = await Promise.all(pictures.map(async (item) => {
            return loadImage(item)
        }))
        setImages(items)
    }, [setImages, pictures])

    return (
        <div>
            <Carousel items={images} />
        </div>
    )
}
