import * as OS from "../../bin/passwd.js";
import auth from "../../bin/auth.js";
import argumentParser from "./argParsers/--parser.js";

async function passwd(args, term) {
  const user = term.global.get_var("user");
  console.log(user);

  let attempts = 0;
  let oldPassword;

  do {
    const password = await term.set_mask("*").read("current password: ");
    const authenticated = await auth(user.id, password);
    if (!authenticated) {
      attempts++;
    } else {
      oldPassword = password;
      break;
    }
  } while (attempts < 3);

  if (attempts === 3) {
    throw new Error("authentication failed");
  }

  const newPassword = await term.set_mask("*").read("new password: ");
  const passwordRepeat = await term.set_mask("*").read("repeat password: ");

  if (newPassword !== passwordRepeat) {
    throw new Error("new passwords are not the same");
  }

  const result = OS.default(oldPassword, newPassword);
  if (result === -1) {
    throw new Error("Password could not be updated");
  }

  term.echo("password succesfully updated");
}

export default passwd;
