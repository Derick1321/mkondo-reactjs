import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import styles from './index.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addSetupIntent } from '../../../redux/features/subscriptions';
import { Elements } from '@stripe/react-stripe-js';
import { AddPaymentMethodFormComponent } from './form';


const stripePromise = loadStripe("pk_test_51KXBZaHrASyjhIVozZjo4RHNRiuKZTLg0AANL6ZyHuGLILPWvqy5jWrgHp6gEqzDd26DjBPFAvqnCmY1LtHELEkW00EFWOQuLd");

export const CreatePaymentMethodContainer = () => {
  //state
  // const [clientSecret, setClientSecret] = useState("")

  //store
  const dispatch = useDispatch();
  const clientSecret = useSelector((state) => state.subscription.clientSecret);
  const isLoading = useSelector((state) => state.subscription.fetchPaymentIntentLoading);

  //effects
  useEffect(() => {
    dispatch(addSetupIntent())
  }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Payment Methods</h1>

      <div className={styles.stripeFormWrapper}>
        {isLoading && <div className='spinner-border text-light'></div>}
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            <AddPaymentMethodFormComponent clientSecret={clientSecret} />
          </Elements>
        )}
      </div>
    </div>
  )
}
