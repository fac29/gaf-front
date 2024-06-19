import { useState } from 'react';
import './Navbar.css';
import Search from '../Search/Search';
import CreateLog from '../CreateLog/CreateLog';
import Button from '../Button/Button';
import { useUserContext } from '../UserContextProvider';
import CartComponent from '../Cart/CartComponent';

type props = {
	hasSearch?: boolean;
};

export default function Navbar({ hasSearch = true }: props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const handleModalToggle = () => setModalIsOpen(!modalIsOpen);
	const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
	const [isLogInOpen, setIsLogInOpen] = useState(false);

	const openCreateAccountModal = () => setIsCreateAccountOpen(true);
	const closeCreateAccountModal = () => setIsCreateAccountOpen(false);

	const openLogInModal = () => setIsLogInOpen(true);
	const closeLogInModal = () => setIsLogInOpen(false);
	//calling the customHook for the contextAPI function
	const { user } = useUserContext();
	//create a function that checks the user.cart array and tallys the total quantity of items
	const totalQuantity: number = user.cart.reduce((acc, item) => {
		return acc + item.quantity;
	}, 0);

	return (
		<div className="navstyle">
			<a href="">Home</a>
			<div className="rightnav">
				{hasSearch && <Search />}
				<div onClick={() => handleModalToggle()}>
					<p>Cart</p> {totalQuantity > 0 ? `${totalQuantity}items` : ''}
				</div>
				{modalIsOpen && <CartComponent handleModalToggle={handleModalToggle} />}

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
				<CreateLog
					isCreateAccountOpen={isCreateAccountOpen}
					isLogInOpen={isLogInOpen}
					closeCreateAccountModal={closeCreateAccountModal}
					closeLogInModal={closeLogInModal}
				/>
			</div>
		</div>
	);
}
