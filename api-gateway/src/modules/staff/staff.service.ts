import { Body, Injectable } from '@nestjs/common';
import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { BaseService } from 'src/abstract';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';
import objectToQueryString from 'src/helpers/objectToQueryString';

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

   async findAll(data): Promise< any > {
    try {
      let query:string=objectToQueryString(data)
      const request = {
        method: 'get',
        url: `${this.IDENTITY_URL}/staff/all${query}`,
        data: {},
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  
  }
  async findOne(id:string): Promise< any > {
    try {
      const request = {
        method: 'get',
        url: `${this.IDENTITY_URL}/staff/${id}`,
        data: {},
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  
  }

   async   getAllEmployeesUnderManager(id: string) {
      try {
        const request = {
          method: 'get',
          url: `${this.IDENTITY_URL}/staff/reported/${id}`,
          data: {},
        };
           
          return await  this.circuitBreaker.send(request)
  
      } catch (error) {
  
        console.log("error",error);
        CustomErrorHandle.customErrorHandle(error)
      }  }

  async update(id: string,  body:any ): Promise< any > { 
    try {
      const request = {
        method: 'patch',
        url: `${this.IDENTITY_URL}/staff/${id}`,
        data: body,
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
    }

  remove(id: String) {
    return `This action removes a #${id} staff`;
  }
}
