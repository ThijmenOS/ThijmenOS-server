let editorSessions = [];

function initEditor() {
  editor.setOptions({
    autoScrollEditorIntoView: true,
    copyWithEmptySelection: true,
  });
  editor.setTheme("ace/theme/chaos");
  editor.session.setMode("ace/mode/javascript");
}

function showOpenFiles() {
  $("#inner-scroll-container").html("");
  editorSessions.forEach((session) => {
    $("#inner-scroll-container").append(
      `<span class='open-file-vs-code-top-header' onclick='openFile("${session.fileName}")'>
        <img src='./vscode-icons/file-icons/icon-${session.fileExt}.svg' alt='icon-${session.fileExt}'>
        <p>${session.fileName}</p>
        </span>`
    );
  });
}

function switchSession(session = 0) {
  editor.setSession(editorSessions[session].session);
  let mode = "abc";
  switch (editorSessions[session].fileExt) {
    case "js":
      mode = "javascript";
      break;
    case "html":
      mode = "html";
      break;
    case "css":
      mode = "css";
      break;
    case "txt":
      mode = "text";
      break;
  }
  editor.session.setMode(`ace/mode/${mode}`);

  showOpenFiles();
}
