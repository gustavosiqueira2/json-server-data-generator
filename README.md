<h1 align='center'>
  json-server-data-generator
</h1>

<h3 align='center'>
  Create the data for your server!
</h3>

<div align='center'> 

[![](https://badge.fury.io/js/json-server-data-generator.svg)](http://badge.fury.io/js/json-server-data-generator)

</div>


---

## ⚡ Even Faster!

- Fast CLI for help
- Fast implemetantion of new entities and properties
- Ultra perfomance on generation and use!
- Setup > Run > Server UP :)

## 🔨 Actual State

- Ready to use! (with CLI) ✔️
- Manualy add Entities and it Properties ✔️
- Add Enties and Properties through the CLI ✔️
- Clear (creating backup for default) ✔️
- Generate, create data for server ✔️
- Up to NPM ✔️
- Random types generators ❌🔨
- Edit / Remove Properties through the CLI ❌
- IA To link generation name with the property name! ❌

---

## 🔧 How to use

      npm i json-server-data-generator

      jsdg

- First start the project

  `
    start
  `

- Add your entities (the entity name need to be in singular)

  `
    add entity 'entity name' 'quantity of rows you need'
  `

- Enter in entity scope (after add you will be on your entity scope)

  `
    add property 'entity name' 
  `
- add the properties 

      Property Name types is string
      and the Property Types can be 'number' or 'string'

      If you make a Relationship the foreign key name must follow this sintaxe:
      parentId (parent name must be in singular form)
  - add property

    `
      'property name' 'property type'  
    `

  - add whatever you want and after

    `
      ctrl + c to exit
    `

- Now you can generate the data!

  `
    generate
  `

- Run Json-Server 💡

  `
    json-server server.json
  `

---

##  >_ comands


| Command      | Usage                                     | Short | About                                  |
|--------------|-------------------------------------------|-------|----------------------------------------|
| Start        | jsdg start                                |   s   |   Create the file with your entities   |
| Clear        | jsdg clear                                |   c   | Clear entities files (generate backup) |
| Generate     | jsdg generate                             |   g   |  Generate data based on Entities File  |
| Add Entity   | jsdg add entity "name" "quantity of rows" | add e |              Add a entity              |
| Add Property | jsdg add property "entity name"           | add p |       Add properties to an entity      |

---

<br>

## 😉 Contributing

Wanna help? You can send mensages to me on my email!

[![Gmail Badge](https://img.shields.io/badge/-gustavo.fariassiqueira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gustavo.fariassiqueira@gmail.com)](mailto:gustavo.fariassiqueira@gmail.com)
