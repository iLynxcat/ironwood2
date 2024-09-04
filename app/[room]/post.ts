import { z } from "zod";

export const PostRequest = z.object({
	content: z
		.string()
		.min(1, "must be at least 1 character")
		.max(1000, "must be at most 1,000 characters")
		.regex(
			/^[\s\w\p{L}\p{S}\p{P}\p{M}{}\[\]\(\)@#\\]+$/u,
			"there are invalid characters, what are you doing?",
		)
		.refine((content) => {
			// console.log(
			// 	content.match(/^[\s\w\p{L}\p{S}\p{P}\p{M}{}\[\]\(\)@#\\]+$/giu),
			// );
			return content
				.trim()
				.split(/[\s]+/)
				.map((s) => s.trim())
				.join(" ");
		}),
});
