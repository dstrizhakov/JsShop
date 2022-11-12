import { AppContext } from '../components/AppContext.js'
import { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button } from 'react-bootstrap'
import { login } from '../http/userAPI.js'
import { observer } from 'mobx-react-lite'

const Login = observer(() => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    // если пользователь авторизован — ему здесь делать нечего
    useEffect(() => {
        if (user.isAdmin) navigate('/admin', {replace: true})
        if (user.isAuth) navigate('/user', {replace: true})
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target.email.value.trim()
        const password = event.target.password.value.trim()
        const data = await login(email, password)
        if (data) {
            user.login(data)
            if (user.isAdmin) navigate('/admin')
            if (user.isAuth) navigate('/user')
        }
    }

    return (
        <Container className="d-flex justify-content-center section">
            <Card style={{width: '50%'}} className="p-4 mt-3 bg-light">
                <h3 className="m-auto">Sign in</h3>
                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Control
                        name="email"
                        className="mt-3"
                        placeholder="Email"
                    />
                    <Form.Control
                        name="password"
                        className="mt-3"
                        placeholder="Password"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-3 pl-3 pr-3">
                        <Button type="submit">
                            Sign in
                        </Button>
                        <p className="mb-0">
                            Don't have account yet?
                            <span>  </span>
                            <Link to="/signup">Sign up!</Link>
                        </p>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default Login
