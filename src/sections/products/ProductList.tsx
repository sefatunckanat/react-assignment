import styles from "./ProductList.module.sass";
import { AppLoader, Avatar, Badge, StarRating, Title } from "../../components";
import { NavLink } from "react-router-dom";
import useProducts from "../../hooks/useProducts";

export default function ProductList() {
	const { loading, error, products } = useProducts();

	return (
		<div className={styles.ProductList}>
			<Title>Product List</Title>
			<div className={styles.ProductList__tableWrapper}>
				{loading && <AppLoader label="Products Loading..." />}
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
