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
import { Branch } from './branch.entity';
import {
  getValidationSchema,
  UuIdValidationPipe,
  YupValidationPipe,
} from '../../utils/validation.pipes';
import {
  branchStatusValidationSchema,
  branchValidationSchema,
} from './branch.schema';
import { BranchDto } from './branch.dto';
import { BranchService } from './branch.service';
import { RESPONSE_MESSAGES } from '../../types/responseMessages';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}
   
  @Post('/')
 
  async create(
    @Body(new YupValidationPipe(getValidationSchema(branchValidationSchema)))
    data: BranchDto,
  ) {
    return await this.branchService.create(data);
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new UuIdValidationPipe({ id: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR }),
    )
    id: string,
    @Body(new YupValidationPipe(getValidationSchema(branchValidationSchema)))
    data: Branch,
  ) {
    return this.branchService.update(id, data);
  }

  // update status //

  @Post('status/:id')
  updateStatus(
    @Param(
      'id',
      new UuIdValidationPipe({ id: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR }),
    )
    id: string,
    @Body(
      new YupValidationPipe(getValidationSchema(branchStatusValidationSchema)),
    )
    data: Branch,
  ) {
    return this.branchService.updateStatus(id, data);
  }
  /**
   * @param query - query params
   * @description:
   */
//@UseGuards(JwtAuthGuard, PermissionGuard)
  @Get('/all')
  findAll(
    @Query()
    query: BranchDto,
  ) {
    return this.branchService.findAll(query);
  }
 
  @Get(':id')
  find(
    @Param(
      'id',
      new UuIdValidationPipe({
        id: RESPONSE_MESSAGES.Branch.Branch_ID_IS_NOT_VALID,
      }),
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
