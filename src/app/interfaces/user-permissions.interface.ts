import { Permission } from "./permission.interface";

export interface UserPermissions {
  user_id: number;
  account_id: number;
  permissions: Permission[];
}