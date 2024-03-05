import { SyncConfig, updateJsonFile } from '@amono/sync';
import { Project } from './index.schema';

export const generate: SyncConfig<Project>['generate'] = {
	onProject(project, projects) {
		const data = {
			main: 'dist/index.js',
		};

		if (!project.pkgJson.amore?.noExports) {
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
