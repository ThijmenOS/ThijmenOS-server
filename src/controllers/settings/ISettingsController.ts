import { Path } from "@common/FileSystem";

interface ISettingsController {
  SetBackground(ImagePath: Path): Promise<void>;
  GetBackground(): Promise<string>;
}

export default ISettingsController;
