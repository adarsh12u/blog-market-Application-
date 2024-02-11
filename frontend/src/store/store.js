import { configureStore } from '@reduxjs/toolkit'

import userslice from '../user/userslice'
import { combineReducers } from '@reduxjs/toolkit'

import {persistReducer, persistStore} from "redux-persist"

import storage from 'redux-persist/lib/storage'


const rootreducer = combineReducers({
      user:userslice,
})


const persist = persistReducer({
    key:'root',
    storage,
    version:1,
},rootreducer)


const store = configureStore({
    reducer:persist,
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware({serializableCheck:false})
      
})
export const persiststores = persistStore(store)
export default  store