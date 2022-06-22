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
import FAQItem from './widgets/FAQ/faq_item';
import MkondoLogo from '../../components/common/logo/index';


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
    if (store.slider.data.some((item, index) => index == 0)) {
      return store.slider.data[0];
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
    let _items = [];
    slider.items.map((item, i) => {
      getMediaUrl(item.image_url, visitorToken).then(res => {
        _items.push(res);
        setItems(_items);
        console.log(items, _items);
      })
    });
  }, [slider])


  return (
    <div>
      {/* header */}
      <div className={`${styles.header} px-4 py-3 d-flex`}>
        <MkondoLogo />
        <button onClick={() => push(routePaths.login)} className="btn btn-primary ml-auto">Login</button>
        <button onClick={() => push(routePaths.register)} className="btn btn-primary ml-2">Register</button>
      </div>

      <div>
        {slider ? <Carousel items={items ?? []} aspect_ratio_x={slider.aspect_ratio_x} aspect_ratio_y={slider.aspect_ratio_y} /> : "No Slider" }
      </div>

      <div className={`${styles.section} mt-2 px-4 py-5 text-center text-light`}>
        <h1>Home of Entertainment</h1>
        <p>Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content.</p>
        <video width="60%" className="mt-2" autoPlay muted loop>
            <source src={overviewVideo} />
            Your browser does not support the video tag.
        </video>
      </div>

      <div className={`${styles.section} mt-4 py-5 text-center text-light`}>
        <h1 className="px-4">Frequently Asked Questions</h1>

        <div className="mt-5">
          <FAQItem title="What is Mkondo?" description="Mkondo is a Media Platform that offers Premium Audio and Video Contents." />
          
          <div className="mt-2">
            <FAQItem title="How much does Mkondo Cost?" description="Mkondo is a Media Platform that offers Premium Audio and Video Contents." />
          </div>

          <div className="mt-2">
            <FAQItem title="Where can i Watch?" description="Mkondo is a Media Platform that offers Premium Audio and Video Contents." />
          </div>

          <div className="mt-2">
            <FAQItem title="How do i cancel?" description="Mkondo is a Media Platform that offers Premium Audio and Video Contents." />
          </div>

          <div className="mt-2">
            <FAQItem title="What can i watch on Mkondo?" description="Mkondo is a Media Platform that offers Premium Audio and Video Contents." />
          </div>

          <div className="mt-2">
            <FAQItem title="Is mkondo good for kids?" description="Mkondo is a Media Platform that offers Premium Audio and Video Contents." />
          </div>
        </div>
      </div>

     
    </div>
  )
}



export default Marketing;
