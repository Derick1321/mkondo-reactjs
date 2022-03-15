import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConfigurations, selectConfigurationByKey } from '../../../redux/features/configuration';
import { WEEKLY_SUBSCRIPTION_PRODUCT_ID } from '../../Configuration/Subscription';
import styles from './index.module.scss'
import { MONTHLY_SUBSCRIPTION_PRODUCT_ID } from '../../Configuration/Subscription/index';
import { fetchProducts, fetchPaymentMethods, createSubscription, fetchSubscriptions } from '../../../redux/features/subscriptions';
import { useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';
import { unwrapResult } from '@reduxjs/toolkit';

const SubscriptionsListContainer = (props) => {
  //state
  const [subscribing, setSubscribing] = useState(null);
  const [weeklyProduct, setWeeklyProduct] = useState(null);
  const [monthlyProduct, setMonthlyProduct] = useState(null);

  //hooks
  const { push } = useHistory();

  //store
  const dispatch = useDispatch();
  const configurations = useSelector((state) => state.configuration.data);
  const products = useSelector((state) => state.subscription.products);
  const isFetchingProducts = useSelector((state) => state.subscription.fetchProductsLoading);
  const paymentMethods = useSelector((state) => state.subscription.paymentMethods);
  const isFetchingPaymentMethods = useSelector((state) => state.subscription.fetchPaymentMethodsLoading);
  const subscriptions = useSelector((state) => state.subscription.subscriptions);
  const isFetchingSubscriptions = useSelector((state) => state.subscription.fetchSubscriptionsLoading);
  const isSubscribing = useSelector((state) => state.subscription.createSubscriptionLoading);
  const isSubscribed = useSelector((state) => state.subscription.createdSubscription);
  const weekly_subscription_product_id = useSelector((state) => selectConfigurationByKey(state, WEEKLY_SUBSCRIPTION_PRODUCT_ID));
  const monthly_subscription_product_id = useSelector((state) => selectConfigurationByKey(state, MONTHLY_SUBSCRIPTION_PRODUCT_ID));

  //effects
  useEffect(() => {
    console.log("fetching payment methods", paymentMethods);
    if (!paymentMethods.length) {
      dispatch(fetchPaymentMethods());
    }
    console.log("Fetching Products...");
    if (!products.length) {
      dispatch(fetchProducts());
    }
    console.log("Fetching Configurations");
    if (!configurations.length) {
      dispatch(fetchConfigurations());
    }
    console.log("Fetching Subscriptions");
    if (!subscriptions.length) {
      dispatch(fetchSubscriptions());
    }
  }, []);

  useEffect(() => {
    console.log("Setting weekly product", weekly_subscription_product_id, products);
    if (products && weekly_subscription_product_id) {
      setWeeklyProduct(products.find(p => p.id === weekly_subscription_product_id.value));
    }
  }, [weekly_subscription_product_id, products]);

  useEffect(() => {
    console.log("Setting monthly product", weekly_subscription_product_id, products);
    if (products && monthly_subscription_product_id) {
      setMonthlyProduct(products.find(p => p.id === monthly_subscription_product_id.value));
    }
  }, [monthly_subscription_product_id, products]);

  useEffect(() => {
    console.log("subscriptions changed", subscriptions);
    if (!subscriptions.length) return;
    if (!weeklyProduct) return;
    if (!monthlyProduct) return;
    if (weeklyProduct.subscribed && monthlyProduct.subscribed) return;
    console.log("Updating subscription status");
    const weeklyProductPrices = weeklyProduct.prices;
    const monthlyProductPrices = monthlyProduct.prices;
    subscriptions.forEach(subscription => {
      // subscriptions.map((sub) => {})
      const items = subscription.items.data;
      if (!weeklyProduct.subscribed) {
        if (items.some(item => weeklyProductPrices.some((price) => price.id == item.plan.id))) {
          setWeeklyProduct({
              ...weeklyProduct,
              subscribed: true,
          })
        }
      }

      if (!monthlyProduct.subscribed) {
        if (items.some(item => monthlyProductPrices.some((price) => price.id == item.plan.id))) {
          setMonthlyProduct({
            ...monthlyProduct,
            subscribed: true,
          })
        }
      }
    });
  }, [subscriptions, weeklyProduct, monthlyProduct]);

  useEffect(() => {
    console.log("Weekly Product", weeklyProduct);
  }, [weeklyProduct]);

  useEffect(() => {
    console.log("Monthly Product", monthlyProduct);
  }, [monthlyProduct]);

  useEffect(() => {
    if (!isSubscribed) return;
    console.log("Subscribed Successfully", isSubscribed);
    setSubscribing(null);
  }, [isSubscribed])
  
  //handlers
  const navigateToPaymentMethods = () => {
    push(routePaths.payments);
  }
  
  const handleSubscribe = (product) => {
    console.log("Handling subscription", product.prices);
    setSubscribing(product);
    var payload = {
      "items": [{"price": product.prices[0].id}],
    }
    dispatch(createSubscription(payload))
  }




  return (
    <div className={styles.container}>
     <h1 className={styles.title}>Subscription</h1>
      {isFetchingProducts && <p>Loading Products</p>}
      {(!isFetchingPaymentMethods && !paymentMethods.length) && (
       <div className={styles.panelDanger}>
         <h3>Ooops! Payment Method is Missing.</h3>
         <p>Don't worry, we have make it easy for you to manage your payment methods. You can add multiple payment methods and choose your default choice. Your default payment method will be used in all future subscriptions.</p>
         <button className='btn btn-primary' onClick={navigateToPaymentMethods}>Manage Payment Methods</button>
       </div>
     ) }
     {products.length && (
       <div className={styles.cardWrapper}>
        {weekly_subscription_product_id && weeklyProduct && (
          <div className={styles.card}>
            <h1>{weeklyProduct.name}</h1>
            
            <p>{weeklyProduct.description}</p>
            <div className={styles.price}>
              <h2>{weeklyProduct.prices[0].unit_amount/100}</h2>
              <h3>{weeklyProduct.prices[0].currency.toUpperCase()} <span>/ {weeklyProduct.prices[0].recurring.interval}</span></h3>
            </div>
            <div className={styles.spacer}></div>
            {weeklyProduct.subscribed 
              ? <p  className={styles.subscribed}>Congrats! You are Subscribed to this package</p> 
              : <button disabled={(!isFetchingPaymentMethods && !paymentMethods.length)  || isFetchingSubscriptions || isSubscribing} onClick={() => handleSubscribe(weeklyProduct)}>Subscribe {weeklyProduct == subscribing && <span className='spinner-border'></span>}</button>}
           
          </div>
        )}
        
        {monthly_subscription_product_id && monthlyProduct && (
            <div className={styles.card}>
                <h1>{monthlyProduct.name}</h1>
                
                <p>{monthlyProduct.description}</p>
                <div className={styles.price}>
                  <h2>{monthlyProduct.prices[0].unit_amount/100}</h2>
                  <h3>{monthlyProduct.prices[0].currency.toUpperCase()} <span>/ {monthlyProduct.prices[0].recurring.interval}</span></h3>
              </div>
                <div className={styles.spacer}></div>

                {monthlyProduct.subscribed 
                  ? <p  className={styles.subscribed}>Congrats! You are Subscribed to this package</p> 
                  : <button disabled={(!isFetchingPaymentMethods && !paymentMethods.length) || isFetchingSubscriptions || isSubscribing} onClick={() => handleSubscribe(monthlyProduct)}>Subscribe  {monthlyProduct == subscribing && <span className='spinner-border'></span>}</button>}
               
                {isFetchingSubscriptions && <p>Is checking for pre existing subscriptions... <span className='spinner-border'></span></p>}
            </div>
        )}
      </div>
     )}
    </div>
  )
}

export default SubscriptionsListContainer;
