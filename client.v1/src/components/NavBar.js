import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { AppContext } from './AppContext.js'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import CheckAuth from './CheckAuth.js'
import FetchBasket from './FetchBasket.js'

const NavBar = observer(() => {
    const { user, basket } = useContext(AppContext)
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to="/" className="navbar-brand">Irene FineArt</NavLink>
                <Nav className="ml-auto">
                    <NavLink to="/delivery" className="nav-link">Delivery</NavLink>
                    <NavLink to="/contacts" className="nav-link">Contacts</NavLink>
                    <FetchBasket>
                        <NavLink to="/basket" className="nav-link">
                            Basket
                            {!!basket.count && <span>({basket.count})</span>}
                        </NavLink>
                    </FetchBasket>
                    <CheckAuth>
                        {user.isAuth ? (
                            <NavLink to="/user" className="nav-link">User orders</NavLink>
                        ) : (
                            <>
                                <NavLink to="/login" className="nav-link">Login</NavLink>
                                {/*<NavLink to="/signup" className="nav-link">Sign up</NavLink>*/}
                            </>
                        )}
                        {user.isAdmin && (
                            <NavLink to="/admin" className="nav-link">Admin</NavLink>
                        )}
                    </CheckAuth>
                </Nav>
            </Container>
        </Navbar>
    )
})

export default NavBar