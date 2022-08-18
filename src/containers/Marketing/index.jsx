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
import TopPreview from '../../components/marketing-site/TopPreview/index';
import { getNewReleases, getTopMedias } from '../../redux/features/media';
import HowItWorks from '../../components/marketing-site/HowItWorks/index';
import List from '../../components/marketing-site/List/index';
import AppDownload from '../../components/marketing-site/AppDownload';
import Tabs from '../../components/common/TabsArtist/index';
import ScrollMedia from '../../components/media/ScrollMedia';

const today = new Date();

const Marketing = () => {
  //react hooks
  const { push } = useHistory();

  //state
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState('music');
  const [values, setValues] = useState([]);

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

  const topMovies = useSelector((state) => state.media.topMedias.movie);
  const topSongs = useSelector((state) => state.media.topMedias.audio);
  const topVideos = useSelector((state) => state.media.topMedias.video);

  

  useEffect(() => {
    dispatch(visitorColdStart());
  }, []);

  useEffect(() => {
    if (!topSongs.length) return;
    if (selected == 'music') {
      setValues(topSongs);
    }
  }, [topSongs]);

  useEffect(() => {
    if (!visitorToken) return;

    if (!sliders.length && !isFetchingSliders) {
      console.log("fetch sliders called.");
      dispatch(fetchSliders());
    }

    dispatch(getTopMedias({category: 'movie'}));
    dispatch(getTopMedias({category: 'audio'}));
    dispatch(getTopMedias({category: 'video'}));
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

  useEffect(() => {
    if (selected == 'music') {
      setValues(topSongs);
    }

    if (selected == 'movies') {
      setValues(topMovies)
    }

    if (selected == 'videos') {
      setValues(topVideos)
    }
  }, [selected]);
  
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

      <div className='bg-dark'>
        <div className="container py-5">
          <div className="text-center text-light py-3">
            <h1>Home of Entertainment</h1>
            <p>Watch Everywear, Anywear and Any time. Mkondo gives you access to premium content.</p>
          </div>
          <div className="">
            <Tabs 
              onSelect={(val) => setSelected(val)}
              selected={selected}
              options={[
                {title: 'Songs', name: 'music'},
                {title: 'Movies', name: 'movies'},
                {title: 'Videos', name: 'videos'},
              ]} />
          </div>
          <div className="pb-5 mt-3">
            <ScrollMedia
              title={''}
              values={values}
              isLoading={values.length < 1}
              name="marketing-new-release"
              viewMore={``}
              showHeader
            />
          </div>
        </div>
      </div>

      {/* <TopPreview isLoading={false} values={topSongs} /> */}
      <div className='container mt-5'>
        <AppDownload />
      </div>

      {/* <div className={`${styles.section} mt-2 px-4 py-5 text-center text-light`}>
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
      </div> */}
      <div className="bg-dark mt-5">
        <div className="container py-0 my-0">
        <div className="row py-0 my-0 text-light">
            <div className="text-center py-0 my-0">
              <a href="/privacy">Privacy</a> | <a href="/login">Login</a> | <a href="/register">Register</a>
            </div>
          </div>
          <div className="row py-0 my-0 text-light">
            <div className="text-center py-0 my-0">
              <p className='py-0 my-0'>Copyright &copy; Mkondo {Date.now().getFullYear}, All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}



export default Marketing;
