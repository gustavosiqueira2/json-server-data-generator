module.exports = ({ readline, output_messages }) => () => {

  readline.write(output_messages.unrecognized_command)

  readline.close()

}