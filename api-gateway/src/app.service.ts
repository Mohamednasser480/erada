
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import CircuitBreaker from './serviceprovider/CircuitBreaker';

@Injectable()
export class AppService {

    async getHello(): Promise< any >{
  
   
             
            return "hello world v3"
    
      
       
    }
}
