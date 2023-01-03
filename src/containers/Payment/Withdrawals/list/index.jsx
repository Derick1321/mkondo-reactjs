import React from "react";
import { useHistory } from "react-router";
import { routePaths } from "../../../../common/routeConfig";
import * as styles from "./index.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchWithdrawRequests } from "../../../../redux/features/withdraw";

export const WithdrawalsList = () => {
  const { push } = useHistory();

  // redux
  const dispatch = useDispatch();
  const isPending = useSelector(
    (store) => store.withdraw.fetchWithdrawals.isPending
  );
  const userId = useSelector((store) => store.authentication.user.user_id);
  const fetchWithdrawals = useSelector((state) => state.withdraw.fetchWithdrawals);
  const withdrawals = useSelector((state) => state.withdraw.withdrawals);

  // effects
  React.useEffect(() => {
    dispatch(fetchWithdrawRequests({ user_id: userId }));
  }, []);

  return (
    <div className={` container ${styles.container}`}>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Withdrawals</h4>

              <div className="card-tools">
                <button
                  onClick={() => push(routePaths.createWithdrawal)}
                  className="btn btn-primary btn-sm"
                >
                  <i className="fas fa-plus"></i> Create
                </button>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Bank</th>
                    <th>Account No</th>
                    <th>Account Name</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {withdrawals.map((withdrawal) => (
                    <tr key={withdrawal.id}>
                      <td>{withdrawal.amount}</td>
                      <td>{withdrawal.bank_name}</td>
                      <td>{withdrawal.account_number}</td>
                      <td>{withdrawal.account_name}</td>
                      <td>{withdrawal.created_at}</td>
                      <td>{withdrawal.updated_at}</td>
                      <td>{withdrawal.status}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
