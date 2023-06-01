import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.sass";
import axios from "../../utils/axios";
import { Avatar, Badge, Title } from "../../components";
import { NavLink } from "react-router-dom";

interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	thumbnail: string;
	category: string;
}

export default function ProductList() {
	const [products, setProducts] = useState<Product[]>([]);

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
			<Title>Product List</Title>
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
							<td>{product.rating}</td>
							<td>
								<NavLink to={`/products/${product.id}`}>View Product</NavLink>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
