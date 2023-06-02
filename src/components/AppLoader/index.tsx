import React from "react";

import styles from "./AppLoader.module.sass";
import { AppLogo } from "..";

export default function AppLoader({ label }: { label?: string }) {
	return (
		<div className={styles.AppLoader}>
			<AppLogo />
			<span>{label || "Loading..."}</span>
		</div>
	);
}
