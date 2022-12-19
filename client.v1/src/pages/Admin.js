import { Container, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'

const Admin = () => {

    return (
        <Container className="page-header">
            <div className="container position-relative">
                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10">
                    <h1 className='text-center'>Admin panel</h1>
                    <ul className="justify-content-end text-start">
                        <li><Link to="/admin/orders">Orders</Link></li>
                        <li><Link to="/admin/categories">Catogories</Link></li>
                        <li><Link to="/admin/brands">Types</Link></li>
                        <li><Link to="/admin/products">Items</Link></li>
                    </ul>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Admin