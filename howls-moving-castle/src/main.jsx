import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {console.log('Hi, Let\'s start the server')}
    <App />
  </React.StrictMode>
);
