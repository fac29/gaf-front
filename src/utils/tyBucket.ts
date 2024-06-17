//file reserved for creating and exporting types

export type Product = {
	id: number;
	name: string;
	description: string;
	image: string;
	stock: number;
	Categories: Array<Category>;
	price: number;
	size: string;
	color: string;
	genre: string;
	createdAt: string;
};

export type Category = {
	id: number;
	name: string;
};

export type Review = {
	id: number;
	name: string;
	description: string;
	image: string;
	score: number;
	productId: number;
	userId: string;
	createdAt: string;
};

export type Cards = {
	id: number;
	image: string;
	name: string;
	description: string;
	price: number;
};

export type ImgPropt = {
	imgurl: string;
	look: string;
};

//section for ContextAPi types
export type CartItem = {
	productId: string;
	quantity: number;
};

export type Cart = {
	cart: Array<CartItem>;
	cartId: number;
};

export type User = {
	role: string;
	name: string;
	username: string;
	cart: Array<Cart>;
};
//end of ContextAPi types
