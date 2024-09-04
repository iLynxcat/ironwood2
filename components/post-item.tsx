import { Account, Post } from "@prisma/client";
import clsx from "clsx";

interface PostItemProps {
	post: Pick<Post, "text_content" | "posted_at"> & {
		author: Pick<Account, "account_state" | "screen_name" | "id">;
	};
}

export async function PostItem({
	post: { author, text_content: content },
}: PostItemProps) {
	return (
		<article className="mx-2 border-b-1 border-b-gray-200 px-2 py-2 last:border-b-0">
			<header>
				<address>
					<span className="sr-only">posted by </span>
					<span
						className={clsx("font-bold italic text-blue-full", {
							"!text-red-full": author.account_state === "Administrator",
							"!text-[#777]":
								author.account_state === "Expired" ||
								author.account_state === "Banned",
						})}
					>
						{author.screen_name}
					</span>
				</address>
			</header>

			<p>{content}</p>
		</article>
	);
}
