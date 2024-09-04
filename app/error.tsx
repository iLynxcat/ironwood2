"use client";

import { useEffect } from "react";
import { Button } from "~/components/button";
import { PageHeading } from "~/components/page-header";

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
	useEffect(() => {
		console.table(error);
	}, [error]);

	return (
		<main>
			<PageHeading
				title="something went wrong..."
				detail="you can try again by clicking the button or click the tree above to try from the start."
			/>

			{/* <pre className="bg-gray-50 mx-4 my-4 rounded border-1 border-input px-2 py-1 text-sm">
				{error.message}
			</pre> */}

			<p className="mx-4 mt-4">error id: {error.digest}</p>

			<Button
				className="mx-4"
				label="try again"
				type="button"
				onClick={() => reset()}
			/>
		</main>
	);
}
