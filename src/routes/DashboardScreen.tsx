import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";

export default function DashboardScreen() {
	const { state, onLogout } = useContext(AuthContext);
	return (
		<DashboardLayout>
			<pre>{JSON.stringify(state, null, 2)}</pre>
			<button onClick={() => onLogout()}>Logout</button>
		</DashboardLayout>
	);
}
