import React, { FC, PropsWithChildren } from "react";

import styles from "./DashboardLayout.module.sass";
import { Sidebar } from "../../components";

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.DashboardLayout}>
			<div className={styles.DashboardLayout__sidebar}>
				<Sidebar />
			</div>
			<main>{children}</main>
		</div>
	);
};

export default DashboardLayout;
