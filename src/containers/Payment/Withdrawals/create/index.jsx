import React from "react";
import { useHistory } from "react-router-dom";
import * as styles from "./index.module.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createWithdrawRequest } from "../../../../redux/features/withdraw";
import { useEffect } from "react";
import InputField from "../../../../components/forms/InputField";

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
  const [mounted, setMounted] = useState(false);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isValue, setValue] = useState(initialValues);
  const [validationErrors, setValidationErrors] = useState({});

  // redux
  const dispatch = useDispatch();
  const isPending = useSelector(
    (store) => store.withdraw.fetchWithdrawals.isPending
  );
  const userId = useSelector((store) => store.authentication.user.user_id);
  const createWithdrawal = useSelector((state) => state.withdraw.createWithdrawals);

  // effects
  useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (createWithdrawal.isSuccess) {
      goBack();
    }
  }, [createWithdrawal.isSuccess]);

  useEffect(() => {
    if (!mounted) return;
    if (!isShowAlert) return
    //console.log("showing the alert");
    setTimeout(() => {
      console.log("hidding the alert");
      setShowAlert(false);
      setAlertMessage("");
    }, 5000);
  }, [isShowAlert])

  // handle create withdrawal error
  React.useEffect(() => {
    if (!mounted) return;
    if (createWithdrawal.error) {
      try {
        let json = JSON.parse(createWithdrawal.error.message);
        console.log("the error object", json);
        // check if json message is string
        if (typeof json.message === "string") {
          // alert(json.message);
          setAlertMessage(json.message);
          setShowAlert(true);
        }

        // check if json message is array
        if (Array.isArray(json.message)) {
          setAlertMessage(json.message);
          setShowAlert(true);
          // alert(JSON.stringify(json.message));
        }

        // check if json message is object
        if (typeof json.message === "object") {
          // stringify
          //  alert(JSON.stringify(json.message));
          setAlertMessage("Validation errors");
          setValidationErrors(json.message);
          setShowAlert(true);
        }

        // setAlertMessage("Something went wrong..!");
      } catch (error) {

        setAlertMessage("Something went wrong..!");
        setShowAlert(true);
      }
    }
  }, [createWithdrawal.error]);


  // handlers
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValue((values) => ({ ...values, [name]: value }));
  };

  const handleChangeV2 = (name, value) => {
    setValue((values) => ({ ...values, [name]: value }));
  }

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
            <div className="container">
              {isShowAlert ? <div className="alert alert-danger">
                {/* <a href="#" className="close" dataDismiss="alert" ariaLabel="close">&times;</a> */}
                <strong>{alertMessage}</strong>
              </div> : null}
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Amount</label>
              <InputField
                field={{
                  "type": "text",
                  "name": "amount",
                  "value": isValue.amount,
                  "placeholder": "Amount"
                }}
                error={validationErrors.amount}
                onChange={handleChangeV2}
              />
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
