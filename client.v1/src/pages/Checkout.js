import { Container, Form, Button } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../components/AppContext.js'
import { userCreate, guestCreate } from '../http/orderAPI.js'
import { fetchBasket } from '../http/basketAPI.js'
import { check as checkAuth } from '../http/userAPI.js'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading.js'

const isValid = (input) => {
	let pattern
	switch (input.name) {
		case 'name':
			pattern = /^[-a-z]{2,}( [-a-z]{2,}){1,2}$/i
			return pattern.test(input.value.trim())
		case 'email':
			pattern = /^[-_.a-z]+@([-a-z]+\.){1,2}[a-z]+$/i
			return pattern.test(input.value.trim())
		case 'phone':
			pattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
			return pattern.test(input.value.trim())
		case 'address':
			return input.value.trim() !== ''
	}
}

const Checkout = () => {
	const { user, basket } = useContext(AppContext)
	const [fetching, setFetching] = useState(true) // loader, пока получаем корзину

	const [order, setOrder] = useState(null)

	const [value, setValue] = useState({ name: '', email: '', phone: '', address: '' })
	const [valid, setValid] = useState({ name: null, email: null, phone: null, address: null })

	useEffect(() => {
		// если корзина пуста, здесь делать нечего
		fetchBasket()
			.then(
				data => basket.products = data.products
			)
			.finally(
				() => setFetching(false)
			)
		// нужно знать, авторизован ли пользователь
		checkAuth()
			.then(data => {
				if (data) {
					user.login(data)
				}
			})
			.catch(
				error => user.logout()
			)
	}, [])

	if (fetching) { // loader, пока получаем корзину
		return <Loading />
	}

	if (order) { // заказ был успешно оформлен
		return (
			<Container>
				<div className="mb-3">
					<div className="page-header d-flex align-items-center">
						<div className="container position-relative">
							<div className="row d-flex justify-content-center">
								<div className="col-lg-10 text-center">
									<h1 className="mb-4 mt-4 text-center">Order is processed</h1>
									<p>We will email you soon for details.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		)
	}

	const handleChange = (event) => {
		setValue({ ...value, [event.target.name]: event.target.value })
		/*
		 * Вообще говоря, проверять данные поля, пока пользователь не закончил ввод — неправильно,
		 * проверять надо в момент потери фокуса. Но приходится проверять здесь, поскольку браузеры
		 * автоматически заполняют поля. И отловить это событие — весьма проблематичная задача.
		 */
		setValid({ ...valid, [event.target.name]: isValid(event.target) })
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		setValue({
			name: event.target.name.value.trim(),
			email: event.target.email.value.trim(),
			phone: event.target.phone.value.trim(),
			address: event.target.address.value.trim(),
		})

		setValid({
			name: isValid(event.target.name),
			email: isValid(event.target.email),
			phone: isValid(event.target.phone),
			address: isValid(event.target.address),
		})

		if (valid.name && valid.email && valid.phone && valid.address) {
			let comment = event.target.comment.value.trim()
			comment = comment ? comment : null
			// форма заполнена правильно, можно отправлять данные
			const body = { ...value, comment }
			const create = user.isAuth ? userCreate : guestCreate
			create(body)
				.then(
					data => {
						setOrder(data)
						basket.products = []
					}
				)
		}
	}

	return (
		<Container className="page-header">
			{basket.count === 0 && <Navigate to="/basket" replace={true} />}
			<h1 className="mb-4 mt-4">Order request</h1>
			<Form noValidate onSubmit={handleSubmit}>
				<Form.Control
					name="name"
					value={value.name}
					onChange={e => handleChange(e)}
					isValid={valid.name === true}
					isInvalid={valid.name === false}
					placeholder="First name & Second name"
					className="mb-3"
				/>
				<Form.Control
					name="email"
					value={value.email}
					onChange={e => handleChange(e)}
					isValid={valid.email === true}
					isInvalid={valid.email === false}
					placeholder="Email"
					className="mb-3"
				/>
				<Form.Control
					name="phone"
					value={value.phone}
					onChange={e => handleChange(e)}
					isValid={valid.phone === true}
					isInvalid={valid.phone === false}
					placeholder="Phone number"
					className="mb-3"
				/>
				<Form.Control
					name="address"
					value={value.address}
					onChange={e => handleChange(e)}
					isValid={valid.address === true}
					isInvalid={valid.address === false}
					placeholder="Address"
					className="mb-3"
				/>
				<Form.Control
					name="comment"
					className="mb-3"
					placeholder="Comment"
				/>
				<Button type="submit">Send</Button>
			</Form>
		</Container>
	)
}

export default Checkout