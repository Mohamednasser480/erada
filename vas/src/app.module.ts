import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { BranchModule } from './modules/branch/branch.module';
import { InsuranceCompanyModule } from './modules/insuranceCompany/insuranceCompany.module';
import { InsurancePolicyModule } from './modules/insurancePolicy/insurancePolicy.module';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig]
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('database'))
    }),
 BranchModule,
 InsuranceCompanyModule,
 InsurancePolicyModule,
  ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
