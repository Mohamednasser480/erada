import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InsurancePolicyController } from './insurancePolicy.controller';
import { InsurancePolicyService } from './insurancePolicy.service';
import { AuthModule } from '../../auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        forwardRef(() => AuthModule)
    ],
    controllers: [InsurancePolicyController],
    providers: [InsurancePolicyService],
    exports: [InsurancePolicyService],
})
export class InsurancePolicyModule {}
