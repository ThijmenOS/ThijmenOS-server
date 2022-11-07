import fs from "fs";
import ISettingsController from "./ISettingsController";
import { OSSettings } from "javascriptos-common/types";
import { injectable } from "inversify";
import { computeTargetDir } from "../helpers/computeTargetDir";

@injectable()
class SettingsController implements ISettingsController {
  private readonly settingsLocation =
    "userfiles/C/OperatingSystem/ThijmenOSData/settings.json";

  private async ReadSettings(): Promise<OSSettings> {
    const raw = fs.readFileSync(this.settingsLocation, "utf8");
    return JSON.parse(raw);
  }
  private async WriteSettings(settings: string): Promise<void> {
    fs.writeFileSync(this.settingsLocation, settings);
  }

  public async SetBackground(ImagePath: string): Promise<void> {
    const settings: OSSettings = await this.ReadSettings();

    settings.personalisation.background = ImagePath;

    this.WriteSettings(JSON.stringify(settings, null, 2));
  }
  public async GetBackground(): Promise<string> {
    const settings = await this.ReadSettings();
    return settings.personalisation.background;
  }
}

export default SettingsController;
