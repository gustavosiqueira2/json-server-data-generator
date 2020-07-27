// ReadLine for read the prompt commands
const readlineimport = require('readline');
const readline = readlineimport.createInterface({ input: process.stdin, output: process.stdout });

// fs to read and write files
const fs = require('fs');

// Load boilerplate code
const boilerplate = require('./boilerplate');
const boilerplate_entities = require('./boilerplate_entities');

// Start the Script 
readline.question(`
  \x1b[34mwelcome to 
  json-server-data-generator\x1b[0m

  \x1b[1m\x1b[4mWhat you wanna do? (start, add, help)\x1b[0m
  Actual version 0.1
  
`, (res) => commands.hasOwnProperty(res) ? commands[res](res) : commands['default'](res));
// run the commands

// Commands
const commands = {

  // Command for create the boilerplate that is needed to run the rest of the CLI commmands
  start: () =>
    // Creating the boilerplate core file
    fs.writeFile('generate.js', boilerplate, 'utf8', () =>
      // Creating the boilerplate entities file
      fs.writeFile('entities.js', boilerplate_entities, () => {
        readline.write(`
  \x1b[1m\x1b[32mBoilerplate started!\x1b[0m
  you can run add entity to insert your database entity  
`);

        readline.close();
      })),

  // Command to add entity and properties of it in the main file
  add: (res) => {
    // check if core file exist
    fs.exists('generate.js', (exists) => {
      if (!exists) {
        readline.write(`
  \x1b[31mData Generator isn't started yet!\x1b[0m
  please run start to create the boilerplate code to start use data-generator

  missing generate.js file!
`);

        readline.close();
      }
      else
        // check if entities file exist
        fs.exists('entities.js', (exists) => {
          if (!exists) {
            readline.write(`
      \x1b[31mData Generator isn't started yet!\x1b[0m
      please run start to create the boilerplate code to start use data-generator

      missing entities.js file!
    `);

            readline.close();
          }
          else
            // Run add commands
            add_commands.hasOwnProperty(res.split(' ')[1]) ? add_commands[res.split(' ')[1]](res) : add_commands['default'](res);
        })
    });
  },

  // Command to show all the commands of the CLI
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

  // Default () => Triggered when user inputs a non-expected value in the console
  default: (res) => {
    if (res.split(' ')[0] === 'add')
      commands['add'](res);
    else
      readline.write(`
  \x1b[31mUnrecognized\x1b[0m command
  type  \x1b[1m\x1b[4mhelp\x1b[0m, if you wanna see the list of the commands
`);

    readline.close();
  }

}

// Commands extension for 'Add' command
const add_commands = {

  // Command for add entity
  entity: (res) => {
    if (res.split(' ').length != 4)
      readline.write(`
  \x1b[31mMiss parameters\x1b[0m in command

  \x1b[1mAdd entity command\x1b[0m: add entity \x1b[1m'entity name' 'desired quantity of rows'\x1b[0m
  \x1b[32mExample:\x1b[0m \x1b[1madd entity Cars 32\x1b[0m
`);
    else {
      // Adding entity to the file
      readline.write(`    
  \x1b[1mEntity added!\x1b[0m
`);
    }
  },

  // Command for add property
  property: (res) => { },

  // Default () => Triggered when add commands dont match neither with entity or property
  default: (res) => {
    if (res.split(' ')[1])
      readline.write(`
  \x1b[31mUnrecognized\x1b[0m command \x1b[1m\x1b[4madd ${res.split(' ')[1]}\x1b[0m
  Add commands:
  > add entity
  > add property
`);
    else
      readline.write(`
  \x1b[34m\x1b[1mAdd commands:\x1b[0m

  > add \x1b[1mentity\x1b[0m
  > add \x1b[1mproperty\x1b[0m
`);

    readline.close();
  }

}
