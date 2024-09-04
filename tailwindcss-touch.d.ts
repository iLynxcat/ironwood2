declare module "tailwindcss-touch" {
	const plugin: () => ({ addVariant: Function, e: any }) => void;
	export default plugin;
}
