import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { handleFetch } from '../../../common/requestUtils';

export const Item = ({ item }) => {
    const { token } = useSelector(state => state.authentication)

    const [image, setImage] = useState(null)
    
    useEffect(() => {
        handleFetch('GET', `media/presigned-get-url?file_name=${item.image_url}`, null, token)
            .then((res) => setImage(res.response));
    }, [item])

    return (
        <div>
            <img src={image} alt="" width="100%" />
        </div>
    )
}
