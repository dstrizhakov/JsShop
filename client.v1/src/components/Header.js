import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {AppContext} from "./AppContext";
import {NavLink} from "react-router-dom";
import FetchBasket from "./FetchBasket";
import CheckAuth from "./CheckAuth";

const Header = observer(() => {
    const { user, basket } = useContext(AppContext)
    return (
        <header id="header" className="header d-flex align-items-center fixed-top">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <NavLink to="/" className="logo d-flex align-items-center  me-auto me-lg-0">Arina Yastrebova</NavLink>
                <nav id="navbar" className="navbar">
                    <ul>
                        <li><NavLink to="/delivery" className="nav-link">Shipping</NavLink></li>
                        <li><NavLink to="/contacts" className="nav-link">Contact</NavLink></li>
                        <FetchBasket>
                            <li><NavLink to="/basket" className="nav-link">
                                Basket
                                {!!basket.count && <span>({basket.count})</span>}
                            </NavLink></li>
                        </FetchBasket>
                        <CheckAuth>
                            {user.isAuth ? (
                                <NavLink to="/user" className="nav-link">User orders</NavLink>
                            ) : (
                                <>
                                    <li><NavLink to="/login" className="nav-link">Log in</NavLink></li>
                                    <li><NavLink to="/signup" className="nav-link">Register</NavLink></li>
                                </>
                            )}
                            {user.isAdmin && (
                                <li><NavLink to="/admin" className="nav-link">Admin</NavLink></li>
                            )}
                        </CheckAuth>
                    </ul>

                </nav>

                <div className="header-social-links">
                    <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                    <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                    <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                    <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
            </div>
            <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
            <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>

        </div>
</header>
    );
})

export default Header;