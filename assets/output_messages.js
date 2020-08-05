module.exports = output_messages = {

  presentation: `
  \x1b[34mwelcome to 
  ${require('../package.json').name}\x1b[0m

  \x1b[1mWhat you wanna do? (start, add, help)\x1b[0m
  Actual version ${require('../package.json').version}
  
`,
  boilerplate_started: `
  \x1b[1m\x1b[32mBoilerplate started!\x1b[0m
  you can run add entity to insert your database entity
`,
  run_add: `
  \x1b[1mNow you can run \x1b[4madd\x1b[0m\x1b[1m to start inserting your entities\x1b[0m

`,
  override_warning: `
  \x1b[31mData Generator detect!\x1b[0m
  you cant override the entities in this scope, if you wanna to reset entities, run \x1b[1mclear\x1b[0m.
`,
  missing_entities: `
  \x1b[31mData Generator isn't started yet!\x1b[0m
  please run start to create the boilerplate code to start use data-generator

  missing entities.js file!
`,
  unrecognized_command: `  \x1b[31mUnrecognized\x1b[0m command
  type \x1b[1m\x1b[4mhelp\x1b[0m, if you wanna see the list of the commands
`,
  add_entity_missing_parameters: `
  \x1b[31mMiss parameters\x1b[0m in command

  \x1b[1mAdd entity command\x1b[0m: add entity \x1b[1m'entity name' 'desired quantity of rows'\x1b[0m
  \x1b[32mExample:\x1b[0m \x1b[1madd entity User 5\x1b[0m`,
  add_property_missing_parameters: `
  \x1b[31mMiss parameters\x1b[0m in command

  \x1b[1mAdd property command\x1b[0m: add property \x1b[1m'entity name'\x1b[0m
  \x1b[32mExample:\x1b[0m \x1b[1madd property User \x1b[0m
  
  `,
  add_property_finish: `  add properties finished
  `,
  add_property_miss_type: `
  \x1b[31mType Error\x1b[0m, property must be (string | name | number | text)
`,
  entity_already_exist: `
  Entity Alreadt exist
`,
  entity_doesnt_exist: `
  Entity Doesn't exist`,
  add_properties: (entity, propertiesString) => `
  Entity \x1b[33m${entity}\x1b[0m context
    
  Properties: "name" "type" (string | name | number | text)
  ${propertiesString}
  `,
  add_property: (entity) => `  ${entity}
  `,
  add_unrecognized_command: (res) => `
  \x1b[31mUnrecognized\x1b[0m command \x1b[1m\x1b[4madd ${res.split(' ')[1]}\x1b[0m
  Add commands:
  > add entity
  > add property
  
`,
  add_commands: `
  \x1b[34m\x1b[1mAdd commands:\x1b[0m

  > add \x1b[1mentity\x1b[0m
  > add \x1b[1mproperty\x1b[0m

`,
  clear_backup: `
Do you want me to make a \x1b[1mbackup\x1b[0m of your entities? \x1b[1m(Y/n)\x1b[0m`,
  clear_backup_created: `
> \x1b[33mentities.backup.js\x1b[1m \x1b[32mcreated\x1b[0m as \x1b[1mbackup!\x1b[0m
`,
  cleared: `\x1b[32mcleared!\x1b[0m
  `,
  generate: `
  \x1b[32m\x1b[1mGenerating data...\x1b[0m`,
  generate_complete: `
  \x1b[33mData ready to use! everything is setuped\x1b[0m

  you can run \x1b[1mjson-server server.json\x1b[0m to up the server!
`,
  entities: `
  \x1b[34mYour Entities\x1b[0m

`,
  entity_properties: (name, properties) => '  \x1b[33m' + name + '\x1b[0m: \n' + properties + '\n\n',
  help_commands: (command) => `
  \x1b[32m>\x1b[0m \x1b[1m${command}\x1b[0m`,
  help_command_string: `
  \x1b[33mCommands list:

  \x1b[32m>\x1b[0m start
  \x1b[32m>\x1b[0m add entity 'name' 'rows quantity'
  \x1b[32m>\x1b[0m add property 'entity name'
  \x1b[32m>\x1b[0m clear
  \x1b[32m>\x1b[0m generate

  What you wanna do?

`

}