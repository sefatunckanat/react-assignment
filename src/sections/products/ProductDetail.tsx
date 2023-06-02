import React, {
	Dispatch,
	FormEvent,
	ReactNode,
	useEffect,
	useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Review, Product } from "../../global/types";

import styles from "./ProductDetail.module.sass";
import { Badge, Title, TabView, TextInput, Button } from "../../components";
import { getDateWithFormat } from "../../utils/helper";
import axios from "../../utils/axios";

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

const DetailedContent = ({ product }: { product: Product }) => {
	return (
		<div>
			<DetailItem
				label="Category:"
				value={<Badge label={product.category} />}
			/>
			<DetailItem label="Title:" value={product.title} />
			<DetailItem label="Description:" value={product.description} />
			<DetailItem label="Brand:" value={product.brand} />
			<DetailItem label="Price:" value={`$ ${product.price}`} />
			<DetailItem label="Stock:" value={product.stock} />
			<DetailItem label="Stock:" value={product.stock} />
			<DetailItem
				label="Arrival Date:"
				value={getDateWithFormat(product.arrivalDate, "mm.DD.YYYY")}
			/>
		</div>
	);
};

const ReviewsContent = ({
	reviews,
	productId,
	setReviews,
}: {
	reviews: Review[] | [];
	productId: string;
	setReviews: Dispatch<Review[]>;
}) => {
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState("");

	const handleSendComment = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const reqCommentPost = await axios.post("/comments", {
			productId,
			comment,
			rating,
		});
		const resCommentPost = await reqCommentPost.data;

		const insertedReview: Review = { ...resCommentPost };

		setReviews([...reviews, insertedReview]);
	};

	return (
		<div>
			<div className={styles.ReviewsContent__row}>
				<div className={styles.ReviewsContent__main}>
					{!reviews?.length && (
						<div className={styles.ReviewsContent__emptyContent}>
							The product has not found any reviews.
						</div>
					)}
					{!!reviews?.length &&
						reviews.map((review, index) => (
							<div className={styles.ReviewsContent__reviewRow} key={index}>
								<DetailItem label="Comment:" value={review.comment} />
								<DetailItem label="Rating:" value={review.rating} />
								<DetailItem
									label="Created At:"
									value={getDateWithFormat(review.createdAt, "mm.DD.YYYY")}
								/>
							</div>
						))}
				</div>
				<div>
					<form
						onSubmit={handleSendComment}
						className={styles.ReviewsContent__newReview}
					>
						<div className={styles.ReviewsContent__newReview__title}>
							Review this product
						</div>
						<TextInput
							type="text"
							label="Comment"
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
						<TextInput
							type="text"
							label="Rating"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
						/>
						<div>
							<Button
								type="submit"
								title="Send Comment"
								disabled={!comment.trim().length || !rating.trim().length}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default function ProductDetail() {
	const params = useParams();
	const navigate = useNavigate();
	const { productId } = params;

	const [product, setProduct] = useState<Product | null>(null);
	const [reviews, setReviews] = useState<Review[]>([]);

	const loadProduct = async () => {
		try {
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
			console.log(e);
			navigate("/products");
			return;
		}
	};

	useEffect(() => {
		loadProduct();
	}, []);

	if (!productId) {
		navigate("/products");
		return;
	}
	if (!product) return <>Loading</>;

	return (
		<div className={styles.ProductDetail}>
			<Title>{product.title}</Title>
			<div className={styles.ProductDetail__top}>
				<div className={styles.ProductDetail__cover}>
					<img
						className={styles.ProductDetail__cover__image}
						src={product?.images[0]}
						alt={product?.title}
					/>
					<img
						className={styles.ProductDetail__cover__bg}
						src={product?.images[0]}
						alt={product?.title}
					/>
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
						<DetailItem label="Reviews Count:" value={reviews?.length} />
						<DetailItem label="Avarage Rating:" value={product.rating} />
					</div>
				</div>
			</div>
			<TabView
				tabs={[
					{
						label: "Product Details",
						content: <DetailedContent product={product} />,
					},
					{
						label: "Product Comments",
						content: (
							<ReviewsContent
								reviews={reviews}
								productId={productId}
								setReviews={setReviews}
							/>
						),
					},
				]}
			/>
		</div>
	);
}
