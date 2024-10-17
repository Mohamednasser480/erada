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
    insurancePolicyValidationSchema, updateInsurancePolicySchema
} from './insurancePolicy.schema';
import {CreateInsurancePolicyDto, UpdateInsurancePolicyDto} from './insurancePolicy.dto';
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

    @Get('/all')
    getInsurancePolices(@Query() query: any) {
        return this.insurancePolicyService.getInsurancePolices(query);
    }

    @Patch(':insurancePolicyId')
    update(@Param('insurancePolicyId', new UuIdValidationPipe({ id: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR }) ) id: string,
           @Body(new YupValidationPipe(getValidationSchema(updateInsurancePolicySchema)))
               data: UpdateInsurancePolicyDto
    ) {
        return this.insurancePolicyService.updateInsurancePolicy(id, data);
    }
}