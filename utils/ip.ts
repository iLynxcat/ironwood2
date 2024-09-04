import { headers } from "next/headers";

const FALLBACK_IP_ADDRESS = "0.0.0.0";

export async function getUserIp(): Promise<string> {
	"use server";

	return (
		headers().get("x-forwarded-for")?.split(",")[0] ??
		headers().get("x-real-ip") ??
		FALLBACK_IP_ADDRESS
	);
}
