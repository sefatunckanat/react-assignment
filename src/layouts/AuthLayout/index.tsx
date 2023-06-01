import React, { FC, PropsWithChildren } from "react";

import styles from "./AuthLayout.module.sass";
import { AppLogo } from "../../components";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.AuthLayout}>
			<main>
				<AppLogo />
				{children}
			</main>
		</div>
	);
};

export default AuthLayout;
