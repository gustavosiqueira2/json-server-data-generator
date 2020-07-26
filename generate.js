const fs = require('fs');

let db = {
  users: [],
  histories: [],
  chapter: [],
  likedHistories: []
}

const numberOfRows = {
  users: 3,
  histories: 10,
  chapter: 40,
  likedHistories: 60
}

const classes = {
  users: {
    id: 'number',
    name: 'string',
    description: 'string'
  },
  histories: {
    userId: 'number',
    id: 'number',
    name: 'string',
    description: 'string'
  },
  chapter: {
    historyId: 'number',
    id: 'number',
    name: 'string',
    description: 'string',
    text: 'string'
  },
  likedHistories: {
    userId: 'number',
    historyId: 'number'
  }
}

function generateQuantity(qnt, obj) {
  for (let i = 0; i < qnt; i++) {
    let res = generateData(classes[obj], obj);
    db[obj].push(res);
  }
}

function generateData(obj, name) {
  let res = {};
  Object.entries(obj).forEach((propertie) => {
    if (propertie[1] == 'number')
      if (propertie[0] == 'id')
        res[propertie[0]] = db[name].length + 1;
      else {
        if (propertie[0].split('Id').length == 2)
          res[propertie[0]] = Math.floor(Math.random() * (numberOfRows[name] - 1) + 1);
        else
          res[propertie[0]] = Math.floor(Math.random() * (100 - 1) + 1);
      }
    else
      if (propertie[0] == 'name')
        res[propertie[0]] = 'AAAAAA';
      else {
        if (propertie[0] == 'text')
          res[propertie[0]] = 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC';
        else
          res[propertie[0]] = 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';
      }
  });
  return res;
}

const generate = () => {

  Object.keys(db).forEach((clas) => generateQuantity(numberOfRows[clas], clas));

  const data = JSON.stringify(db);

  fs.writeFile('server.json', data, 'utf8', () => { });

}

generate();
