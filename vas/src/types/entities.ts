interface IBase {
  createdAt?: any;
  updatedAt?: any;
  deletedAt?:any;
}
export enum FileValidationErrors {
  UNSUPPORTED_FILE_TYPE,
}
interface IBaseWithId extends IBase {
  id: string;
}

export interface IBaseWithMeta extends IBaseWithId {
  createdBy?: string;
  updatedBy?: string;
}

export interface IBranch extends IBaseWithMeta{

  managerId: string;

  status:string;
  name:string;
  gaverment:string;
  area:string;
  len?:string;
  lat?:string
  street?:string
  buildingNO?:string
  landmark?:string
  staffs?:any
}

export interface IEmployee extends IBaseWithId{

  branch: string;
  staff?:any
  staffId:string
}





