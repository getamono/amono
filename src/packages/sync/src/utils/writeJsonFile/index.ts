import { CreateFilePathConfig, createFilePath } from '../createFilePath';
import { $fs } from '../fs';
import { runPrettier } from '../runPrettier';

export async function writeJsonFile(config: WriteJsonFileConfig) {
	const filePath = createFilePath(config);

	const content = JSON.stringify(config.data, null, 2);

	await $fs.writeFile(filePath, content);

	runPrettier(filePath);
}

export type WriteJsonFileConfig = CreateFilePathConfig.Extend<{
	data: Record<string, any>;
}>;
