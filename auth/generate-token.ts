import { createHash } from "node:crypto";

export async function generateToken(forScreenName: string) {
	const hasher = createHash("MD5");

	return hasher
		.update(Buffer.from(Math.random().toString()).toString("base64"))
		.update(forScreenName)
		.digest("hex");
}
