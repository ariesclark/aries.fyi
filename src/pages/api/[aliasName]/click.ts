import { NextRequest } from "next/server";

import { getAlias } from "~/api/server";

function redirect(url: string) {
	return new Response(null, {
		status: 303,
		headers: {
			location: url
		}
	});
}

export default async function (req: NextRequest) {
	const { searchParams } = new URL(req.url);

	const aliasName = searchParams.get("aliasName") as string;
	const alias = await getAlias(aliasName);

	return new Response(JSON.stringify(alias), { status: 201 });

	if (!alias) return redirect(`/view/${aliasName}`);
	return redirect(alias.url);
}
