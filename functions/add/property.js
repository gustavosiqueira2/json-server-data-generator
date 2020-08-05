module.exports = ({ fs, output_messages, readline, boilerplate_entities, commands }) => (res) => {

  const [, , entity, added] = res.split(' ')

  // Check if params are correct
  if (!entity) return readline.question(output_messages.add_property_missing_parameters, (res) => commands(res))

  // Check if param is added (used to do the recursive addtion of the properties)
  if (added && added !== 'added') return readline.question(output_messages.add_property_missing_parameters, (res) => commands(res))

  const entities = require(process.cwd() + '/entities')

  // If entity already exist in entities
  if (!entities.hasOwnProperty(entity)) return console.log(output_messages.entity_doesnt_exist)

  // Generate the string
  let propertiesString = '';
  let propertyString = '';

  if (!added)
    propertiesString = Object.entries(entities[entity].obj).map(([name, value]) => `\n  ${name}: ${value}`)
  else
    propertyString = Object.entries(entities[entity].obj).pop().join(': ')

  readline.question(
    !added ?
      output_messages.add_properties(entity, propertiesString) :
      '  ', (res) => {

        const [name, type] = res.split(' ')

        // Finish if user send nothing
        if (!name || !type) {
          readline.write(output_messages.add_property_finish)
          return readline.close()
        }

        // Check Type Errors
        if (type !== 'string' && type !== 'number' && type !== 'text' && type !== 'name') {
          readline.write(output_messages.add_property_miss_type)
          return commands('add property ' + entity)
        }

        // Add properties
        entities[entity].obj[name] = type

        // Update File
        fs.writeFile('entities.js', boilerplate_entities(entities), (err) => {

          if (err) return console.log(err)

          // Ask for next properties (recursive)
          commands('add property ' + entity + ' added')

        });

      });

}