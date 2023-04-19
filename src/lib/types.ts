export function switchExhaust(value: never): never {
	throw new Error(`Nonexhaustive switch value: ${value}`);
}
