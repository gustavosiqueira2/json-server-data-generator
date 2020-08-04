const readlineimport = require('readline');
const readline = readlineimport.createInterface({ input: process.stdin, output: process.stdout });

const fs = require('fs');

const output_messages = require('./output_messages');

const boilerplate_entities = require('./boilerplate_entities');

const checkFilesExist = (callback) => {
  fs.exists('entities.js', (exists) => !exists ? console.log(output_messages.missing_entities) : callback());
}

const params = {
  fs,
  readline,
  output_messages,
  boilerplate_entities,
  checkFilesExist
}

const start = require('./functions/start');
const clear = require('./functions/clear');
const generate = require('./functions/generate');
const help = require('./functions/help');

const entity = require('./functions/add/entity');
const property = require('./functions/add/property');

const commands = {

  s: () => commands['start'](),
  start,

  add: (res) => {
    checkFilesExist(() => this.add_commands.hasOwnProperty(res.trim().split(' ')[1]) ? this.add_commands[res.trim().split(' ')[1]](res.trim()) : this.add_commands['default'](res.trim()));
  },

  c: () => commands['clear'](),
  clear,

  g: () => commands['generate'](),
  generate,

  h: () => commands['help'](),
  help,

  default: (res) => {
    if (res.split(' ')[0] === 'add') commands['add'](res);
    else readline.write(output_messages.unrecognized_command);
    readline.close();
  },

  add_commands: {

    e: (res) => this['entity'](res),
    entity,

    p: (res) => this['property'](res),
    property,

    default: (res) => {
      if (res.split(' ')[1]) return console.log(output_messages.add_unrecognized_command(res));
      readline.question(output_messages.add_commands, (res) => commands.hasOwnProperty(res.trim()) ? commands[res](res.trim()) : commands['default'](res.trim()));
    }

  }

}

readline.question(output_messages.presentation, (res) => commands.hasOwnProperty(res.trim()) ? commands[res.trim()](res.trim()) : commands['default'](res.trim()));
