import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Carousel } from '.'
import { getMediaUrl } from '../../../common/utils';
import { selectConfigurations, selectConfigurationByKey, fetchConfigurations } from '../../../redux/features/configuration';
import { fetchSliders, selectSliderById } from '../../../redux/features/slider';
import { PropTypes } from 'prop-types';

const CarouselFromConfiguration = (props) => {
    //props
    const { sliderConfigurationKey } = props;

    //state
    const [sliderItems, setSliderItems] = useState([]);

    //redux
    const dispatch = useDispatch();
    const token = useSelector(state => state.authentication.token);
    // const configurations = useSelector((state) => selectConfigurations(state));
    const slider_configuration = useSelector((state) => selectConfigurationByKey(state, sliderConfigurationKey));
    const slider = useSelector((state) => slider_configuration ? selectSliderById(state, slider_configuration.value) : null);

    //effects
    useEffect(() => {
      if (slider) return;
      dispatch(fetchConfigurations());
      dispatch(fetchSliders());
    }, []);

    useEffect(() => {
      if (!slider || !slider.items) return;
      let _items = [];
      slider.items.map((item, i) => {
        getMediaUrl(item.image_url, token).then(res => {
          _items.push(res);
          setSliderItems(_items);
          // console.log(sliderItems, _items);
        })
      });
    }, [slider])

    return (
      <Carousel items={sliderItems} aspect_ratio_x={slider && slider.aspect_ratio_x} aspect_ratio_y={slider && slider.aspect_ratio_y} />
    );
}

CarouselFromConfiguration.propTypes = {
  sliderConfigurationKey: PropTypes.string,
}

export default CarouselFromConfiguration;