import React from 'react'
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import emptyBox from '$assets/images/icons/box.svg'
import { useLocation, useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';


export const PaymentMethodsContainer = () => {
  const { push } = useHistory()
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Payment Methods</h1>
      <div className={styles.hero}>
        <img src={emptyBox} alt="" />
        <p>No payments methods, Add a card by tapping the button bellow.</p>
        <Button onClick={() => push(routePaths.paymentsCreate)}>Add Card</Button>
      </div>
    </div>
  )
}
