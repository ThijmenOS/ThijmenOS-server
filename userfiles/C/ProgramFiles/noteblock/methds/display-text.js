export function DisplayFileContent(content) {
  const textAreaElement = document.getElementById("content");

  textAreaElement.innerHTML = content;
}
