import { Dispatch, FormEvent, useState } from "react";
import axios from "../utils/axios";
import { Review } from "../global/types";

const useReviews = (
	productId: string,
	setReviews: Dispatch<Review[]>,
	reviews: Review[] | []
) => {
	const [comment, setComment] = useState("");
	const [rating, setRating] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSendComment = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const reqCommentPost = await axios.post("/comments", {
				productId,
				comment,
				rating,
				createdAt: new Date(),
			});
			const resCommentPost = await reqCommentPost.data;

			const insertedReview: Review = { ...resCommentPost };

			setReviews([...reviews, insertedReview]);
			setComment("");
			setRating(0);
		} catch (err: any) {
			setError(err);
		}

		setLoading(false);
	};

	return {
		handleSendComment,
		comment,
		setComment,
		loading,
		error,
		rating,
		setRating,
	};
};

export default useReviews;
