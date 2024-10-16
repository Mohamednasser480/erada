import { Module, forwardRef} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './product.entity';
import {InsuranceCompanyEntity} from "../insuranceCompany/insuranceCompany.entity";
import { InsurancePolicyEntity } from "../insurancePolicy/insurancePolicy.entity";
import { Branch } from "../branch/branch.entity";
import { InsuranceCompanyModule } from "../insuranceCompany/insuranceCompany.module";
import { InsurancePolicyModule } from "../insurancePolicy/insurancePolicy.module";
import { BranchModule } from "../branch/branch.module";
import {Workflow} from "./workflow/workflow.entity";
import {WorkflowStages} from "./workflow/stage.entity";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([ProductEntity, InsuranceCompanyEntity, InsurancePolicyEntity, Branch, Workflow, WorkflowStages]),
        InsuranceCompanyModule,
        InsurancePolicyModule,
        BranchModule
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
