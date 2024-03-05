import { runPrettier } from '../runPrettier';
import { writeJsonFile } from '../writeJsonFile';
import { CreateFilePathConfig, createFilePath } from '../createFilePath';
import { ensureJsonFile } from '../ensureJsonFile';

export async function updateJsonFile(config: UpdateJsonFileConfig) {
	const filePath = createFilePath(config);

	const currentContent = await ensureJsonFile(config);

	const data = { ...currentContent, ...config.data };

	await writeJsonFile({ ...config, data });

	await runPrettier(filePath);
}

export type UpdateJsonFileConfig = CreateFilePathConfig.Extend<{
	data: Record<string, any>;
}>;
