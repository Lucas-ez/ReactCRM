import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'devextreme/dist/css/dx.light.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/auth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
