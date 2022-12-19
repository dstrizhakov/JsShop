import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { AppContext } from "./AppContext";
import { NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png"
import { Container, Nav, Navbar } from "react-bootstrap";
import { logout } from "../http/userAPI";

const Header = observer(() => {
    const { user, basket } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    return (
        <Container fluid className="header bg-light">
            <Navbar collapseOnSelect expand="lg" >
                <Navbar.Brand className="logo">
                    <NavLink to="/">
                        <img src={logo} alt="Arina Yastrebova"/>
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle className="me-3" aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse className="navbar-links"  id="responsive-navbar-nav">
                    <Nav>
                        <NavLink to="/catalog" className="nav-link">Catalog</NavLink>
                        <NavLink to="/delivery" className="nav-link">Delivery</NavLink>
                        <NavLink to="/contacts" className="nav-link">Contact</NavLink>
                            
                                <NavLink to="/basket" className="nav-link">
                                    Basket
                                    {!!basket.count && <span>{basket.count}</span>}
                                </NavLink>
                          
                           
                                {/*{user.isAuth
                                    ? <NavLink to="/user" className="nav-link">User panel</NavLink>
                                    : <NavLink to="/login" className="nav-link">Sing In/ Sing Up</NavLink>
                                }*/}
                                {user.isAdmin && (
                                    <NavLink to="/admin" className="nav-link">Admin</NavLink>
                                )}
                                {user.isAuth
                                    ? <>
                                    <NavLink to="/user" className="nav-link">User panel</NavLink>
                                    <a style={{cursor: "pointer"}} onClick={(e)=> handleLogout(e)} className="nav-link">Sign out</a>
                                    </>
                                    : <NavLink to="/login" className="nav-link">Sign In/ Sign Up</NavLink>
                                }

                          
                    </Nav>
                </Navbar.Collapse>
            </Navbar>  
            {/* {(location.pathname === "/catalog") &&
             <Row className='footer'>
             <CategoryFilter/> 
             </Row>  
            } */}
             
        </Container>
    );
})

export default Header;