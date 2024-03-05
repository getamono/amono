import { exec } from 'child_process';

import { findRoot } from '@amono/find-root';
import fs from 'fs-extra';

async function isPrettierInstalled() {
	const rootPath = await findRoot();

	return fs.exists(`${rootPath}/node_modules/prettier`);
}

export async function runPrettier(target: string) {
	const rootPath = await findRoot();

	const isInstalled = await isPrettierInstalled();

	if (!isInstalled) {
		return;
	}

	await new Promise((resolve) => {
		exec(`${rootPath}/node_modules/.bin/prettier --write ${target}`, resolve);
	});
}
