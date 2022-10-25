import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";

const app = express();
app.use(cors());
app.use("/static", express.static("userfiles/"));
const port = 8080;

let baseDir = "userfiles\\";

function getFilesInDir(dir: string) {
  let targetDir = path.join(baseDir, dir);

  if (targetDir.indexOf(baseDir) !== 0) {
    return null;
  }

  let files = fs.readdirSync(targetDir);
  let ret = new Array<any>();

  files.forEach((file) =>
    ret.push({
      filePath: dir + "/" + file,
      isDir: fs.lstatSync(path.join(targetDir, file)).isDirectory()
        ? true
        : false,
    })
  );

  return ret;
}

function readFile(dir: string) {
  let targetFile = path.join(baseDir, dir);

  if (targetFile.indexOf(baseDir) !== 0) return;

  return fs.readFileSync(targetFile, "utf8");
}

app.get("/filesystem/showUserFiles", (req, res) => {
  let requestedDir: string = (req.query.dir as string) || "";

  let result = getFilesInDir(requestedDir);

  res.send(result);
});

app.get("/filesystem/openUserFile", (req, res) => {
  let requestedFile = req.query.file as string;

  let result = readFile(requestedFile);

  res.send(result);
});

app.get("/filesystem/readRegisteredApplications", (req, res) => {
  let rawFile = readFile("C/OperatingSystem/ThijmenOSdata/applications.json")!;
  res.send(JSON.parse(rawFile));
});

app.listen(port, () => {
  console.log("api listening");
});

("https://dev.to/macmacky/get-better-with-typescript-using-express-3ik6");
