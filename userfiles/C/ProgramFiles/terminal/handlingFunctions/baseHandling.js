import OS from "../../operatingSystemApi.js";

import filesystemHandling from "./filesystem.js";

class BaseHandling {
  os;
  filesystem;

  constructor() {
    this.os = new OS();
    this.filesystem = new filesystemHandling();
  }
}

export default BaseHandling;
