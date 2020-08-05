module.exports = ([name, propertie], database) => {

  const types = {
    name: 'AAAAA',
    string: 'BBBBBBBBBBBBBBBBBBB',
    text: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    number: name.split('Id').length == 2 ?
      Math.floor((Math.random() * (database[name.split('Id')[0]].quantity - 1)) + 1) :
      Math.floor(Math.random() * (100 - 1) + 1)

  }

  return types[propertie]

}