import BaseHandling from "./handlingFunctions/baseHandling.js";

let handling = new BaseHandling();

export default terminal = $("body").terminal(
  {
    ping: function () {
      this.echo("pong");
    },
    cd: async function (path) {
      handling.filesystem.cdCommand(path);
    },
  },
  {
    greetings: "<Thijmen OS command line interface> \n",
    name: "Thijmen OS",
    prompt: `${currentPath}>`,
  }
);
