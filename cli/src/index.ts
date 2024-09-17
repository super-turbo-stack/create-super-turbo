#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import { runCli } from "@/utils/runCli";

async function main() {
  await runCli();
}

main();
