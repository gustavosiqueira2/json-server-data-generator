module.exports = ({ readline, output_messages, commands }) => (res) => {

  if (res.split(' ')[0] === 'add') commands['add'](res);

  else readline.write(output_messages.unrecognized_command);

  readline.close();

}