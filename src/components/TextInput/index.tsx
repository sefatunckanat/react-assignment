import React, { HTMLInputTypeAttribute, useRef } from "react";

import styles from "./TextInput.module.sass";

interface IInput {
	type: HTMLInputTypeAttribute;
	label?: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	placeholder?: string;
}

const TextInput = ({
	type = "text",
	label,
	value,
	onChange,
	required = false,
	placeholder,
}: IInput) => {
	return (
		<div className={styles.TextInput}>
			{label && <label>{label}</label>}
			<input
				value={value}
				onChange={onChange}
				type={type}
				required={required}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default TextInput;
