import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import './App.css'
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { ScreenProvider } from './context/ScreenContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ScreenProvider>
      <Provider store={store}>
        <App />
        <ToastContainer />
      </Provider>
    </ScreenProvider>
  </StrictMode>,
)
