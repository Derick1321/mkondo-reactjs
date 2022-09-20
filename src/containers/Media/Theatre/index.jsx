import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.scss';
import ScrollMedia from '../../../components/media/ScrollMedia/index';
import TheatrePlaylistComponent from './widgets/playlist';
import bg from '$assets/images/theatre-video-sample.png';
import play from '$assets/images/icons/play.svg';
import favourite from '$assets/images/icons/favorite.svg';
import share from '$assets/images/icons/share.svg';
import { useEffect, useState, useRef } from 'react';
import { getNewReleases, checkSubscriptionStatusApiRequest, getTopMedias, getTrendMedias, getNewSeries, updateCollectionPayload } from '../../../redux/features/media';
import { handleFetch } from '../../../common/requestUtils';
import VideoPlayer from '../../../components/media/VideoPlayer/index';
import { createSubscription, fetchPaymentMethods, fetchProducts } from '../../../redux/features/subscriptions';
import { fetchConfigurations, selectConfigurationByKey } from '../../../redux/features/configuration';
import { THEATRE_PER_STREAM_PRODUCT_ID } from '../../Configuration/Subscription/index';
import { unwrapResult } from '@reduxjs/toolkit';
import { setTheatreCurrentMedia } from '../../../redux/features/theatre';
import { getMediaUrl } from '../../../common/utils';
import { showModal } from '../../../redux/features/modal';
import Tabs from '../../../components/common/Tabs/index';
import SeriesItemComponent from './widgets/series/index';
import { routePaths } from '../../../common/routeConfig';
import { generatePath, useHistory } from 'react-router-dom';


const TheatreContainer = () => {
    //hooks
    const heroRef = useRef(null);
    const history = useHistory();

    //state
    const [cover, setCover] = useState(bg);
    const [mediaUrl, setMediaUrl] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);
    const [theatreProduct, setTheatreProduct] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isHandlingWatch, setIsHandlingWatch] = useState(false);
    const [heroWidth, setHeroWidth] = useState(null);
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);
    const [selectedTab, setSelectedTab] = useState("movies");

    //store
    const dispatch = useDispatch();
    const { token, user } = useSelector((store) => store.authentication);
    const state = useSelector(state => state);
    const currentMedia = useSelector((store) => store.theatre.currentMedia);
    
    const newInTheatreLoading = useSelector((store) => store.media.getNewReleasesPending);
    const popularInTheatreLoading = useSelector((store) => store.media.getTopMediasPending);
    const trendingInTheatreLoading = useSelector((store) => store.media.getTrendMediasPending);
    const newInTheatre = useSelector((store) => store.media.newReleases.movie);
    const popularInTheatre = useSelector((store) => store.media.topMedias.movie);
    const trendingInTheatre = useSelector((store) => store.media.trendMedias.movie);

    const newSeriesLoading = useSelector((store) => store.media.getNewSeriesPending);
    const newSeries = useSelector((store) => store.media.newSeries.items);

    const product_id = useSelector((state) => selectConfigurationByKey(state, THEATRE_PER_STREAM_PRODUCT_ID));
    const products = useSelector((state) => state.subscription.products);
    const isFetchingProducts = useSelector((state) => state.subscription.fetchProductsLoading);
    const createdSubscription = useSelector((state) => state.subscription.createdSubscription);

    //effects
    useEffect(() => {
        console.debug("Theatre Container mounted", newInTheatre);
        if (!newInTheatre.length) {
            console.debug("Fetching new releases");
            dispatch(getNewReleases({
                category: "movie",
            }));
        }
        if (!popularInTheatre.length) {
            console.debug("Fetching popular media");
            dispatch(getTopMedias({category: "movie"}));
        }
        if (!trendingInTheatre.length) {
            console.debug("Fetching trending media");
            dispatch(getTrendMedias({category: "movie"}));
        }
        if (!newSeries.length) {
            console.debug("Fetching new series");
            dispatch(getNewSeries());
        }
        if (!products.length) {
            dispatch(fetchProducts());
        }
        if (!product_id) {
            dispatch(fetchConfigurations());
        }
    }, []);

    useEffect(() => {
        if (!currentMedia) return;
        setMediaUrl(null);
        setTrailerUrl(null);
        //check if the current media has a cover url and obtain its url
        const effect = handleFetch('GET', `media/presigned-get-url?file_name=${currentMedia.cover_url}`, null, token);
        effect.then((res) => {
          setCover(res.response);
        });
        
        getMediaUrl(currentMedia.media_url, token).then(url => setTrailerUrl(url));
        checkSubscription();
        return () => {
          effect
        }
    }, [currentMedia]);

    useEffect(() => {
        console.log(products, product_id)
        if (!products.length || !product_id) return;
        let product = products.find((p) => p.id == product_id.value)
        console.log("product",  product)
        if (product) {
            setTheatreProduct(product);
        }
    }, [products, product_id])

    useEffect(() => {
        if (!newInTheatre) return;
        if (!newInTheatre.length) return;
        if (currentMedia) return;
        dispatch(setTheatreCurrentMedia(newInTheatre[0]));
    }, [newInTheatre, currentMedia]);

    useEffect(() => {
        console.log("Hero Ref Changed", heroRef.current);
        if (!heroRef.current) return;
        setHeroWidth(heroRef.current.offsetWidth);
    }, [heroRef]);

    useEffect(() => {
        if (!createdSubscription) return;
        if (!createdSubscription.payment_intent) return;
        if (createdSubscription.payment_intent.metadata.media_id != currentMedia.media_id) return;
        showSuccess(`Congrats! You have successfully purchased ${currentMedia.name}.`);
        checkSubscription();
    }, [createdSubscription]);

    //handlers
    const handlePlay = async () => {
        // const res = await handleFetch('GET', `media/presigned-get-url?file_name=${currentMedia.media_url}`, null, token);
        if (!subscriptionStatus) {
            await checkSubscription();
        }

        if (!subscriptionStatus.success) {
            dispatch(showModal('ALERT_MODAL', {
                media: currentMedia,
            }));
        }

        if (subscriptionStatus.subscribed) {
            setMediaUrl(currentMedia.media_url);
        }
    }

    const checkSubscription = async () => {
        setIsHandlingWatch(true);
        try {
            const res = await checkSubscriptionStatusApiRequest(currentMedia.media_id, state);
            console.log("Checking Subscription", res);
            setSubscriptionStatus(res);
        } catch (e) {
            const jsonRes = JSON.parse(e);
            setSubscriptionStatus(jsonRes);
        }
        setIsHandlingWatch(false);
    }

    const showError = (message) => {
        if (message) {
            setErrorMessage(message);
            setTimeout(() => {
                setErrorMessage("")
            }, 2000);
        }
    }

    const showSuccess = (message) => {
        if (message) {
            setSuccessMessage(message);
            setTimeout(() => {
                setSuccessMessage("")
            }, 2000);
        }
    }

    const handleSelectCurrentMedia = (media) => {
        dispatch(setTheatreCurrentMedia(media));
    }

    const handleSelectCurrentSeries = (series) => {
        if (!series.episodes) return;
        dispatch(setTheatreCurrentMedia(series.episodes[0]));
    }
    
    return (
        <>
        {currentMedia && (mediaUrl ? <VideoPlayer url={mediaUrl} /> : (
            <div className={styles.theatreWrapper}>
                {successMessage && (
                    <div className={styles.success}>
                        <p>{successMessage}</p>
                    </div>
                )}

                {errorMessage && (
                    <div className={styles.error}>
                        <p>{errorMessage}</p>
                    </div>
                )}

                <div ref={heroRef} className={styles.theatre} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.50)), url(${cover})`, zIndex: '-1', }}>
                    {trailerUrl && (
                        <>
                            <div style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.50))`, height: '100%', width: '100%', position: 'absolute', zIndex: '0', }}></div>
                            <div className={styles.fadingBackground}></div>
                            <video className={styles.backgroundTrailer} style={{ zIndex: '-1', }} height="auto" width="100%" autoplay="autoplay" poster={cover} loop muted>
                                <source src={trailerUrl} type="video/mp4" />
                            </video>
                        </>
                    )}
                    {/* <div className={styles.actions}>
                        <img src={favourite} alt="" />
                        <img src={share} alt="" />
                    </div> */}
                    <div className={styles.description}>
                        <h1>{currentMedia.name}</h1>
                        <p>{currentMedia.description}</p>
                        <div className={styles.details}>
                            {/* <p><strong>Directors: </strong>{currentMedia.movie_director}</p>
                            <p><strong>Staring: </strong>{currentMedia.staring}</p> */}
                            <p><strong>Genres: </strong>{currentMedia.genres.join()}</p>
                        </div>

                        <div className={styles.play} onClick={isHandlingWatch ? null : handlePlay}>
                            {isHandlingWatch ? <span className='spinner-border mr-2'></span> : <img src={play} alt="" />}
                            <span>Watch</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}

            <div className={`${styles.container} ${currentMedia && !mediaUrl && styles.floatAbove}`}>
                {/* <h1 className={styles.heading1}>Movie Theatre</h1> */}
                {!theatreProduct && <p>Loading...</p>}
                <div className={styles.margin}>
                    <div className="my-5">
                        <Tabs
                            onSelect={(val) => setSelectedTab(val)}
                            selected={selectedTab}
                            options={[
                                { name: 'movies', title: 'Movies' },
                                { name: 'series', title: 'TV Shows' },
                            ]}
                            activeColor="pink"
                        />
                    </div>
                </div>

                {selectedTab == "movies" ? (
                    <>
                        {(newInTheatreLoading || newInTheatre.length) ? (
                            <div className={styles.margin}>
                                <TheatrePlaylistComponent
                                    title="New Movies in Mkondo"
                                    isLoading={newInTheatreLoading}
                                    movies={newInTheatre}
                                    onMediaClicked={(media) => handleSelectCurrentMedia(media)}
                                />
                            </div>
                        ) : null}

                        {(trendingInTheatreLoading || trendingInTheatre.length) ? (
                            <div className={styles.margin}>
                                <TheatrePlaylistComponent
                                    title="Trending Movies in Mkondo"
                                    isLoading={trendingInTheatreLoading}
                                    movies={trendingInTheatre}
                                />
                            </div>
                        ) : null}

                        {(popularInTheatreLoading || popularInTheatre.length) ? (
                            <div className={styles.margin}>
                                <TheatrePlaylistComponent
                                    title="Popular Movies in Mkondo"
                                    isLoading={popularInTheatreLoading}
                                    movies={popularInTheatre}
                                />
                            </div>
                        ) : null}
                    </>
                ) : null}

                {selectedTab == "series" ? (
                    <div className='my-5 d-flex'>
                        {(!newSeries.length && !newSeriesLoading) 
                            ? <p>No Series Found</p> 
                            : newSeries.map(series => (
                                <div className='mr-2' onClick={() => handleSelectCurrentSeries(series)}>
                                    <SeriesItemComponent series={series} />
                                </div>
                            ))}
                    </div>
                ) : null}
            </div>
        </>
    );

}

export default TheatreContainer;