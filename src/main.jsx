import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { ContextStoreProvider } from './context/ContextStore.jsx'
import ToastManager from './utils/Toasttify/ToastManager.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <ToastManager>
      <ContextStoreProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ContextStoreProvider>
    </ToastManager>
  </React.Fragment>
)

