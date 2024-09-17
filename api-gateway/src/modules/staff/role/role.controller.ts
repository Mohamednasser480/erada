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

import { RoleService } from './role.service';
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('/')
  
  async create( @Body()
    data: any,
  ) {
    return await this.roleService.create(data);
  }

  @Patch(':id')
 
  update(
    @Param(
      'id',
    )
    id: string,
    data: any,
  ) {
    return this.roleService.update(id, data);
  }

  // update status //

  @Post('status/:id')
 
  updateStatus(
    @Param(
      'id',
    )
    id: string,
    @Body(
    )
    data: any,
  ) {
    return this.roleService.updateStatus(id, data);
  }
  /**
   * @param query - query params
   * @description:
   */
  @Get('/all')
 
  findAll(
    @Query()
    query: any,
  ) {
    return this.roleService.findAll(query);
  }

  //  
  @Get(':id')
  find(
    @Param(
      'id',
      
    )
    id: string,
  ) {
    return this.roleService.findById(id);
  }
  // delete API
  @Delete('delete/:id')
 
  delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
