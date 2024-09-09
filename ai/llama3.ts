import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import irlPrompt from "./irl.prompt.json";

export const perplexity = createOpenAI({
	apiKey: process.env.PERPLEXITY_API_KEY ?? "",
	baseURL: "https://api.perplexity.ai/",
});

const AI_ROOM_PROMPTS = {
	irl: <string>irlPrompt,
};

export async function transformRoomPostContent(
	prompt: keyof typeof AI_ROOM_PROMPTS | string,
	message: string,
): Promise<string> {
	"use server";

	const { text, ...res } = await generateText({
		model: perplexity("llama-3.1-8b-instruct"),
		temperature: 1.2,
		messages: [
			// @ts-expect-error -- this is fine shut up typescript
			{ role: "system", content: AI_ROOM_PROMPTS[prompt] ?? prompt },
			{ role: "user", content: message },
		],
	});

	console.log({ text, res });

	return text;
}
