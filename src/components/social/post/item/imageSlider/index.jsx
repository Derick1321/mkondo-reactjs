import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types';
import { getMediaUrl } from '../../../../../common/utils';
import { useSelector } from 'react-redux';

const PostItemImageSlider = (props) => {
    //props
    const { images } = props;

    //state
    const [imageUrls, setImageUrls] = useState([]);

    //store
    const token = useSelector(state => state.authentication.token);

    //effects
    useEffect(async () => {
        if (!images || !token) return;
        images.map(async (filename) => {
            const _url = await getMediaUrl(filename, token);
            setImageUrls([...imageUrls, _url]);
        })
    }, [images, token]);

    return (
        <div>
            {imageUrls.map((url, index) => <img key={url} src={url} width="100%" />)}
        </div>
    )
}

PostItemImageSlider.defaultsProps = {
    images: []
}

PostItemImageSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        caption: PropTypes.string,
    })).isRequired
}

export default PostItemImageSlider;