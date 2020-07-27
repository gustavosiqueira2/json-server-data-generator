module.exports = boilerplate = `const fs = require('fs');

// Carry the information to generate data and the data it self
let database = require('./entities');

// Generate data for specific entity of the database
function generateRows(clas, objectName) {

  // create the specifed quantity of data per entity
  for (let i = 0; i < clas.quantity; i++) {

    // creating row and adding to the array
    let createdObject = createObject(clas.obj, objectName);
    database[objectName].array.push(createdObject);
  }
}

// Creates the object that will be added to the array
function createObject(object, objectName) {
  let res = {};
  Object.entries(object).forEach((propertie) => {
    if (propertie[1] == 'number')
      if (propertie[0] == 'id')
        res[propertie[0]] = database[objectName].array.length + 1;
      else {
        if (propertie[0].split('Id').length == 2)
          res[propertie[0]] = Math.floor(Math.random() * (database[propertie[0].split('Id')[0]].quantity - 1) + 1);
        else
          res[propertie[0]] = Math.floor(Math.random() * (100 - 1) + 1);
      }
    else {
      if (propertie[0] == 'name')
        res[propertie[0]] = 'AAAAAA';
      else {
        if (propertie[0] == 'text')
          res[propertie[0]] = 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC';
        else
          res[propertie[0]] = 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';
      }
    }
  });
  return res;
}

// Generate the data base
const generate = async () => {

  // variable that keep the final json
  const data = {};

  await Object.keys(database).forEach(async (clas) => {

    // generate all rows
    await generateRows(database[clas], clas);

    // add to final array
    data[clas] = database[clas].array;
  });

  // creates the file with the data
  fs.writeFile('server.json', JSON.stringify(data), 'utf8', () => { });

}

// run 
generate();

`;
