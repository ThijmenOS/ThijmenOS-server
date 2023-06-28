import * as commands from "./commands/index.js";
import user from "../bin/user.js";
import startup from "../bin/startup.js";

startup({});

class global {
  static #vars = {};

  static set_var(name, value) {
    this.#vars[name] = value;
  }

  static get_var(name) {
    return this.#vars[name];
  }
}

async function initialise(term) {
  const usr = await user();
  const basepath = `C/Users/${usr.username}`;

  term.global.set_var("path", basepath);
  term.global.set_var("user", usr);
  term.set_prompt(`C/Users/${usr.username}>`);
}

$("body").terminal(
  async (command, term) => {
    const commandSegments = command.split(" ");
    const cmd = commandSegments.shift();
    if (!cmd.length || !cmd) {
      return;
    }

    try {
      await commands[cmd](commandSegments, { ...term, global });
      term.set_mask(false);
    } catch (err) {
      term.set_mask(false);
      if (err.message != "commands[cmd] is not a function") {
        term.echo(`[[;red;] ERR!: ${err.message}]`);
        return;
      }

      term.echo(
        `[[;red;]the command: ${cmd} is not recognised as part of the terminal]`
      );
    }
  },
  {
    greetings: "ThijmenOS Terminal",
    onInit: (term) => initialise({ ...term, global }),
  }
);
