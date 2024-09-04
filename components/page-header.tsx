import clsx from "clsx";
import type { ReactNode } from "react";

interface PageHeadingProps {
	title: ReactNode;
	detail?: ReactNode;
	width?: "full" | "inset";
}

export function PageHeading({
	title,
	detail,
	width = "inset",
}: PageHeadingProps) {
	return (
		<hgroup className={clsx({ "px-4": width === "inset" })}>
			<h1 className="text-2xl font-bold">{title}</h1>
			<p>{detail}</p>
		</hgroup>
	);
}
