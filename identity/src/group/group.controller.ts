import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
  } from '@nestjs/common';
  import { Group } from './group.entity';
  import {
    getValidationSchema,
    UuIdValidationPipe,
    YupValidationPipe,
  } from '../utils/validation.pipes';
  import {
    groupValidationSchema,
    groupStatusValidationSchema,
  } from './group.schema';

  import { GroupDto } from './group.dto';
  import { GroupService } from './group.service';
  import { RESPONSE_MESSAGES } from '../types/responseMessages';
  @Controller('groups')
  export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Post('/')
    async create(
      @Body(new YupValidationPipe(getValidationSchema(groupValidationSchema)))
      data: GroupDto,
    ) {
      return await this.groupService.create(data);
    }

    @Patch('status/:id')
    updateStatus(
        @Param('id', new UuIdValidationPipe({ id: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR }),) id: string,
        @Body(new YupValidationPipe(getValidationSchema(groupStatusValidationSchema)))
            data: Group,
    ) {
      return this.groupService.updateStatus(id, data);
    }

    @Patch(':id')
    update(@Param('id',new UuIdValidationPipe({ id: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR }),) id: string,
           @Body(new YupValidationPipe(getValidationSchema(groupValidationSchema)))
      data: Group
    ) {
      return this.groupService.update(id, data);
    }

    @Get('/all')
    findAll(@Query() query: any) {
      return this.groupService.findAll(query);
    }
    
    @Get(':id')
    find(@Param('id', new UuIdValidationPipe({id: RESPONSE_MESSAGES.GROUP.GROUP_ID_IS_NOT_VALID})) id: string) {
      return this.groupService.findById(id);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.groupService.delete(id);
    }
  }
  