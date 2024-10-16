import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../../abstract';
import { RESPONSE_MESSAGES } from '../../types/responseMessages';
import {IInsuranceCompany, IProduct } from "../../types";
import {InsurancePolicyService} from "../insurancePolicy/insurancePolicy.service";
import {BranchService} from "../branch/branch.service";
import {Workflow} from "./workflow/workflow.entity";
import {WorkflowStages} from "./workflow/stage.entity";
@Injectable({})
export class ProductService extends BaseService {
    allowedFieldsToSort = ['name'];

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,

        @InjectRepository(Workflow)
        private readonly workflowRepository: Repository<Workflow>,

        @InjectRepository(WorkflowStages)
        private readonly workflowStageRepository: Repository<WorkflowStages>,
        private readonly insurancePolicyService: InsurancePolicyService,
        private readonly branchService: BranchService,
    ) {
        super()
    }

    async createProduct(data: Partial<IProduct>) {
        try {
            const {insurancePolicyId, branchId} = data["productInfo"];
            const insurancePolicyExist = await this.insurancePolicyService.find({id: insurancePolicyId});
            if (!insurancePolicyExist) {
                return this._getNotFoundError(RESPONSE_MESSAGES.InsurancePolicy.INSURANCE_POLICY_IS_NOT_EXIST);
            }
            const IsBranchExist = await this.branchService.find({id: branchId});
            if (!IsBranchExist) {
                return this._getNotFoundError(RESPONSE_MESSAGES.Branch.Branch_ID_IS_NOT_VALID);
            }
            data.productInfo.insuranceCompanyId = insurancePolicyExist.insuranceCompanyId
            const newProduct = this.productRepository.create(data);
            return await this.productRepository.save(newProduct);
        } catch (error) {
            this.customErrorHandle(error);
        }
    }

    async getProducts(data: any) {
        try {
            const qr = this.productRepository.createQueryBuilder('product')
                .leftJoinAndSelect('product.workflow', 'workflow')
                .leftJoinAndSelect('workflow.stages', 'stages');
            const workflow = await this.workflowStageRepository.find({});
            const result = await this._paginate<IInsuranceCompany>(qr, {
                limit: data.limit || 10,
                page: data.page || 1,
            }) as any;
            return result;
        } catch (error) {
            console.log(error.message);
            this._getInternalServerError(error.message);
        }
    }

    async getProductWorkflows() {
        try{
            const qr = this.workflowRepository.createQueryBuilder('workflow')
                .leftJoinAndSelect('workflow.stages', 'stages')
                .orderBy('stages.id', 'ASC');
            return await qr.getMany();
        }catch (error){
            this._getInternalServerError(error.message);
        }
    }
}