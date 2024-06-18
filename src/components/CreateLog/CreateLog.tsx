import React from 'react';
import './CreateLog.css';
import Button from '../Button/Button';

interface CreateLogProps {
	isCreateAccountOpen: boolean;
	isLogInOpen: boolean;
	closeCreateAccountModal: () => void;
	closeLogInModal: () => void;
}

const CreateLog: React.FC<CreateLogProps> = ({
	isCreateAccountOpen,
	isLogInOpen,
	closeCreateAccountModal,
	closeLogInModal,
}) => {
	return (
		<div className="CreateLog">
			{isCreateAccountOpen && (
				<div className="modal-overlay" onClick={closeCreateAccountModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<button
							className="modal-close-button"
							onClick={closeCreateAccountModal}
						>
							&times;
						</button>
						<h2>Create Account</h2>
						<form>
							<div>
								<label>Email:</label>
								<input type="email" required />
							</div>
							<div>
								<label>Password:</label>
								<input type="password" required />
							</div>
							<Button btnText="Create Account" btnclassName="btnPrimary" />
						</form>
					</div>
				</div>
			)}

			{isLogInOpen && (
				<div className="modal-overlay" onClick={closeLogInModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<button className="modal-close-button" onClick={closeLogInModal}>
							&times;
						</button>
						<h2>Log In</h2>
						<form>
							<div>
								<label>Email:</label>
								<input type="email" required />
							</div>
							<div>
								<label>Password:</label>
								<input type="password" required />
							</div>
							<Button btnText="Log In" btnclassName="btnPrimary" />
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default CreateLog;
