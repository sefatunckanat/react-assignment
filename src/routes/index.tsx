import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LoginScreen from "./LoginScreen";

export const RouteMain = () => {
	const { loggedIn, state, onLogout } = useContext(AuthContext);

	if (state.loading) return <div>Loading</div>;

	if (!loggedIn()) return <LoginScreen />;

	return (
		<main>
			<pre>{JSON.stringify(state, null, 2)}</pre>
			<button onClick={() => onLogout()}>Logout</button>
		</main>
	);
};
