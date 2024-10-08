import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';

@Injectable()
export class AuthService {
   Actions = Object.freeze({
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    PUT: 'put',
    UPDATE: 'update',
    DELETE: 'delete',
    ADD: 'add',
    VIEW: 'view',
  });
  private  circuitBreaker = new CircuitBreaker(5, 2, 5000);

  async validateStaff(body): Promise< any > {
    
    let IDENTITY_URL:string=`http://${ process.env.IDENTITY_HOST}:${ process.env.IDENTITY_PORT}`
    console.log();
    
    try {
      const request = {
        method: 'post',
        url: `${IDENTITY_URL}/auth/signIn`,
        data: body,
      };
         
        return await this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }

   async getStaffByReq(jwt):Promise<any> {
    let IDENTITY_URL:string=`http://${ process.env.IDENTITY_HOST}:${ process.env.IDENTITY_PORT}`
    console.log(IDENTITY_URL);
    
    try {
      const request = {
        method: 'get',
        url: `${IDENTITY_URL}/auth/staff`,
        data: {},
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwt,
        },
      };
         
        return await this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }  }

    async getPermission(staffDetails, slug, action) {
      try {
        let method = '';
        // we need to match according to request method
        switch (action) {
          case this.Actions.GET:
            method = this.Actions.VIEW;
            break;
          case this.Actions.PATCH:
            method = this.Actions.UPDATE;
            break;
          case this.Actions.DELETE:
            method = this.Actions.DELETE;
            break;
          case this.Actions.POST:
            method = this.Actions.ADD;
            break;
          default:
            break;
        }
        const staffPermissions = staffDetails.permission
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


      CustomErrorHandle.unathorizedErrorHandle( 'Permission Denied')
      } catch (error) {
        console.log("Permission",error);
        
        CustomErrorHandle.customErrorHandle(error);
      }
    }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
