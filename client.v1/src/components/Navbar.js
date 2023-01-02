import React, { useContext } from 'react';
import { observer } from "mobx-react-lite";
import { AppContext } from "./AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import { logout } from "../http/userAPI";

const Navbar = observer(() => {
	const { user, basket } = useContext(AppContext)
	const navigate = useNavigate()

	return (
		<header class="header">
			<div class="header__container">
				<div class="header__body">
					<NavLink className='header__logo' to="/">
						<img src={logo} alt="Arina Yastrebova" />
					</NavLink>
					<div class="header__menu menu">
						<div class="menu__icon">
							<span></span>
							<span></span>
						</div>
						<nav class="menu__body">
							<ul class="menu__list">
								<li class="menu__item">
									<a href="index.html#" class="menu__link">Home</a>
								</li>
								<li class="menu__item">
									<a href="index.html#about" class="menu__link">About us</a>
								</li>
								<li class="menu__item">
									<a href="index.html#service" class="menu__link">Service</a>
								</li>
								<li class="menu__item">
									<a href="index.html#prices" class="menu__link">Price</a>
								</li>
								<li class="menu__item">
									<a href="index.html#contacts" class="menu__link">Contacts</a>
								</li>
							</ul>
						</nav>
					</div>
				</div>
			</div>
		</header>
	)

})
export default Navbar;