import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { SidebarService } from './sidebar.service';
@Controller('sidebar')
export class SidebarController {
  constructor(private readonly sideService: SidebarService) { }
  // @UseGuards(JwtAuthGuard, PermissionGuard)
  @Post('/')
  async create(
    @Body()
    data: any,
  ) {
    return await this.sideService.create(data);
  }
  @Patch(':id')
  update(
    @Param(
      'id',

    )
    id: string,
    @Body()
    data: any,
  ) {
    return this.sideService.update(id, data);
  }

  //
  @Get('/all')
  /**
   * @param query - query params
   * @description:
   */
  findAll(
    @Query()
    query,
  ) {
    return this.sideService.findAll(query);
  }

  @Get(':id')
  find(
    @Param(
      'id',

    )
    id: string,
  ) {
    return this.sideService.findById(id);
  }
}
