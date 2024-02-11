import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from  './store/store.js'
import { Provider } from 'react-redux'
import {  ToastContainer } from 'react-toastify'
  import 'react-toastify/dist/ReactToastify.css';
  import { persiststores } from './store/store.js'
  import { PersistGate } from 'redux-persist/integration/react'
ReactDOM.createRoot(document.getElementById('root')).render(
 
 <PersistGate persistor={persiststores}>

 <Provider store={store}>

    <App />
   <ToastContainer  position="top-right" />
 </Provider>
 </PersistGate>
  
)
