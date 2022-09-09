#!/usr/bin/env node

import Method from "axios";
const { get } = Method;
import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

if (argv._.length > 2) {
  get(
    `https://api.mymemory.translated.net/get?q=${argv._[0]}&langpair=${argv._[1]}|${argv._[2]}`
  )
    .then(function (res) {
      // handle success
      if (res.data.responseStatus === 200) {
        console.log(chalk.green.bold(res.data.responseData.translatedText));

        // check if there is any matches
        if (res.data.matches.length > 0) {
          console.log(chalk.cyan.bold("\n=========> More matches:"));
          for (var i = 0; i < res.data.matches.length; i++) {
            console.log(chalk.cyan.bold(`${res.data.matches[i].translation}`));
          }
        }
      } else {
        // handle failure
        console.error(
          chalk.white.bgRed.bold(
            `error ${
              res.data.responseStatus
            }\n${res.data.responseData.translatedText.toLowerCase()}`
          )
        );
      }
    })
    .catch(function (error) {
      // handle errors
      console.error(chalk.red(error));
    });
} else {
  // handle wrong params count
  console.error(
    chalk.white.bgRed.bold(
      "A parameter is missing. Correct command should be <word> <from language> <to language>"
    )
  );
}
