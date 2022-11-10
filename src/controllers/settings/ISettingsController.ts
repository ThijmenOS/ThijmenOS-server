import { Path } from "@thijmenos/common";

interface ISettingsController {
  SetBackground(ImagePath: Path): Promise<void>;
  GetBackground(): Promise<string>;
}

export default ISettingsController;
