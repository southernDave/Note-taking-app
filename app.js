const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const noteUtilities = require('./notes')
const notes = require('./notes')

//customize yargs version
yargs.version('1.1.0')


//create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})

// create a remove command
yargs.command({
    command: 'remove',
    describe: 'removes a note',
    builder: {
        title:{
            describe: 'removes title',
            demandOption: true,
            type: 'string'
        }
    }, 
    handler(argv){
        notes.removeNotes(argv.title)
    }
})

//reads a command 
yargs.command({
    command: 'read',
    describe: 'reads a note',
    builder : {
        title: {
            description: 'reading command',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title);
    }
}) 

//lists command
yargs.command({
    command: 'list',
    describe: 'list your notes',
    handler(argv) {
        notes.listNotes
    } 
}) 

yargs.parse()