import { combineReducers, configureStore }  from "@reduxjs/toolkit";
import authReducer from './auth-slice/index.js'
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
   auth: authReducer,
 });

 
 const persistConfig = {
    key: 'root',
    storage,
   };
   
   const persistedReducer = persistReducer(persistConfig,rootReducer); 
   
 const store = configureStore({
   reducer: persistedReducer,
   
 });


export default store;