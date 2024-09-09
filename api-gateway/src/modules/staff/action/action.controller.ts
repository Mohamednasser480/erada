import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ActionService } from './action.service';
@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}
  @Post('/')

  async create(
    @Body()
    data: any,
  ) {
    return await this.actionService.create(data);
  }
  @Patch(':id')
 
  async update(
    @Param(      'id',    )    id: string,
    @Body()
    data: any,
  ) {
    return await this.actionService.update(id, data);
  }

  // update status //

  @Post('status/:id')
 
  async updateStatus(
    @Param(
      'id',
     
    )
    id: string,
    @Body(
      
    )
    data: any,
  ) {
    return await this.actionService.updateStatus(id, data);
  }
  /**
   * @param query - query params
   * @description:
   */
  // @UseGuards(JwtAuthGuard, PermissionGuard)
  @Get('/all')
  
  findAll(
    @Query()
    query: any,
  ) {
    return this.actionService.findAll(query);
  }

  @Get(':id')
  
  find(
    @Param(
      'id',
      
    )
    id: string,
  ) {
    return this.actionService.findById(id);
  }
  // delete API
  @Delete('delete/:id')
  
  delete(@Param('id') id: string) {
    return this.actionService.delete(id);
  }
}
