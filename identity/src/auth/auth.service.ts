import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffService } from '../staff/staff.service';
import { PermissionService } from '../permission/permission.service';
import { BaseService } from '../abstract';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../auth/auth.constants';
import { RESPONSE_MESSAGES } from 'src/types/responseMessages';
const Actions = Object.freeze({
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  UPDATE: 'update',
  DELETE: 'delete',
  ADD: 'add',
  VIEW: 'view',
});
@Injectable()
export class AuthService extends BaseService {
  constructor(
    @Inject(forwardRef(() => StaffService))
    private StaffService: StaffService,
    private permissionService: PermissionService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }
  /**
   * @param {data}
   * @returns token
   * @description:this function is used to staff sign in
   */
  async validateStaff(data): Promise<any> {
    try {
      const { staffId, password } = data;
      const staff: any = await this.StaffService.findByStaffId(staffId);
      console.log("staff",staff);
      
      const passwordIsValid = await bcrypt.compare(password, staff?.password);
      console.log("passwordIsValid",passwordIsValid);
      
      if (!passwordIsValid) {
        this._getBadRequestError(
          RESPONSE_MESSAGES.STAFF.INVALID_STAFF_NAME_OR_PASSWORD,
        );
      }
      const payload = {
        uuid: staff?.id,
        phone:staff?.phone,
        staffId: staff.staffId,
        role:staff.role
      };
      const accessToken = await this.getAccessToken(payload);
      delete staff?.password;
      const permission = await this.permissionService.getStaffPermissions(staff);
      staff.permission = permission;
      return {
        access_token: accessToken,
        result: staff,
      };
    } catch (error) {
      this._getBadRequestError(error.message);
    }
  }
  /**
   * @param staff
   * @returns accessToken
   * @description:this function is used to get access token
   */
  async getAccessToken(staff) {
    try {
      console.log(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME);
      
      const accessToken = this.jwtService.sign(staff, {
        secret: jwtConstants.secret,
        expiresIn: +process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      });
      return accessToken;
    } catch (error) {
      this._getBadRequestError(error.message);
    }
  }
  //TODO:we need to update later this one
  /**
   *@description: this function is used to generate refresh token
   */
  //   async getRefreshToken(staff) {
  //     const refreshToken = await this.jwtService.sign(staff, {
  //       secret: jwtConstants.refreshSecret,
  //       expiresIn: +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  //     });
  //     return refreshToken;
  //   }
  // }

  /**
   * @param {data}
   * @returns token
   * @description:this function is used to staff sign in
   */

  async resetPassword(req, data): Promise<any> {
    try {
      if (req) {
        const staffDetails = await this.getStaffByReq(req);
        const { newPassword, oldPassword } = data;
        const staff: any = await this.StaffService.findById(staffDetails?.uuid);
        const passwordIsValid = await bcrypt.compare(
          oldPassword,
          staff?.password,
        );
        if (!passwordIsValid) {
          this._getBadRequestError(
            RESPONSE_MESSAGES.STAFF.INVALID_STAFF_NAME_OR_PASSWORD,
          );
        }
        const { id } = staff;
        //  generate hashed password
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        data.password = hashedPassword;
        delete data?.oldPassword;
        delete data?.newPassword;
        await this.StaffService.update(id, data);
        const mailDetails = {
          from: process.env.SYSTEM_SMS,
          to: staff?.staffId,
          subject: 'Reset password',
          html: `<span><b> Your password has been changed </b>.<br> Here is new details of login</br> 
           Your staffId :${staff?.staffId} <br> Your Password is: ${newPassword}  <br> Please don't share with any one your Details </span>`,
        };
        await this.StaffService.sendMail(mailDetails);
        return {
          message: 'Your password has been update successfully ',
        };
      } else {
        this.customErrorHandle('Something went wrong');
      }
    } catch (error) {
      this.customErrorHandle(error);
    }
  }
  /**
   *
   * @param req
   * @returns staff info
   * @description: this function is used for get staff data from jwt token
   */
  async getStaffByReq(req: any) {
    try {
      const jwt = await req.headers.authorization.replace('Bearer ', '');
      let staff= this.jwtService.decode(jwt, { json: true }) 
    

      const staffPermissions =
        await this.permissionService.getStaffPermissions(staff);
        staff.permission = staffPermissions;

        return staff

    } catch (error) {
      console.log(error);
      
      this.customErrorHandle(error);
    }
  }

 
  /**
   * @param req
   * @returns staff info
   * @description: this function is used for get staff data from jwt token
   */
  async getPermission(staffDetails, slug, action) {
    try {
      let method = '';
      // we need to match according to request method
      switch (action) {
        case Actions.GET:
          method = Actions.VIEW;
          break;
        case Actions.PATCH:
          method = Actions.UPDATE;
          break;
        case Actions.DELETE:
          method = Actions.DELETE;
          break;
        case Actions.POST:
          method = Actions.ADD;
          break;
        default:
          break;
      }
      const staffPermissions =
        await this.permissionService.getStaffPermissions(staffDetails);
      let returnRes: any = false;

      for (const x of staffPermissions) {
        const sidebar = x?.slug;
        const actionList = x?.actions;
        for (const element of actionList) {
          const actionName = element?.name;
          if (sidebar === slug && actionName === method) {
            returnRes = true;
          }
        }
      }
      if (returnRes) {
        return true;
      }
      throw this._getUnauthorized('Permission Denied');
    } catch (error) {
      this.customErrorHandle(error);
    }
  }
}
