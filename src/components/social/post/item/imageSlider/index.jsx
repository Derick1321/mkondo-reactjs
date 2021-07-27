import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types';
import { getMediaUrl } from '../../../../../common/utils';
import { useSelector } from 'react-redux';
import ImageSliderImage from './image';
import { Carousel } from '../../../../common/Carousel/index';
import styles from './index.module.scss';

const PostItemImageSlider = (props) => {
    //props
    const { images } = props;

    //state
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(images.length);

    //handles
    const handleNext = () => {
        if (current < (total - 1)) {
            setCurrent(current + 1);
        } else {
            setCurrent(0);
        }  
    }

    const handlePrev = () => {
        if (current > 0) {
            setCurrent(current - 1);
        } else {
            setCurrent(total - 1);
        }  
    }


    return (
        <div className={`${styles.wrapper}`}>
            <ImageSliderImage key={images[current].url} filename={images[current].url} />
            <div className="d-flex">
                <button onClick={handleNext}>Next</button>
                <button onClick={handlePrev}>Previous</button>
            </div>
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