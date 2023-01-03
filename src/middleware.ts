import { NextResponse } from "next/server";

import { getAlias } from "./api/server";

import type { NextRequest } from "next/server";

export const config = {
	matcher: "/:path*"
};

export async function middleware(request: NextRequest) {
	const url = new URL(request.url);
	const pathname = url.pathname.slice(1, url.pathname.length);
	if (pathname.startsWith("_next") || !pathname) return;

	const alias = await getAlias(pathname);
	return NextResponse.redirect(alias ? alias.url : `/view/${pathname}`);
}
