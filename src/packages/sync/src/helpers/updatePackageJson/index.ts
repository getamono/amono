import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { runPrettier } from '../runPrettier';
import { readJsonFile } from '../readJsonFile';

const writeFile = promisify(fs.writeFile);

function createFilePath(target: string) {
	if (target.endsWith('package.json')) {
		return target;
	}

	return path.join(target, 'package.json');
}

export async function updatePackageJson(config: UpdatePackageJsonConfig) {
	const { target } = config;

	const filePath = createFilePath(target);

	const currentContent = await readJsonFile(filePath);

	const newContent = { ...currentContent, ...config.data };

	await writeFile(filePath, JSON.stringify(newContent, null, 2));

	await runPrettier(filePath);
}

export interface UpdatePackageJsonConfig {
	target: string; // directory or file
	data: Record<string, any>;
}
