import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ContextStoreProvider } from './context/ContextStore.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <ContextStoreProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextStoreProvider>
  </React.Fragment>,
)

