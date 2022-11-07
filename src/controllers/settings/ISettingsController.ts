import { Path } from "javascriptos-common/types";

interface ISettingsController {
  SetBackground(ImagePath: Path): Promise<void>;
  GetBackground(): Promise<string>;
}

export default ISettingsController;
