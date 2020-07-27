<h1 align='center'>
  json-server-data-generator
</h1>

<h3 align='center'>
  Create the data for your server!
</h3>

---

## ⚡ Even Faster!

- Fast CLI for help
- Fast implemetantion of new entities and properties
- Ultra perfomance on generation and use!
- Setup > Run > Server UP :)

## 🔨 Actual State

- Generate Boilerplate ✔️
- Manualy add Entities and it Properties ✔️
- Generate data ✔️
- Ready to use! (with CLI but manualy too) ✔️
- Clear (creating backup for default) ❌🔨
- Add Enties and Properties through the CLI ❌
- Up to NPM ❌
- Random name and text generators ❌
- IA To link generation name with the property name! ❌

---

## 🔧 How to use

      Working in progress, 
      Actualy you can start and add entities and properties manualy,
      and after it run the Generator!

- First start the project

  `
    jsdg start
  `

- Add your entities (the entity name need to be in singular)

  `
    jsdg add entity 'entity name' 'quantity of rows you need'
  `

- Enter in entity scope (after add you will be on your entity scope)

  `
    jsdg add property 'entity name' 
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

  - add whatever you want and type finish to add it to your entity

    `
      finish 
    `

- Now you can generate the data!

  `
    jsdg generate
  `

- Run Json-Server 💡

  `
    json-server server.json
  `

---

## 😉 Contributing

Wanna help? You can send mensages to me on my email!

[![Gmail Badge](https://img.shields.io/badge/-gustavo.fariassiqueira@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:gustavo.fariassiqueira@gmail.com)](mailto:gustavo.fariassiqueira@gmail.com)
