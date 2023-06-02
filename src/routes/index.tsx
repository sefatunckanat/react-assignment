import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LoginScreen from "./LoginScreen";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import DashboardScreen from "./DashboardScreen";
import ProductScreen from "./ProductsScreen";
import ProductDetailScreen from "./ProductDetailScreen";
import { AppLoader } from "../components";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to={"/products"} />,
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
				element: <ProductDetailScreen />,
			},
		],
	},
]);

export const RouteMain = () => {
	const { loggedIn, state } = useContext(AuthContext);

	if (state.loading) return <AppLoader />;

	if (!loggedIn()) return <LoginScreen />;

	return <RouterProvider router={router} />;
};
