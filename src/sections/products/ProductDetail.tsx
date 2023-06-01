import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import { Product } from "../../global/types";

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

	return (
		<div>
			<pre>{JSON.stringify(product, null, 2)}</pre>
		</div>
	);
}
