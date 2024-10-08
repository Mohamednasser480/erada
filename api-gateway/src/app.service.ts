
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import CircuitBreaker from './serviceprovider/CircuitBreaker';
import objectToQueryString from './helpers/objectToQueryString';
import { CustomErrorHandle } from './serviceprovider/ErrorException/customErrorHandle';

@Injectable()
export class AppService {
    private  circuitBreaker = new CircuitBreaker(5, 2, 5000);
    private IDENTITY_URL:string=`http://${ process.env.IDENTITY_HOST}:${ process.env.IDENTITY_PORT}`
  
    async getHello(): Promise< any >{
  
   
             
        try {
           
            const request = {
              method: 'get',
              url: `${this.IDENTITY_URL}/branch/`,
              data: {},
            };
               
              return await  this.circuitBreaker.send(request)
      
          } catch (error) {
      
            console.log("error",error);
            CustomErrorHandle.customErrorHandle(error)
          }
    
      
       
    }
}
