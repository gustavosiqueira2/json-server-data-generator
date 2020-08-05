module.exports = ({ fs, output_messages, boilerplate_entities, commands }) => (res) => {

  // Check if params are correct
  if (res.split(' ').length !== 4) return console.log(output_messages.add_entity_missing_parameters)

  const [, , entity, quantity] = res.split(' ')
  const entities = require(process.cwd() + '/entities')

  // If quantity is not a number
  if (isNaN(Number(quantity))) return console.log(quantity + ' is not a number!')

  // If entity already exist in entities
  if (entities.hasOwnProperty(entity)) return console.log(output_messages.entity_already_exist)

  // Add entity to entities
  entities[entity] = { array: [], quantity, obj: {} }

  // Update File
  fs.writeFile('entities.js', boilerplate_entities(entities), (err) => {

    if (err) return console.log(err)

    commands('add property ' + entity)

  })

}