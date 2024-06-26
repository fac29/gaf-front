import React from 'react';
import './CreateLog.css';
import Button from '../Button/Button';
import { CreateLogProps } from '../../utils/tyBucket';
import { login, signUp } from '../../utils/endpoints';

export default function CreateLog({
	isCreateAccountOpen,
	isLogInOpen,
	closeCreateAccountModal,
	closeLogInModal,
	isAccountLoggedIn,
	setIsAccountLoggedIn,
}: CreateLogProps) {
	const [nameInput, setNameInput] = React.useState('');
	const [emailInput, setEmailInput] = React.useState('');
	const [passwordInput, setPasswordInput] = React.useState('');
	const [isFormValid, setIsFormValid] = React.useState(false);
	const [error, setError] = React.useState('');

	const validateSubmitForm = () => {
		const isNameValid = nameInput.trim().length > 0;
		const isEmailValid = emailInput.trim().length > 0;
		const isPasswordValid = passwordInput.trim().length > 0;

		const isValid = isNameValid && isEmailValid && isPasswordValid;
		setIsFormValid(isValid);
		return isFormValid;
	};

	const validateLogInForm = () => {
		const isEmailValid = emailInput.trim().length > 0;
		const isPasswordValid = passwordInput.trim().length > 0;

		const isValid = isEmailValid && isPasswordValid;
		setIsFormValid(isValid);
		return isFormValid;
	};

	const handleSubmitCreate = async () => {
		if (validateSubmitForm()) {
			try {
				await signUp(nameInput, emailInput, passwordInput);
				setError('');
				setIsAccountLoggedIn(true);
				alert('Account created successfully.');
				closeCreateAccountModal();
			} catch (err: any) {
				setError(err.message || 'Failed to create account.');
				alert('Failed to create account');
				setIsAccountLoggedIn(false);
			}
		} else {
			alert('Please fill in all required fields.');
		}
	};
	const handleSubmitLogIn = async () => {
		if (validateLogInForm()) {
			try {
				await login(emailInput, passwordInput);
				setError('');
				setIsAccountLoggedIn(true);
				closeLogInModal();
			} catch (err: any) {
				setError(err.message || 'Failed to log in.');
				alert('Failed to log in.');
				setIsAccountLoggedIn(false);
			}
		} else {
			alert('Please fill in all required fields.');
		}
	};

	const handleLogout = () => {
		setIsAccountLoggedIn(false);
		setEmailInput('');
		setPasswordInput('');
		alert('Logged out successfully.');
	};

	return (
		<div className="CreateLog">
			{isCreateAccountOpen && (
				<div className="modal-overlay" onClick={closeCreateAccountModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<div className="formLine">
							{/* <IoMdCloseCircle className="closeIcon"
							color="darkred"
							size="2rem"
							onClick={closeCreateAccountModal}
						/> */}

							<h2>Create Account</h2>
						</div>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								handleSubmitCreate();
							}}
						>
							<div className="formLine">
								<label>
									Name:
									<input
										type="text"
										value={nameInput}
										onChange={(e) => {
											setNameInput(e.target.value);
											validateSubmitForm();
										}}
									/>
								</label>
							</div>
							<div className="formLine">
								<label>
									Email:
									<input
										type="email"
										value={emailInput}
										onChange={(e) => {
											setEmailInput(e.target.value);
											validateSubmitForm();
										}}
									/>
								</label>
							</div>
							<div className="formLine">
								<label>
									Password:
									<input
										type="password"
										value={passwordInput}
										onChange={(e) => {
											setPasswordInput(e.target.value);
											validateSubmitForm();
										}}
									/>
								</label>
							</div>
							<Button btnText="Create" btnclassName="btnPrimary" />
							{error && <p className="error">{error}</p>}
						</form>
					</div>
				</div>
			)}

			{isLogInOpen && (
				<div className="modal-overlay" onClick={closeLogInModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<div className="formLine">
							{/* <IoMdCloseCircle className="closeIcon"
							color="darkred"
							size="2rem"
							onClick={closeLogInModal}
						/> */}
							<h2>Log In</h2>
						</div>
						<form
							onSubmit={(event) => {
								event.preventDefault();
								handleSubmitLogIn();
							}}
						>
							<div className="formLine">
								<label>
									Email:
									<input
										type="email"
										value={emailInput}
										onChange={(e) => {
											setEmailInput(e.target.value);
											validateLogInForm();
										}}
									/>
								</label>
							</div>
							<div className="formLine">
								<label>
									Password:
									<input
										type="password"
										value={passwordInput}
										onChange={(e) => {
											setPasswordInput(e.target.value);
											validateLogInForm();
										}}
									/>
								</label>
							</div>
							<Button btnText="Log In!" btnclassName="btnPrimary" />
							{error && <p className="error">{error}</p>}
						</form>
					</div>
				</div>
			)}
			{isAccountLoggedIn && (
				<div>
					<Button
						btnText="Logout"
						btnclassName="btnSecondary"
						btnonClick={handleLogout}
					/>
				</div>
			)}
		</div>
	);
}
