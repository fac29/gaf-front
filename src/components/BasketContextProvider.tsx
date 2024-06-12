import { createContext, useContext, useState, ReactNode } from 'react';

type BasketItem = {
	image?: string;
	name: string;
	description?: string;
	price: number;
};

type BasketContextType = {
	basket: BasketItem[];
	addToBasket: (item: BasketItem) => void;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => {
	const context = useContext(BasketContext);
	if (!context) {
		throw new Error('useBasket must be used within a BasketProvider');
	}
	return context;
};

export const BasketProvider = ({ children }: { children: ReactNode }) => {
	const [basket, setBasket] = useState<BasketItem[]>([]);

	const addToBasket = (item: BasketItem) => {
		console.log(`Adding item to basket: ${item.name}`);
		setBasket((prevBasket) => {
			const newBasket = [...prevBasket, item];
			console.log('New basket state:', newBasket);
			return newBasket;
		});
	};

	return (
		<BasketContext.Provider value={{ basket, addToBasket }}>
			{children}
		</BasketContext.Provider>
	);
};
