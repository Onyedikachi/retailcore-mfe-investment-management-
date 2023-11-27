import { Permissions } from "@app/constants";
import { UserProfile } from "./user";

export interface AuthenticatedUserPayload {
  user?: UserProfile;
  invalidateUser?: () => void;
  invalidateConfigs?: () => void;
  configs?: IUserConfig;
  systemPermissions: IPermission;
  SYSTEM_PERMISSIONS: typeof Permissions & Record<string, string>;
  invalidatePermissions: () => void;
}
