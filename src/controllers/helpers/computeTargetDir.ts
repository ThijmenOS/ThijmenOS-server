import path from "path";

const baseDir: string = "userfiles\\";

function computeTargetDir(dir: string): string {
  let targetDir = path.join(baseDir, dir);

  if (targetDir.indexOf(baseDir) !== 0) {
    return "";
  }

  return targetDir;
}

export { computeTargetDir };
