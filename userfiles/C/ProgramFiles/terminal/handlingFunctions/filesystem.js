import terminal from "../terminal.js";

class filesystemHandling {
  os;

  constructor(os) {
    this.os = os;
  }

  basePath = "C/";
  currentPath = basePath;

  //commands
  cdCommand(path) {
    os.call(
      "changeDir",
      currentPath + path,
      (res) => res.sender == "system" && handleDirectoryChange(res.return)
    );
  }

  //handlers

  handleDirectoryChange(path) {
    if (path == "non-existant") {
      term.echo("Provided path does not exist");
      return;
    }

    currentPath = path;
    terminal.set_prompt(currentPath + ">");
  }
}

export default filesystemHandling;
