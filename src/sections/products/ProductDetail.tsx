import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { Product } from "../../global/types";

import styles from "./ProductDetail.module.sass";
import { Title } from "../../components";
import { getDateWithFormat } from "../../utils/helper";

const DetailItem = ({
	label,
	value,
}: {
	label: string;
	value: string | ReactNode;
}) => {
	return (
		<div className={styles.DetailItem}>
			<div>{label}</div>
			<div>{value}</div>
		</div>
	);
};

export default function ProductDetail() {
	const params = useParams();
	const navigate = useNavigate();
	const { productId } = params;

	const [product, setProduct] = useState<Product | null>(null);

	const loadProduct = async () => {
		if (!productId) {
			navigate("/products");
			return;
		}

		try {
			const response = await axios.get("/products/" + productId);
			const request = await response.data;
			setProduct(request);
		} catch (e) {
			console.log(e);
			navigate("/products");
			return;
		}
	};

	useEffect(() => {
		loadProduct();
	}, []);

	if (!product) return <>Loading</>;

	return (
		<div className={styles.ProductDetail}>
			<Title>{product.title}</Title>
			<div className={styles.ProductDetail__top}>
				<div className={styles.ProductDetail__cover}>
					<img src={product?.images[0]} alt={product?.title} />
				</div>
				<div className={styles.ProductDetail__details}>
					<div className={styles.ProductDetail__col}>
						<DetailItem label="Title:" value={product.title} />
						<DetailItem label="Price:" value={`$ ${product.price}`} />
						<DetailItem label="Description:" value={product.description} />
					</div>
					<div className={styles.ProductDetail__col}>
						<DetailItem
							label="Arrival Date:"
							value={getDateWithFormat(product.arrivalDate, "mm.DD.YYYY")}
						/>
						<DetailItem label="Comment Count:" value={`0`} />
						<DetailItem label="Avarage Rating:" value={product.rating} />
					</div>
				</div>
			</div>

			<pre>{JSON.stringify(product, null, 2)}</pre>
		</div>
	);
}
