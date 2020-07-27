// ReadLine for read the prompt commands
const readlineimport = require('readline');
const readline = readlineimport.createInterface({ input: process.stdin, output: process.stdout });

// Output messages to readline
const output_messages = require('./output_messages');

// fs to read and write files
const fs = require('fs');

// Load boilerplate code
const boilerplate = require('./boilerplate');
const boilerplate_entities = require('./boilerplate_entities');

// Start the Script 
readline.question(output_messages.presentation, (res) => commands.hasOwnProperty(res) ? commands[res](res) : commands['default'](res));
// run the commands

// Commands
const commands = {

  // Command for create the boilerplate that is needed to run the rest of the CLI commmands
  start: () => {
    // Check if is aready started for no override
    const override_detected = () => {
      readline.write(output_messages.override_warning);
      readline.close();
    }

    fs.exists('generate.js', (exists) => exists ? override_detected() :
      fs.exists('entities.js', (exists) => exists ? override_detected() :
        // Creating the boilerplate core file
        fs.writeFile('generate.js', boilerplate, 'utf8', () =>
          // Creating the boilerplate entities file
          fs.writeFile('entities.js', boilerplate_entities, () => {
            readline.write(output_messages.boilerplate_starterd);
            readline.question(output_messages.run_add, (res) => commands.hasOwnProperty(res) ? commands[res](res) : commands['default'](res))
          }))));
  },

  // Command to add entity and properties of it in the main file
  add: (res) => {
    // check if core file exist
    fs.exists('generate.js', (exists) => {
      if (!exists) {
        readline.write(output_messages.missing_generate);
        readline.close();
      }
      else
        // check if entities file exist
        fs.exists('entities.js', (exists) => {
          if (!exists) {
            readline.write(output_messages.missing_entities);
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
    Object.keys(commands).forEach((command) => command !== 'default' && (commandsString += output_messages.help_commands(command)));

    readline.write(output_messages.help_command_string(commandsString));
    readline.close();
  },

  // Default () => Triggered when user inputs a non-expected value in the console
  default: (res) => {
    if (res.split(' ')[0] === 'add')
      commands['add'](res);
    else
      readline.write(output_messages.unrecognized_command);
    readline.close();
  }

}

// Commands extension for 'Add' command
const add_commands = {

  // Command for add entity
  entity: (res) => {
    if (res.split(' ').length != 4)
      readline.write(output_messages.add_missing_parameters);
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
      readline.write(output_messages.add_unrecognized_command(res));
    else
      readline.write();

    readline.close();
  }

}
