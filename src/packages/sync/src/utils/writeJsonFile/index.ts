import { CreateFilePathConfig, createFilePath } from '../createFilePath';
import { $fs } from '../fs';

export function writeJsonFile(config: WriteJsonFileConfig) {
	const filePath = createFilePath(config);

	const content = JSON.stringify(config.data, null, 2);

	return $fs.writeFile(filePath, content);
}

export type WriteJsonFileConfig = CreateFilePathConfig.Extend<{
	data: Record<string, any>;
}>;
