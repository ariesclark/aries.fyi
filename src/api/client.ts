import { Alias, CreateAliasOptions } from ".";

export async function createAlias(aliasName: string, options: CreateAliasOptions): Promise<void> {
	await fetch(`/api/${aliasName}`, {
		method: "POST",
		body: JSON.stringify(options),
		headers: { "content-type": "application/json" }
	}).then((r) => {
		if (!r.ok) throw new Error(r.statusText);
		return r.json();
	});
}

export async function getAlias(aliasName: string): Promise<Alias | null> {
	return fetch(`/api/${aliasName}`)
		.then((r) => {
			if (!r.ok) return null;
			return r.json();
		})
		.catch(() => null);
}
