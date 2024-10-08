import { Body, Injectable } from '@nestjs/common';
import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { BaseService } from 'src/abstract';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';

@Injectable()
export class StaffService extends BaseService {
  private  circuitBreaker = new CircuitBreaker(5, 2, 5000);
  private IDENTITY_URL:string=`http://${ process.env.IDENTITY_HOST}:${ process.env.IDENTITY_PORT}`

   async create(body: Body): Promise< any > {
    console.log(body);
    
    
    try {
      const request = {
        method: 'post',
        url: `${this.IDENTITY_URL}/staff`,
        data: body,
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }

  }

  findAll() {
    return `This action returns all staff`;
  }

  findOne(id: number) {
    return `This action returns a #${id} staff`;
  }

  update(id: number,  body:any ) {
    return `This action updates a #${id} staff`;
  }

  remove(id: number) {
    return `This action removes a #${id} staff`;
  }
}
