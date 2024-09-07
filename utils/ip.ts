import { headers } from "next/headers";
import { cache } from "react";

const FALLBACK_IP_ADDRESS = "0.0.0.0";

export const getUserIp = cache(async function getUserIp(): Promise<string> {
	"use server";

	return (
		headers().get("x-forwarded-for")?.split(",")[0] ??
		headers().get("x-real-ip") ??
		FALLBACK_IP_ADDRESS
	);
});
