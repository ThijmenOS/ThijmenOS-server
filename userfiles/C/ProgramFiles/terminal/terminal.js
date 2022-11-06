import FilesystemHandling from "./handlingFunctions/filesystem.js";

class Terminal {
  filesystem = new FilesystemHandling(this.terminal);

  constructor() {
    this.terminal = $("body").terminal(
      {
        ping: () => this.echo("pong"),
        ...this.filesystem.commandDefenitions,
      },
      {
        greetings: "<Thijmen OS command line interface> \n",
        name: "Thijmen OS",
        prompt: "C>",
      }
    );
  }
}

export default Terminal;
