import fs from 'fs';
import chalk from 'chalk';

// Add a new note, including title and content
export function addNote(title, content) {
    if (!title || !content) {
        console.log(chalk.bgRed('Title and Content not provided :('));
    } else {
        const notes = loadNotes();
        const duplicateNote = notes.find((note) => note.title === title);

        if (!duplicateNote) {
            notes.push({
                'title': title,
                'content': content
            });
            saveNotes(notes);
            console.log(chalk.bgGreen('New note added!'));
        } else {
            console.log(chalk.bgRed('Note title taken :('));
        }
    }
};

// Remove the note according to the title
export function removeNote(title) {
    if (!title) {
        console.log(chalk.bgRed('Title not provided :('));
    } else {
        const notes = loadNotes();
        const otherNotes = notes.filter((note) => note.title !== title);

        if (otherNotes.length < notes.length) {
            saveNotes(otherNotes);
            console.log(chalk.bgGreen('Note removed!'));
        } else {
            console.log(chalk.bgRed('Note not found :('));
        }
    }
};

// List all notes
export function listNotes() {
    const notes = loadNotes();

    console.log(chalk.bgGray('Your notes:'));

    notes.forEach((note) => {
        console.log(note.title);
    });
};

// Read the note according to the title
export function readNote(title) {
    if (!title) {
        console.log(chalk.bgRed('Title not provided :('));
    } else {
        const notes = loadNotes();
        const expectedNote = notes.find((note) => note.title === title);

        if (expectedNote) {
            console.log(chalk.bgBlue(expectedNote.title));
            console.log(expectedNote.content);
        } else {
            console.log(chalk.bgRed('Note not found :('));
        }
    }
};

// Get notes JSON
function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

// Save notes JSON to file
function saveNotes(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};