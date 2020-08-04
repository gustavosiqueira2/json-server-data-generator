module.exports = ({ readline, output_messages, commands }) => () => {

  const commandsString = Object.keys(commands).map((command) => command !== 'default' && (commandsString += output_messages.help_commands(command)));

  readline.write(output_messages.help_command_string(commandsString));
  readline.question('', (res) => commands.hasOwnProperty(res.trim()) ? commands[res.trim()](res.trim()) : commands['default'](res.trim()));

}
