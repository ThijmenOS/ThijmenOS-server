import { Path } from "@thijmenos/common/types";

interface ISettingsController {
  SetBackground(ImagePath: Path): Promise<void>;
  GetBackground(): Promise<string>;
}

export default ISettingsController;
