// ReadLine for read the prompt commands
const readlineimport = require('readline');
const readline = readlineimport.createInterface({ input: process.stdin, output: process.stdout });

// Output messages to readline
const output_messages = require('./output_messages');

// fs to read and write files
const fs = require('fs');

// Load boilerplate code
const boilerplate_entities = require('./boilerplate_entities');

// Start the Script 
readline.question(output_messages.presentation, (res) => commands.hasOwnProperty(res.trim()) ? commands[res](res.trim()) : commands['default'](res.trim()));
// run the commands

// Commands
const commands = {

  // Command for create the boilerplate that is needed to run the rest of the CLI commmands
  s: () => commands['start'](),
  start: () => {
    // Check if is aready started for no override
    const override_detected = () => {
      readline.write(output_messages.override_warning);
      readline.close();
    }

    fs.exists('entities.js', (exists) => exists ? override_detected() :
      // Creating the boilerplate entities file
      fs.writeFile('entities.js', boilerplate_entities(), () => {
        readline.write(output_messages.boilerplate_starterd);
        readline.question(output_messages.run_add, (res) => commands.hasOwnProperty(res.trim()) ? commands[res](res.trim()) : commands['default'](res.trim()))
      }));
  },

  // Command to add entity and properties of it in the main file
  add: (res) => {
    checkFilesExist(() => add_commands.hasOwnProperty(res.trim().split(' ')[1]) ? add_commands[res.split(' ')[1]](res.trim()) : add_commands['default'](res.trim()));
  },

  c: () => commands['clear'](),
  clear: () => {
    checkFilesExist(() =>
      readline.question(output_messages.clear_backup, async (res) => {
        if (res.toLowerCase() !== 'n') {
          await fs.copyFile('entities.js', 'entities.backup.js', (err) => err && console.log(err));
          readline.write(output_messages.clear_backup_created);
        }

        fs.writeFile('entities.js', boilerplate_entities(), () => {
          readline.write(output_messages.cleared);
          readline.close();
        });
      })
    )
  },

  // Command to generate the data
  generate: () => {

    readline.write(output_messages.generate);

    const generate = require('./generate');

    generate().then(() => {
      readline.write(output_messages.generate_complete);
      readline.close();
    }).catch((e) => console.log(e));

  },

  // Command to show all the commands of the CLI
  help: () => {
    let commandsString = '';
    Object.keys(commands).forEach((command) => command !== 'default' && (commandsString += output_messages.help_commands(command)));

    readline.write(output_messages.help_command_string(commandsString));
    readline.question('', (res) => commands.hasOwnProperty(res.trim()) ? commands[res](res.trim()) : commands['default'](res.trim()));
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
  e: (res) => add_commands['entity'](res.trim()),
  entity: (res) => {

    // Check if params are correct
    if (res.split(' ').length !== 4) return console.log(output_messages.add_entity_missing_parameters);

    const [, , entity, quantity] = res.split(' ');
    const entities = require('./entities');

    // If quantity is not a number
    if (isNaN(Number(quantity))) return console.log(quantity + ' is not a number!');

    // If entity already exist in entities
    if (entities.hasOwnProperty(entity)) return console.log(output_messages.entity_already_exist);

    // Add entity to entities
    entities[entity] = { array: [], quantity, obj: {} }

    // Update File
    fs.writeFile('entities.js', boilerplate_entities(entities), (err) => {

      err && console.log(err);

      add_commands['property']('add property ' + entity);

    });
  },

  // Command for add property
  p: (res) => add_commands['property'](res.trim()),
  property: (res) => {

    // Check if params are correct
    if (res.split(' ').length !== 3) return console.log(output_messages.add_property_missing_parameters);

    const [, , entity] = res.split(' ');
    const entities = require('./entities');

    // If entity already exist in entities
    if (!entities.hasOwnProperty(entity)) return console.log(output_messages.entity_doesnt_exist);

    const propertiesString = Object.entries(entities[entity].obj).map((property) => `\n  ${property[0]}: ${property[1]}`);

    readline.write(output_messages.add_properties(entity, propertiesString));

  },

  // Default () => Triggered when add commands dont match neither with entity or property
  default: (res) => {
    if (res.split(' ')[1]) {
      readline.write(output_messages.add_unrecognized_command(res));
      readline.close();
    }
    else {
      readline.write(output_messages.add_commands);
      readline.question('', (res) => commands.hasOwnProperty(res.trim()) ? commands[res](res.trim()) : commands['default'](res.trim()))
    }

  }

}

// Function to check if files exist
const checkFilesExist = (callback) => {

  const missing_archive = (message) => {
    readline.write(message);
    readline.close();
  }

  // check if entities file exist
  fs.exists('entities.js', (exists) => !exists ? missing_archive(output_messages.missing_entities) : callback());
}
