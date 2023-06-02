import React, { useContext } from "react";
import { AppLogo, Button } from "..";

import styles from "./Sidebar.module.sass";
import { NavLink } from "react-router-dom";

import dashboardIcon from "../../assets/svg/dashboard.svg";
import productsIcon from "../../assets/svg/products.svg";
import { AuthContext } from "../../contexts/AuthContext";

const MENUS = [{ title: "Products", href: "/products", icon: productsIcon }];

export default function Sidebar() {
	const { onLogout } = useContext(AuthContext);

	return (
		<div className={styles.Sidebar}>
			<div className={styles.Sidebar__applogo}>
				<AppLogo />
			</div>
			<nav>
				{MENUS.map((menu, index) => (
					<NavLink
						key={index}
						className={({ isActive }) => (isActive ? styles.active : "")}
						to={menu.href}
					>
						<img src={menu.icon} />
						<span>{menu.title}</span>
					</NavLink>
				))}
			</nav>
			<div className={styles.Sidebar__footer}>
				<Button onClick={() => onLogout()} title="Logout" />
			</div>
		</div>
	);
}
