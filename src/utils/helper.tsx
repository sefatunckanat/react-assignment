export const wait = (ms = 1000) =>
	new Promise((r) => setTimeout(() => r(true), ms));
