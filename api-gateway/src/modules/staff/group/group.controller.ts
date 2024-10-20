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
  import { GroupService } from './group.service';
  @Controller('groups')
  export class GroupController {
    constructor(private readonly groupService: GroupService) {}
    @Post('/')
    async create(@Body() data: any) {
      return await this.groupService.create(data);
    }

   @Patch('status/:id')
   updateStatus(@Param('id') id: string, @Body() data: any) {
       return this.groupService.updateStatus(id, data);
   }

    @Patch(':id')
    update(@Param('id') id: string, @Body() data: any) {
      return this.groupService.update(id, data);
    }


    @Get('/all')
    findAll(@Query() query: any) {
      return this.groupService.findAll(query);
    }
 
    @Get(':id')
    find(@Param('id') id: string) {
      return this.groupService.findById(id);
    }

    @Delete(':id')   
    delete(@Param('id') id: string) {
      return this.groupService.delete(id);
    }
  }
  