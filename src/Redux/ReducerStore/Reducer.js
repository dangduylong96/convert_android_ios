import { combineReducers } from 'redux';
import checkEditUser from './CheckEditUserReducer.js';

const Reducer= combineReducers({
    checkEditUser: checkEditUser
});
export default Reducer;