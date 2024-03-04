export interface SyncConfig<Project extends SyncConfig.Project> {
	tree: {
		projectGlobs: string[];

		createProject(input: SyncConfig.Project): Project | Promise<Project>;
	};

	generate: {
		onProject(project: Project, projects: Project[]): any;
		onRootProject(rootProject: Project, projects: Project[]): any;
	};
}

export namespace SyncConfig {
	export interface Project {
		absolutePath: string;
		relativePath: string; // Relative to the root
	}
}
