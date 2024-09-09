import {  Injectable, Scope } from '@nestjs/common';
import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';
import objectToQueryString from 'src/helpers/objectToQueryString';

@Injectable({ scope: Scope.REQUEST })
export class RoleService  {
  private IDENTITY_URL:string=`http://${ process.env.IDENTITY_HOST}:${ process.env.IDENTITY_PORT}`

  private  circuitBreaker = new CircuitBreaker(5, 2, 5000);


  /**
   * @param :action
   * @returns {}
   * @description :This function is used to create role for user base
   */

  /**
   * @param
   * @returns {dataObject}
   * @description :This function is used to create role for user base
   */
  async create(body:any):Promise< any > {
    try {
      const request = {
        method: 'post',
        url: `${this.IDENTITY_URL}/role`,
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
   * @returns {id , data}
   * @description :This function is used to update role
   *
   */
  async update(id: string, body:any): Promise< any > {
    try {
      const request = {
        method: 'patch',
        url: `${this.IDENTITY_URL}/role/${id}`,
        data: body,
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }
  // updateStatus
  /**
   * @param id
   * @returns {id , data}
   * @description :This function is used to update role
   *
   */
  async updateStatus(id: string, body:any): Promise< any > {
    try {
      const request = {
        method: 'patch',
        url: `${this.IDENTITY_URL}/role/status/${id}`,
        data: body,
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }
 

  /**
   * @param {}
   * @returns {}
   * @description : This function is used to get role data
   */
  async findAll(data: any): Promise< any > {
    try {
      let query:string=objectToQueryString(data)
      const request = {
        method: 'get',
        url: `${this.IDENTITY_URL}/role/all${query}`,
        data: {},
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }

  /**
   * @param {id}
   * @returns {Object}
   * @description : This function is used to get role data via id
   */
  async findById(id: string):Promise<any> {
    try {
      const request = {
        method: 'get',
        url: `${this.IDENTITY_URL}/role/${id}`,
        data: {},
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }

  /**
   * @param {id}
   * @returns {true, false}
   * @description : This function is used to delete role
   */
  async delete(id) {
    try {
      const request = {
        method: 'delete',
        url: `${this.IDENTITY_URL}/role/${id}`,
        data: {},
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }
}
