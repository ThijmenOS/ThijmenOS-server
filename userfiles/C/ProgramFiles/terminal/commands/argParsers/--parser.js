export default function argumentParser(args) {
  if (!args.length) {
    return null;
  }

  if (args.length === 1) {
    return args[0];
  }

  const objectArgs = {};

  for (let n = 0; n < args.length; n += 2) {
    const argName = args[n];
    const parsedArgName = argName.substring(2, args[n].length);
    objectArgs[parsedArgName] = args[n + 1];
  }

  return objectArgs;
}
