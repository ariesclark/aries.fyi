import { redirect } from "next/navigation";

import { getAlias } from "~/api/server";

interface AliasPageProps {
	params: { aliasName: string };
	searchParams?: { [key: string]: string | Array<string> | undefined };
}

export default async function AliasPage({ params, searchParams }: AliasPageProps) {
	const alias = await getAlias(params.aliasName);
	console.log(alias);
	
	redirect(alias ? alias.url : `/view/${params.aliasName}`);
	return alias?.name;
}
