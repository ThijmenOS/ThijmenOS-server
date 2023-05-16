import * as OS from "../../bin/user.js";

export default async function user(args, term) {
  const result = await OS.default();

  const propertyNames = Object.keys(result);
  propertyNames.forEach((name) => term.echo(`${name}: ${result[name]}`));
}
