#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs-extra';
import {PKG_ROOT, TITLE} from "./const";

const program = new Command();

program
  .name('create-super-turbo')
  .description('CLI tool to setup TurboRepo for you!')
  .version('1.0.0');

program.parse(process.argv);
console.log(PKG_ROOT, TITLE);
