import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import styles from "./WelcomeCard.module.sass";

export default function WelcomeCard() {
	const { state } = useContext(AuthContext);
	return (
		<div className={styles.WelcomeCard}>
			Welcome to admin panel <b>{state.userData?.email}</b>
		</div>
	);
}
