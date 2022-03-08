import React, { useEffect, useState } from 'react'
import Button from '../../../components/common/Button';
import styles from './index.module.scss';
import emptyBox from '$assets/images/icons/box.svg'
import { useLocation, useHistory } from 'react-router-dom';
import { routePaths } from '../../../common/routeConfig';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentMethods, setDefaultPaymentMethod } from '../../../redux/features/subscriptions';


export const PaymentMethodsContainer = () => {
  //hooks
  const { push } = useHistory();

  //state
  const [activePM, setActivePM] = useState(null); 

  //store
  const dispatch = useDispatch();
  const isFetchingPaymentMethods = useSelector((state) => state.subscription.fetchPaymentMethodsLoading);
  const isSettingDefaultPaymentMethod = useSelector((state) => state.subscription.setDefaultPaymentMethodLoading);
  const user = useSelector((state) => state.authentication.user);
  const paymentMethods = useSelector((state) => state.subscription.paymentMethods);
  const error = useSelector((state) => state.subscription.fetchPaymentMethodsError);

  //effects
  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, []);


  //handlers
  const setDefault = (payment_method_id) => {
    setActivePM(payment_method_id);
    dispatch(setDefaultPaymentMethod(payment_method_id));
  }

  return (
    <div className={styles.container}>
      <div className="d-flex">
        <h1 className={styles.title}>Payment Methods</h1>
        {paymentMethods.length > 0 && (
          <div className="ml-auto">
            <Button onClick={() => push(routePaths.paymentsCreate)}>Add Card</Button>
          </div>
        )}
      </div>
      
      {isFetchingPaymentMethods && (<div><span className='spinner-border spinner-border-lg text-light'></span> <span className="text-light">Loading Payment Methods...</span></div>)}
      {paymentMethods.length == 0 && !isFetchingPaymentMethods && (
        <div className={styles.hero}>
          <img src={emptyBox} alt="" />
          <p>No payments methods, Add a card by tapping the button bellow.</p>
          <Button onClick={() => push(routePaths.paymentsCreate)}>Add Card</Button>
        </div>
      )}

      <div className={styles.cards}>
        {paymentMethods.map((pm) => (
          <div className={styles.card} key={pm.id}>
            <h2>{pm.card.brand}</h2>
            <h2>**** **** **** {pm.card.last4}</h2>
            <h6>{pm.card.exp_month} / {pm.card.exp_year}</h6>
            {!(user.stripe_customer && user.stripe_customer.invoice_settings && user.stripe_customer.invoice_settings.default_payment_method == pm.id) ? <button disabled={isSettingDefaultPaymentMethod} onClick={() => setDefault(pm.id)} className='btn btn-secondary'>Set Default  {isSettingDefaultPaymentMethod && activePM == pm.id ? <span className='spinner-border text-light'></span> : <></>}</button> : null }
          </div>
        ))}
      </div>
    </div>
  )
}
