module.exports = ({ readline, output_messages, commands }) => () =>
  readline.question(output_messages.help_command_string, (res) => commands(res.trim()))
