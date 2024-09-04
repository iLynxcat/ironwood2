"use client";

import { DetailedHTMLProps, HTMLProps, ReactNode, useRef } from "react";

interface FormProps
	extends DetailedHTMLProps<HTMLProps<HTMLFormElement>, HTMLFormElement> {
	heading: ReactNode;
	detail?: ReactNode;
	headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
	children: ReactNode;
	action?: (formData: FormData) => Promise<void>;
}

export function Form({
	heading,
	detail,
	headingLevel = 2,
	children,
	action,
	...formProps
}: FormProps) {
	const HeadingTag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" =
		`h${headingLevel}`;
	const formRef = useRef<HTMLFormElement>(null);

	return (
		<form
			ref={formRef}
			className="my-3.5 border-y-1 border-[#ccc] bg-[#eee] px-3.5 py-3 sm:rounded sm:border-x-1"
			action={async (...args) => {
				await action?.(...args);
				formRef.current?.reset();
			}}
			{...formProps}
		>
			<hgroup>
				<HeadingTag className="mb-0.5 text-lg font-bold leading-none">
					{heading}
				</HeadingTag>
				{detail && <p>{detail}</p>}
			</hgroup>

			{children}
		</form>
	);
}
