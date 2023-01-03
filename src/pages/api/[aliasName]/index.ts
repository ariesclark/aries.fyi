import { NextRequest } from "next/server";

import { createAlias, deleteAlias, getAlias } from "~/api/server";

function json<T = unknown>(value: T, status: number = 200, headers: Record<string, string> = {}) {
	return new Response(JSON.stringify(value), {
		status,
		headers: {
			"content-type": "application/json",
			...headers
		}
	});
}

function error(message: string, status: number) {
	return json({ error: message }, status);
}

function success(status: number = 200) {
	return json({ success: true }, status);
}

export default async function (req: NextRequest) {
	const { searchParams } = new URL(req.url);

	const aliasName = searchParams.get("aliasName") as string;
	const alias = await getAlias(aliasName);

	if (req.method === "POST") {
		if (alias) return error("conflict", 409);

		const body = await req.json().catch(() => null);
		if (typeof body !== "object" || (body === null && typeof body.targetUrl === "string"))
			return error("missing properties", 400);

		if (!(await createAlias(aliasName, { targetUrl: body.targetUrl })))
			return error("couldn't create alias", 400);

		return success(201);
	}

	if (req.method === "GET") {
		if (!alias) return error("not found", 404);
		return json(alias, 200, { "cache-control": "public, max-age=31536000, immutable" });
	}

	if (req.method === "DELETE") {
		if (!deleteAlias(aliasName)) return success();
		return success();
	}

	return error("unknown method", 405);
}
