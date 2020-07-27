const readlineimport = require('readline');
const readline = readlineimport.createInterface({ input: process.stdin, output: process.stdout });

const fs = require('fs');

const boilerplate = require('./boilerplate');

readline.question(`
  \x1b[1m\x1b[32mwelcome to 
  json-server-data-generator\x1b[0m

  \x1b[1m\x1b[4mWhat you wanna do? (start, add, help)\x1b[0m
  Actual version 0.1
  
`, (res) => commands.hasOwnProperty(res) ? commands[res]() : commands['default']());

const commands = {

  start: () => fs.writeFile('generate.js', boilerplate, 'utf8', () => {
    readline.write(`
  \x1b[1m\x1b[32mBoilerplate started!\x1b[0m
  you can run add entity to insert your database entity  
`);

    readline.close();
  })
  ,

  add: () => { },

  help: () => {
    let commandsString = '';
    Object.keys(commands).forEach((command) =>
      command !== 'default' && (commandsString += `
  > ${command}`));

    readline.write(`
  \x1b[1mCommands list:\x1b[0m
`+ commandsString + `
`);

    readline.close();
  },

  default: () => {
    readline.write(`
  \x1b[31m\x1b[1mUnrecognized\x1b[0m command
  type  \x1b[1m\x1b[4mhelp\x1b[0m, if you wanna see the list of the commands
`)
    readline.close();
  }

}

