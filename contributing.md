# Welcome to the Create Super Turbo contributing guide

Thank you for investing your time to contribute to Create Super Turbo!

In this guide, you will get an overview of the contribution workflow from opening an issue to creating, reviewing, and merging a PR.

## What can I contribute to?

There are three main things you can usually contribute to:

- **Docs**/**Landing page**: Anything that would improve the documentation for Expo Stack (typo corrections, fact checking, benchmarks, updates, and/or guides).

- **CLI**: If you would like to add a currently unsupported feature (a new styling library, auth providers, and/or a new CLI flag), you'll probably be submitting a new template, generator, and/or new CLI prompts.

> Keep in mind, that you should not change the underlying dependencies that handle a specific part of the stack (eg.: you should not change an existing template for a configuration you are trying to introduce as it may have downstream effects on any existing configurations).

- **Bug fixes/reports**: If you think you've found a bug or some unexpected behavior in the CLI application or the scaffolded apps, you're welcome to raise an issue and/or PR with a bug description and/or fix.

Ideas for improving the overall architecture of the CLI app are always be welcome, but we ask that you raise an issue and/or a discussion with an overview of the proposed ideas first, in order to ensure a proper debate over the proposal.

Be sure to follow the templates for new issues and pull requests, when applicable.

## Contribution workflow

This project uses pnpm, and should be run with Node.js on the latest available LTS version. Ensure you have them properly setup on your development environment before continuing.

### Forking and cloning

For external contributors, the best way to make changes to the project is to fork the repository and clone it locally:

1. Fork the repository to your GitHub account: https://github.com/super-turbo-stack/create-super-turbo

2. Clone the forked repository locally:

```shell
$ git clone https://github.com/<YOUR_GITHUB_USERNAME>/create-super-turbo

$ cd create-super-turbo
```

3. Checkout on a new branch, and start adding your changes:

```shell
git checkout -b <BRANCH_NAME>
```

When you're ready to submit your changes, push your branch to your forked repository and open a pull request against the `main` branch of the source repository.

From here, you can run `pnpm install` to install all the dependencies for the project.

<!-- To quickly setup `create-expo-stack` for local testing, you'll need to link a local version to run on your machine: -->

### Running the CLI from the global executable

To quickly setup `create-super-turbo` for local testing, it's recommended that you use the linking feature from package managers to create a global exectutable of the package:

```shell
$ cd cli
$ pnpm run build

# NPM linking
$ npm link
```

After linking, make sure to restart the terminal session or resource the shell profile. Ex.: `source ~/.zshrc`.

5. Raise a PR.
