import path from "path";

const baseDir = "userfiles\\";

function computeTargetDir(dir: string): string {
  const targetDir = path.join(baseDir, dir);

  if (targetDir.indexOf(baseDir) !== 0) {
    return "";
  }

  return targetDir;
}

export { computeTargetDir };
