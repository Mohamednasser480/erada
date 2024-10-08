import {  Injectable, Scope } from '@nestjs/common';

import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';
import objectToQueryString from 'src/helpers/objectToQueryString';
export const allowedFieldsToSort = ['name'];

@Injectable({ scope: Scope.REQUEST })
export class ActionService  {
 
  private IDENTITY_URL:string=`http://${ process.env.IDENTITY_HOST}:${ process.env.IDENTITY_PORT}`

  private  circuitBreaker = new CircuitBreaker(5, 2, 5000);

  /**
   * @param
   * @returns {dataObject}
   * @description :This function is used to create action for permission
   */
  async create(body: any) {
    try {
      const request = {
        method: 'post',
        url: `${this.IDENTITY_URL}/action`,
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
  async update(id: string, body: any) {
    try {
      const request = {
        method: 'patch',
        url: `${this.IDENTITY_URL}/action/${id}`,
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
  async updateStatus(id: string, body:any) {
    try {
      const request = {
        method: 'post',
        url: `${this.IDENTITY_URL}/action/status/${id}`,
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
  async findAll(data: any) {
    try {
      let query:string=objectToQueryString(data)
      const request = {
        method: 'get',
        url: `${this.IDENTITY_URL}/action${query}`,
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
  async findById(id: string) {
    try {
      const request = {
        method: 'get',
        url: `${this.IDENTITY_URL}/action/${id}`,
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
        url: `${this.IDENTITY_URL}/action/${id}`,
        data: {},
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }
}
