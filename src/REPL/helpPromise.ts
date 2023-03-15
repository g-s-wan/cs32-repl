import { REPLFunction } from "./REPLFunction";

export let modeBrief : boolean = true;

/**
 * REPL function to change the display mode
 * 
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */

export const helpPromise :  REPLFunction = args => {
    return new Promise<string>
        ((resolve, reject) => {

            resolve("<table>"
            + "<thead>"
            +   "<tr>"
            +       "<th>Command</th>"
            +       "<th>Description</th>"
            +   "</tr>"
            + "</thead>"
            + "<tr>" 
               + "<td>mode</td>"
               + "<td>Toggles modes between 'verbose' and 'brief'</td>"
            + "</tr>" 
            + "<tr>" 
               + "<td>mode brief</td>"
               + "<td>Forces mode to 'brief'</td>"
            + "</tr>" 
            + "<tr>" 
               + "<td>mode verbose</td>"
               + "<td>Forces mode to 'verbose'</td>"
            + "</tr>" 
            + "<tr>" 
               + "<td>mode</td>"
               + "<td>Toggles modes between 'verbose' and 'brief'</td>"
            + "</tr>" 
            + "<tr>" 
            +    "<td>load_file <b>file-path</b></td>"
            +     "<td>Loads CSV file.  <file path> must start with ./data/</td>"
            + "</tr>" 
            + "<tr>" 
            +    "<td>view</td>"
            +     "<td>Displays the last CSV dataset that has been loaded.</td>"
            + "</tr>" 
            + "<tr>" 
            +    "<td>search <b>text-item</b> <b>y | n</b> [column index]</td>"
            +     "<td>searches for <text item>.  Use y or no to indicate if the dataset includes a header.  Optionally, specify a column index to limit the search to.</td>"
            + "</tr>" 

            + "</table>" 
            )
        });
}
