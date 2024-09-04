import { PageHeading } from "~/components/page-header";

export default function NotFoundPage() {
	return (
		<main>
			<PageHeading
				title="not found!"
				detail="this page wasn't found on ironwood. oopsie."
			/>
		</main>
	);
}
