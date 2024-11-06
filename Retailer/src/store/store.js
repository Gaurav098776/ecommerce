import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from './feature/authSlice.js';
import retailerReducer from './feature/retailerSlice.js';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  auth: authReducer,
  retailer: retailerReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  
});


export default store;
