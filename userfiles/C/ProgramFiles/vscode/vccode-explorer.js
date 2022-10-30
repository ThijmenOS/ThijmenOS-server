const contextMenu = $("#vs-code-right-click-menu");
const scope = $("#vscode-file-explorer");
let selectedFile = {
  path: "",
  ext: "",
};

scope.on("contextmenu", (event) => {
  event.preventDefault();

  const { clientX: mouseX, clientY: mouseY } = event;

  contextMenu.css("top", `${mouseY}px`);
  contextMenu.css("left", `${mouseX}px`);
  contextMenu.addClass("visible");
});

$("body").on("click", (e) => {
  if (e.target.offsetParent != contextMenu) {
    contextMenu.removeClass("visible");
    selectedFile = {
      path: "../userFiles/",
      ext: "dir",
    };
  }
});

function saveSelectedFile() {
  if (selectedFile == "") return;

  $.post("./php/saveUserFile.php", {
    filePath: selectedFile.path,
    fileContent: editor.getValue(),
  });
}

function newUserFile(type) {
  if (selectedFile == "") return;

  let PathToAddFile = selectedFile.path;

  if (selectedFile.ext != "dir") {
    let thing = selectedFile.path.split("/");
    thing.splice(-1);
    let copy = [...thing];
    PathToAddFile = copy.join("/");
  }

  console.log(PathToAddFile);
}

function deleteSelectedFile() {
  if (selectedFile == "") return;

  $.post("./php/deleteUserFile.php", {
    filePath: selectedFile.path,
    fileExt: selectedFile.ext,
  });
}

function openFile(fileName, filePath = "", fileExt = "") {
  if (fileExt == "dir") {
    getUserDirectories(filePath);
    return;
  }

  const index = editorSessions.findIndex((x) => x.fileName === fileName);
  if (index > -1) {
    switchSession(index);
  } else {
    os.call("readFile", filePath, (res) =>
      handleFileRead(fileName, fileExt, res.eventData)
    );
  }
}

function handleFileRead(fileName, fileExt, fileContent) {
  editorSessions.unshift({
    fileName: fileName,
    fileExt: fileExt,
    session: ace.createEditSession(fileContent),
  });

  switchSession(0);
}

function showOptions(file, ext) {
  selectedFile = {
    path: file,
    ext: ext,
  };
}

function getUserDirectories(filePath = "") {
  os.call("filesInDir", filePath, (res) => handleDirResponse(res.eventData));
}

function handleDirResponse(files) {
  files.forEach((file) => {
    let filePath = file.filePath;
    let fileName = file.filePath.split("/").at(-1);
    let ext = fileName.split(".").at(-1);
    if (file.isDir) ext = "dir";
    let placeInDom =
      filePath.split("/").at(-2) != ""
        ? filePath.split("/").at(-2)
        : "vscode-file-explorer";

    if ($(`#${fileName}`).length) return;

    if (ext == "dir") {
      $(`#${placeInDom}`).append(
        `<span class='dir-parent'>
              <span class='file-in-explorer' onclick='openFile("${fileName}", "${filePath}", "${ext}")' oncontextmenu='showOptions("${filePath}", "${ext}")'>
                <img src='./vscode-icons/file-icons/icon-${ext}.svg' alt='icon-${ext}'>
                <p class='vs-code-file-in-explorer'>${fileName}</p>
              </span>
              <div class='dir-child' id='${fileName}'></div>
          </span>`
      );
    } else {
      $(`#${placeInDom}`).append(
        `<span class='file-in-explorer' onclick='openFile("${fileName}", "${filePath}", "${ext}")' oncontextmenu='showOptions("${filePath}", "${ext}")'>
              <img src='./vscode-icons/file-icons/icon-${ext}.svg' alt='icon-${ext}'>
              <p id='${fileName}' class='vs-code-file-in-explorer'>${fileName}</p>
          </span>`
      );
    }
  });
}

//file icons
//https://github.com/braver/FileIcons/tree/master/build/assets
