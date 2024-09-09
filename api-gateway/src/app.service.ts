
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import CircuitBreaker from './serviceprovider/CircuitBreaker';

@Injectable()
export class AppService {
    private  circuitBreaker = new CircuitBreaker(5, 2, 5000);

    async getHello(): Promise< any >{
       let proxyServiceBaseUrl:string='http://identity:3000'
        const request = {
            method: 'get',
            url: `${proxyServiceBaseUrl}`,
            data: {},
          };
             
            return await  this.circuitBreaker.send(request)
    
      
       
    }
}
