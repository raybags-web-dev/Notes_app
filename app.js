const _ = require('lodash')
const chalk = require('chalk');
const yargs = require('yargs');
const validator = require('validator');
const { readNotes, removeNote, readNote, addNote } = require('./notes');

yargs.version('15.0.2');

try {

   yargs.command({
      command: 'add',
      describe: 'Adds a note....',
      builder: {
         title: {
            describe: 'New note',
            demandOption: true,
            string: true
         },
         body: {
            describe: 'text input....',
            demandOption: true,
            string: true
         }
      },

      handler(argv) {
         console.log('Title: ', chalk.blue.underline(argv.title), 'Body:', chalk.greenBright(argv.body));
         addNote(argv.title, argv.body)

      }
   })

   yargs.command({
      command: 'read',
      describe: 'reads a note....',
      builder: {
         title: {
            describe: 'EARTH',
            demandOption: true,
            string: true
         },
      },
      handler(argv) {
         console.log(chalk.green.bold(chalk.blueBright.italic.underline(argv.title)));
         readNote(argv.title);

      }
   })

   yargs.command({
      command: 'list',
      describe: 'lists all note...',
      handler: function (argv) {
         console.log(chalk.blueBright.bold.underline('All notes:'))
         readNotes();
      }
   })

   yargs.command({
      command: 'remove',
      describe: 'removes a note....',
      builder: {
         title: {
            describe: 'note title',
            demandOption: true,
            string: true
         }
      },
      handler(argv) {
         removeNote(argv.title);
      }
   })

} catch (err) {
   console.log(chalk.black.red.italic(err.message))
   throw new Error();
}
console.log(yargs.argv);

//commands (node app.js "command" --argv)