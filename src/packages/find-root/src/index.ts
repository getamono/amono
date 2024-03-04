import { findUp } from '@amoreh/find-up';

export async function findRoot() {
	const root = await findUp({
		targets: ['yarn.lock', 'package-lock.json', 'pnpm-lock.yaml'],
	});

	if (root) {
		return root;
	}

	throw new Error('Workspace root not found');
}
