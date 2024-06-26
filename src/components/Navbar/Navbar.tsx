import { useState } from 'react';
import './Navbar.css';
import Search from '../Search/Search';
import CreateLog from '../CreateLog/CreateLog';
import Button from '../Button/Button';
import { useUserContext } from '../UserContextProvider';
import CartComponent from '../Cart/CartComponent';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaCartArrowDown } from 'react-icons/fa'; // Import the cart icon from react-icons

type props = {
	hasSearch?: boolean;
};

export default function Navbar({ hasSearch = true }: props) {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const handleModalToggle = () => setModalIsOpen(!modalIsOpen);
	const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
	const [isLogInOpen, setIsLogInOpen] = useState(false);
	const [isAccountLoggedIn, setIsAccountLoggedIn] = useState(false);

	const openCreateAccountModal = () => setIsCreateAccountOpen(true);
	const closeCreateAccountModal = () => setIsCreateAccountOpen(false);

	const openLogInModal = () => setIsLogInOpen(true);
	const closeLogInModal = () => setIsLogInOpen(false);
	//calling the customHook for the contextAPI function
	const { user } = useUserContext();

	const navigate = useNavigate();
	const handleProductRouting = () => {
		navigate(`/`);
	};

	//create a function that checks the user.cart array and tallys the total quantity of items
	const totalQuantity: number =
		user?.cart?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

	return (
		<nav className="navstyle">
			<a href="#" onClick={handleProductRouting}>
				Home
			</a>

			<div className="rightnav">
				{hasSearch && <Search />}

				<div
					className="cart-icon"
					onClick={totalQuantity > 0 ? handleModalToggle : undefined}
					style={{ cursor: totalQuantity > 0 ? 'pointer' : 'default' }}
				>
					{totalQuantity > 0 ? (
						<>
							<FaCartArrowDown size={24} />
							<span className="cart-badge">{totalQuantity}</span>
						</>
					) : (
						<FaShoppingCart size={24} color="grey" />
					)}
				</div>
				{modalIsOpen && <CartComponent handleModalToggle={handleModalToggle} />}

				{!isAccountLoggedIn && (
					<Button
						btnText="Create Account"
						btnclassName="btnSecondary"
						btnonClick={openCreateAccountModal}
					/>
				)}
				{!isAccountLoggedIn && (
					<Button
						btnText="Log In"
						btnclassName="btnSecondary"
						btnonClick={openLogInModal}
					/>
				)}
				<CreateLog
					isCreateAccountOpen={isCreateAccountOpen}
					isLogInOpen={isLogInOpen}
					closeCreateAccountModal={closeCreateAccountModal}
					closeLogInModal={closeLogInModal}
					isAccountLoggedIn={isAccountLoggedIn}
					setIsAccountLoggedIn={setIsAccountLoggedIn}
				/>
			</div>
		</nav>
	);
}
