import { REPLFunction } from "./REPLFunction";
import {invalidCommandPromise} from "./promises/invalidCommandPromise"
import App from "../App";
/**
 * Class REPL inspired by Java inspired by the Java REPL livecode from lecture.
 */
export class REPL {

    registeredCommands : Map<string, REPLFunction>;


    /**
     * Class constructor created the Map.
     */
    constructor () {
        this.registeredCommands = new Map<string, REPLFunction>();
    }

    /**
     * Register the command by adding it to the Map
     */
    registerCommand(command: string, func: REPLFunction) {
        this.registeredCommands.set(command, func);
    }

    /**
     * 
     * @param input 
     * @returns 
     */
    async executeCommand(input: string): Promise<string> {

        // Example input: load_csf filename.csv
        const command_tokens = input.split(" ");
        const command_prefix = command_tokens[0];
        
        // Retrieve the REPLFunction associated with the command name prefix. Will
        // return undefined if the command was not registered.
        let replFunction = this.registeredCommands.get(command_prefix);

        // Special function when the command is not registered
        if (replFunction == undefined) {
            replFunction = invalidCommandPromise;
        }

        // We call the REPL function with the input tokens with the command name prefix removed.
       return replFunction(command_tokens.slice(1, command_tokens.length));
    }
}
