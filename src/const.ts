export const hostname = process.env["NEXT_PUBLIC_HOSTNAME"] ?? "localhost:3000";
export const origin = `${
	process.env["NEXT_PUBLIC_PROTOCOL"] ?? hostname.includes("localhost") ? "http" : "https"
}://${hostname}`;
