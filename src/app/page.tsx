"use client";

import { twMerge } from "tailwind-merge";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { randomString } from "~/random";
import { createAlias, getAlias } from "~/api/client";
import { getAliasURL } from "~/api";

type TextInputStatus = null | "error" | "success";
type TextInputProps = React.ComponentProps<"input"> & {
	label: string;
	textPrefix?: string;
	suffixIcons?: Array<React.ReactNode>;
	status?: TextInputStatus;
};

const TextInput: React.FC<TextInputProps> = (props) => {
	const { label, textPrefix, status = null, suffixIcons, ...inputProps } = props;

	return (
		<label className="flex flex-col gap-2">
			<span className="">{label}</span>
			<div
				className={twMerge(
					"flex border-l-4 bg-neutral-800 px-4 py-3 font-worksans",
					status === null && "border-purple-500",
					status === "success" && "border-green-500",
					status === "error" && "border-red-500"
				)}
			>
				{textPrefix && <span>{textPrefix}</span>}
				<input
					{...inputProps}
					type="text"
					className={twMerge(
						"w-full bg-transparent placeholder-neutral-400 focus:outline-none",
						props.className
					)}
				/>

				<div className="flex gap-2">
					{suffixIcons}
					{status !== null && (
						<svg
							fill="none"
							stroke="currentColor"
							strokeWidth={1.5}
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							className={twMerge(
								"h-6 w-6",
								status === "success" && "text-green-500",
								status === "error" && "text-red-500"
							)}
						>
							{status === "error" && (
								<path
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							)}
							{status === "success" && (
								<path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
							)}
						</svg>
					)}
				</div>
			</div>
		</label>
	);
};

export default function RootIndexPage() {
	const searchParams = useSearchParams();

	const [aliasName, setAliasName] = useState(searchParams.get("aliasName") || randomString());
	const [aliasNameStatus, setAliasNameStatus] = useState<TextInputStatus>(null);

	const [targetUrl, setTargetUrl] = useState("");
	const [targetUrlStatus, setTargetUrlStatus] = useState<TextInputStatus>(null);

	const [message, setMessage] = useState<React.ReactNode>(null);

	const validateAliasName = useCallback(async () => {
		const alias = await getAlias(aliasName);
		setAliasNameStatus(alias !== null ? "error" : "success");
	}, [aliasName]);

	useEffect(() => {
		if (!aliasName) return;

		const handle = setTimeout(validateAliasName, 300);
		return () => clearTimeout(handle);
	}, [aliasName, validateAliasName]);

	useEffect(() => {
		if (!targetUrl) return;

		try {
			new URL(targetUrl);
			setTargetUrlStatus("success");
		} catch {
			setTargetUrlStatus("error");
		}
	}, [targetUrl]);

	return (
		<div className="flex h-full items-center justify-center p-8 font-worksans">
			<div className="flex w-96 flex-col gap-4 border-t-4 border-purple-500 bg-black-800 p-4">
				<h1 className="text-xl font-bold">Create new link alias</h1>
				<form
					className="flex flex-col gap-4"
					onSubmit={async (event) => {
						event.preventDefault();

						await createAlias(aliasName, { targetUrl })
							.then(async () => {
								await validateAliasName();

								setMessage(
									<>
										Successfully created new alias:{" "}
										<Link
											className="underline decoration-dotted"
											href={getAliasURL(aliasName)}
											target="_blank"
										>
											{getAliasURL(aliasName, false)}
										</Link>
										.
									</>
								);

								return;
							})
							.catch((reason) => {
								setMessage(reason.message);
							});
					}}
				>
					<TextInput
						label="Alias Name"
						placeholder="<alias name>"
						status={aliasNameStatus}
						textPrefix="aries.fyi/"
						value={aliasName}
						suffixIcons={[
							<button
								key="randomize"
								title="Randomize"
								type="button"
								onClick={() => setAliasName(randomString())}
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 640 512"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M592 192H473.26c12.69 29.59 7.12 65.2-17 89.32L320 417.58V464c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48V240c0-26.51-21.49-48-48-48zM480 376c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm-46.37-186.7L258.7 14.37c-19.16-19.16-50.23-19.16-69.39 0L14.37 189.3c-19.16 19.16-19.16 50.23 0 69.39L189.3 433.63c19.16 19.16 50.23 19.16 69.39 0L433.63 258.7c19.16-19.17 19.16-50.24 0-69.4zM96 248c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm0-128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24zm128 128c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z" />
								</svg>
							</button>,
							<button
								key="copy"
								title="Copy to clipboard"
								type="button"
								onClick={() => navigator.clipboard.writeText(getAliasURL(aliasName))}
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										clipRule="evenodd"
										d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 01-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0113.5 1.5H15a3 3 0 012.663 1.618zM12 4.5A1.5 1.5 0 0113.5 3H15a1.5 1.5 0 011.5 1.5H12z"
										fillRule="evenodd"
									/>
									<path d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 019 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0116.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625v-12z" />
									<path d="M10.5 10.5a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963 5.23 5.23 0 00-3.434-1.279h-1.875a.375.375 0 01-.375-.375V10.5z" />
								</svg>
							</button>
						]}
						onChange={({ currentTarget }) => setAliasName(currentTarget.value)}
					/>
					<TextInput
						label="Target URL"
						placeholder="https://example.com"
						status={targetUrlStatus}
						value={targetUrl}
						suffixIcons={[
							<button
								key="optimize"
								title="Optimize"
								type="button"
								onClick={() =>
									setTargetUrl((targetUrl) => {
										const newTargetUrl = new URL(targetUrl);
										newTargetUrl.searchParams.sort();

										return newTargetUrl.toString();
									})
								}
							>
								<svg
									className="h-6 w-6"
									fill="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										clipRule="evenodd"
										d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
										fillRule="evenodd"
									/>
								</svg>
							</button>
						]}
						onChange={({ currentTarget }) => setTargetUrl(currentTarget.value)}
					/>
					<button
						className="bg-purple-500 p-4 disabled:bg-neutral-600"
						type="submit"
						disabled={
							aliasNameStatus === "error" || targetUrlStatus === "error" || !aliasName || !targetUrl
						}
					>
						Create
					</button>
					{message && <span className="text-sm">{message}</span>}
				</form>
			</div>
		</div>
	);
}
