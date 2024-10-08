import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceCompanyController } from './insuranceCompany.controller';
import { InsuranceCompanyService } from './insuranceCompany.service';
import { InsuranceCompanyEntity } from './insuranceCompany.entity';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([InsuranceCompanyEntity]),
    ],
    controllers: [InsuranceCompanyController],
    providers: [InsuranceCompanyService],
    exports: [InsuranceCompanyService],
})
export class InsuranceCompanyModule {}
