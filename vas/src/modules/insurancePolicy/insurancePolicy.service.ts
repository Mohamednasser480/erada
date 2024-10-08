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

    async getInsurancePolices(insuranceCompanyId: string, query: any) {
        try {
            const { page, limit, search, sort} = query;
            const qr = this.insurancePolicyRepository.createQueryBuilder('insurancePolicy')
                .where('insurancePolicy.insuranceCompanyId = :insuranceCompanyId', { insuranceCompanyId })
                .select([
                    'insurancePolicy.id',
                    'insurancePolicy.name',
                    'insurancePolicy.amount',
                    'insurancePolicy.startDate',
                    'insurancePolicy.endDate',
                    'insurancePolicy.createdAt',
                    'insurancePolicy.updatedAt',
                ]);
            if (sort) {
                const param = this.buildSortParams<{ name: string }>(sort);
                if (this.allowedFieldsToSort.includes(param[0])) {
                    qr.orderBy(`insurancePolicy.${param[0]}`, param[1]);
                }
            }

            if (search) {
                qr.andWhere('CAST(insurancePolicy.id AS TEXT) LIKE :search', { search: `%${search}%` });
            }

            return await this._paginate<IInsuranceCompany>(qr, {
                limit: limit || 10,
                page: page || 1
            });
        } catch (error) {
            console.log(error.message);
            return this._getInternalServerError(error.message);
        }
    }

    async updateInsurancePolicy(id: string, data: {endDate: Date}) {
        try {
            const insurancePolicyExist = await this.find({ id });
            if (!insurancePolicyExist) {
                return this._getNotFoundError(RESPONSE_MESSAGES.InsurancePolicy.POLICY_ID_IS_NOT_VALID);
            }
            insurancePolicyExist.endDate = new Date(data.endDate);
            await this.insurancePolicyRepository.update(id, insurancePolicyExist);
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
