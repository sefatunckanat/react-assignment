import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.sass";
import axios from "../../utils/axios";

export default function ProductList() {
	const [products, setProducts] = useState([]);

	const loadProducts = async () => {
		const request = await axios.get("/products");
		const response = request.data;
		setProducts(response);
	};
	useEffect(() => {
		loadProducts();
	}, []);

	return (
		<div className={styles.ProductList}>
			<pre>{JSON.stringify(products, null, 2)}</pre>
		</div>
	);
}
