module.exports = ({ fs, readline, output_messages, checkFilesExist, boilerplate_entities }) => () => {

  checkFilesExist(() =>

    readline.question(output_messages.clear_backup, async (res) => {

      if (res.toLowerCase() !== 'n') {
        await fs.copyFile('entities.js', 'entities.backup.js', (err) => err && console.log(err))
        readline.write(output_messages.clear_backup_created)
      }

      fs.writeFile('entities.js', boilerplate_entities(), () => {
        readline.write(output_messages.cleared)
        readline.close()
      })

    })

  )

}
