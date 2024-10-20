import { Injectable } from '@nestjs/common';
import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';
export const allowedFieldsToSort = ['name'];
@Injectable({})

export class PermissionService {
  private IDENTITY_URL:string=`http://${ process.env.IDENTITY_HOST}:${ process.env.IDENTITY_PORT}`

  private  circuitBreaker = new CircuitBreaker(5, 2, 5000);

  /**
   * @param
   * @returns {dataObject}
   * @description :This function is used to create role for user base
   */
  async create(body) {
    try {
      const request = {
        method: 'post',
        url: `${this.IDENTITY_URL}/permission`,
        data: body,
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }

  /**
   * @param  id
   * @param data
   * @returns  data in array
   * @description :This function is used to update Permission via Id
   */
  async update(id: string, body) {
    try {
      const request = {
        method: 'patch',
        url: `${this.IDENTITY_URL}/permission/${id}`,
        data: body,
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }

 
  /**
   * @param id
   * @returns {dataObject}
   * @description : this function is used to get permission data according to id
   */
  async findById(id: string) {
    try {
      const request = {
        method: 'post',
        url: `${this.IDENTITY_URL}/permission/${id}`,
        data: {},
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }

 
  


}
