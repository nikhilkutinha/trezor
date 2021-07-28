import { ReactNode, ChangeEvent } from "react";

type Props = {
	children: ReactNode;
	value?: string;
	onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({ children, value, onChange } : Props) {
	return (
		<select
			value={value}
			onChange={onChange}
			className="bg-gray-600 block w-full py-3 px-3 border border-gray-600 text-white rounded shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
		>
			{children}
		</select>
	);
}
