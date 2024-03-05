import { readJsonFile, sync } from '@amono/sync';
import { generate } from './index.generate';
import { projectSchema } from './index.schema';

sync({
	tree: {
		projectGlobs: ['src/**/package.json'],

		async createProject(input) {
			const { absolutePath } = input;

			const pkgJson = await readJsonFile({
				dirPath: absolutePath,
				fileName: 'package.json',
			});

			return projectSchema.parse({
				...input,

				pkgJson,
			});
		},
	},

	generate,
});
