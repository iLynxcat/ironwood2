import { ZodIssue } from "zod";

export function appendZodIssuesToSearch(
	issues: ZodIssue[],
	search: URLSearchParams,
) {
	for (const issue of issues) {
		search.append(`issue.${issue.path.join(".")}`, issue.message);
	}
}

export function parseZodIssuesFromSearch(
	search: {
		[key: string]: string | string[] | undefined;
	},
	path: (string | number)[],
): string[] | undefined {
	const searchPath = `issue.${path.join(".")}`;
	const searchValue = search[searchPath];

	if (typeof searchValue === "undefined") return;
	if (typeof searchValue === "string") return [searchValue];
	return searchValue;
}
