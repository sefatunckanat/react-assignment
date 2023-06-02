import moment from "moment";

export const wait = (ms = 1000) =>
	new Promise((r) => setTimeout(() => r(true), ms));

export const getDateWithFormat = (date: string, format: string) =>
	moment(date).format(format);
