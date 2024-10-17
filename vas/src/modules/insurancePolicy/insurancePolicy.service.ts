import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsurancePolicyEntity } from './insurancePolicy.entity';
import { Injectable } from '@nestjs/common';
import { BaseService } from '../../abstract';
import { RESPONSE_MESSAGES } from '../../types/responseMessages';
import { InsuranceCompanyService } from 'src/modules/insuranceCompany/insuranceCompany.service';
import {IInsuranceCompany, IInsurancePolicy} from "../../types";
@Injectable({})
export class InsurancePolicyService extends BaseService {
    allowedFieldsToSort = ['name'];
    constructor(
        @InjectRepository(InsurancePolicyEntity)
        private readonly insurancePolicyRepository: Repository<InsurancePolicyEntity>,
        private readonly insuranceCompanyService: InsuranceCompanyService,
    ) { super() }

    async createInsurancePolicy(data: Partial<IInsurancePolicy>) {
        try {
            const { insuranceCompanyId } = data;
            const IsInsuranceCompanyExist = await this.insuranceCompanyService.find({ id: insuranceCompanyId });
            if (!IsInsuranceCompanyExist) {
                return this._getNotFoundError(
                    RESPONSE_MESSAGES.InsurancePolicy.INSURANCE_COMPANY_IS_NOT_EXIST,
                );
            }
            const newPolicy = this.insurancePolicyRepository.create(data);
            return await this.insurancePolicyRepository.save(newPolicy);
        }
        catch (error) {
            this.customErrorHandle(error);
        }
    }

    async getInsurancePolices(query: any) {
        try {
            const { page = 1, limit = 10, search, sort, companyId } = query;
            const qr = this.insurancePolicyRepository.createQueryBuilder('insurance_policy') // Use the correct table name
                .select([
                    'insurance_policy.id',
                    'insurance_policy.name',
                    'insurance_policy.sellAmount',
                    'insurance_policy.buyAmount',
                    'insurance_policy.startDate',
                    'insurance_policy.endDate',
                    'insurance_policy.createdAt',
                    'insurance_policy.updatedAt',
                    'insurance_policy.insuranceCompanyId',
                ]);

            if (sort) {
                const param = this.buildSortParams<{ name: string }>(sort);
                if (this.allowedFieldsToSort.includes(param[0])) {
                    qr.orderBy(`insurance_policy.${param[0]}`, param[1]);
                }
            }

            if (search) {
                qr.andWhere('CAST(insurance_policy.id AS TEXT) LIKE :search', { search: `%${search}%` });
            }
            if(companyId){
                qr.andWhere('CAST(insurance_policy.insuranceCompanyId AS TEXT) LIKE :companyId', { companyId: `%${companyId}%` });
            }

            return await this._paginate<IInsuranceCompany>(qr, { limit, page });
        } catch (error) {
            console.error('Error fetching insurance policies:', error);
            return this._getInternalServerError(error.message);
        }
    }

    async updateInsurancePolicy(id: string, data: any) {
        try {
            const insurancePolicyExist = await this.find({ id });
            if (!insurancePolicyExist) {
                return this._getNotFoundError(RESPONSE_MESSAGES.InsurancePolicy.POLICY_ID_IS_NOT_VALID);
            }
            await this.insurancePolicyRepository.update(id, data);
            return { message: RESPONSE_MESSAGES.InsurancePolicy.POLICY_UPDATED_SUCCESSFULLY };
        } catch (error) {
            this._getBadRequestError(error.message);
        }
    }

    async find(dataObject: object) {
        try {
            return await this.insurancePolicyRepository.findOne({
                where: dataObject
            });
        } catch (err) {
            return this._getInternalServerError(err.message);
        }
    }
}
