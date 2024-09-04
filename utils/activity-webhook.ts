enum WebhookFlags {
	SUPPRESS_EMBEDS = 1 << 2,
	SUPPRESS_NOTIFICATIONS = 1 << 12,
}

type WebhookUpdateType = "NewAccount" | "NewPost" | "SelfExpire";
type WebhookUpdateContent<T extends WebhookUpdateType> = {
	screen_name: string;
	ip_address: string;
	content?: T extends "NewPost" ? string : undefined;
	room_slug?: T extends "NewPost" ? string : undefined;
};

const embedColor = (type: WebhookUpdateType) => {
	switch (type) {
		case "NewAccount":
			return 0x00ff00;
		case "NewPost":
			return 0x0000ff;
		case "SelfExpire":
			return 0xff00ff;
		default:
			return 0x000000;
	}
};

export async function sendWebhookUpdate<T extends WebhookUpdateType>(
	type: T,
	content: WebhookUpdateContent<T>,
) {
	"use server";
	console.log(type, content);

	// no-op when no webhook is specified
	if (!process.env.DISCORD_WEBHOOK) return;

	const msg: {
		content?: string;
		embeds: {
			color: number;
			description?: string;
			fields: { name: string; value: string; inline?: boolean }[];
			footer: { text: string };
			timestamp: string;
		}[];
		attachments: [];
		flags: number;
	} = {
		embeds: [
			{
				color: embedColor(type),
				fields: [],
				footer: {
					text: `NODE_ENV=${process.env.NODE_ENV}`,
				},
				timestamp: new Date().toISOString(),
			},
		],
		attachments: [],
		flags: 0,
	};

	switch (type) {
		case "NewAccount":
			msg.embeds[0].description = "Account was created";
			msg.embeds[0].fields = [
				{
					name: "screen name",
					value: content.screen_name,
				},
				{
					name: "ip address",
					value: content.ip_address,
				},
			];
			break;
		case "NewPost":
			msg.embeds[0].description = "New post!";
			msg.embeds[0].fields = [
				{
					name: "screen name",
					value: content.screen_name,
				},
				{
					name: "content",
					value: content.content!,
				},
				{
					name: "room",
					value: `/${content.room_slug!}`,
					inline: true,
				},
				{
					name: "ip address",
					value: content.ip_address,
					inline: true,
				},
			];
			break;
		case "SelfExpire":
			msg.embeds[0].description = "Account was self-expired";
			msg.embeds[0].fields = [
				{
					name: "screen name",
					value: content.screen_name,
				},
				{
					name: "ip address",
					value: content.ip_address,
				},
			];
			break;
	}

	await fetch(process.env.DISCORD_WEBHOOK, {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(msg),
	}).catch((err) => {
		console.error("Failed Discord webhook", err);
	});
}
