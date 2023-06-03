import React, { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import styles from "./LoginForm.module.sass";
import { Button, TextInput } from "../../../components";

export default function LoginForm() {
	const { state, onSignIn } = useContext(AuthContext);
	const { error } = state;

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSignIn(email, password);
	};
	return (
		<form className={styles.LoginForm} onSubmit={handleOnSubmit}>
			<TextInput
				type="text"
				placeholder="Enter e-mail"
				label="E-Mail"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
			/>
			<TextInput
				type="password"
				placeholder="Enter password"
				label="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<Button type="submit" title="Sign In" />
			{error && <div className={styles.LoginForm__error}>{error}</div>}
		</form>
	);
}
