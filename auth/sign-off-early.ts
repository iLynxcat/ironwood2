import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { database } from "~/database";
import { sendWebhookUpdate } from "~/utils/activity-webhook";
import { getUserIp } from "~/utils/ip";
import { getCurrentAccount } from "./auth-check";

export async function doEarlySignOff() {
	"use server";

	const account = await getCurrentAccount();
	const ip = await getUserIp();

	if (!account) return;

	cookies().delete("token");

	await database.account.update({
		where: {
			screen_name_lower: account.screen_name.toLowerCase(),
		},
		data: {
			account_state: "Expired",
			expires_at: new Date(),
		},
	});

	await sendWebhookUpdate("SelfExpire", {
		ip_address: ip,
		screen_name: account.screen_name!,
	});

	redirect("/");
}
