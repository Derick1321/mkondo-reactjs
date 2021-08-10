import React, { useState } from 'react'
import { PropTypes } from 'prop-types';
import VideoSliderVideo from './video';

const PostItemVideoSlider = (props) => {
    //props
    const { videos } = props;

     //state
    const [current, setCurrent] = useState(0);
    const [total, setTotal] = useState(videos.length);

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
        <div>
            <VideoSliderVideo key={videos[current].url} filename={videos[current].url} />
            <div className="d-flex">
                <button onClick={handleNext}>Next</button>
                <button onClick={handlePrev}>Previous</button>
            </div>
        </div>
    )
}

PostItemVideoSlider.defaultProps = {
    videos: [],
}

PostItemVideoSlider.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        url: PropTypes.string,
        caption: PropTypes.string
    })).isRequired
}

export default PostItemVideoSlider;