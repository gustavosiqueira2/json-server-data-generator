module.exports = ({ fs, output_messages, readline, boilerplate_entities, commands }) => (res) => {

  const [, , entity, added] = res.split(' ')

  // Check if params are correct
  if (!entity) return console.log(output_messages.add_property_missing_parameters)

  // Check if param is added (used to do the recursive addtion of the properties)
  if (added && added !== 'added') return console.log(output_messages.add_property_missing_parameters)

  const entities = require(process.cwd() + '/entities')

  // If entity already exist in entities
  if (!entities.hasOwnProperty(entity)) return console.log(output_messages.entity_doesnt_exist)

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

        if (!name || !type) return console.log('erro miss param')

        if (type !== 'string' && type !== 'number') return console.log('type error, property must be string or number')

        entities[entity].obj[name] = type

        fs.writeFile('entities.js', boilerplate_entities(entities), (err) => {

          if (err) return console.log(err)

          commands('add property ' + entity + ' added')

        });

      });

}