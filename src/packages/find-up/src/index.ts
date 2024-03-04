import { stat } from 'fs';
import path from 'path';

function getTargetNames(config: FindUpConfig) {
	const { targets = [] } = config;

	return Array.isArray(targets) ? targets : [targets];
}

function searchTargetName(targetName: string, cwd: string, config: FindUpConfig) {
	const { type } = config;

	const targetPath = path.join(cwd, targetName);

	const isFileAllowed = type === 'all' || type === 'file';
	const isDirAllowed = type === 'all' || type === 'directory';

	return new Promise<string | null>((resolve, reject) => {
		return stat(targetPath, (err, stats) => {
			if (err) {
				return reject(err);
			}

			if (isFileAllowed && stats.isFile()) {
				return resolve(targetName);
			}

			if (isDirAllowed && stats.isDirectory()) {
				return resolve(targetName);
			}

			resolve(null);
		});
	});
}

async function searchTargets(cwd: string, config: FindUpConfig) {
	const targetNames = getTargetNames(config);

	const foundPromises = targetNames.map(async (filePath) => {
		return await searchTargetName(filePath, cwd, config);
	});

	const found = await Promise.all(foundPromises);

	return found.filter(Boolean) as string[];
}

function createResponse(targetName: string, cwd: string) {
	const absolutePath = path.join(cwd, targetName);

	return { absolutePath };
}

export async function findUp(config: FindUpConfig) {
	const { cwd = process.cwd(), depth } = config;

	if (depth === 0) {
		return null;
	}

	const [foundTargetName] = await searchTargets(cwd, config);

	if (foundTargetName) {
		return createResponse(foundTargetName, cwd);
	}

	return findUp({
		...config,
		cwd: path.dirname(cwd),
		depth: depth === undefined ? undefined : depth - 1,
	});
}

export interface FindUpConfig {
	/**
	 * Directory to start from
	 */
	cwd?: string;

	/**
	 * Files to look for
	 */
	targets: string | string[];

	/**
	 * Number of directories to traverse
	 */
	depth?: number;

	/**
	 * Type of path to return
	 */
	type?: 'directory' | 'file' | 'all';
}
