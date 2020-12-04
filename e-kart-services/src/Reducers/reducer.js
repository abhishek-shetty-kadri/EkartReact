import { combineReducers } from "redux";
import { loggedInReducer, feedBackReducer, indianStates, productReducer } from './allReducers.js';
const reducer = combineReducers({ loggedInReducer, indianStates, productReducer, feedBackReducer });
export default reducer;