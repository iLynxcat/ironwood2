import type { Metadata, Viewport } from "next";
import "~/app/globals.css";
import { GlobalFooter } from "~/components/global-footer";
import { GlobalHeader } from "~/components/global-header";

export const metadata: Metadata = {
	title: "ironwood",
	description: "an ephemeral online space",
};

export const viewport: Viewport = {
	colorScheme: "only light",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="mx-auto max-w-[48rem] bg-white py-6 font-serif text-black sm:px-3">
				<GlobalHeader />
				{children}
				<GlobalFooter />
			</body>
		</html>
	);
}
