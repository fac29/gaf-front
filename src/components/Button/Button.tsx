//import React from 'react';
import './Button.css';

type btnProps = {
	btnText: string;
	btnonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	btnclassName: string;
};

export default function Button({
	btnText,
	btnonClick,
	btnclassName,
}: btnProps) {
	return (
		<button className={btnclassName} onClick={btnonClick} type="submit">
			{btnText}
		</button>
	);
}
