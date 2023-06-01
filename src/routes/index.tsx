import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LoginScreen from "./LoginScreen";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardScreen from "./DashboardScreen";
import ProductScreen from "./ProductsScreen";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DashboardScreen />,
	},
	{
		path: "/products",
		children: [
			{
				index: true,
				element: <ProductScreen />,
			},
			{
				path: ":productId",
				element: <div>Detay</div>,
			},
		],
	},
]);

export const RouteMain = () => {
	const { loggedIn, state } = useContext(AuthContext);

	if (state.loading) return <div>Loading</div>;

	if (!loggedIn()) return <LoginScreen />;

	return <RouterProvider router={router} />;
};
