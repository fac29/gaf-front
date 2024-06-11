import React from 'react';
import { User } from '../utils/tyBucket';

type UserContext = {
	user: User | undefined;
	setUser: React.Dispatch<React.SetStateAction<undefined>>;
	//userLoading: boolean;
};

export const UserContext = React.createContext<UserContext | null>(null);

export default function UserContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [user, setUser] = React.useState();

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUserContext() {
	const context = React.useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserContextProvider');
	}
	return context;
}
