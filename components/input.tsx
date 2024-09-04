"use client";

import clsx from "clsx";
import { Children, cloneElement, ReactElement, useId } from "react";

export interface InputProps {
	name: string;
	label: string;
	hideLabel?: boolean;
	errors?: string[];
	children?: ReactElement;
}

export function Input({
	name,
	label,
	hideLabel = false,
	errors = [],
	children = <input />,
}: InputProps) {
	const id = useId();

	const inputId = `${id}.${name}`;

	return (
		<div className="mt-3 flex flex-col font-sans">
			<label
				className={clsx("text-sm", { "sr-only": hideLabel })}
				htmlFor={inputId}
			>
				{label}
			</label>

			{Children.map(Children.only(children), (child) =>
				cloneElement(child, {
					className: clsx(
						"rounded border-1 border-input px-2 py-1 text-sm leading-tight shadow-input pointer-coarse:px-3 pointer-coarse:py-1.5 pointer-coarse:text-sm",
						{ "border-red-full bg-red-50": errors.length },
						child.props.className,
					),
					id: inputId,
					name,
				}),
			)}

			{errors.length ?
				<>
					<strong className="sr-only">errors</strong>
					<ul className="ml-2 mt-1 flex flex-col gap-0 text-sm font-semibold leading-tight text-red-full">
						{errors.map((err) => (
							<li key={`${id}.error.${err}`}>
								<p>{err}</p>
							</li>
						))}
					</ul>
				</>
			:	undefined}
		</div>
	);
}
