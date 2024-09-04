// @ts-expect-error we use @types/node for compat with next.js, this runs in bun so it exists
if (!import.meta.main)
	throw new Error("Do not import seed.ts, it's just a script to be run alone");

import { database } from "../database";

{
	const isConfirmed = confirm("Delete ALL data and seed with new test data?");
	if (!isConfirmed) process.exit(1);
}

{
	console.info("Clearing rooms...");
	console.info(
		`Clearing rooms: ${(await database.room.deleteMany({})).count} cleared`,
	);
	console.info(
		`Clearing accounts: ${(await database.account.deleteMany({})).count} cleared`,
	);
	console.info(
		`Clearing posts: ${(await database.post.deleteMany({})).count} cleared`,
	);
}

{
	console.info(`Seeding rooms...`);
	const seededRooms = await database.room.createMany({
		data: [
			{
				slug: "feed",
				description: "regular shannonanigans going on here!",
			},
			{
				slug: "etc",
				description: "random other stuff",
			},
		],
	});
	console.info(`Seeded ${seededRooms.count} rooms.`);
}

{
	console.info(`Seeding accounts...`);
	const seededAccounts = await database.account.createMany({
		data: [
			{
				id: "1",
				screen_name: "jeremyFranklin",
				screen_name_lower: "jeremyfranklin",
				account_state: "Active",
			},
			{
				id: "2",
				screen_name: "Shafty",
				screen_name_lower: "shafty",
				account_state: "Active",
			},
			{
				id: "3",
				screen_name: "SlackeR",
				screen_name_lower: "slacker",
				account_state: "Expired",
			},
		],
	});
	console.info(`Seeded ${seededAccounts.count} accounts.`);
}

{
	console.info(`Seeding posts...`);
	const seededPosts = await database.post.createMany({
		data: [
			{
				author_id: "1",
				room_slug: "feed",
				text_content: "I'm hanging out with my friends!",
			},
			{
				author_id: "2",
				room_slug: "feed",
				text_content: "what's the deal with airline food??",
				posted_at: new Date(),
			},
			{
				author_id: "1",
				room_slug: "etc",
				text_content: "Walkin the dog!",
			},
			{
				author_id: "3",
				room_slug: "feed",
				text_content: "what does your status say?",
			},
		],
	});
	console.info(`Seeded ${seededPosts.count} posts.`);
}
