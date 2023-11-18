import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import {Provider} from 'react-redux'
import { store } from './redux/store.js'

// react-hot-toast
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </BrowserRouter>
  </Provider>
)
