const notes = require('./notes');
const chalk = require('chalk');
const validator = require('validator');
const yargs = require('yargs');
const { listNote } = require('./notes');
const { demandOption } = require('yargs');
// console.log(chalk.red(notes.getName()));
// console.log(chalk.blue(validator.isURL('https/mead.io')));
// console.log(chalk.green.bgRed.bold.inverse("Success!"));
// console.log(process.argv);
// console.log(process.argv[2]);
// const command = process.argv[2];
// if (command === 'add') {
//     console.log("Adding Notes...");
// } else if (command === 'subtract') {
//     console.log("Deleting Notes...");
// }
// console.log(process.argv);
// console.log(yargs.argv);
yargs.command({
    command: 'add',
    describe: 'Adding a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Content of the Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
    // notes.addNote(argv.title, argv.body);
    // console.log(argv.title + "  " + argv.body);

});

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'Title of Note to be Removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
});

yargs.command({
    command: 'read',
    describe: 'Reading a note',
    builder: {
        title: {
            describe: 'title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing a note',
    handler() {
        notes.listNote();
    }
});
yargs.parse();
// console.log(yargs.argv);