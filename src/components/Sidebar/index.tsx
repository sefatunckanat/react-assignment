import React from "react";
import { AppLogo, Button } from "..";

import styles from "./Sidebar.module.sass";
import { NavLink } from "react-router-dom";

import dashboardIcon from "../../assets/svg/dashboard.svg";
import productsIcon from "../../assets/svg/products.svg";

const MENUS = [{ title: "Products", href: "/products", icon: productsIcon }];

export default function Sidebar() {
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
				<Button title="Logout" />
			</div>
		</div>
	);
}
