import React, { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { addSetupIntent } from '../../../redux/features/subscriptions';
import styles from './index.module.scss';
import { routePaths } from '../../../common/routeConfig';

const BASE_URL = document.location.hostname === 'localhost' ? 'https://localhost:3000' : 'https://mkondo.co';

export const AddPaymentMethodFormComponent = (props) => {
    //props

    //hooks
    const stripe = useStripe();
    const elements = useElements();

    //state
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState("");

    //store
    const dispatch = useDispatch()
    const isFetchingPaymentIntent = useSelector((state) => state.subscription.fetchPaymentIntentLoading);
    const clientSecret = useSelector((state) => state.subscription.clientSecret);

    //on component mount
    useEffect(() => {
        if (!stripe) return;
        if (!clientSecret) return;
        stripe.retrieveSetupIntent(clientSecret).then(({ setupIntent }) => {
            console.log("setup intent", setupIntent);
            switch(setupIntent.status) {
                case 'succeeded':
                    setMessage('Payment Succeeded');
                    setIsLoading(false);
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

    return (
        <form>
            <PaymentElement />
            <button disabled={isLoading || !stripe || !elements} className='btn btn-primary mt-3' onClick={handleSubmit}>Submit {isLoading && <span className='spinner-border text-light'></span>}</button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message mt-3 text-light">{message}</div>}
        </form>
    )
}
