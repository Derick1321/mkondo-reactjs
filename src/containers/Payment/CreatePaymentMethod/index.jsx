import React, { useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import styles from './index.module.scss';


const stripePromise = loadStripe("pk_test_51KXBZaHrASyjhIVozZjo4RHNRiuKZTLg0AANL6ZyHuGLILPWvqy5jWrgHp6gEqzDd26DjBPFAvqnCmY1LtHELEkW00EFWOQuLd");

export const CreatePaymentMethodContainer = () => {
  const [secret, setSecret] = useState("")
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
