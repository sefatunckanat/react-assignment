export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	thumbnail: string;
	category: string;
	images: string[];
	arrivalDate: string;
	brand: string;
}

export interface Review {
	productId: number;
	comment: string;
	createdAt: string;
	rating: number;
}
