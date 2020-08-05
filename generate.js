const fs = require('fs')

let database = require(process.cwd() + '/entities')

const types = require('./types/types')

// Generate data for specific entity of the database
function generateRows(clas, objectName) {

  for (let i = 0; i < clas.quantity; i++) {

    // creating row and adding to the array
    let createdObject = createObject(clas.obj, objectName)
    database[objectName].array.push(createdObject)
  }

}

// Creates the object that will be added to the array
function createObject(object, objectName) {

  let response = {}

  Object.entries(object).forEach(([name, propertie]) => {
    if (name === 'id')
      response[name] = database[objectName].array.length + 1
    else
      response[name] = types([name, propertie], database)
  })

  return response

}

// Generate the data base
const generate = async () => {

  const data = {}

  await Object.keys(database).forEach(async (clas) => {

    await generateRows(database[clas], clas)

    data[clas] = database[clas].array

  })

  // creates the file with the data
  fs.writeFile('server.json', JSON.stringify(data), 'utf8', () => { })

}

module.exports = generate
