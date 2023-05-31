import React, { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

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
		<form onSubmit={handleOnSubmit}>
			{error && <div>{error}</div>}
			<input
				type="text"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="E-mail"
				required
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				required
			/>
			<input type="submit" />
		</form>
	);
}
