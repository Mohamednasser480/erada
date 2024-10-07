import { Module, forwardRef} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsurancePolicyController } from './insurancePolicy.controller';
import { InsurancePolicyService } from './insurancePolicy.service';
import { InsurancePolicyEntity } from './insurancePolicy.entity';
import {InsuranceCompanyEntity} from "../insuranceCompany/insuranceCompany.entity";
import {InsuranceCompanyModule} from "../insuranceCompany/insuranceCompany.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([InsurancePolicyEntity, InsuranceCompanyEntity]),
        forwardRef(() => InsuranceCompanyModule),
    ],

    controllers: [InsurancePolicyController],
    providers: [InsurancePolicyService],
    exports: [InsurancePolicyService],
})
export class InsurancePolicyModule {}
