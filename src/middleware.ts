import { NextResponse } from "next/server";

import { getAlias } from "./api/server";
import { validateAliasName } from "./api";
import { origin } from "./const";

import type { NextRequest } from "next/server";

export const config = {
	matcher: "/:path*"
};

export async function middleware(request: NextRequest) {
	const { pathname } = new URL(request.url);

	const aliasName = pathname.slice(1, pathname.length);

	if (!validateAliasName(aliasName)) return NextResponse.next();
	const alias = await getAlias(aliasName);

	return new NextResponse(null, {
		status: 302,
		headers: {
			location: alias ? alias.url : `${origin}/?${new URLSearchParams({ aliasName }).toString()}`
		}
	});
}
