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
