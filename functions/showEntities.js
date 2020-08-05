module.exports = ({ readline, output_messages, checkFilesExist }) => () => {

  checkFilesExist(() => {

    const entities = require(process.cwd() + '/entities');

    readline.write(output_messages.entities)

    // Run in each entity
    Object.entries(entities).forEach(([name, properties]) => {

      // Create the string with the properties
      const entityProperties = Object.entries(properties.obj).map((p) => '   ' + p.join(': ')).join('\n')

      // Print the Entity and the properties
      readline.write(output_messages.entity_properties(name, entityProperties))

    })

    readline.close()

  })

}