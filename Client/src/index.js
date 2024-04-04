import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { store, persistor } from './Redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider >
);
