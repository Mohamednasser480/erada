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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Staff } from './staff.entity';
import {
  getValidationSchema,
  UuIdValidationPipe,
  YupValidationPipe,
} from '../utils/validation.pipes';
import { findValidationSchema, staffValidationSchema } from './staff.schema';
import { FindStaffDto, StaffDto } from './staff.dto';
import { StaffService } from './staff.service';
import { RESPONSE_MESSAGES } from '../types/responseMessages';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { PermissionGuard } from 'src/auth/permission.guard';
@Controller('staff')
export class StuffController {
  constructor(private readonly staffService: StaffService) {}
  // @UseGuards(JwtAuthGuard, PermissionGuard)
  @Post('/')
  @ApiOperation({ summary: 'Create staff' })
  @ApiResponse({
    status: 201,
    description: 'Create staff',
    type: Staff,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error',
  })
  async create(
    @Body(new YupValidationPipe(getValidationSchema(staffValidationSchema)))
    data: StaffDto,
  ) {
    return await this.staffService.create(data);
  }
//@UseGuards(JwtAuthGuard, PermissionGuard)
  @Patch(':id')
  @ApiOperation({ summary: RESPONSE_MESSAGES.STAFF.UPDATE_STAFF_BY_ID })
  @ApiResponse({
    status: 200,
    description: RESPONSE_MESSAGES.STAFF.UPDATE_STAFF_BY_ID,
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
      new UuIdValidationPipe({ id: RESPONSE_MESSAGES.STAFF.STAFF_ID_NOT_VALID }),
    )
    id: string,
    @Body()
    data: StaffDto,
  ) {
    return this.staffService.update(id, data);
  }
//@UseGuards(JwtAuthGuard, PermissionGuard)
  @Get('/all')
  @ApiOperation({ summary: RESPONSE_MESSAGES.STAFF.GET_STAFF_DETAILS })
  @ApiResponse({
    status: 200,
    description: RESPONSE_MESSAGES.STAFF.GET_STAFF_DETAILS,
    type: FindStaffDto,
  })
  @ApiResponse({
    status: 500,
    description: RESPONSE_MESSAGES.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  })
  /**
   * @param query - query params
   * @description:
   */
  findAll(
    @Query(new YupValidationPipe(getValidationSchema(findValidationSchema)))
    query: FindStaffDto,
  ) {
    return this.staffService.findAll(query);
  }
  @Post('assigin-to-branch')

  assiginTobranch(
    @Body()
    data,
  ) {
    return this.staffService.assiginTobranch(data);
  }




//@UseGuards(JwtAuthGuard, PermissionGuard)
  @Get(':id')
  @ApiOperation({ summary: RESPONSE_MESSAGES.STAFF.GET_STAFF_BY_ID })
  @ApiResponse({
    status: 200,
    description: RESPONSE_MESSAGES.STAFF.GET_STAFF_BY_ID,
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
      new UuIdValidationPipe({ id: RESPONSE_MESSAGES.STAFF.STAFF_ID_NOT_VALID }),
    )
    id: string,
  ) {
    return this.staffService.findById(id);
  }


  @Get('reported/:id')
  reportTo(
    @Param(
      'id',
      new UuIdValidationPipe({ id: RESPONSE_MESSAGES.STAFF.STAFF_ID_NOT_VALID }),
    )
    id: string,
  ) {
    return this.staffService.getAllEmployeesUnderManager(id);
  }
}
