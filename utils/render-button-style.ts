export function renderButtonStyle(type: string) {
	switch (type) {
		case "primary":
			return "px-8 py-3 text-lg font-semibold rounded darok:bg-violet-400 darok:text-gray-900";
		case "secondary":
			return "px-8 py-3 text-lg font-semibold border rounded darok:border-gray-100";
		default:
			return "px-8 py-3 text-lg font-semibold rounded darok:bg-violet-400 darok:text-gray-900";
	}
}
