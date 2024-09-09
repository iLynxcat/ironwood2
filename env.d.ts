namespace NodeJS {
	interface ProcessEnv {
		CRON_SECRET?: string;

		DATABASE_URL: string;
		DISCORD_WEBHOOK: string;

		PERPLEXITY_API_KEY: string;
	}
}
