import React, { useEffect } from 'react'
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import emptyBox from '$assets/images/icons/box.svg'
import { useLocation, useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';
import { useDispatch, useSelector } from 'react-redux';


export const PaymentMethodsContainer = () => {
  //hooks
  const { push } = useHistory();

  //store
  const dispatch = useDispatch();
  const isFetchingPaymentMethods = useSelector((state) => state.subscription);

  //effects
  useEffect(() => {

  }, []);
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
