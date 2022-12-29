import React from 'react'
import { useHistory } from 'react-router-dom'
import * as styles from './index.module.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createWithdrawRequest } from '../../../../redux/features/withdraw';




export const WithdrawalsCreate = () => {
  const dispatch = useDispatch();
  const isPending = useSelector((store) => store.withdraw.fetchWithdrawals.isPending);
  const userId = useSelector((store) => store.authentication.user.user_id);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isLoading, setILoading] = useState(false);



  const initialValues = {
    Amount: "",
    BankType: "",
    AccountNo: "",
    AccountName: "",
  };
  const [isValue, setValue] = useState(initialValues);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue(values => ({ ...values, [name]: value }))

  }

  const handleSubmitData = () => {
    const { Amount, BankType, AccountNo, AccountName } = isValue;
    dispatch(createWithdrawRequest({
      amount: Amount,
      bank_name: BankType,
      account_number: AccountNo,
      account_name: AccountName,
      user_id: userId,
    }));

  }

  const { goBack } = useHistory();
  return (
    <div className={` container ${styles.container}`}>
      <button className='btn btn-primary' onClick={() => goBack()}>Back</button>
      <h1>withdraw Form</h1>
      <div className='row'>
        <div className="row">
          <div className='col-md-8'>
            <div className="mb-3">
              <label className="form-label text-light">Amount</label>
              <input type="number" name="Amount" value={isValue.Amount} onChange={handleChange} className="form-control" placeholder="Enter amount " />
            </div>
          </div>
        </div>
        <div className="row">
          <div className='col-md-8'>
            <div className="mb-3">
              <label className="form-label text-light">Select Bank Account</label>
              <select className="form-select" name="BankType" value={isValue.BankType} onChange={handleChange}>
                <option selected></option>
                <option value="crdb">CRDB Bank</option>
                <option value="nmb">NMB Bank</option>

              </select>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-4'>
            <div className="mb-3">
              <label className="form-label text-light">Account Number</label>
              <input type="number" className="form-control" name="AccountNo" value={isValue.AccountNo} onChange={handleChange} placeholder="Enter Account Number" />
            </div>
          </div>
          <div className='col-md-4'>
            <div className="mb-3">
              <label className="form-label text-light">Account Name</label>
              <input type="text" value={isValue.AccountName} name="AccountName" onChange={handleChange} className="form-control" placeholder="Enter Account Name" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 mb-4">
            <button className="btn btn-success w-100" onClick={handleSubmitData}
              disabled={isActiveButton} type="button"> {isPending ? (
                <span className="spinner-border w20"></span>
              ) : (
                <span>Submit</span>
              )}</button>
          </div>
        </div>


      </div>
    </div>
  )
}
