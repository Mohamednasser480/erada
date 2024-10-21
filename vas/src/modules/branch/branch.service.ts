import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './branch.entity';
import { Inject, Injectable, Scope, forwardRef } from '@nestjs/common';
import { BaseService } from '../../abstract';
import { IBranch } from '../../types';
import { RESPONSE_MESSAGES } from '../../types/responseMessages';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import CircuitBreaker from 'src/utils/CircuitBreaker';
export const allowedFieldsToSort = ['name','status','governemnt','area'];
const AllowParams = Object.freeze({
  SLUG: 'branch', // add sidebar slug here
  ADD: 'add', // add actions here
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
});
@Injectable({ scope: Scope.REQUEST })

export class BranchService extends BaseService {
  private  circuitBreaker = new CircuitBreaker(5, 2, 5000);
  private IDENTITY_URL:string=`http://${ process.env.IDENTITY_HOST}:${ process.env.IDENTITY_PORT}`

  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    super();
  }


  /**
   * @param
   * @returns {dataObject}
   * @description :This function is used to create branch for user base
   */
  async create(data: Partial<IBranch>) {
    const { name } = data;
    try {
      const IsExist = await this.find({
        name: name,
      });
      if (IsExist) {
        return this._getNotFoundError(
          RESPONSE_MESSAGES.Branch.Branch_IS_ALREADY_EXIST,
        );
      }
      const created= this.branchRepository.create(data);
      return this.branchRepository.save(created);
    } catch (error) {
      this._getBadRequestError(error.message);
    }
  }

  /**
   * @param id
   * @returns {id , data}
   * @description :This function is used to update branch
   *
   */
  async update(id: string, data: Partial<IBranch>) {
    try {
      const { name } = data;
      const IsExist = await this.find({ id: id });
      if (!IsExist) {
        return this._getNotFoundError(
          RESPONSE_MESSAGES.Branch.Branch_ID_IS_NOT_VALID,
        );
      }
      if (name === IsExist?.name) {
        const IsExist = await this.find({ name: name });
        if (IsExist) {
          return this._getNotFoundError(
            RESPONSE_MESSAGES.Branch.Branch_NAME_IS_ALREADY_EXIST,
          );
        }
      }
      const result = await this.branchRepository.update(id, data);
      if (result?.affected > 0) {
        return {
          message: RESPONSE_MESSAGES.Branch.Branch_UPDATED_SUCCESSFULLY,
        };
      } else {
        this._getBadRequestError(RESPONSE_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      this._getBadRequestError(error.message);
    }
  }
  // updateStatus
  /**
   * @param id
   * @returns {id , data}
   * @description :This function is used to update branch
   *
   */
  async updateStatus(id: string, data: Partial<IBranch>) {
    try {
      const IsExist = await this.find({ id: id });
      if (!IsExist) {
        return this._getNotFoundError(
          RESPONSE_MESSAGES.Branch.Branch_ID_IS_NOT_VALID,
        );
      }
      IsExist.deletedAt = new Date().toString()
      const result = await this.branchRepository.update(id,{ status: data.status});
      if (result?.affected > 0) {
        return {
          message: RESPONSE_MESSAGES.Branch.Branch_STATUS_UPDATED,
        };
      } else {
        this._getBadRequestError(RESPONSE_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      this._getBadRequestError(error.message);
    }
  }
  /**
   * @param {object}
   * @returns {}
   * @description : This function is used to check data already Exist or not with object data
   */
  async find(dataObject: object) {
    try {
      return await this.branchRepository.findOne({
        where: dataObject,
      });
    } catch (err) {
      return this._getInternalServerError(err.message);
    }
  }

  /**
   * @param {}
   * @returns {}
   * @description : This function is used to get branch data
   */
  async findAll(data: any): Promise<any> {
    try {
      const { search, name, sort,status,government,area } = data;
      const qr = this.branchRepository.createQueryBuilder('branch');
      qr.select(['branch.id', 'branch.name', 'branch.status','branch.buildingNO','branch.managerId','branch.government','branch.area'
        ,'branch.lat','branch.len','branch.street','branch.city','branch.landmark','branch.updatedAt','branch.createdAt'
       ]) ;

      if (sort) {
        const param = this.buildSortParams<{
          name: string;
          status: string;
          government: string;
          area: string;        }>(sort); //check if param is one of keys

        if (allowedFieldsToSort.includes(param[0])) {
          if (param[0] === 'status') {
            qr.orderBy(`branch.${param[0]}`, param[1]);
          } if (param[0] === 'government') {
            qr.orderBy(`branch.${param[0]}`, param[1]);
          } if (param[0] === 'area') {
            qr.orderBy(`branch.${param[0]}`, param[1]);

        }
      }
     } else {
        qr.orderBy('branch.createdAt', 'ASC');
      }
      if (name) {
        qr.andWhere('branch.name LIKE :name', {
          name: '%' + name + '%',
        });
      }
      if (status) {
        qr.andWhere('branch.status LIKE :status', {
          status: '%' + status + '%',
        });
      }

      if (government) {
        qr.andWhere('branch.government LIKE :government', {
          government: '%' + government + '%',
        });
      } if (area) {
        qr.andWhere('branch.area LIKE :area', {
          area: '%' + area + '%',
        });
      }


      if (search) {
        qr.andWhere('branch.name LIKE :search', {
          search: '%' + search + '%',
        });
      }
      const branches: any = await this._paginate<IBranch>(qr, {
        limit: data.limit || 10,
        page: data.page || 1,
      });

      await Promise.all(
          branches.items.map(async (branch: any) => {
            const staffCount = await this.getStaffCountByBranchId(branch.id);
            branch.staffCount = staffCount.data;
          })
      );
      return branches;
    } catch (err) {
      console.log(err.message);
      return this._getInternalServerError(err.message);
    }
  }

  /**
   * @param {id}
   * @returns {Object}
   * @description : This function is used to get branch data via id
   */
  async findById(id: string) {
    try {
      const IsExist = await this.find({ id: id });
      if (!IsExist) {
        return this._getNotFoundError(
          RESPONSE_MESSAGES.Branch.Branch_ID_IS_NOT_VALID,
        );
      }
        return this.branchRepository.findOne({
        where: { id }
        });
    } catch (err) {
      return this._getInternalServerError(err.message);
    }
  }

  /**
   * @param {id}
   * @returns {true, false}
   * @description : This function is used to delete branch
   */
  async delete(id) {
    try {
      const IsExist = await this.find({ id: id });
      if (!IsExist) {
        return this._getNotFoundError(
          RESPONSE_MESSAGES.Branch.Branch_ID_IS_NOT_VALID,
        );
      }
      IsExist.softDelete();

     let  result = await this.branchRepository.update(id,IsExist)
      if (result?.affected > 0) {
        return {
          message: RESPONSE_MESSAGES.Branch.Branch_DELETED_SUCCESSFULLY,
        };
      } else {
        this._getBadRequestError(RESPONSE_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      return this._getInternalServerError(error.message);
    }
  }

  async getStaffCountByBranchId(branchId: string): Promise<any> {
    try {
      const request = {
        method: 'get',
        url: `${this.IDENTITY_URL}/staff/branches/${branchId}`,
        data: {},
      };
      return await this.circuitBreaker.send(request)
    } catch (err) {
      console.log(err.message);
      return this._getInternalServerError(err.message);
    }
  }

  async getBranchCountByStatus(): Promise<any> {
    try {
      const branchStatusCounts = await this.branchRepository
          .createQueryBuilder('branch')
          .select('branch.status', 'status')
          .addSelect('COUNT(*)', 'branchCount')
          .groupBy('branch.status')
          .getRawMany();
      const result = {
        freezed: 0,
        active: 0,
        closed: 0,
        all: 0
      };

      branchStatusCounts.forEach((count) => {
        if (result[count.status] !== undefined) {
          result[count.status] = parseInt(count.branchCount, 10);
          result['all'] += result[count.status];
        }
      });
      return result;
    } catch (err) {
      console.log(err.message);
      return this._getInternalServerError(err.message);
    }
  }
}
