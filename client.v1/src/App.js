import {BrowserRouter, useLocation} from 'react-router-dom'
import AppRouter from './components/AppRouter.js'
import NavBar from './components/NavBar.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./components/Header";


const App = () => {

    return (
        <BrowserRouter>
            <Header/>
            <AppRouter />
        </BrowserRouter>

    )
}

export default App
