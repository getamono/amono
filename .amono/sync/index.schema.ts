import { z } from 'zod';

export const projectSchema = z.object({
	absolutePath: z.string(),
	relativePath: z.string(),

	pkgJson: z.object({
		private: z.boolean().default(false),

		name: z.string(),

		amore: z
			.object({
				noExports: z.boolean().optional(),
			})
			.optional(),
	}),
});

export type Project = z.infer<typeof projectSchema>;
