import { root } from "../../../../ProgramFiles/bin/enums/root.js";

export const fileIconSelectors = {
  fileIconSelector: "javascript-os-file-icon",
  fileIconFallbackSelector: "javascript-os-fallback-icon",
  fileIconTitle: "file-icon-title",
};

export const appIcon = `<div class="app javascript-os-file-icon-wrapper">
                <object class='app ${fileIconSelectors.fileIconSelector}' type="image/png">
                  <img class='app ${fileIconSelectors.fileIconFallbackSelector}' src='${root}C/OperatingSystem/Icons/default-app-icon.svg'>
                </object>
                <p id='${fileIconSelectors.fileIconTitle}'></p>
              </div>
            `;
