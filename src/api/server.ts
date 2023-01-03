import { kv } from "cloudflare-kv-storage";

import { Alias, CreateAliasOptions } from ".";

function getAliasKey(aliasName: string) {
	return `/${encodeURI(aliasName)}`;
}

export async function getAlias(aliasName: string): Promise<Alias | null> {
	const targetUrl = await kv.get(getAliasKey(aliasName)).catch(() => "");
	return targetUrl ? { name: aliasName, url: targetUrl } : null;
}

export async function createAlias(
	aliasName: string,
	options: CreateAliasOptions
): Promise<boolean> {
	const { targetUrl } = options;

	if (!targetUrl || typeof targetUrl !== "string") return false;

	return kv
		.set(getAliasKey(aliasName), targetUrl)
		.then(() => true)
		.catch(() => false);
}

export async function deleteAlias(aliasName: string): Promise<boolean> {
	return kv
		.delete(getAliasKey(aliasName))
		.then(() => true)
		.catch(() => false);
}
