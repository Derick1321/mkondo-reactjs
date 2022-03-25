import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './index.module.scss';
import ScrollMedia from '../../../components/media/ScrollMedia/index';
import TheatrePlaylistComponent from './widgets/playlist';
import bg from '$assets/images/theatre-video-sample.png';
import play from '$assets/images/icons/play.svg';
import favourite from '$assets/images/icons/favorite.svg';
import share from '$assets/images/icons/share.svg';
import { useEffect, useState } from 'react';
import { getNewReleases } from '../../../redux/features/media';
import { handleFetch } from '../../../common/requestUtils';
import VideoPlayer from '../../../components/media/VideoPlayer/index';
import { createSubscription, fetchPaymentMethods, fetchProducts } from '../../../redux/features/subscriptions';
import { fetchConfigurations, selectConfigurationByKey } from '../../../redux/features/configuration';
import { THEATRE_PER_STREAM_PRODUCT_ID } from '../../Configuration/Subscription/index';
import { unwrapResult } from '@reduxjs/toolkit';

const TheatreContainer = () => {
    //state
    const [cover, setCover] = useState(bg);
    const [mediaUrl, setMediaUrl] = useState(null);
    const [theatreProduct, setTheatreProduct] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isHandlingWatch, setIsHandlingWatch] = useState(false);

    //store
    const dispatch = useDispatch();
    const { token, user } = useSelector((store) => store.authentication);
    const currentMedia = useSelector((store) => store.theatre.currentMedia);
    const newInTheatreLoading = useSelector((store) => store.media.getNewReleasesPending);
    const newInTheatre = useSelector((store) => store.media.newReleases.movie);

    const product_id = useSelector((state) => selectConfigurationByKey(state, THEATRE_PER_STREAM_PRODUCT_ID));
    const products = useSelector((state) => state.subscription.products);
    const isFetchingProducts = useSelector((state) => state.subscription.fetchProductsLoading);

    //effects
    useEffect(() => {
        console.debug("Theatre Container mounted", newInTheatre);
        if (!newInTheatre.length) {
            console.debug("Fetching new releases");
            dispatch(getNewReleases({
                category: "movie",
            }));
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
        //check if the current media has a cover url and obtain its url
        const effect = handleFetch('GET', `media/presigned-get-url?file_name=${currentMedia.cover_url}`, null, token);
        effect.then((res) => {
          setCover(res.response);
        });
    
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


    const handlePlay = () => {
        // const res = await handleFetch('GET', `media/presigned-get-url?file_name=${currentMedia.media_url}`, null, token);
        setMediaUrl(currentMedia.media_url);
    }

    const handleSubscribe = async (payment_method) => {
        // console.log("Handling subscription", theatreProduct.prices);
        var payload = {
            "type": "one_time",
            "payment_method": payment_method,
            "items": [{
                "price": theatreProduct.prices[0].id,
                "currency": theatreProduct.prices[0].currency,
                "amount": theatreProduct.prices[0].unit_amount,
            }],
            "metadata": {
                "media_id": currentMedia.media_id,
            },
        }

        //buying the theatre video
        let action = await dispatch(createSubscription(payload));
        let response = unwrapResult(action);
        
        //if the video is purchased then play it
        if (!response.payment_intent) {
            showError("Payment Unsuccessful");
            setIsHandlingWatch(false);
            return;
        }
        
        showSuccess("Payment Successful");
        setIsHandlingWatch(false);
        setTimeout(() => {
            handlePlay();
        }, 1000);
    }

    const handleWatch = () => {
        //check if default payment method exists
        if (!user.stripe_customer || !user.stripe_customer.invoice_settings.default_payment_method) {
            showError("Oops, You do not have a default payment method.");
            return;
        }
        setIsHandlingWatch(true);
        handleSubscribe(user.stripe_customer.invoice_settings.default_payment_method);
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
                <div className={styles.theatre} style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.50)), url(${cover})`, }}>
                    <div className={styles.actions}>
                        <img src={favourite} alt="" />
                        <img src={share} alt="" />
                    </div>
                    <div className={styles.description}>
                        <h1>{currentMedia.name}</h1>
                        <p>{currentMedia.description}</p>
                        <div className={styles.details}>
                            <p><strong>Directors: </strong>{currentMedia.movie_director}</p>
                            <p><strong>Staring: </strong>{currentMedia.staring}</p>
                            <p><strong>Genres: </strong>{currentMedia.genres.join()}</p>
                        </div>

                        <div className={styles.play} onClick={isHandlingWatch ? null : handleWatch}>
                            <img src={play} alt="" />
                            <span>Watch</span>
                            {isHandlingWatch && <span className='spinner-border ml-2'></span>}
                        </div>
                    </div>
                </div>
            </div>
        ))}

            <div className={`${styles.container}`}>
                <h1 className={styles.heading1}>Movie Theatre</h1>
                {!theatreProduct && <p>Loading...</p>}
                <div className={styles.margin}>
                    <TheatrePlaylistComponent
                        title="New in Theatre"
                        isLoading={newInTheatreLoading}
                        movies={newInTheatre}
                    />
                </div>

                <div className={styles.margin}>
                    <TheatrePlaylistComponent
                        title="Trending in Theatre"
                        isLoading={newInTheatreLoading}
                        movies={newInTheatre}
                    />
                </div>

                <div className={styles.margin}>
                    <TheatrePlaylistComponent
                        title="Popular"
                        isLoading={newInTheatreLoading}
                        movies={newInTheatre}
                    />
                </div>
            </div>
        </>
    );

}

export default TheatreContainer;