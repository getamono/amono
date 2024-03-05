import { SyncConfig, updateJsonFile } from '@amono/sync';
import { Project } from './index.schema';

import { version } from '../../lerna.json';

function updateBasicPackage(project: Project) {
	return updateJsonFile({
		dirPath: project.absolutePath,
		fileName: 'package.json',
		data: {
			version,
			license: 'MIT',
		},
	});
}

export const generate: SyncConfig<Project>['generate'] = {
	async onProject(project) {
		const { pkgJson } = project;

		const data = {
			main: 'dist/index.js',
			files: pkgJson.private ? undefined : ['dist'],
		};

		if (!pkgJson.amore?.noExports) {
			Object.assign(data, {
				exports: {
					'.': {
						require: './dist/index.js',
						import: './dist/index.mjs',
					},
				},
			});
		}

		await updateBasicPackage(project);

		await updateJsonFile({
			dirPath: project.absolutePath,
			fileName: 'package.json',
			data,
		});

		await updateJsonFile({
			dirPath: project.absolutePath,
			fileName: 'tsconfig.json',
			data: {
				extends: '@amono/tsconfig/tsconfig.base.json',
				include: ['src'],
			},
		});
	},

	async onRootProject(project) {
		await updateBasicPackage(project);
	},
};
