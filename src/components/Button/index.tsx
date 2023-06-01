import React from "react";

import styles from "./Button.module.sass";

interface IButton {
	title: string;
	type?: "submit" | "reset" | "button" | undefined;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}

const Button = ({
	title,
	onClick,
	type = "button",
	disabled = false,
}: IButton) => {
	return (
		<button
			className={styles.Button}
			onClick={onClick}
			disabled={disabled}
			type={type}
		>
			{title}
		</button>
	);
};

export default Button;
