import React, { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { addPaymentMethod, addSetupIntent } from '../../../redux/features/subscriptions';
import styles from './index.module.scss';
import { routePaths } from '../../../common/routeConfig';
import { useHistory } from 'react-router-dom';

const BASE_URL = document.location.hostname === 'localhost' ? 'https://localhost:3000' : 'https://mkondo.co';

export const AddPaymentMethodFormComponent = (props) => {
    //props

    //hooks
    const stripe = useStripe();
    const elements = useElements();

    const { push } = useHistory();

    //state
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [succeeded, setSucceeded] = useState(false);

    //store
    const dispatch = useDispatch()
    const isFetchingPaymentIntent = useSelector((state) => state.subscription.fetchPaymentIntentLoading);
    const clientSecret = useSelector((state) => state.subscription.clientSecret);
    const paymentMethod = useSelector((state) => state.subscription.paymentMethod);

    //on component mount
    useEffect(() => {
        console.log("effect triggered");
        if (!stripe) return;
        console.log("stripe exists", stripe);
        console.log(window.location.search);
        const re = /setup_intent_client_secret=(.*)&/;
        const matches = re.exec(window.location.search);
        var _clientSecret = null;
        if (matches != null && matches.length > 1) {
            _clientSecret = matches[1];
        }
        
        
        if (!_clientSecret) {
            console.log("client secred does not exists", _clientSecret);
            return;
        }
        console.log("client secret found", _clientSecret);

        console.log("retrieving setup intent");
        stripe.retrieveSetupIntent(_clientSecret).then(({ setupIntent }) => {
            console.log("setup intent", setupIntent);
            switch(setupIntent.status) {
                case 'succeeded':
                    setSucceeded(true);
                    setIsLoading(false);
                    dispatch(addPaymentMethod(setupIntent.payment_method))
                    break;
                case 'processing':
                    setMessage('Your payment is processing');
                    setIsLoading(false);
                    break;
                case 'requires_payment_method':
                    setMessage('Add payment method.');
                    setIsLoading(false);
                    break;
                case 'default':
                    setMessage('Something went wrong');
                    setIsLoading(false);
                    break;
            }
        })
    }, [stripe]);

    //handlers
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setIsLoading(true);
        const { error } = await stripe.confirmSetup({
            elements,
            confirmParams: {
                //TODO: Make sure to change this to your payment completion page
                return_url: `${BASE_URL}${routePaths.paymentsCreate}`,
            },
        })
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }
    
        setIsLoading(false);
    }

    if (succeeded) {
        return (
            <div className={styles.banner}>
                {paymentMethod != null ? (
                    <>
                        <h3 className='text-light'>Payment Method Added</h3>
                        <button className='btn btn-primary' onClick={() => push(routePaths.subscriptions)}>Ok</button>
                    </>
                ) : <h4 className='text-light'>Finalizing... <span className='spinner-border text-light'></span></h4>}
            </div>
        )
    }

    return (
        <form>
            <PaymentElement />
            <button disabled={isLoading || !stripe || !elements} className='btn btn-primary mt-3' onClick={handleSubmit}>Submit {isLoading && <span className='spinner-border text-light'></span>}</button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message mt-3 text-light">{message}</div>}
        </form>
    )
}
