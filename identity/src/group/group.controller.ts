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
  import { ApiOperation, ApiResponse } from '@nestjs/swagger';
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
    @ApiOperation({ summary: RESPONSE_MESSAGES.GROUP.CREATE_GROUP })
    @ApiResponse({
      status: 201,
      description: RESPONSE_MESSAGES.GROUP.CREATE_GROUP,
      type: Group,
    })
    @ApiResponse({
      status: 500,
      description: RESPONSE_MESSAGES.COMMON.NOT_FOUND,
    })
    @ApiResponse({
      status: 400,
      description: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR,
    })
    async create(
      @Body(new YupValidationPipe(getValidationSchema(groupValidationSchema)))
      data: GroupDto,
    ) {
      return await this.groupService.create(data);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: RESPONSE_MESSAGES.GROUP.UPDATE_GROUP_BY_ID })
    @ApiResponse({
      status: 200,
      description: RESPONSE_MESSAGES.GROUP.UPDATE_GROUP_BY_ID,
    })
    @ApiResponse({
      status: 500,
      description: RESPONSE_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
    @ApiResponse({
      status: 400,
      description: RESPONSE_MESSAGES.COMMON.NOT_FOUND,
    })
    update(
      @Param(
        'id',
        new UuIdValidationPipe({ id: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR }),
      )
      id: string,
      @Body(new YupValidationPipe(getValidationSchema(groupValidationSchema)))
      data: Group,
    ) {
      return this.groupService.update(id, data);
    }
    
    @Post('status/:id')
    @ApiOperation({ summary: RESPONSE_MESSAGES.GROUP.UPDATE_GROUP_BY_ID })
    @ApiResponse({
      status: 200,
      description: RESPONSE_MESSAGES.GROUP.UPDATE_GROUP_BY_ID,
    })
    @ApiResponse({
      status: 500,
      description: RESPONSE_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
    @ApiResponse({
      status: 400,
      description: RESPONSE_MESSAGES.COMMON.NOT_FOUND,
    })
    updateStatus(
      @Param(
        'id',
        new UuIdValidationPipe({ id: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR }),
      )
      id: string,
      @Body(
        new YupValidationPipe(getValidationSchema(groupStatusValidationSchema)),
      )
      data: Group,
    ) {
      return this.groupService.updateStatus(id, data);
    }

    @Get('/all')
    @ApiOperation({ summary: RESPONSE_MESSAGES.GROUP.UPDATE_GROUP_BY_ID })
    @ApiResponse({
      status: 200,
      description: RESPONSE_MESSAGES.GROUP.UPDATE_GROUP_BY_ID,
    })
    @ApiResponse({
      status: 500,
      description: RESPONSE_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
    @ApiResponse({
      status: 400,
      description: RESPONSE_MESSAGES.COMMON.NOT_FOUND,
    })
    findAll(
      @Query()
      query: GroupDto,
    ) {
      return this.groupService.findAll(query);
    }
  
    
    @Get(':id')
    @ApiOperation({ summary: RESPONSE_MESSAGES.GROUP.GET_GROUP_BY_ID })
    @ApiResponse({
      status: 200,
      description: RESPONSE_MESSAGES.GROUP.GET_GROUP_BY_ID,
    })
    @ApiResponse({
      status: 500,
      description: RESPONSE_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
    @ApiResponse({
      status: 400,
      description: RESPONSE_MESSAGES.COMMON.NOT_FOUND,
    })
    find(
      @Param(
        'id',
        new UuIdValidationPipe({
          id: RESPONSE_MESSAGES.GROUP.GROUP_ID_IS_NOT_VALID,
        }),
      )
      id: string,
    ) {
      return this.groupService.findById(id);
    }
     
    @Delete(':id')
    @ApiOperation({ summary: RESPONSE_MESSAGES.GROUP.DELETE_GROUP })
    @ApiResponse({
      status: 200,
      description: RESPONSE_MESSAGES.GROUP.DELETE_GROUP,
    })
    @ApiResponse({
      status: 500,
      description: RESPONSE_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    })
    @ApiResponse({
      status: 400,
      description: RESPONSE_MESSAGES.COMMON.NOT_FOUND,
    })
    delete(@Param('id') id: string) {      
      return this.groupService.delete(id);
    }
  }
  