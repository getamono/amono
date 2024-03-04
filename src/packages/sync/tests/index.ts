import { sync, readJsonFile } from '../src';
import { z } from 'zod';

const project = z.object({
	absolutePath: z.string(),
	relativePath: z.string(),

	pkgJson: z.object({
		name: z.string(),
		// version: z.string(),
	}),
});

sync({
	tree: {
		projectGlobs: ['src/**/package.json'],

		async createProject(input) {
			const { absolutePath } = input;

			const pkgJson = await readJsonFile(absolutePath + '/package.json');

			return project.parse({
				...input,

				pkgJson,
			});
		},
	},

	generate: {
		onProject(project, projects) {
			console.log({ project });
		},
		onRootProject(rootProject, projects) {
			console.log({ rootProject });
		},
	},
});
