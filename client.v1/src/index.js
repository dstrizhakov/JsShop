import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './styles/main.css'
import { AppContextProvider } from './components/AppContext.js'

ReactDOM.render(
    <React.StrictMode>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
