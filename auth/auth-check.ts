import { database } from "~/database";
import { cache } from "react";
import { Account, AccountState } from "@prisma/client";
import { cookies } from "next/headers";

export type CurrentAccount = Pick<
	Account,
	"id" | "account_state" | "expires_at" | "screen_name"
>;

export const getCurrentAccount = cache(
	async function (): Promise<CurrentAccount | null> {
		"use server";

		const token = cookies().get("token")?.value;

		if (!token) return null;

		return await database.account.findUnique({
			where: {
				token,
				expires_at: {
					gt: new Date(),
				},
				OR: [
					{
						account_state: "Active",
					},
					{
						account_state: "Administrator",
					},
				],
			},
			select: {
				id: true,
				account_state: true,
				expires_at: true,
				screen_name: true,
			},
		});
	},
);
