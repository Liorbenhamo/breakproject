import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Usecontext from '../usecontext/Usecontext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Usecontext>
    <App />
    </Usecontext>
  </React.StrictMode>,
)
