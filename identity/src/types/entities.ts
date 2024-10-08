
interface IBase {
  createdAt?: any;
  updatedAt?: any;
}
export enum FileValidationErrors {
  UNSUPPORTED_FILE_TYPE,
}
interface IBaseWithId extends IBase {
  id: string;
}
export interface IBranch {
  branchId: string;
  staff: any;

}

export interface IBaseWithMeta extends IBaseWithId {
  createdBy?: string;
  updatedBy?: string;
}
export interface IStaff extends IBaseWithId {
  name: string;
  staffId: string;
  password: string;
  phone: number;
  status: boolean;
  refreshToken?: string;
  manager?: any;
  role: string;
  branchs?: string[];
  oldPassword?: string;
  newPassword?: string;
}

export interface ISidebar extends IBaseWithId {
  name: string;
  url: string;
  slug: string;
  status: boolean;
  displayOrder: number;
}

export interface IRole extends IBaseWithId {
  name: string;
  status: boolean;
}
export interface IAuth {
  staffId: string;
  password: string;
}
export interface IPermission {
  sidebar?: [];
}

export interface IAction extends IBaseWithId {
  name: string;
  status: boolean;
}
export interface IResetPassword {
  oldPassword: string;
  newPassword: string;
}
