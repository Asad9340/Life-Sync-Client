import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './Routes/Route';
import { RouterProvider } from 'react-router-dom';
import  AuthProvider  from '../src/Firebase/AuthProvider'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
