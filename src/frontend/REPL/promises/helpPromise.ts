import { REPLFunction } from "../REPLFunction";

// The table is large, so keep the output brief
export let modeBrief : boolean = true;

/**
 * REPL function to display a table of baseline commands
 * 
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */

export const helpPromise :  REPLFunction = args => {
    return new Promise<string>
        ((resolve, reject) => {
            // Return a static table of commands and brief descriptions of their functionalities
            resolve("<table role='table' aria-label='help'>"
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
            +    "<td>search <b> [column index or name] </b> <b>text-item</b>  [y | n]</td>"
            +     "<td>searches for text item.  Use y or n to indicate if the dataset includes a header.  Optionally, specify a column index to limit the search to.</td>"
            + "</tr>" 

            + "</table>" 
            )
        });
}
