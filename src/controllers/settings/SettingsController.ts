import fs from "fs";
import ISettingsController from "./ISettingsController";
import {
  ApplicationMetaData,
  OSSettings,
  Permissions,
  PermissionRequestDto,
  User,
  Accounts,
} from "@thijmen-os/common";
import { injectable } from "inversify";
import { computeTargetDir } from "../helpers/computeTargetDir";

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

  public async GetAllUsers(): Promise<Accounts> {
    const settings: OSSettings = await this.ReadSettings();

    return settings.accounts;
  }

  public async UpdateUserInfo(user: User): Promise<User> {
    const settings: OSSettings = await this.ReadSettings();
    const oldUserInfo = settings.accounts[user.userId];

    const userDesktopPath = computeTargetDir("C/Users/");
    const oldPath = userDesktopPath + oldUserInfo.username;

    if (!settings.accounts[user.userId])
      throw new Error("Could not find user with target userId");

    settings.accounts[user.userId] = user;

    const newPath = userDesktopPath + user.username;
    console.log(oldPath);
    fs.rename(oldPath, newPath, (err) => {
      if (err) throw new Error("could not rename folder");
    });

    this.WriteSettings(settings);

    return settings.accounts[user.userId];
  }
}

export default SettingsController;
