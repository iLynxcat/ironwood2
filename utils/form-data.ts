export function toObject(formData: FormData) {
	return Object.fromEntries(formData.entries());
}
