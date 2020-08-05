#!/usr/bin/env node

const readlineimport = require('readline')
const readline = readlineimport.createInterface({ input: process.stdin, output: process.stdout })

const fs = require('fs')

const output_messages = require('./output_messages')

const boilerplate_entities = require('./boilerplate_entities')

const checkFilesExist = (callback) => fs.exists('entities.js', (exists) => {

  if (exists) callback()
  else {
    readline.write(output_messages.missing_entities)
    readline.close()
  }

})

const start = require('./functions/start')
const clear = require('./functions/clear')
const generate = require('./functions/generate')

const entities = require('./functions/showEntities')

const entity = require('./functions/add/entity')
const property = require('./functions/add/property')

const help = require('./functions/help')
const defaultCommandRes = require('./functions/default')
const defaultAddCommandRes = require('./functions/add/default')


const commands = (cmd) => {

  const [command, param] = cmd.split(' ')

  const params = {
    fs,
    readline,
    output_messages,
    boilerplate_entities,
    checkFilesExist,
    commands
  }

  switch (command) {

    case 's':
    case 'start': {
      start(params)(cmd)
      break
    }

    case 'c':
    case 'clear': {
      clear(params)(cmd)
      break
    }

    case 'g':
    case 'generate': {
      generate(params)(cmd)
      break
    }

    case 'h':
    case 'help': {
      help(params)(cmd)
      break
    }

    case 'e':
    case 'entities': {
      entities(params)(cmd)
      break
    }

    case 'a':
    case 'add': {

      checkFilesExist(() => {

        switch (param) {

          case 'e':
          case 'entity': {
            entity(params)(cmd)
            break
          }
          case 'p':
          case 'property': {
            property(params)(cmd)
            break
          }
          default: {
            defaultAddCommandRes(params)(cmd)
            break
          }

        }

      })

      break
    }

    default: {
      defaultCommandRes(params)(cmd)
      break
    }

  }
}

readline.question(output_messages.presentation, (res) => commands(res.trim()))
