import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '$components/common/Button';

import { showModal } from '$redux/features/modal';

import styles from './index.module.scss';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';
import { createSubscription, fetchProducts } from '../../../redux/features/subscriptions';
import { fetchConfigurations, selectConfigurationByKey } from '../../../redux/features/configuration';
import { THEATRE_PER_STREAM_PRODUCT_ID } from '../../../containers/Configuration/Subscription';
import { unwrapResult } from '@reduxjs/toolkit';
import { hideModal } from '../../../redux/features/modal';

const alertIcon = require('$assets/images/alert-icon.svg');

const AlertModal = (props) => {
  //props
  const { media, message } = props;

  //hooks
  const history = useHistory();

  //state
  const [theatreProduct, setTheatreProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //store
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.authentication);
  const product_id = useSelector((state) => selectConfigurationByKey(state, THEATRE_PER_STREAM_PRODUCT_ID));
  const products = useSelector((state) => state.subscription.products);
  const createdSubscription = useSelector((state) => state.subscription.createdSubscription);

  //effects
  useEffect(() => {
    if (!products.length) {
        dispatch(fetchProducts());
    }
    if (!product_id) {
        dispatch(fetchConfigurations());
    }
    if (user.stripe_customer && user.stripe_customer.invoice_settings.default_payment_method) {
      setPaymentMethod(user.stripe_customer.invoice_settings.default_payment_method)
    }
  }, []);

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
    if (!createdSubscription) return;
  }, [createdSubscription]);

  // handlers
  const handleLogin = () => {
    dispatch(showModal('LOGIN_MODAL'));
  };

  const handleSignUp = () => {
    dispatch(showModal('SIGNUP_MODAL'));
  };

  const handleSubscription = () => {
    history.push(routePaths.subscriptions);
  }

  const handleBuy = async (payment_method) => {
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
            "media_id": media.media_id,
        },
    }

      //buying the theatre video
      setIsLoading(true);
      let action = await dispatch(createSubscription(payload));
      let response = unwrapResult(action);
      
      //if the video is purchased then play it
      if (!response.payment_intent) {
          // showError("Payment Unsuccessful");
          // setIsHandlingWatch(false);
          setIsLoading(false);
          return;
      }
      dispatch(hideModal());
      setIsLoading(false);
      // showSuccess("Payment Successful");
      // setIsHandlingWatch(false);
      // setTimeout(() => {
      //     handlePlay();
      // }, 1000);
  }

  // render
  return (
    <div className="row p-4">
      <div className="col-12 col-md-4 col-lg-3">
        <img
          className={styles.alertIcon}
          src={alertIcon}
          alt=""
        />
      </div>
      <div className="col-12 col-md-8 col-lg-9">
        <p className="heading-1 mt-2">OOps</p>
        <p className="mt-2">{message ? message : 'To access premium contents you must first.'}</p>
        {media && !media.theatre && media.premium && (
          <div>
            <Button onClick={handleSubscription}>Subscribe</Button>
          </div>
        )}

        {media && media.theatre && (
          <div>
            {paymentMethod && <Button onClick={() => handleBuy(paymentMethod)} isLoading={isLoading}>Buy Now!</Button>}
            {!paymentMethod && <Button onClick={() => history.push(routePaths.paymentsCreate)}>Add Payment Method</Button>}
            {theatreProduct && <p>At only {theatreProduct.prices[0].unit_amount/100} {theatreProduct.prices[0].currency}</p>}
          </div>
        )}
        {!token && (
          <>
            <div className="row mt-2 justify-content-center align-items-center">
              <div className="col">
                Don&apos;t have an account?
              </div>
              <div className="col-9">
                <Button
                  style={styles.alertSignMk}
                  onClick={handleSignUp}
                  isTransparent
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AlertModal;
