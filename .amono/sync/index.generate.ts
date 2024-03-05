import { SyncConfig, updateJsonFile } from '@amono/sync';
import { Project } from './index.schema';

export const generate: SyncConfig<Project>['generate'] = {
	onProject(project, projects) {
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

		updateJsonFile({
			dirPath: project.absolutePath,
			fileName: 'package.json',
			data,
		});

		updateJsonFile({
			dirPath: project.absolutePath,
			fileName: 'tsconfig.json',
			data: {
				extends: '@amono/tsconfig/tsconfig.base.json',
				include: ['src'],
			},
		});
	},

	onRootProject(rootProject, projects) {
		// console.log({ rootProject });
	},
};
