import { Path } from "@thijmen-os/common";

interface ISettingsController {
  SetBackground(ImagePath: Path): Promise<void>;
  GetBackground(): Promise<string>;
}

export default ISettingsController;
