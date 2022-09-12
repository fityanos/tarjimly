#!/usr/bin/env node

import Method from "axios";
const { get } = Method;
import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

/**
 * *** input structure
 *
 * this is how MyMemory API will be called with the below structure which includes user inputs
 */
var uri = `https://api.mymemory.translated.net/get?q=${argv._[0]}&langpair=${argv._[1]}|${argv._[2]}`;
var searchApi = encodeURI(uri); // UTF-8 representation

/**
 * we need to check whether the user arguments are less than 3
 *
 * in case of less than 3 then we need to show an error (minimum requirements is 3 args => word, from language, to language)
 */
if (argv._.length > 2) {
  get(searchApi)
    .then(function (res) {
      // handle success
      if (res.data.responseStatus === 200) {
        console.log(
          chalk.green.bold(
            `====> Your input translation:\n ${res.data.responseData.translatedText}`
          )
        );
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

      /**
       * bonus: check if there are any other matches
       *
       * TODO:: remove array duplication
       */
      if (res.data.matches.length > 0) {
        for (var i = 0; i < res.data.matches.length; i++) {
          console.log(
            chalk.cyan.bold(
              `\n====> Other match: ${res.data.matches[i].translation}`
            )
          );
        }
      }
    })
    .catch(function (error) {
      // handle errors
      console.error(chalk.red(error));
    });
} else {
  /**
   * in case user arguments are less than 3 then show this error message to explain
   */
  console.error(
    chalk.white.bgRed.bold(
      "A parameter is missing. Correct command should be <word> <from language> <to language>"
    )
  );
}
