import { MouseEvent, ReactNode } from "react";
import { Link } from "react-router-dom";


type Props = {
    children: ReactNode | string;
    className?: string;   
} & ({
    as: 'button';
    to?: never
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void 
} | {
    as: 'link';
    onClick?: never
    to: string  
})

export default function NavLink({
	children,
	to,
    onClick,
	as = 'button',
	className,
}: Props) { 

	return (
		<>
			{as === 'button' ? (
				<button onClick={onClick} className={`${className} p-3 bg-gray-600 w-full rounded text-left hover:bg-gray-700`}>{children}</button>
			) : (
				<Link to={to!} className={`${className} block p-3 bg-gray-600 w-full rounded text-left hover:bg-gray-700`}>
					{children}
				</Link>
			)}
		</>
	);
}
