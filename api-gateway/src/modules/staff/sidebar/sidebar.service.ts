import { Inject, Injectable, Scope } from '@nestjs/common';
import CircuitBreaker from 'src/serviceprovider/CircuitBreaker';
import { CustomErrorHandle } from 'src/serviceprovider/ErrorException/customErrorHandle';
import objectToQueryString from 'src/helpers/objectToQueryString';


@Injectable({ scope: Scope.REQUEST })
export class SidebarService {
  private  circuitBreaker = new CircuitBreaker(5, 2, 5000);

  constructor(
  ) {
  }
 
  /**
   * @param
   * @returns {dataObject}
   * @description :This function is used to create sidebar
   */
  private IDENTITY_URL:string=`http://${ process.env.IDENTITY_HOST}:${ process.env.IDENTITY_PORT}`

  async create(body):Promise<any> {
    console.log(body);
    
    // objectToQueryString
    try {
      const request = {
        method: 'post',
        url: `${this.IDENTITY_URL}/sidebar`,
        data: body,
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }

  }

  /**
   * @param {object}
   * @returns {dataObject}
   * @description : This function is used to check data already Exist or not with object data
   */
 

  /**
   * @param id
   * @returns {dataObject}
   * @description :This function is used to update user
   */
  async update(id: string, body:any) {
    console.log(body);
    
    console.log(this.IDENTITY_URL);
    
    try {
      const request = {
        method: 'patch',
        url: `${this.IDENTITY_URL}/sidebar`,
        data: body,
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }  }

  /**
   * @param {object}
   * @returns {dataObject}
   * @description : This function is used to get sidebar by id
   */
  async findById(id: string) {
    console.log(id);
    
    
    try {
      const request = {
        method: 'get',
        url: `${this.IDENTITY_URL}/sidebar/${id}`,
        data: {},
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }
  /**
   * @param {object}
   * @returns {dataObject}
   * @description : This function is used to get sidebar data with filters and sort by and order by display order
   */
  async findAll(body: any) {
    console.log(body);
        
    try {
      objectToQueryString
      const request = {
        method: 'post',
        url: `${this.IDENTITY_URL}/sidebar/all${objectToQueryString(body)}`,
        data: body,
      };
         
        return await  this.circuitBreaker.send(request)

    } catch (error) {

      console.log("error",error);
      CustomErrorHandle.customErrorHandle(error)
    }
  }
}
