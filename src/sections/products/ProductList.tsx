import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.sass";
import axios from "../../utils/axios";
import { Avatar, Badge, StarRating, Title } from "../../components";
import { NavLink } from "react-router-dom";
import { wait } from "../../utils/helper";
import { Product } from "../../global/types";

export default function ProductList() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const loadProducts = async () => {
		setLoading(true);
		try {
			await wait(250);
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

	return (
		<div className={styles.ProductList}>
			<Title>Product List</Title>
			<div className={styles.ProductList__tableWrapper}>
				{loading && <div className={styles.ProductList__loading}>Loading</div>}
				{error && <div className={styles.ProductList__error}>{error}</div>}
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Title</th>
							<th>Price</th>
							<th>Category</th>
							<th>Rating</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product.id}>
								<td>
									<Avatar src={product.thumbnail} />
								</td>
								<td>{product.title}</td>
								<td>$ {product.price}</td>
								<td>
									<Badge label={product.category} />
								</td>
								<td>
									<StarRating value={product.rating} readOnly />
								</td>
								<td>
									<NavLink to={`/products/${product.id}`}>View Product</NavLink>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
