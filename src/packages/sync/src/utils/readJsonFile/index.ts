import { CreateFilePathConfig, createFilePath } from '../createFilePath';
import { $fs } from '../fs';

export function readJsonFile(config: ReadJsonFileConfig) {
	const filePath = createFilePath(config);

	return $fs.readJson(filePath);
}

export type ReadJsonFileConfig = CreateFilePathConfig;
