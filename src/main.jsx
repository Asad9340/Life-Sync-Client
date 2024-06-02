import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './Routes/Route';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from '../src/Firebase/AuthProvider';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
