// console.log("notes...");
const fs = require('fs');
const chalk = require('chalk');
getNote = () => {
    return "getting Notes..."
}
const addNote = (title, body) => {
    const notes = loadNotes();
    // console.log(notes);
    const duplicateNotes = notes.find(item => item.title == title);
    if (!duplicateNotes) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green.inverse('New Notes Added!'));
    } else {
        console.log(chalk.red.inverse('Note Title Taken!'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const removeNote = title => {
    const notes = loadNotes();
    const toBeKeep = notes.filter(item => item.title != title);
    if (toBeKeep.length == notes.length) {
        console.log(chalk.red.inverse('Notes Not Found in the File!'));
    } else {
        console.log(chalk.green.inverse('Note Successfully Removed!'))
    }
    saveNotes(toBeKeep);
}

const listNote = () => {
    const notes = loadNotes();
    console.log(chalk.inverse.blue('Your Notes: '));
    notes.forEach(note => {
        console.log(note);
    });
}

const readNote = (title) => {
    const notes = loadNotes();
    const selected = notes.find((note) => note.title === title)
    if (selected) {
        console.log(chalk.inverse.yellow("Selected Note: "));
        console.log(chalk.blue.bold(selected.title) + " " + selected.body);
    } else {
        console.log("No Note Found!");
    }
}
module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}