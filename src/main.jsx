import React, { useReducer } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/Store'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <Provider store={store}>
        <App />
        </Provider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
);
