import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string;
	className?: string;
	theme?: "blue" | "grey";
}

export function Button({
	label,
	className,
	type,
	theme = !type || type === "submit" ? "blue" : "grey",
	...props
}: ButtonProps) {
	return (
		<button
			{...props}
			type={type}
			className={clsx(
				"pointer-coarse:px-3 pointer-coarse:py-1.5 pointer-coarse:text-sm group block w-full cursor-default rounded border-1 border-input bg-gradient-to-b px-2.5 py-1 font-sans text-xs font-bold leading-none shadow-inner transition-[background-image] duration-1000 ease-linear disabled:opacity-60 disabled:saturate-[15%]",
				className,
				{
					"from-blue-100 to-blue-200 text-white enabled:hover:from-blue-50 enabled:hover:to-blue-100 enabled:active:from-blue-200 enabled:active:to-blue-100":
						theme === "blue",
					"from-gray-100 to-gray-200 text-blue-full enabled:hover:from-gray-50 enabled:hover:to-gray-100 enabled:active:from-gray-200 enabled:active:to-gray-100":
						theme === "grey",
				},
			)}
		>
			<span className="group-enabled:group-hover:drop-shadow-md group-enabled:group-active:drop-shadow-md">
				{label}
			</span>
		</button>
	);
}
