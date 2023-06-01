import React from "react";

import styles from "./Avatar.module.sass";

interface IAvatar {
	src: string;
	alt?: string;
	size?: "md" | "sm" | "lg";
}

export default function Avatar({ src, alt = "", size = "md" }: IAvatar) {
	return (
		<div className={[styles.Avatar, styles[`Avatar__${size}`]].join(" ")}>
			<img src={src} alt={alt} />
		</div>
	);
}
