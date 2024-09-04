import { Account } from "@prisma/client";
import { redirect } from "next/navigation";
import { CurrentAccount, getCurrentAccount } from "./auth-check";

type GuardWithAuthOptions = {
	onSuccess?: (account?: CurrentAccount) => void;
	onFailure?: () => void;
};

export async function guardWithAuthentication({
	onSuccess,
	onFailure = onSuccess ? undefined : () => redirect("/"),
}: GuardWithAuthOptions): Promise<CurrentAccount | null> {
	"use server";

	const account = await getCurrentAccount();

	// account exists for this token!
	if (account) {
		// account expiry or banned, epic fail
		if (
			account.account_state === "Expired" ||
			account.account_state === "Banned" ||
			(account.expires_at && Date.now() >= account.expires_at.getTime())
		) {
			onFailure?.();
			return null;
		}

		// account is valid
		onSuccess?.();
		return account;
	}

	// no account for token
	onFailure?.();
	return null;
}
