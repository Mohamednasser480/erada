import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { StaffService } from '../../staff/staff.service';
import { CustomErrorHandle } from '../../../serviceprovider/ErrorException/customErrorHandle';

/**
 * @description:this is used for permission based which will check via token of login user
 */
@Injectable()

export class StaffGuard implements CanActivate {
  constructor(
    private readonly StaffService: StaffService,
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await  context.switchToHttp().getRequest();
    try {
      const jwt = await request.headers.authorization
      console.log("jwt",jwt);
      
        let user= await this.authService.getStaffByReq(jwt)
        console.log("user",user);

        request.user=user.data
        return true
    } catch (error) {
      
      console.log(JSON.stringify( error));
      
      CustomErrorHandle.customErrorHandle(error);
    }
    // check if user is exist or not
    // we are consider username as  user staffId
    // if (request?.user) {
    //   console.log("request?.user",request?.user);
       
    //   const userRecord: any = await this.StaffService.findByStaffId(
    //     request?.user?.uuid,
    //   );
    //   return await this.authService.getPermission(
    //     userRecord,
    //     slug[1],
    //     request?.method.toLowerCase(),
    //   );
    // }
    return false;
  }
}
