import React, { useEffect } from 'react'
import InputField from '../../../components/forms/InputField';
import styles from './index.module.scss';
import DropDown from '../../../components/common/DropDown/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/features/subscriptions';
import { fetchConfigurations, selectConfigurationByKey, storeConfiguration, updateConfiguration } from '../../../redux/features/configuration';
import store from '../../../redux/store';

export const MONTHLY_SUBSCRIPTION_PRODUCT_ID = 'MONTHLY_SUBSCRIPTION_PRODUCT_ID';
export const WEEKLY_SUBSCRIPTION_PRODUCT_ID = 'WEEKLY_SUBSCRIPTION_PRODUCT_ID';
export const THEATRE_PER_STREAM_PRODUCT_ID = 'THEATRE_PER_STREAM_PRODUCT_ID';


export const SubscriptionConfiguration = () => {
  //store
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.subscription.fetchProductsLoading);
  const isSubmitting = useSelector((state) => state.configuration.isCreating || state.configuration.isUpdating);
  const products = useSelector((state) => state.subscription.products);
  const configuration_status = useSelector((state) => state.configuration.status);
  const configurations = useSelector((state) => state.configuration.data);

  //effects
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (configuration_status == 'idle') {
      dispatch(fetchConfigurations());
    }
  }, [configuration_status]);

  //handlers
  const handleChange = (key, value) => {
    if (configurations.some(t => t.key == key)) {
      //update configuration
      const _payload = {
        id: configurations.find(t => t.key == key).configuration_id,
        data: {
          value: value,
        }
      };
      dispatch(updateConfiguration(_payload));
    } else {
      //store new configuration
      const _payload = {
        key: key,
        value: value,
      };
      dispatch(storeConfiguration(_payload));
    }
  }
  return (
    <div className={styles.container}>
      <h2 className='mb-2'>Subscription Configuration</h2>
      {isFetching && <p>Is fetching products...</p>}
      {isSubmitting && <p>Saving Configuration...</p>}
      <table>
        <tr>
          <td>Weekly Subscription</td>
          
          <td>
            <select name="name" id="id" onChange={(e) => handleChange(WEEKLY_SUBSCRIPTION_PRODUCT_ID, e.target.value)}>
              <option value="">Choose...</option>
              {products.map(product => <option value={product.id} selected={configurations.some(config => config.key == WEEKLY_SUBSCRIPTION_PRODUCT_ID && config.value == product.id)}>{product.name}</option>)}
            </select>
          </td>
        </tr>
        <tr>
          <td>Monthly Subscription</td>
          <td>
          <select name="name" id="id" onChange={(e) => handleChange(MONTHLY_SUBSCRIPTION_PRODUCT_ID, e.target.value)}>
              <option value="">Choose...</option>
              {products.map(product => <option value={product.id} selected={configurations.some(config => config.key == MONTHLY_SUBSCRIPTION_PRODUCT_ID && config.value == product.id)}>{product.name}</option>)}
          </select>
          </td>
        </tr>
        <tr>
          <td>Theatre</td>
          <td>
            <select name="name" id="id" onChange={(e) => handleChange(THEATRE_PER_STREAM_PRODUCT_ID, e.target.value)}>
              <option value="">Choose...</option>
              {products.map(product => <option value={product.id} selected={configurations.some(config => config.key == THEATRE_PER_STREAM_PRODUCT_ID && config.value == product.id)}>{product.name}</option>)}
            </select>
          </td>
        </tr>
      </table>
    </div>
  )
}
