const INITIAL_STATE = {
  loginPending: false,
  loginFulfilled: false,
  loginRejected: false,
};

const authenticationReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    default:
      return state;
  }
};

export default authenticationReducer;
