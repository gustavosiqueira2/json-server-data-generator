module.exports = ({ readline, output_messages }) => () => {

  readline.write(output_messages.generate);

  const generate = require('../generate');

  generate().then(() => {

    readline.write(output_messages.generate_complete);

    readline.close();

  }).catch((e) => console.log(e));

}
