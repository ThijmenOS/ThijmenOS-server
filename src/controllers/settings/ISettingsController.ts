import { Path, PermissionRequestDto } from "@thijmen-os/common";

interface ISettingsController {
  SetBackground(ImagePath: Path): Promise<void>;
  GetBackground(): Promise<string>;
  GrantPermission(props: PermissionRequestDto): Promise<boolean>;
  RevokePermission(props: PermissionRequestDto): Promise<boolean>;
  RevokeAllPermissions(applicationId: string): Promise<boolean>;
}

export default ISettingsController;
