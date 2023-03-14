import { isConstructorDeclaration } from "typescript";

class HistoryEntry {
    type: string;
    value: string | string[][];

    constructor () {
        this.type = "string";
        this.value = "";
    }
}

/**
 * Class which contains the string and table entries shown in the history box
 */
export class History {

    entries :  HistoryEntry[];

    // The constructor initializes the array of entries
    constructor () {
        this.entries = [];
    }

    // Method to add a string entry
    addString(message: string) {
        const entry = new HistoryEntry();
        entry.type = "string"
        entry.value = message;
        this.entries.push(entry); 
    }

    // Method to add a table entry
    addTable(table: string[][]) {
        const entry = new HistoryEntry();
        entry.type = "table"
        entry.value = table;
        this.entries.push(entry); 
    }
}

export const history = new History();