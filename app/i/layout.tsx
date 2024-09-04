import { ReactNode } from "react";

export default function RulesLayout(props: { children: ReactNode }) {
	return (
		<main className="prose prose-headings:text-2xl prose-headings:font-bold prose-headings:mb-0 prose-p:m-0 prose-p:mb-2 prose-li:text-balance prose-li:leading-snug max-w-[unset] px-4 leading-none">
			{props.children}
		</main>
	);
}
