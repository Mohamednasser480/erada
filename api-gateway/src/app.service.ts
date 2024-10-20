
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async getHello(): Promise< any >{
      return "the app is healthy";
    }
}
