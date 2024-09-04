import Image from "next/image";
import Link from "next/link";
import treeImage from "~/assets/tree_white.png";
import { Button } from "./button";
import { doEarlySignOff } from "~/auth/sign-off-early";
import clsx from "clsx";
import { getCurrentAccount } from "~/auth/auth-check";

export async function GlobalHeader() {
	const account = await getCurrentAccount();

	return (
		<header className="mb-12 flex flex-col flex-wrap justify-between gap-4 px-4 md:flex-row">
			<div className="flex flex-col">
				<p className="flex flex-row place-items-center gap-2 text-4xl font-bold">
					<Link href={account ? "/feed" : "/"}>
						<Image src={treeImage} className="-mt-1 size-8" alt="" />
					</Link>
					IRONWOOD
					{process.env.NODE_ENV === "development" && (
						<sub className="-ms-2 font-sans text-red-full">dev</sub>
					)}
				</p>
				<p className="text-xl italic">an ephemeral online space</p>
			</div>

			{account && (
				<div className="flex flex-col items-start gap-y-1 md:items-end">
					<p>
						account:{" "}
						<strong
							className={clsx("italic text-blue-full", {
								"!text-red-full": account.account_state === "Administrator",
							})}
						>
							{account?.screen_name}
						</strong>
					</p>
					<form className="w-52" action={doEarlySignOff}>
						<Button label="sign off early" type="submit" theme="grey" />
					</form>
					{account.account_state === "Administrator" && (
						<form className="w-52" action={doEarlySignOff}>
							<Button
								disabled
								label="disable expiry (n.y.i.)"
								type="submit"
								theme="blue"
							/>
						</form>
					)}
				</div>
			)}
		</header>
	);
}
