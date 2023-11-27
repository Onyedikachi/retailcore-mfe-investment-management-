export interface UserProfile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
  is_active: boolean;
  last_login: Date;
  created_at: Date;
  username: string;

  external_reference: string;
  failed_password_attempts: number;
  force_change_password: boolean;
  groups: any[];

  is_staff: boolean;
  is_superuser: boolean;
  last_password_change_date: Date;
  phone: string;
  roles: IRole[];
  branch: string;
  tenant: string;
  tenant_admin: boolean;
  updated_at: Date;
  user_permissions: string[];
  verified: boolean;
}
