import { READ } from "../../../../ProgramFiles/bin/enums/file.js";
import * as OS from "../../../../ProgramFiles/bin/index.js";
import { desktopElement } from "../constants.js";

import { CreateElementFromString } from "../utils/createElementFromString.js";
import GenerateUUID from "../utils/generateUUID.js";
import { appIcon, fileIconSelectors } from "./constants.js";
import fileIcons from "../../../../ProgramFiles/fileexplorer/icons/icons.js";
import { root } from "../../../../ProgramFiles/bin/enums/root.js";

class FileIcon {
  iconContainerElement;
  iconImageElement;
  iconTitleElement;

  iconHasError = false;

  metaData = {
    name: "",
    exeLocation: "",
    iconLocation: "",
    mimeType: "thijm",
  };

  async ConstructFileIcon(filePath) {
    const iconMetaData = await this.GetFileConfigurations(filePath);

    if (!iconMetaData) {
      //TODO: implement Couldnt get config error
      throw new Error("a");
    }

    const iconIdentifier = this.InitialiseIconElements();

    this.RenderIcon(iconMetaData.name, iconMetaData.iconLocation);
    this.InitialiseIconBehaviour(iconIdentifier, iconMetaData);
  }

  async GetFileConfigurations(filePath) {
    const fileName = filePath.split("/").at(-1);
    if (!fileName) {
      throw new Error("a");
    }

    const fileArray = fileName.split(".");
    let fileExtension = fileArray.at(-1);

    if (fileArray.length === 1) {
      fileExtension = "dir";
    }

    if (fileExtension === "thijm") {
      const metadata = await this.ApplicationIcon(filePath);

      return metadata;
    }

    return {
      name: fileName,
      exeLocation: filePath,
      iconLocation: this.FileIcon(fileExtension),
      mimeType: fileExtension,
    };
  }

  FileIcon(mimeType) {
    return `${root}/C/OperatingSystem/Icons/file_type_${fileIcons[mimeType]}.svg`;
  }

  async ApplicationIcon(location) {
    const applicationProperties = await this.GetShortcutProperties(location);

    if (!applicationProperties || !applicationProperties.exeLocation) {
      this._iconHasError = true;
      throw new Error("a");
    }

    return {
      name: applicationProperties.name,
      exeLocation: applicationProperties.exeLocation,
      iconLocation: root + applicationProperties.iconLocation,
      mimeType: "thijm",
    };
  }

  async GetShortcutProperties(path) {
    if (!path || !path.length) {
      throw new Error("a");
    }

    const fh = await OS.fopen(path, READ);

    if (typeof fh === "string") {
      throw new Error(fh);
    }

    const file = await OS.fread(fh);

    if (
      file === "FILE_DESCRIPTOR_DOES_NOT_EXIST" ||
      file === "FILE_LOCKED" ||
      file === "UNKNOWN_FILE_ERROR"
    ) {
      throw new Error(file);
    }

    const iconMetadata = JSON.parse(file);

    return iconMetadata;
  }

  InitialiseIconElements() {
    this.iconContainerElement = CreateElementFromString(appIcon);

    this.iconImageElement = this.iconContainerElement.querySelector(
      `.${fileIconSelectors.fileIconSelector}`
    );
    this.iconTitleElement =
      this.iconContainerElement.querySelector("#file-icon-title");

    const iconIdentifier = GenerateUUID();

    this.iconContainerElement.setAttribute("data-id", iconIdentifier);

    return iconIdentifier;
  }

  InitialiseIconBehaviour(iconIdentifier, iconMetadata) {
    let clickCount = 0;
    const listenToClick = () => {
      clickCount++;
      if (clickCount === 2) {
        this.OpenFile(iconMetadata);
        clickCount = 0;
      }
    };

    this.iconContainerElement.addEventListener("click", listenToClick);

    //TODO: bring icon movement back
  }

  RenderIcon(iconName, iconImageSource) {
    this.iconImageElement.data =
      iconImageSource || `${root}/C/OperatingSystem/Icons/default-app-icon.svg`;
    this.iconTitleElement.innerHTML = iconName;

    desktopElement.append(this.iconContainerElement);
  }

  OpenFile(metadata) {
    if (this._iconHasError) throw new Error("App has error");

    if (metadata.mimeType === "thijm") {
      OS.pstart(metadata.exeLocation);
      return;
    }

    if (!metadata.mimeType) {
      //TODO: add mimetypeinvalid error
      throw new Error("mimetype invalid");
    }

    OS.Open(metadata.exeLocation, metadata.mimeType);
  }
}

export default FileIcon;
