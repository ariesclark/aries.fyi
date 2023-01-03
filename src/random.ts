export function randomRange(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const alphanumericCharset: Charset = "abcdefghijklmnopqrstuvwxyz123456790".split("");

type Charset = Array<string>;

export function randomString(length: number = 8, charset: Charset = alphanumericCharset) {
	let value = "";

	for (let i = 0; i < length; i++) {
		value += charset[randomRange(0, charset.length - 1)];
	}

	return value;
}
