const initialState = {
  loggedInUserId: "",
  user: {},
};

const authReducer = (state = initialState, action) => {
  console.log("authReducer", action);
  switch (action.type) {
    case "LOGIN":
      return { ...state, loggedInUserId: action.payload.id, user: action.payload };
    case "LOGOUT":
      return { ...state, loggedInUserId: null, user: {} };
    default:
      return state;
  }
};

export default authReducer;
