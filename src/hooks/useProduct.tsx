import { useEffect, useState } from "react";
import { Product, Review } from "../global/types";
import { wait } from "../utils/helper";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const useProduct = (productId: string | undefined) => {
	const [product, setProduct] = useState<Product | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);
	const navigate = useNavigate();

	const loadProduct = async () => {
		try {
			await wait();
			const reqProduct = await axios.get("/products/" + productId);
			const resProduct = await reqProduct.data;
			setProduct(resProduct);

			const reqReviews = await axios.get("/comments");
			const resReviews: Review[] = await reqReviews.data;

			const filteredReviews = resReviews.filter(
				(review) => review.productId.toString() === productId
			);

			setReviews(filteredReviews);
		} catch (e) {
			navigate("/products");
		}
	};

	useEffect(() => {
		loadProduct();
	}, []);

	const getAverageRating = () => {
		if (!reviews.length) return 0;
		return (
			reviews.reduce(
				(prev, val) => prev + parseFloat(val.rating.toString()),
				0
			) / reviews.length
		);
	};

	const updateRating = async (newRating: number) => {
		if (!newRating) return;
		await axios.patch("/products/" + productId, {
			rating: parseFloat(newRating.toFixed(2)),
		});
	};

	useEffect(() => {
		const average = getAverageRating();
		updateRating(average);
	}, [reviews]);

	return { product, reviews, setReviews, getAverageRating };
};

export default useProduct;
