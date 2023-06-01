import React, { FC, PropsWithChildren } from "react";

import styles from "./Title.module.sass";

const Title: FC<PropsWithChildren> = ({ children }) => {
	return <h1 className={styles.Title}>{children}</h1>;
};

export default Title;
