import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { Button } from "~/components/button";
import { Form } from "~/components/form";
import { Input } from "~/components/input";
import { PageHeading } from "~/components/page-header";
import { PostItem } from "~/components/post-item";
import { database } from "~/database";
import { sendWebhookUpdate } from "~/utils/activity-webhook";
import { toObject } from "~/utils/form-data";
import { getUserIp } from "~/utils/ip";
import {
	appendZodIssuesToSearch,
	parseZodIssuesFromSearch,
} from "~/utils/zod-issue-search-params";
import { guardWithAuthentication } from "../../auth/auth-guard";
import { PostRequest } from "./post";
import { transformRoomPostContent } from "~/ai/llama3";

interface RoomPageProps {
	params: { room: string };
	searchParams: { [key: string]: string | string[] | undefined };
}

const getRoomData = cache(async function getRoomData(slug: string) {
	"use server";

	const [otherRooms, thisRoom] = await database.$transaction([
		database.room.findMany({
			where: {
				NOT: {
					slug,
				},
			},
			take: 3,
			orderBy: {
				slug: "desc",
			},
		}),
		database.room.findUnique({
			where: {
				slug,
			},
			select: {
				slug: true,
				description: true,
				posts: {
					take: 20,
					orderBy: {
						posted_at: "desc",
					},
					select: {
						text_content: true,
						posted_at: true,
						author: {
							select: {
								id: true,
								screen_name: true,
								account_state: true,
							},
						},
					},
				},
			},
		}),
	]);

	return { thisRoom, otherRooms };
});

export default async function RoomPage({
	params: { room: roomSlug },
	searchParams,
}: RoomPageProps) {
	const account = (await guardWithAuthentication({
		onFailure() {
			redirect("/");
		},
	}))!;

	const ip = await getUserIp();

	async function createPost(formData: FormData) {
		"use server";

		const body = toObject(formData);

		const {
			success: isDataValid,
			data,
			error,
		} = await PostRequest.safeParseAsync(body);

		if (!isDataValid) {
			const errorQuery = new URLSearchParams();

			appendZodIssuesToSearch(error.errors, errorQuery);

			if (typeof body.content === "string")
				errorQuery.set("content", body.content);

			return redirect(`?${errorQuery}`);
		}

		let content = data.content;
		if (`${roomSlug}`.toLowerCase() === "irl")
			content = await transformRoomPostContent(roomSlug as "irl", content);

		await database.post.create({
			data: {
				text_content: content,
				author: {
					connect: {
						id: account.id,
					},
				},
				room: {
					connect: {
						slug: roomSlug,
					},
				},
			},
		});

		await sendWebhookUpdate("NewPost", {
			ip_address: ip,
			screen_name: account.screen_name!,
			content: data.content,
			room_slug: roomSlug,
		});

		revalidatePath(`/${roomSlug}`);
	}

	const { thisRoom, otherRooms } = await getRoomData(roomSlug);

	if (!thisRoom) {
		return notFound();
	}

	return (
		<main>
			<PageHeading
				title={
					thisRoom.slug === "feed" ?
						"/feed: public zone"
					:	`/${thisRoom.slug} room`
				}
				detail={thisRoom.description}
			/>

			<Form
				action={createPost}
				heading="write a post!"
				detail={
					<>
						remember to follow the <Link href="/rules">rules</Link>.
					</>
				}
				headingLevel={2}
			>
				<Input
					label="post text"
					hideLabel
					name="content"
					errors={parseZodIssuesFromSearch(searchParams, ["content"])}
				>
					<textarea
						required
						minLength={1}
						defaultValue={searchParams["content"]}
						rows={3}
						className="max-h-[7em] min-h-[4em]"
					/>
				</Input>

				<Button className="mt-2" label="send post" />
			</Form>

			<section>
				<h2 className="sr-only">posts in this room</h2>

				{thisRoom.posts.map((post, i) => (
					<PostItem post={post} key={`post-#${i}`} />
				))}
			</section>

			{otherRooms.length > 0 && (
				<section className="mt-8 px-4">
					<h2 className="mb-0.5 text-lg font-bold leading-none">
						other rooms ({otherRooms.length})
					</h2>
					<ul className="mt-2">
						{otherRooms.map((room) => (
							<li key={`room-${room.slug}`}>
								<Link href={`/${room.slug}`}>/{room.slug}</Link>
							</li>
						))}
					</ul>
				</section>
			)}
		</main>
	);
}
