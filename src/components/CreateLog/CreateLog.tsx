import React from 'react';
import './CreateLog.css';
import Button from '../Button/Button';
import { CreateLogProps } from '../../utils/tyBucket';
import { login, signUp } from '../../utils/endpoints';
import { IoMdCloseCircle } from 'react-icons/io';

export default function CreateLog({
	isCreateAccountOpen,
	isLogInOpen,
	closeCreateAccountModal,
	closeLogInModal,
}: CreateLogProps) {
	const [nameInput, setNameInput] = React.useState('');
	const [emailInput, setEmailInput] = React.useState('');
	const [passwordInput, setPasswordInput] = React.useState('');
	const [isFormValid, setIsFormValid] = React.useState(false);

	const handleSubmitCreate = (e) => {
		e.preventDefault();
		if (validateSubmitForm()) {
			signUp(nameInput, emailInput, passwordInput);
		} else {
			alert('Please fill in all required fields.');
		}
	};
	const handleSubmitLogIn = (e) => {
		e.preventDefault();
		if (validateLogInForm()) {
			login(emailInput, passwordInput);
		} else {
			alert('Please fill in all required fields.');
		}
	};

	const validateSubmitForm = () => {
		const isNameValid = nameInput.trim().length > 0;
		const isEmailValid = emailInput.trim().length > 0;
		const isPasswordValid = passwordInput.trim().length > 0;

		const isValid = isNameValid && isEmailValid && isPasswordValid;
		setIsFormValid(isValid);
		return isValid;
	};
	const validateLogInForm = () => {
		const isEmailValid = emailInput.trim().length > 0;
		const isPasswordValid = passwordInput.trim().length > 0;

		const isValid = isEmailValid && isPasswordValid;
		setIsFormValid(isValid);
		return isValid;
	};

	return (
		<div className="CreateLog">
			{isCreateAccountOpen && (
				<div className="modal-overlay" onClick={closeCreateAccountModal}>
					<div className="modal-content"  onClick={(e) => e.stopPropagation()}>
						<div className='formLine'>
						<IoMdCloseCircle className="closeIcon"
							color="darkred"
							size="2rem"
							onClick={closeCreateAccountModal}
						/>

						<h2>Create Account</h2>
						</div>
						<form>
							<div className="formLine">
								<label>Name:</label>
								<input
									type="text"
									value={nameInput}
									onChange={(e) => {
										setNameInput(e.target.value);
										validateSubmitForm();
									}}
								/>
							</div>
							<div className="formLine">
								<label>Email:</label>
								<input
									type="email"
									value={emailInput}
									onChange={(e) => {
										setEmailInput(e.target.value);
										validateSubmitForm();
									}}
								/>
							</div>
							<div className="formLine">
								<label>Password:</label>
								<input
									type="password"
									value={passwordInput}
									onChange={(e) => {
										setPasswordInput(e.target.value);
										validateSubmitForm();
									}}
								/>
							</div>
							<Button
								btnText="Create Account"
								btnclassName="btnPrimary"
								btnonClick={handleSubmitCreate}
							/>
						</form>
					</div>
				</div>
			)}

			{isLogInOpen && (
				<div className="modal-overlay" onClick={closeLogInModal}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<div className='formLine'>
						<IoMdCloseCircle className="closeIcon"
							color="darkred"
							size="2rem"
							onClick={closeLogInModal}
						/>
						<h2>Log In</h2>
						</div>
						<form>
							<div className="formLine">
								<label>Email:</label>
								<input
									type="email"
									value={emailInput}
									onChange={(e) => {
										setEmailInput(e.target.value);
										validateLogInForm();
									}}
								/>
							</div>
							<div className="formLine">
								<label>Password:</label>
								<input
									type="password"
									value={passwordInput}
									onChange={(e) => {
										setPasswordInput(e.target.value);
										validateLogInForm();
									}}
								/>
							</div>
							<Button
								btnText="Log In"
								btnclassName="btnPrimary"
								btnonClick={handleSubmitLogIn}
							/>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
