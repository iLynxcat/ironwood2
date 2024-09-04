import { toObject } from "~/utils/form-data";
import { getUserIp } from "~/utils/ip";
import { SignOnRequest } from "./sign-on";
import { appendZodIssuesToSearch } from "~/utils/zod-issue-search-params";
import { redirect } from "next/navigation";
import { Account } from "@prisma/client";
import { generateToken } from "./generate-token";
import { database } from "~/database";
import { cookies } from "next/headers";
import { sendWebhookUpdate } from "~/utils/activity-webhook";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function doAccountCreate(formData: FormData) {
	"use server";

	const body = toObject(formData);
	const ip = await getUserIp();

	const {
		success: isDataValid,
		data,
		error,
	} = await SignOnRequest.safeParseAsync(body);

	if (!isDataValid) {
		const errorQuery = new URLSearchParams();

		appendZodIssuesToSearch(error.errors, errorQuery);

		if (typeof body.screen_name === "string")
			errorQuery.set("screen_name", body.screen_name);

		return redirect(`?${errorQuery}`);
	}

	const name = data.screen_name;
	const nameLower = name.toLowerCase();

	let user: Account;

	try {
		const token = await generateToken(nameLower);

		user = await database.account.create({
			data: {
				screen_name_lower: nameLower,
				screen_name: name,
				token,
			},
		});

		cookies().set("token", token);

		await sendWebhookUpdate("NewAccount", {
			ip_address: ip,
			screen_name: name,
		});
	} catch (err) {
		const errorSearch = new URLSearchParams();
		errorSearch.set("screen_name", name);

		if (err instanceof PrismaClientKnownRequestError) {
			if (err.code === "P2002") {
				// name unique constraint violation
				errorSearch.set(
					"issue.screen_name",
					"this name has already been taken!",
				);
				return redirect(`?${errorSearch}`);
			}
		} else if (err instanceof Error) {
			if (err.message === "name is banned") {
				errorSearch.set("issue.screen_name", "this name is banned!");
				return redirect(`?${errorSearch}`);
			}
		}

		throw err;
	}

	redirect("/feed");
}
