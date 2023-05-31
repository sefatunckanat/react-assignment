import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const RouteMain = () => {
	const { state, loggedIn } = useContext(AuthContext);

	if (state.loading) return <div>Loading</div>;

	if (!loggedIn)
		return (
			<form>
				<input type="text" placeholder="E-mail" />
			</form>
		);

	return <main>Main</main>;
};
