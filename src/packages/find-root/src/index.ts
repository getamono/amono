import { findUp } from '@amono/find-up';
import path from 'path';

export async function findRoot() {
	const root = await findUp({
		targets: ['yarn.lock', 'package-lock.json', 'pnpm-lock.yaml'],
	});

	if (root) {
		return path.dirname(root);
	}

	throw new Error('Workspace root not found');
}
