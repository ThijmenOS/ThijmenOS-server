import { Access } from "@thijmen-os/common";
import RootMethods from "./rootMethods";
import fs from "fs";
import { injectable } from "inversify";
import { AccessMap, AccessObjectMap } from "@thijmen-os/common";

@injectable()
class Root implements RootMethods {
  private readonly settingsLocation =
    "userfiles/C/OperatingSystem/ThijmenOsData/.access";

  readFileAccess(): AccessObjectMap {
    const raw = fs.readFileSync(this.settingsLocation, "utf8");

    const AccessObject: AccessObjectMap = {};

    raw.split(/\r?\n/).map((accessLine) => {
      const accessAttributes = accessLine.split(":");
      let path = accessAttributes.shift();
      if (!path) path = "####";

      const UserAccessAttributes = accessAttributes[0].split("");
      let userId = UserAccessAttributes.shift();
      if (!userId) userId = "####";

      const userAccess: AccessMap = {
        r: false,
        w: false,
        x: false,
      };
      UserAccessAttributes.forEach((access) => {
        userAccess[access as Access] = access !== "-" && true;
      });

      const GroupAccessAttributes = accessAttributes[1].split("");
      let groupId = GroupAccessAttributes.shift();
      if (!groupId) groupId = "####";

      const groupAccess: AccessMap = {
        r: false,
        w: false,
        x: false,
      };
      GroupAccessAttributes.forEach(
        (access) => (userAccess[access as Access] = access !== "-" && true)
      );

      AccessObject[path] = {
        path: path,
        userId: userId,
        userAccess: userAccess,
        groupId: groupId,
        groupAccess: groupAccess,
      };
    });

    return AccessObject;
  }
}

export default Root;
