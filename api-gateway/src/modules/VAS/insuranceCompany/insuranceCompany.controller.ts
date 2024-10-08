import {
    Body,
    Controller,
    Post,
    Query,
    Get,
    Param,
    Patch
} from '@nestjs/common';

import { InsuranceCompanyService } from './insuranceCompany.service';
@Controller('insurance-companies')
export class InsuranceCompanyController {
    constructor(private readonly insuranceCompanyService: InsuranceCompanyService) {
    }

    @Post('/')
    async create(@Body() data: any) {
        return await this.insuranceCompanyService.createInsuranceCompany(data);
    }

    @Get('/all')
    findAllInsuranceCompanies(@Query() query: any) {
        return this.insuranceCompanyService.findAllInsuranceCompanies(query);
    }

    @Patch('/status/:id')
    updateInsuranceCompanyStatus(@Param('id') id: string) {
        return this.insuranceCompanyService.updateInsuranceCompanyStatus(id);
    }

    @Patch(':id')
    updateInsuranceCompany(@Param('id') id: string,@Body() data: any) {
        return this.insuranceCompanyService.updateInsuranceCompany(id, data);
    }

}