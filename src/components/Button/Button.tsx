//import React from 'react';
import './Button.css';

type btnProps = {
	btnText: string;
	btnonClick?: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	btnclassName: string;
};

export default function Button({
	btnText,
	btnonClick,
	btnclassName,
}: btnProps) {
	return (
		<button className={btnclassName} onClick={btnonClick} type="button">
			{btnText}
		</button>
	);
}
