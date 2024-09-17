import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject, Injectable, Scope, forwardRef } from '@nestjs/common';
import { BaseService } from '../../abstract';
import { IBranch, IEmployee } from '../../types';
import { RESPONSE_MESSAGES } from '../../types/responseMessages';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {  Employee } from './employee.entity';
import { Branch } from './branch.entity';
export const allowedFieldsToSort = ['name'];
const AllowParams = Object.freeze({
  SLUG: 'branch', // add sidebar slug here
  ADD: 'add', // add actions here
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
});
@Injectable({ scope: Scope.REQUEST })
export class EmployeeService extends BaseService {
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    super();
  }


  /**
   * @param
   * @returns {dataObject}
   * @description :This function is used to create branch for user base
   */
  async create(data: Partial<IEmployee>) {
    const { staff,branch } = data;
    try {

      if (staff.length > 0) {
        let count = 0;
        const totalVal = staff.length;
        const returnObj = [];
        for (const element of staff) {
          const staffId = element?.staffId;
          const alreadyHasStaff = await this.checkStaffIsExist(
          {  staffId,
            branch,}
        
          );
          if (alreadyHasStaff) {
            return this._getNotFoundError(
              RESPONSE_MESSAGES.Employee.THIS_Employee_IS_ALREADY_EXIST,
            );
          }
       
         let insert:any={
            staffId:staffId,
            branch
          }
          const created = this.employeeRepository.create(insert);
          const result = await this.employeeRepository.save(created);
          returnObj.push(result);
          count++;
        }
        if (count === totalVal) {
          return {
            permission: returnObj,
          };
        }
      }


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
  async update(id: string, data: Partial<any>) {
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
  async checkStaffIsExist(dataObject: object) {
    try {
      dataObject={
        
      }
      return await this.find({
        where: dataObject,
      });
    } catch (err) {
      return this._getInternalServerError(err.message);
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
      return await this.employeeRepository.findOne({
        where: {
          id: id,
        },
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

     let  result = await this.branchRepository.delete(id)
      if (result?.affected > 0) {
        return {
          message: RESPONSE_MESSAGES.Employee.Employee_DELETED_SUCCESSFULLY,
        };
      } else {
        this._getBadRequestError(RESPONSE_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      return this._getInternalServerError(error.message);
    }
  }
}
