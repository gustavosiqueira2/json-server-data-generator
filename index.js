const readlineimport = require('readline');

const readline = readlineimport.createInterface({ input: process.stdin, output: process.stdout });

readline.question(`
  \x1b[1m\x1b[32mWelcome to json-server-data-generator\x1b[0m
  \x1b[1m\x1b[4mWhat you wanna do? (help to see the commands)\x1b[0m
  Actual version 0.1
`, (res) => commands(res));

const commands = (res) => {

    

}
