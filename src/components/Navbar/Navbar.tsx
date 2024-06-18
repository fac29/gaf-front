import { useState } from 'react';
import './Navbar.css';
import Search from '../Search/Search';
import CreateLog from '../CreateLog/CreateLog';
import Button from '../Button/Button';

type props = {
	hasSearch?: boolean;
};

export default function Navbar({ hasSearch = true }: props) {
	const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
	const [isLogInOpen, setIsLogInOpen] = useState(false);

	const openCreateAccountModal = () => setIsCreateAccountOpen(true);
	const closeCreateAccountModal = () => setIsCreateAccountOpen(false);

	const openLogInModal = () => setIsLogInOpen(true);
	const closeLogInModal = () => setIsLogInOpen(false);

	return (
		<div className="navstyle">
			<a href="">Home</a>
			<div className="rightnav">
				{hasSearch && <Search />}
				<a href="">Cart</a>
				<Button
					btnText="Create Account"
					btnclassName="btnSecondary"
					btnonClick={openCreateAccountModal}
				/>
				<Button
					btnText="Log In"
					btnclassName="btnSecondary"
					btnonClick={openLogInModal}
				/>
			</div>
			<CreateLog
				isCreateAccountOpen={isCreateAccountOpen}
				isLogInOpen={isLogInOpen}
				closeCreateAccountModal={closeCreateAccountModal}
				closeLogInModal={closeLogInModal}
			/>
		</div>
	);
}
