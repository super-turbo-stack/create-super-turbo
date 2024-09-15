#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import { reactApp, nextApp, expressApp } from './types/packageTypes';
import { getVersion } from './utils/getCSTVersion';

interface CliFlags {
  noGit: boolean;
  noInstall: boolean;
  default: boolean;
}

interface CliResults {
  turboRepoName: string;
  pakcageManager: 'yarn' | 'npm' | 'pnpm';
  isTS: boolean;
  react: reactApp;
  next: nextApp;
  express: expressApp;
}
//TODO: setup default options with all apps and all packages

export const runCli = async (): Promise<CliResults> => {
  // const cliResults = defaultOptions;
  let cliResults;
  const program = new Command();
  program
    .name('CREATE_SUPER_TURBO')
    .description(
      'CLI tool to setup TurboRepo with Apps and Packages blazingly fast'
    )
    .argument(
      '[dir]',
      'The name of the application, as well as the name of the directory to create'
    )
    .option(
      '--noGit',
      'Explicitly tell the CLI to not initialize a new git repo in the project',
      false
    )
    .option(
      '--noInstall',
      "Explicitly tell the CLI to not run the package manager's install command",
      false
    )
    .option(
      '-y, --default',
      'Bypass the CLI and use all default options to bootstrap a new super-turbo-app',
      false
    )
    .version(getVersion(), '-v, --version', 'Display the version number');

  //@ts-ignore
  program.parse(process.argv);

  const cliProvidedName = program.args[0];
  if (cliProvidedName) {
    cliResults.appName = cliProvidedName;
  }

  cliResults.flags = program.opts();
};
