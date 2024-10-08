import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InsuranceCompanyEntity } from './insuranceCompany.entity';
import { Injectable, Scope } from '@nestjs/common';
import { BaseService } from '../../abstract';
import { IInsuranceCompany } from '../../types';
import { RESPONSE_MESSAGES } from '../../types/responseMessages';

@Injectable({ scope: Scope.REQUEST })
export class InsuranceCompanyService extends BaseService {
    private allowedFieldsToSort = ['name'];
    constructor(
        @InjectRepository(InsuranceCompanyEntity)
        private readonly insuranceCompanyRepository: Repository<InsuranceCompanyEntity>
    ) {
        super();
    }

    async create(data: Partial<IInsuranceCompany>) {
        try {
            const insuranceCompanyExist = await this.find({name: data.name});
            if (insuranceCompanyExist) {
                return this._getNotFoundError(RESPONSE_MESSAGES.InsuranceCompany.COMPANY_IS_ALREADY_EXIST);
            }
            const createdCompany = this.insuranceCompanyRepository.create(data);
            return this.insuranceCompanyRepository.save(createdCompany);
        } catch (error) {
            this._getBadRequestError(error.message);
        }
    }

    async findAllInsuranceCompanies(data: any) {
        try {
            const { search, sort } = data;
            const qr = this.insuranceCompanyRepository.createQueryBuilder('insuranceCompany')
                .leftJoinAndSelect('insuranceCompany.policies', 'insurancePolicies') // Fetch related policies
                .select([
                    'insuranceCompany.id',
                    'insuranceCompany.name',
                    'insuranceCompany.status',
                    'insuranceCompany.bankName',
                    'insuranceCompany.accountNumber',
                    'insuranceCompany.eradaAccountNumber',
                    'insurancePolicies.id',
                ]);


            if (sort) {
                const param = this.buildSortParams<{ name: string }>(sort);
                if (this.allowedFieldsToSort.includes(param[0])) {
                    qr.orderBy(`insuranceCompany.${param[0]}`, param[1]);
                }
            }

            if (search) {
                qr.andWhere('CAST(insuranceCompany.id AS TEXT) LIKE :search', { search: `%${search}%` });
            }

            const result = await this._paginate<IInsuranceCompany>(qr, {
                limit: data.limit || 10,
                page: data.page || 1,
            }) as any;
            result.items = result.items.map( (item: any) => {
                const {policies, ...rest } = item;
                rest.policesCount = policies?.length || 0;
               return rest
            });
            return result;
        } catch (error) {
            console.log(error.message);
            this._getInternalServerError(error.message);
        }
    }

    async updateInsuranceCompany(id: string, data: Partial<IInsuranceCompany>) {
        try {
            const IsInsuranceCompanyExist = await this.find({ id });
            if (!IsInsuranceCompanyExist) {
                return this._getNotFoundError(
                    RESPONSE_MESSAGES.InsuranceCompany.COMPANY_ID_IS_NOT_VALID,
                );
            }
            const { name, status, ...updateData } = data;
            await this.insuranceCompanyRepository.update(id, updateData);
            return { message: RESPONSE_MESSAGES.InsuranceCompany.INSURANCE_COMPANY_UPDATED_SUCCESSFULLY };
        } catch (error) {
            this._getBadRequestError(error.message);
        }
    }

    async find(dataObject: object) {
        try {
            return await this.insuranceCompanyRepository.findOne({
                where: dataObject
            });
        } catch (err) {
            return this._getInternalServerError(err.message);
        }
    }

    async updateInsuranceCompanyStatus(id: string) {
        try {
            const insuranceCompanyExist = await this.find({ id });
            if (!insuranceCompanyExist) {
                return this._getNotFoundError(RESPONSE_MESSAGES.InsuranceCompany.COMPANY_ID_IS_NOT_VALID);
            }
            insuranceCompanyExist.status = !insuranceCompanyExist.status;
            await this.insuranceCompanyRepository.update(id,insuranceCompanyExist);
            return { message: RESPONSE_MESSAGES.InsuranceCompany.INSURANCE_COMPANY_UPDATED_SUCCESSFULLY };
        } catch (error) {
            this._getBadRequestError(error.message);
        }
    }
}
