import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { StaffGuard } from 'src/modules/auth/guards/staff.guard';
import { PermissionGuard } from 'src/modules/auth/guards/permission.guard';
@Controller('permission')

export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
   @UseGuards(StaffGuard,PermissionGuard )
  @Post('/')
  async create(  @Body( )   data,@Request() req ) {

    console.log("request.user ->",req.user);
    
    return req.user
    return await this.permissionService.create(data);
  }
  @Patch(':id')
  
  update(
    @Param(  'id',  )
    id: string,
    @Body()data ) {
    return this.permissionService.update(id, data);
  }

  @Get(':id')
  
  find(
    @Param( 'id')     id: string,  ) {
    return this.permissionService.findById(id);
  }
}
