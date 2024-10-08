import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { InsuranceCompanyController } from './insuranceCompany.controller';
import { InsuranceCompanyService } from './insuranceCompany.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        forwardRef(() => AuthModule)
    ],
    controllers: [InsuranceCompanyController],
    providers: [InsuranceCompanyService],
    exports: [InsuranceCompanyService],
})
export class InsuranceCompanyModule {}
