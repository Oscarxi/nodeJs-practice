import * as notes from './notes.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

// Commands
const argv = yargs(hideBin(process.argv));
    // Create a note
argv.command('add', 'add a new note', () => {}, (argv) => {
        console.log('adding a new note...');
        notes.addNote(argv.title, argv.content);
    })
    // Remove a note
    .command('remove', 'remove a note', () => {}, (argv) => {
        console.log('removing the note...');
        notes.removeNote(argv.title);
    })
    // List all notes
    .command('list', 'list all notes', () => {}, (argv) => {
        console.log('listing all notes...');
        notes.listNotes();
    })
    // Read a note
    .command('read', 'read all note', () => {}, (argv) => {
        console.log('reading the notes...');
        notes.readNote(argv.title);
    })
    .option('title', {
        alias: 't',
        type: 'string',
        description: 'Note title'
        })
    .option('content', {
        alias: 'c',
        type: 'string',
        description: 'Note content'
        })
    .parse();