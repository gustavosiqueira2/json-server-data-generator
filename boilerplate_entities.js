module.exports = boilerplate_entities = (entities = {}) => {

  let entitiesString = Object.keys(entities).map((key) => 'let ' + key + ' = ' + JSON.stringify(entities[key]) + '\n').join('');

  let entitiesNameString = Object.keys(entities).forEach((key) =>  '' + key + ',\n');

  console.log(entitiesNameString)

  return `// Example of property that goes in the 'database' variable
// 
// const user: {
//   array: [],
//   quantity: 3,
//   obj: {
//     id: 'number',
//     name: 'string',
//     description: 'string'
//   }
// }
  
${entitiesString}
  
module.exports = {
${entitiesNameString}
};

`;

}