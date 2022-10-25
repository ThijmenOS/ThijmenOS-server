let code = "";

function excecuteJSCode() {
  code = editor.getValue();

  $("#browser-main-content").html(
    `<iframe style="background: white;" srcdoc='${code}'></iframe>`
  );
}
