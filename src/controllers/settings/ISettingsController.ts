import { Accounts, PermissionRequestDto, User } from "@thijmen-os/common";

interface ISettingsController {
  GrantPermission(props: PermissionRequestDto): Promise<boolean>;
  RevokePermission(props: PermissionRequestDto): Promise<boolean>;
  RevokeAllPermissions(applicationId: string): Promise<boolean>;
  GetAllUsers(): Promise<Accounts>;
  UpdateUserInfo(user: User): Promise<User>;
}

export default ISettingsController;
