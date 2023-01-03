export interface Alias {
	name: string;
	url: string;
}

export interface CreateAliasOptions {
	targetUrl: string;
}

export function getAliasURL(aliasName: string, full: boolean = true) {
	return `${full ? "https://" : ""}aries.fyi/${aliasName}`;
}
