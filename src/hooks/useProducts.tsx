import { useEffect, useState } from "react";
import { Product } from "../global/types";
import { wait } from "../utils/helper";
import axios from "../utils/axios";

const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const loadProducts = async () => {
		setLoading(true);
		try {
			await wait();
			const request = await axios.get("/products");
			const response = request.data;
			setProducts(response);
		} catch (error) {
			if (typeof error === "string") setError(error);
		}
		setLoading(false);
	};
	useEffect(() => {
		loadProducts();
	}, []);

	return { products, loading, error };
};

export default useProducts;
