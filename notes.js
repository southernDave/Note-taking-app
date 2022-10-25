const { default: chalk } = require('chalk')
const { debug } = require('console')
const fs = require('fs')

const getNotes = () => {
    return "your notes..."
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)


    if (!duplicateNote){

        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreenBright("new notes added"));
    } else {
        console.log(chalk.cyanBright("note title taken!"));
    }

}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notes.length > notesToKeep.length) {
        console.log(chalk.greenBright.inverse("Note removed!"));
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse("no notes found"));
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse("Your notes..."));

    notes.forEach((note) => {
        console.log(note.title);
    });

}

module.exports = {
    getNotes,
    addNote,
    removeNotes,
    listNotes,
    readNote
}