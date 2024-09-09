import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
/**
 * @description:this is used for permission based which will check via token of login user
 */
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = await  context.switchToHttp().getRequest();
    const url = request.url.trim();
    const slug = url.split('/');
    console.log("slug",slug);
    
    // check if user is exist or not
    // we are consider username as  user staffId
    if (request?.user) {
      console.log("request?.user",request?.user);
       
      // const userRecord: any = await this.StaffService.findByStaffId(
      //   request?.user?.username,
      // );
      const userRecord: any = request?.user
      return await this.authService.getPermission(
        userRecord,
        slug[1],
        request?.method.toLowerCase(),
      );
    }
    return false;
  }
}
