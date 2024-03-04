import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

import { runPrettier } from '../runPrettier';
import { readJsonFile } from '../readJsonFile';

const writeFile = promisify(fs.writeFile);

function createFilePath(config: UpdateJsonFileConfig) {
	const { targetPath, fileName } = config;

	if (targetPath.endsWith(fileName)) {
		return targetPath;
	}

	return path.join(targetPath, fileName);
}

export async function updateJsonFile(config: UpdateJsonFileConfig) {
	const filePath = createFilePath(config);

	const currentContent = await readJsonFile(filePath);

	const newContent = { ...currentContent, ...config.data };

	await writeFile(filePath, JSON.stringify(newContent, null, 2));

	await runPrettier(filePath);
}

export interface UpdateJsonFileConfig {
	targetPath: string;
	fileName: string;

	data: Record<string, any>;
}
