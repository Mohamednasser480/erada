import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Query,
    Patch
} from '@nestjs/common';
import {
    getValidationSchema, UuIdValidationPipe,
    YupValidationPipe,
} from '../../utils/validation.pipes';
import {
    insurancePolicyValidationSchema
} from './insurancePolicy.schema';
import { CreateInsurancePolicyDto } from './insurancePolicy.dto';
import { InsurancePolicyService } from './insurancePolicy.service';
import {CreateInsuranceCompanyDto} from "../insuranceCompany/insuranceCompany.dto";
import {RESPONSE_MESSAGES} from "../../types/responseMessages";
import {updateInsuranceCompanyValidationSchema} from "../insuranceCompany/insuranceCompany.schema";
import {InsuranceCompanyEntity} from "../insuranceCompany/insuranceCompany.entity";

@Controller('insurance-policies')
export class InsurancePolicyController {
    constructor(private readonly insurancePolicyService: InsurancePolicyService) {
    }

    @Post('/')
    async createInsurancePolicy(
        @Body(new YupValidationPipe(getValidationSchema(insurancePolicyValidationSchema)))
            data: CreateInsurancePolicyDto
    ) {
        return await this.insurancePolicyService.createInsurancePolicy(data);
    }

    @Get(':insuranceCompanyId')
    getInsurancePolices(
        @Param('insuranceCompanyId') insuranceCompanyId: string,
        @Query() query: any
    ) {
        return this.insurancePolicyService.getInsurancePolices(insuranceCompanyId, query);
    }

    @Patch(':insurancePolicyId')
    update(@Param('insurancePolicyId', new UuIdValidationPipe({ id: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR }) ) id: string,
           @Body() data: { endDate: Date }) {
        return this.insurancePolicyService.updateInsurancePolicy(id, data);
    }
}