module.exports = ({ fs, output_messages, readline, boilerplate_entities }) => (res) => {

  // Check if params are correct
  if (res.split(' ').length !== 3) return console.log(output_messages.add_property_missing_parameters);

  const [, , entity] = res.split(' ');
  const entities = require('./entities');

  // If entity already exist in entities
  if (!entities.hasOwnProperty(entity)) return console.log(output_messages.entity_doesnt_exist);

  const propertiesString = Object.entries(entities[entity].obj).map((property) => `\n  ${property[0]}: ${property[1]}`);

  readline.question(output_messages.add_properties(entity, propertiesString), (res) => {

    console.log('aaaaaaaaaaaaa')

    const [name, type] = res.split(' ');

    if (!name || !type) return console.log('erro miss param')

    if (type !== 'string' && type !== 'number') return console.log('type error, property must be string or number')

    entities[entity].obj[name] = type;

    fs.writeFile('entities.js', boilerplate_entities(entities), (err) => {
      if (err) return console.log(err);

      add_commands['property']('add property ' + entity);
    });

  });

}