// import React from 'react';
import './CreateLog.css';
import Button from '../Button/Button';
import { CreateLogProps } from '../../utils/tyBucket';

export default function CreateLog({
	isCreateAccountOpen,
	isLogInOpen,
	closeCreateAccountModal,
	closeLogInModal,
}: CreateLogProps) {
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
								<label>Name:</label>
								<input type="text" required />
							</div>
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
}
