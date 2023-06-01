import React from "react";
import { AppLogo, Button } from "..";

import styles from "./Sidebar.module.sass";
import { NavLink } from "react-router-dom";

import dashboardIcon from "../../assets/svg/dashboard.svg";
import productsIcon from "../../assets/svg/products.svg";

export default function Sidebar() {
	return (
		<div className={styles.Sidebar}>
			<div className={styles.Sidebar__applogo}>
				<AppLogo />
			</div>
			<nav>
				<NavLink
					className={({ isActive }) => (isActive ? styles.active : "")}
					to={"/"}
				>
					<img src={dashboardIcon} />
					<span>Dashboard</span>
				</NavLink>
				<NavLink
					className={({ isActive }) => (isActive ? styles.active : "")}
					to={"/products"}
				>
					<img src={productsIcon} alt="Products" />
					<span>Products</span>
				</NavLink>
			</nav>
			<div className={styles.Sidebar__footer}>
				<Button title="Logout" />
			</div>
		</div>
	);
}
