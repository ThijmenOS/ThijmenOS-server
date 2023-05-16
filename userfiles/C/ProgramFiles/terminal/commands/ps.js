import * as OS from "../../bin/ps.js";

async function ps(args, term) {
  const result = await OS.default();

  let headerPlaced = false;

  result.forEach((el) => {
    if (typeof el === "string" || typeof el === "number") {
      term.echo(el);
    }

    if (typeof el === "object") {
      if (!headerPlaced) {
        const keys = Object.keys(el);
        const header = keys.join("      | ");
        term.echo(header);
        headerPlaced = true;
      }

      const values = Object.values(el);
      const printable = values.join("      ");
      term.echo(printable);
    }
  });
}

export default ps;
