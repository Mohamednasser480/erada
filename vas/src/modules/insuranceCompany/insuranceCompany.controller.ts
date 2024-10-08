import {
    Body,
    Controller,
    Post,
    Get,
    Query,
    Patch,
    Param
} from '@nestjs/common';
import {
    getValidationSchema, UuIdValidationPipe,
    YupValidationPipe,
} from '../../utils/validation.pipes';
import {
    insuranceCompanyValidationSchema, updateInsuranceCompanyValidationSchema
} from './insuranceCompany.schema';
import { CreateInsuranceCompanyDto } from './insuranceCompany.dto';
import { InsuranceCompanyService} from './insuranceCompany.service';
import {RESPONSE_MESSAGES} from "../../types/responseMessages";
import {branchValidationSchema} from "../branch/branch.schema";
import {Branch} from "../branch/branch.entity";
import {InsuranceCompanyEntity} from "./insuranceCompany.entity";

@Controller('insurance-companies')
export class InsuranceCompanyController {
    constructor(private readonly insuranceCompanyService: InsuranceCompanyService) {
    }

    @Post('/')
    async create(
        @Body(new YupValidationPipe(getValidationSchema(insuranceCompanyValidationSchema)))
            data: CreateInsuranceCompanyDto
    ) {
        return await this.insuranceCompanyService.create(data);
    }

    @Get('/all')
    findAllInsuranceCompanies(
        @Query()
            query: CreateInsuranceCompanyDto
    ) {
        return this.insuranceCompanyService.findAllInsuranceCompanies(query);
    }

    @Patch('status/:id')
    updateInsuranceCompanyStatus(@Param('id', new UuIdValidationPipe({ id: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR }) ) id: string) {
        return this.insuranceCompanyService.updateInsuranceCompanyStatus(id);
    }

    @Patch(':id')
    update(@Param('id', new UuIdValidationPipe({ id: RESPONSE_MESSAGES.COMMON.VALIDATION_ERROR }) ) id: string,
        @Body(new YupValidationPipe(getValidationSchema(updateInsuranceCompanyValidationSchema))) data: InsuranceCompanyEntity) {
        return this.insuranceCompanyService.updateInsuranceCompany(id, data);
    }
}