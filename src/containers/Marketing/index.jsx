import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import logoIcon from '../../assets/images/logo_icon.png'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSliders, selectAllSliders } from '../../redux/features/slider';
import { visitorColdStart } from '../../redux/features/authentication';
import { Carousel } from '../../components/common/Carousel';
import { getMediaUrl } from '../../common/utils';
import { useHistory } from 'react-router-dom';
import { routePaths } from '$common/routeConfig';
import overviewVideo from '../../assets/animations/overview.mov'

const Marketing = () => {
  //react hooks
  const { push } = useHistory();

  //store
  const dispatch = useDispatch();
  const visitorToken = useSelector((store) => store.authentication.visitorToken);
  const sliders = useSelector((store) => selectAllSliders(store));
  const isFetchingSliders = useSelector((store) => store.slider.status == "loading");
  const slider = useSelector((store) => {
    if (!store.slider.data.length) return;
    if (store.slider.data.some((item, index) => index == 3)) {
      return store.slider.data[1];
    }
    return null;
  });

  //state
  const [items, setItems] = useState([]);

  useEffect(() => {
    dispatch(visitorColdStart());
  }, []);

  useEffect(() => {
    if (!visitorToken) return;

    if (!sliders.length && !isFetchingSliders) {
      console.log("fetch sliders called.");
      dispatch(fetchSliders());
    }
    console.log("useEffect triggered.", sliders, isFetchingSliders);
  }, [visitorToken]);

  useEffect(() => {
    if (!slider) return;
    slider.items.map((item) => getMediaUrl(item.image_url, visitorToken).then(res => setItems([...items, res])));
  }, [slider])


  return (
    <div>
      {/* header */}
      <div class={`${styles.header} px-4 py-3 d-flex`}>
        <div class="d-flex">
          <img src={logoIcon} alt="" height="27px" class="mr-1" />
          <h1 class={styles.logo}>Mkondo</h1>
        </div>
        <button onClick={() => push(routePaths.login)} class="btn btn-primary ml-auto">Sign In</button>
      </div>

      <div>
        {slider ? <Carousel items={items} aspect_ratio_x={slider.aspect_ratio_x} aspect_ratio_y={slider.aspect_ratio_y} /> : "No Slider" }
      </div>

      <div class={`${styles.section} mt-2 px-4 py-5 text-center text-light`}>
        <h1>Home of Intertiment</h1>
        <p>Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content.</p>
        <video width="63%" height="90px" class="mt-2" autoPlay muted loop>
            <source src={overviewVideo} />
            Your browser does not support the video tag.
        </video>
      </div>

      <div class={`${styles.section} mt-2 px-4 py-5 text-center text-light`}>
        <h1>Your Favourite Audio</h1>
        <p>Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content.</p>
        <video width="63%" height="90px" class="mt-2" autoPlay muted loop>
            <source src={overviewVideo} />
            Your browser does not support the video tag.
        </video>
      </div>

      <div class={`${styles.section} mt-2 px-4 py-5 text-center text-light`}>
        <h1>New Albums</h1>
        <p>Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content.</p>
        <video width="63%" height="90px" class="mt-2" autoPlay muted loop>
            <source src={overviewVideo} />
            Your browser does not support the video tag.
        </video>
      </div>

      <div class={`${styles.section} mt-2 px-4 py-5 text-center text-light`}>
        <h1>Watch Thouthand of Videos</h1>
        <p>Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content.</p>
        <video width="63%" height="90px" class="mt-2" autoPlay muted loop>
            <source src={overviewVideo} />
            Your browser does not support the video tag.
        </video>
      </div>

      <div class={`${styles.section} mt-2 px-4 py-5 text-center text-light`}>
        <h1>Premium Movies on your Finger Tips</h1>
        <p>Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content.</p>
        <video width="63%" height="90px" class="mt-2" autoPlay muted loop>
            <source src={overviewVideo} />
            Your browser does not support the video tag.
        </video>
      </div>

      <div class={`${styles.section} mt-2 px-4 py-5 text-center text-light`}>
        <h1>We Love Series</h1>
        <p>Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content.</p>
        <video width="63%" height="90px" class="mt-2" autoPlay muted loop>
            <source src={overviewVideo} />
            Your browser does not support the video tag.
        </video>
      </div>

      <div class={`${styles.section} mt-2 px-4 py-5 text-center text-light`}>
        <h1>Mkondo Social</h1>
        <p>Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content.</p>
        <video width="63%" height="90px" class="mt-2" autoPlay muted loop>
            <source src={overviewVideo} />
            Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}


export default Marketing;
