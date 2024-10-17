import {
    Body,
    Controller,
    Post,
    Query,
    Get,
    Param,
    Patch
} from '@nestjs/common';

import { InsurancePolicyService } from './insurancePolicy.service';
@Controller('insurance-policies')
export class InsurancePolicyController {
    constructor(private readonly insurancePolicyService: InsurancePolicyService) {
    }

    @Post('/')
    async create(@Body() data: any) {
        return await this.insurancePolicyService.createInsurancePolicy(data);
    }

    @Get('/all')
    findAllInsuranceCompanies(@Query() query: any ) {
        return this.insurancePolicyService.getInsurancePolices(query);
    }

    @Patch(':id')
    updateInsuranceCompany(@Param('id') id: string,@Body() data: any) {
        return this.insurancePolicyService.updateInsurancePolicy(id, data);
    }
}