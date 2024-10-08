import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { StaffService } from './staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  create(@Body() body) {
    try {
      return this.staffService.create(body);

    } catch (error) {
      console.log(error.status);
      
      return error
    }
  }

  @Get('all')
  findAll(  @Query()
  query: any,) {
    return this.staffService.findAll(query);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.staffService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }


  @Get('reported/:id')
  reportTo(
    @Param( 'id'  )
    id: string,
  ) {
    return this.staffService.getAllEmployeesUnderManager(id);
  }
}
