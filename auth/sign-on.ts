import { z } from "zod";
import { BANNED_NAMES } from "../app/banned-names";

export const SignOnRequest = z.object({
	screen_name: z
		.string()
		.min(2, "must be at least 2 characters")
		.max(16, "must be at most 16 characters")
		.regex(
			/^[a-zA-Z0-9_]+$/g,
			"must contain only alphanumeric characters and underscores",
		)
		.refine((screenName) => {
			const lowercaseName = screenName.toLowerCase();

			let isNameBanned = false;

			isNameBanned ||= BANNED_NAMES.start.some((matcher) =>
				lowercaseName.startsWith(matcher),
			);
			isNameBanned ||= BANNED_NAMES.match.some((matcher) =>
				lowercaseName.includes(matcher),
			);
			isNameBanned ||= BANNED_NAMES.exact.some(
				(matcher) => lowercaseName === matcher,
			);

			return !isNameBanned;
		}, "name is banned"),
});
