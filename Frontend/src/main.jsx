
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore } from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore.js'

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
    <PersistGate persistor={persistor}></PersistGate>
     <App />
 </Provider>
  
)
