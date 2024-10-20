import {  Injectable, Scope } from '@nestjs/common';
import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';
import objectToQueryString from 'src/helpers/objectToQueryString';

@Injectable({ scope: Scope.REQUEST })
export class GroupService  {
  private IDENTITY_URL:string=`http://${ process.env.IDENTITY_HOST}:${ process.env.IDENTITY_PORT}`
  private  circuitBreaker = new CircuitBreaker(5, 2, 5000);

  async create(body:any):Promise<any> {
    try {
      const request = {
        method: 'post',
        url: `${this.IDENTITY_URL}/groups`,
        data: body,
      };
    return await  this.circuitBreaker.send(request)
    } catch (error) {
      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }

  async update(id: string, body:any): Promise<any> {
    try {
      const request = {
        method: 'patch',
        url: `${this.IDENTITY_URL}/groups/${id}`,
        data: body,
      };
    return await  this.circuitBreaker.send(request)
    } catch (error) {
      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }

  async updateStatus(id: string, body:any): Promise<any> {
    try {
      const request = {
        method: 'patch',
        url: `${this.IDENTITY_URL}/groups/status/${id}`,
        data: body,
      };
    return await  this.circuitBreaker.send(request)
    } catch (error) {
      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }
 
  async findAll(data: any):Promise<any> {
    try {
      let query:string = objectToQueryString(data)
      const request = {
        method: 'get',
        url: `${this.IDENTITY_URL}/groups/all${query}`,
        data: {},
      };
    return await  this.circuitBreaker.send(request)
    } catch (error) {
      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }

  async findById(id: string):Promise<any> {
    try {
      const request = {
        method: 'get',
        url: `${this.IDENTITY_URL}/groups/${id}`,
        data: {},
      };
    return await  this.circuitBreaker.send(request)
    } catch (error) {
      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }

  async delete(id) {
    try {
      const request = {
        method: 'delete',
        url: `${this.IDENTITY_URL}/groups/${id}`,
        data: {},
      };
    return await  this.circuitBreaker.send(request)
    } catch (error) {
      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }
}
