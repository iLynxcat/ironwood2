import { redirect } from "next/navigation";
import { Button } from "~/components/button";
import { Form } from "~/components/form";
import { Input } from "~/components/input";
import { PageHeading } from "~/components/page-header";
import { parseZodIssuesFromSearch } from "~/utils/zod-issue-search-params";
import { guardWithAuthentication } from "../auth/auth-guard";
import { doAccountCreate } from "../auth/account-create";

interface HomePageProps {
	searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams: query }: HomePageProps) {
	await guardWithAuthentication({
		onSuccess() {
			redirect("/feed");
		},
	});

	const screenNameErrors = parseZodIssuesFromSearch(query, ["screen_name"]);

	return (
		<main>
			<PageHeading
				title="sign on"
				detail="your session will end in 24 hours. once your session ends, this name cannot be used again."
			/>

			<Form
				heading="pick a name"
				detail="choose wisely; once your session ends nobody can use this name again!"
				headingLevel={2}
				action={doAccountCreate}
			>
				<Input
					label="screen name"
					name="screen_name"
					hideLabel
					errors={screenNameErrors}
				>
					<input
						minLength={2}
						maxLength={16}
						autoFocus
						defaultValue={
							!Array.isArray(query["screen_name"]) ?
								query["screen_name"]
							:	undefined
						}
						required
					/>
				</Input>

				<Button className="mt-2" label="sign on" />
			</Form>
		</main>
	);
}
