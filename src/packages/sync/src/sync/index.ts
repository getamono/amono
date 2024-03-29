import { SyncConfig } from '../types';
import { findRoot } from '@amono/find-root';

import fg from 'fast-glob';
import fs from 'fs-extra';
import path from 'path';

type $Project = SyncConfig.Project;

function createProjectPath(targetPath: string) {
	const stats = fs.statSync(targetPath);

	if (stats.isDirectory()) {
		return targetPath;
	}

	if (stats.isFile()) {
		return path.dirname(targetPath);
	}

	throw new Error(`Unknown file type: ${targetPath}`);
}

export async function sync<Project extends $Project>(config: SyncConfig<Project>) {
	const { tree, generate } = config;
	const { createProject } = tree;
	const { onProject, onRootProject } = generate;

	const rootProjectPath = await findRoot();

	async function generateProject(targetPath: string) {
		try {
			const absolutePath = await createProjectPath(targetPath);

			const relativePath = path.relative(rootProjectPath, targetPath);

			return await createProject({ absolutePath, relativePath });
		} catch (cause) {
			throw new Error(`Failed to generate project: ${targetPath}`, { cause });
		}
	}

	async function findProjects() {
		const { projectGlobs } = config.tree;

		const projectPaths = await fg.async(projectGlobs, {
			absolute: true,
			cwd: rootProjectPath,
		});

		const projects = projectPaths.map((projectPath) => {
			return generateProject(projectPath);
		});

		return Promise.all(projects);
	}

	const rootProject = await generateProject(rootProjectPath);
	const projects = await findProjects();

	await Promise.all(
		projects.map((project) => {
			return onProject(project, projects);
		}),
	);

	onRootProject(rootProject, projects);
}
