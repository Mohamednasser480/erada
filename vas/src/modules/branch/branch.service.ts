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
export const allowedFieldsToSort = ['name'];
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
    
      const created = await this.branchRepository.create(data);
  
      
      let  result= await this.branchRepository.save(created);
      //  if(result){
      //   let branchAssign={
      //     staffId:data.managerId,
      //     branchId:result.id
      //   }
      //   console.log("created",created);
        
      //   const request = {
      //     method: 'post',
      //     url: `${this.IDENTITY_URL}/branch/`,
      //     data: branchAssign,
      //   };
        
      //   await  this.circuitBreaker.send(request)

      // }
       return result ;
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
      if (name != IsExist?.name) {
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

      IsExist.deletedAt= new Date().toString()
      
      const result = await this.branchRepository.update(id,IsExist);
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
  async findAll(data: any) {
    try {
      const { search, branch, sort } = data;
      const qr = this.branchRepository.createQueryBuilder('branch');
      qr.select(['branch.id', 'branch.name', 'branch.status']) ;

      if (sort) {
        const param = this.buildSortParams<{
          name: string;
        }>(sort); //check if param is one of keys
        if (allowedFieldsToSort.includes(param[0])) {
          if (param[0] === 'name') {
            qr.orderBy(`branch.${param[0]}`, param[1]);
          }
        }
      } else {
        qr.orderBy('branch.createdAt', 'ASC');
      }
      if (branch) {
        qr.andWhere('branch.name LIKE :branch', {
          branch: '%' + branch + '%',
        });
      }
      if (search) {
        qr.andWhere('branch.name LIKE :search', {
          search: '%' + search + '%',
        });
      }
      // return await qr.getMany()
      return await this._paginate<IBranch>(qr, {
        limit: data.limit || 10,
        page: data.page || 1,
      });
    } catch (err) {
      this._getInternalServerError(err.message);
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
        let result = await this.branchRepository.findOne({
        where: {
          id: id,
        }
      });
    
      
           return result
      
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
}
