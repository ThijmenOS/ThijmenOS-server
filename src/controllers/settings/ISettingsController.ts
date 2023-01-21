import {
  OSSettings,
  Path,
  PermissionRequestDto,
  User,
} from "@thijmen-os/common";

interface ISettingsController {
  SetBackground(ImagePath: Path): Promise<void>;
  GetBackground(): Promise<string>;
  GrantPermission(props: PermissionRequestDto): Promise<boolean>;
  RevokePermission(props: PermissionRequestDto): Promise<boolean>;
  RevokeAllPermissions(applicationId: string): Promise<boolean>;
  ReadUserSettings(userId: string): Promise<any>;
  ReadGlobalSettings(userId: string): Promise<OSSettings>;
  GetAllUsers(): Promise<Array<User>>;
}

export default ISettingsController;
