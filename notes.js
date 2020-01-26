const chalk = require('chalk');
const fs = require('fs');


const loadNotes = () => {
   try {
      const dataBuffer = fs.readFileSync('notes.json');
      const dataJson = dataBuffer.toString();
      return JSON.parse(dataJson);

   } catch (err) {
      console.log(chalk.bgRed.italic.inverse('Error: '), err.message);
      return [];
   }
}
const readNotes = () => {
   try {
      let notes = loadNotes();

      if (notes.length === 0) {
         return new Error('There are currently no notes saved');
      } else {
         console.log(notes);
      }

   } catch (err) {
      throw chalk.red.inverse('Error:', err.message);
   }
}

const saveNotes = (notes) => {
   const dataJson = JSON.stringify(notes);
   fs.writeFileSync('notes.json', dataJson);
}

const addNote = (title, body) => {
   try {
      const notes = loadNotes();

      const duplicateNote = notes.find((note) => note.title === title);

      if (!duplicateNote) {
         notes.push({
            title,
            body
         })
         saveNotes(notes);
         console.log(`${chalk.green.inverse.italic('saved successfully!!')}`);

      } else {
         let err = console.error(chalk.bgRed.italic.inverse('Error: title or body duplicates detected'));
         return err;

      }

   } catch (err) {
      throw chalk.red.inverse('Error:', err.message);

   }
}

const removeNote = (title) => {
   try {
      const notes = loadNotes();

      const notesTosave = notes.filter((notes) => {
         return notes.title !== title

      });

      if (notes.length === notesTosave.length) {
         return console.log(chalk.bgRed.inverse.italic('no note found.'));

      } else if (notes.length > notesTosave.length) {
         saveNotes(notesTosave);
         result = chalk.green.inverse.italic('note with a given title successfully removed')
         console.log(result);
      }


   } catch (err) {
      console.log(chalk.bgRed.italic.inverse('Error: '), err.message);
   }
}

const readNote = (title) => {
   try {
      const notes = loadNotes();

      let note = notes.filter(notes => notes.title === title);
      if (note.length === 0) {
         console.error(chalk.bgRed.italic.inverse('Note with a given title not found'))
      } else {

         console.log(note);

      }

   } catch (err) {
      console.log(chalk.red.inverse('Error:', err.message));
      throw new Error(chalk.red.inverse(err.message));
   }
}

module.exports = {
   addNote: addNote,
   readNotes: readNotes,
   readNote: readNote,
   removeNote: removeNote
};