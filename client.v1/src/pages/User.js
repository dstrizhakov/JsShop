import { Container, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'

const User = () => {
	const { user } = useContext(AppContext)
	const navigate = useNavigate()

	const handleLogout = (event) => {
		logout()
		user.logout()
		navigate('/login', { replace: true })
	}

	return (
		<Container className="page-header">
			<div className="d-flex align-items-center">
				<div className="container position-relative">
					<div className="row d-flex justify-content-center">
						<div className="col-lg-10 text-center">
							<h1>User panel</h1>
							<ul className="col-lg-10 text-start">
								<li><Link to="/user/orders">Orders history</Link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}

export default User