import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
	const authorization = req.headers.get("Authorization");
	if (authorization !== `Bearer ${process.env.CRON_SECRET}`)
		return new Response("Unauthorized", {
			status: 401,
		});

	return Response.json({ todo: true, message: "do the thing" });
}
