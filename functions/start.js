module.exports = ({ fs, readline, output_messages, boilerplate_entities, commands }) => () => {

  // Check if is aready started for no override
  const override_detected = () => {
    readline.write(output_messages.override_warning);
    readline.close();
  }

  fs.exists('entities.js', (exists) => exists ? override_detected() :
    // Creating the boilerplate entities file
    fs.writeFile('entities.js', boilerplate_entities(), () => {

      readline.write(output_messages.boilerplate_starterd);

      readline.question(output_messages.run_add, (res) => commands(res.trim()));

    }));

}
