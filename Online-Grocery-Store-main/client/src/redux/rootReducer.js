import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  cartReducer: cartReducer,
  userReducer: userReducer,
});

export default rootReducer;
