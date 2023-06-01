import React from "react";

import styles from "./Badge.module.sass";

export default function Badge({ label }: { label: string }) {
	return <div className={styles.Badge}>{label}</div>;
}
