import {BrowserRouter, useLocation} from 'react-router-dom'
import AppRouter from './components/AppRouter.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./components/Header";
import Footer from "./components/Footer";

import axios from 'axios'
import { AppContext } from './components/AppContext.js'
import { check as checkAuth } from './http/userAPI.js'
import { fetchBasket } from './http/basketAPI.js'
import { useState, useContext, useEffect } from 'react'
import { observer } from 'mobx-react-lite';
import Loading from './components/Loading.js';


const App = observer(() => {
    const { user, basket } = useContext(AppContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Promise.all([checkAuth(), fetchBasket()])
            .then(
                axios.spread((userData, basketData) => {
                    if (userData) {
                        user.login(userData)
                    }
                    basket.products = basketData.products
                })
            )
            .finally(
                () => setLoading(false)
            )
    }, [])
    
     // показываем loader, пока получаем с сервера данные пользователя
     if (loading) {
        return <Loading/>
    }
    return (
        <BrowserRouter>
            <Header />
            <AppRouter />
            <Footer/>
        </BrowserRouter>

    )
})

export default App
