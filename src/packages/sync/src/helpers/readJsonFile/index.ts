import { readFile } from 'fs';

export async function readJsonFile(filePath: string) {
	return new Promise<Record<string, unknown>>((resolve, reject) => {
		readFile(filePath, 'utf-8', (err, content) => {
			if (err) {
				reject(err);
			} else {
				resolve(JSON.parse(content));
			}
		});
	});
}
