import React from "react";
import { useHistory } from "react-router-dom";
import * as styles from "./index.module.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createWithdrawRequest } from "../../../../redux/features/withdraw";

const initialValues = {
  Amount: "",
  BankType: "",
  AccountNo: "",
  AccountName: "",
};

export const WithdrawalsCreate = () => {
  // router
  const { goBack } = useHistory();

  // state
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isLoading, setILoading] = useState(false);
  const [isValue, setValue] = useState(initialValues);

  // redux
  const dispatch = useDispatch();
  const isPending = useSelector(
    (store) => store.withdraw.fetchWithdrawals.isPending
  );
  const userId = useSelector((store) => store.authentication.user.user_id);
  const createWithdrawal = useSelector((state) => state.withdraw.createWithdrawals);

  // effects
  React.useEffect(() => {
    if (createWithdrawal.isSuccess) {
      goBack();
    }
  }, [createWithdrawal.isSuccess]);

  // handle create withdrawal error
  React.useEffect(() => {
    if (createWithdrawal.error) {
      try {
        let json = JSON.parse(createWithdrawal.error.message);
        // check if json message is string
        if (typeof json.message === "string") {
          alert(json.message);
        }

        // check if json message is array
        if (Array.isArray(json.message)) {
          alert(JSON.stringify(json.message));
        }

        // check if json message is object
        if (typeof json.message === "object") {
          // stringify
          alert(JSON.stringify(json.message));
        }
      
      } catch (error) {
        alert("Something went wrong");
      }
    }
  }, [createWithdrawal.error]);


  // handlers
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue((values) => ({ ...values, [name]: value }));
  };

  const handleSubmitData = () => {
    const { Amount, BankType, AccountNo, AccountName } = isValue;
    dispatch(
      createWithdrawRequest({
        amount: Amount,
        bank_name: BankType,
        account_number: AccountNo,
        account_name: AccountName,
        user_id: userId,
      })
    );
  };

  return (
    <div className={` container ${styles.container}`}>
      <button className="btn btn-primary" onClick={() => goBack()}>
        Back
      </button>
      <h1>withdraw Form</h1>
      <div className="row">
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label className="form-label text-light">Amount</label>
              <input
                type="number"
                name="Amount"
                value={isValue.Amount}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter amount "
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label className="form-label text-light">
                Select Bank Account
              </label>
              <select
                className="form-select"
                name="BankType"
                value={isValue.BankType}
                onChange={handleChange}
              >
                <option selected></option>
                <option value="crdb">CRDB Bank</option>
                <option value="nmb">NMB Bank</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label text-light">Account Number</label>
              <input
                type="number"
                className="form-control"
                name="AccountNo"
                value={isValue.AccountNo}
                onChange={handleChange}
                placeholder="Enter Account Number"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label text-light">Account Name</label>
              <input
                type="text"
                value={isValue.AccountName}
                name="AccountName"
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Account Name"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 mb-4">
            <button
              className="btn btn-success w-100"
              onClick={handleSubmitData}
              disabled={isActiveButton}
              type="button"
            >
              {" "}
              {isPending ? (
                <span className="spinner-border w20"></span>
              ) : (
                <span>Submit</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
