import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import styles from './index.module.scss';
import { useSelector } from 'react-redux';


const stripePromise = loadStripe("pk_test_51KXBZaHrASyjhIVozZjo4RHNRiuKZTLg0AANL6ZyHuGLILPWvqy5jWrgHp6gEqzDd26DjBPFAvqnCmY1LtHELEkW00EFWOQuLd");

export const CreatePaymentMethodContainer = () => {

  //state
  const [secret, setSecret] = useState("")

  //store
  const isFetchingPaymentIntent = useSelector((store) => store.state);

  //on component mount
  useEffect(() => {

  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add Payment Methods</h1>

      <div>
        <div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
