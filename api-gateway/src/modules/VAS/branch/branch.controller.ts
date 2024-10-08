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

import { BranchService } from './branch.service';
@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}
  @Post('/')
  
  async create( @Body()
    data: any,
  ) {

    console.log("23",data);
    
    return await this.branchService.create(data);
  }

  @Patch(':id')
 
  update(
    @Param(
      'id',
    )
    id: string,
    data: any,
  ) {
    return this.branchService.update(id, data);
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
    return this.branchService.updateStatus(id, data);
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
    return this.branchService.findAll(query);
  }

  //  
  @Get(':id')
  find(
    @Param(
      'id',
      
    )
    id: string,
  ) {
    return this.branchService.findById(id);
  }
  // delete API
  @Delete('delete/:id')
 
  delete(@Param('id') id: string) {
    return this.branchService.delete(id);
  }
}
