import path from 'path';

export function createFilePath(config: CreateFilePathConfig) {
	if ('filePath' in config) {
		return config.filePath;
	}

	const { dirPath: targetPath, fileName } = config;

	if (targetPath.endsWith(fileName)) {
		return targetPath;
	}

	return path.join(targetPath, fileName);
}

export type CreateFilePathConfig = CreateFilePathConfig.DirPath | CreateFilePathConfig.FilePath;

export namespace CreateFilePathConfig {
	export interface DirPath {
		dirPath: string;

		fileName: string;
	}

	export interface FilePath {
		filePath: string;
	}

	export type Extend<S> = S & CreateFilePathConfig;
}
