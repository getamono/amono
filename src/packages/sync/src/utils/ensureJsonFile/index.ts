import { CreateFilePathConfig, createFilePath } from '../createFilePath';
import { $fs } from '../fs';
import { writeJsonFile } from '../writeJsonFile';

export async function ensureJsonFile(config: EnsureJsonFileConfig) {
	const filePath = createFilePath(config);

	await $fs.ensureFile(filePath);

	const content = await $fs.readJson(filePath, { throws: false });

	await writeJsonFile({
		filePath,
		data: content ?? {},
	});

	return content;
}

export type EnsureJsonFileConfig = CreateFilePathConfig;
