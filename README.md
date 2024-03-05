# @amono

Helping monorepos to be more manageable.

# Background

Large parts of the stack when building a monorepo (e.g. package.json or tsconfig.json) was not designed with monorepos in mind. This is fine when a monorepo is small, but as soon as it hits a specific threshold, things become unmanageable.

There are a few tools out there that addresses management of monorepos is nice was, such as Moonrepo, Nx and OneRepo. However, these tools all aim to become profitable companies, leading to them putting efforts into things such as cachable build flows, etc.

I feel that the management part of monorepos have been a bit neglected. This is what I aim to solve with this project.
