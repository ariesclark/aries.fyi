import { hostname, origin } from "~/const";

export interface Alias {
	name: string;
	url: string;
}

export interface CreateAliasOptions {
	targetUrl: string;
}

export function getAliasURL(aliasName: string, full: boolean = true) {
	return `${full ? origin : hostname}/${aliasName}`;
}

export function validateAliasName(aliasName: string) {
	return (
		(aliasName &&
			typeof aliasName === "string" &&
			aliasName.match(/^[a-zA-Z0-9]{3,16}$/) &&
			!aliasName.match(/^\/_next\/.+$|^\/$|^\/api\/.+$/i)) ||
		false
	);
}
