import fs from "fs";
import ISettingsController from "./ISettingsController";
import {
  ApplicationMetaData,
  OSSettings,
  Permissions,
  PermissionRequestDto,
  User,
} from "@thijmen-os/common";
import { injectable } from "inversify";

@injectable()
class SettingsController implements ISettingsController {
  private readonly settingsLocation =
    "userfiles/C/OperatingSystem/ThijmenOsData/settings.json";

  private async ReadSettings(): Promise<OSSettings> {
    const raw = fs.readFileSync(this.settingsLocation, "utf8");
    return JSON.parse(raw);
  }
  private async WriteSettings(settings: OSSettings): Promise<void> {
    const stringify = JSON.stringify(settings, null, 2);
    fs.writeFileSync(this.settingsLocation, stringify);
  }
  //TODO: Fix user settings
  private findTargetApplication(
    applicationList: Array<ApplicationMetaData>,
    targetApplicationId: string | number
  ) {
    return applicationList.find(
      (application) =>
        application.applicationIdentifier === targetApplicationId.toString()
    );
  }

  public async GrantPermission(props: PermissionRequestDto): Promise<boolean> {
    const settings: OSSettings = await this.ReadSettings();

    const targetApplication = this.findTargetApplication(
      settings.applications.installedApplications,
      props.applicationId
    );

    if (!targetApplication) return false;

    const permissionAreadyGiven = targetApplication.permissions.some(
      (applicationPermission) => applicationPermission === props.permission
    );

    if (permissionAreadyGiven) return false;

    targetApplication?.permissions.push(props.permission);
    this.WriteSettings(settings);

    return true;
  }

  public async RevokePermission(props: PermissionRequestDto): Promise<boolean> {
    const settings: OSSettings = await this.ReadSettings();

    const targetApplication = this.findTargetApplication(
      settings.applications.installedApplications,
      props.applicationId
    );

    if (!targetApplication) return false;

    const permissionIndex = targetApplication.permissions.findIndex(
      (applicationPermission) => applicationPermission === props.permission
    );

    if (permissionIndex < 0) return true;

    targetApplication.permissions.splice(permissionIndex, 1);
    this.WriteSettings(settings);

    return true;
  }

  public async RevokeAllPermissions(applicationId: string): Promise<boolean> {
    const settings: OSSettings = await this.ReadSettings();

    const targetApplication = this.findTargetApplication(
      settings.applications.installedApplications,
      applicationId
    );

    if (!targetApplication) return false;

    targetApplication.permissions = new Array<Permissions>();
    this.WriteSettings(settings);

    return true;
  }

  public async GetAllUsers(): Promise<Array<User>> {
    const settings: OSSettings = await this.ReadSettings();

    return settings.accounts;
  }
}

export default SettingsController;
