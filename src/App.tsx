import { AuthContextProvider } from "./contexts/AuthContext";
import { RouteMain } from "./routes";

function App() {
	return (
		<AuthContextProvider>
			<RouteMain />
		</AuthContextProvider>
	);
}

export default App;
