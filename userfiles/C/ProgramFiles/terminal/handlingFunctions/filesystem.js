import terminal from "../terminal.js";
import OperatingSystem from "./operatingSystem.js";

class FilesystemHandling extends OperatingSystem {
  constructor(terminal) {
    super();
    this.terminal = terminal;
  }

  commandDefenitions = {
    cd: (path) => this.cdCommand(path),
    ls: () => this.lsCommand(),
    mkdir: (name) => this.mkdirCommand(name),
    rm: (dir) => this.rmCommand(dir),
    touch: (name) => this.touchCommand(name),
  };

  basePath = "C/";
  currentPath = this.basePath;

  //commands
  cdCommand(path) {
    this.os.call(
      "changeDir",
      this.currentPath + path,
      (res) => res.sender == "system" && this.handleDirectoryChange(res.return)
    );
  }
  lsCommand() {
    this.os.call("filesInDir", this.currentPath, (res) =>
      this.printDirectories(res.eventData)
    );
  }
  mkdirCommand(name) {
    this.os.call(
      "mkdir",
      {
        directoryPath: this.currentPath,
        name: name,
      },
      (res) => this.handleError(res)
    );
  }
  rmCommand(dir) {
    this.os.call("rmdir", this.currentPath + "/" + dir, (res) =>
      this.andleError(res)
    );
  }
  touchCommand(name) {
    this.os.call(
      "touch",
      { directoryPath: this.currentPath, name: name },
      (res) => this.handleError(res)
    );
  }

  //handlers

  handleDirectoryChange(path) {
    if (path == "non-existant") {
      this.terminal.echo("Provided path does not exist");
      return;
    }

    this.currentPath = path;
    this.terminal.set_prompt(this.currentPath + "/>");
  }
  printDirectories(args) {
    this.terminal.echo(`Directory: ${this.currentPath} \n`);

    if (args.length === 0) {
      this.terminal.echo("Empty");
      return;
    }

    args.forEach((element) => {
      this.terminal.echo(
        `${element.isDir ? "<DIR>" : "     "} ${element.filePath
          .split("/")
          .at(-1)}`
      );
    });
  }
}

export default FilesystemHandling;
