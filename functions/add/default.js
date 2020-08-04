module.exports = ({ output_messages, readline, commands }) => (res) => {

  if (res.split(' ')[1]) return console.log(output_messages.add_unrecognized_command(res))

  readline.question(output_messages.add_commands, (res) => commands(res))

}