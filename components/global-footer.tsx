import Link from "next/link";

export function GlobalFooter() {
	return (
		<footer className="mt-12 flex flex-col-reverse gap-4 px-4 text-lg md:flex-row md:justify-between">
			<p className="flex flex-col text-balance italic leading-tight md:flex-row">
				<strong className="font-sans text-base after:mx-2 after:inline-block md:after:[content:'-']">
					ironwood<span className="sr-only"> version </span>
					<sub className="ms-1 font-sans text-sm font-semibold not-italic tracking-wider text-blue-full">
						2.0
					</sub>
				</strong>
				<span className="after:mx-2 after:inline-block md:after:[content:'-']">
					est. 2022
				</span>
				<span>re-est. 2024</span>
			</p>

			<ul className="flex flex-col gap-1 md:flex-row md:gap-0">
				<li className="after:mx-2 after:inline-block md:after:[content:'|']">
					<Link className="after:[content:'_home'] md:after:hidden" href="/">
						~
					</Link>
				</li>
				<li>
					<Link href="/rules">rules</Link>
				</li>
			</ul>
		</footer>
	);
}
