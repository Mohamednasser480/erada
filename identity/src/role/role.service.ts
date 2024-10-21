import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { Staff } from '../staff/staff.entity';
import { Inject, Injectable, Scope, forwardRef } from '@nestjs/common';
import { BaseService } from '../abstract';
import {IGroup, IRole} from '../types';
import { RESPONSE_MESSAGES } from '../types/responseMessages';
import { AuthService } from 'src/auth/auth.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
export const allowedFieldsToSort = ['name'];
const AllowParams = Object.freeze({
  SLUG: 'role', // add sidebar slug here
  ADD: 'add', // add actions here
  UPDATE: 'update',
  DELETE: 'delete',
  VIEW: 'view',
});
@Injectable({ scope: Scope.REQUEST })
export class RoleService extends BaseService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    super();
  }
  async create(data: Partial<IRole>) {
    const { name } = data;
    try {
      const IsExist = await this.find({ name });
      if (IsExist) {
        return this._getNotFoundError(
          RESPONSE_MESSAGES.ROLE.ROLE_IS_ALREADY_EXIST,
        );
      }
      const created = this.roleRepository.create(data);
      return await this.roleRepository.save(created);
    } catch (error) {
      this._getBadRequestError(error.message);
    }
  }

  async update(id: string, data: Partial<IRole>) {
    try {
      const { name } = data;
      const IsExist = await this.find({ id: id });
      if (!IsExist) {
        return this._getNotFoundError(RESPONSE_MESSAGES.ROLE.ROLE_ID_IS_NOT_VALID);
      }
      if (name != IsExist?.name) {
        const IsExist = await this.find({ name: name });
        if (IsExist) {
          return this._getNotFoundError(RESPONSE_MESSAGES.ROLE.ROLE_NAME_IS_ALREADY_EXIST,);
        }
      }
      const result = await this.roleRepository.update(id, data);
      if (result?.affected > 0) {
        return {message: RESPONSE_MESSAGES.ROLE.ROLE_UPDATED_SUCCESSFULLY,};
      } else {
        this._getBadRequestError(RESPONSE_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      this._getBadRequestError(error.message);
    }
  }
  async updateStatus(id: string, data: Partial<IRole>) {
    try {
      const IsExist = await this.find({ id: id });
      if (!IsExist) {
        return this._getNotFoundError(
          RESPONSE_MESSAGES.ROLE.ROLE_ID_IS_NOT_VALID,
        );
      }
      const result = await this.roleRepository.update(id, data);
      if (result?.affected > 0) {
        return {message: RESPONSE_MESSAGES.ROLE.ROLE_STATUS_UPDATED};
      } else {
        this._getBadRequestError(RESPONSE_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      this._getBadRequestError(error.message);
    }
  }

  async find(dataObject: object) {
    try {
      return await this.roleRepository.findOne({
        where: dataObject,
      });
    } catch (err) {
      return this._getInternalServerError(err.message);
    }
  }

  async findAll(data: any) {
    try {
      const { search, role, sort, limit = 10, page = 1 } = data;
      const qr = this.roleRepository
          .createQueryBuilder('role')
          .leftJoinAndSelect('role.permission', 'permission')
          .leftJoinAndSelect('permission.sidebar', 'sidebar')
          .leftJoinAndSelect('permission.action', 'action')
          .loadRelationCountAndMap('role.staffCount', 'role.staff', 'staff')
      if (sort) {
        const param = this.buildSortParams<{
          name: string;
        }>(sort);
        if (allowedFieldsToSort.includes(param[0])) {
          if (param[0] === 'name') {
            qr.orderBy(`role.${param[0]}`, param[1]);
          }
        }
      } else {
        qr.orderBy('role.createdAt', 'ASC');
      }
      if (role) {
        qr.andWhere('role.name LIKE :role', {
          role: '%' + role + '%',
        });
      }
      if (search) {
        qr.andWhere('role.name LIKE :search', {
          search: '%' + search + '%',
        });
      }
     return this._paginate<IRole>(qr, { limit, page });
    } catch (err) {
      this._getInternalServerError(err.message);
    }
  }

  async findById(id: string) {
    try {
      const role = await this.roleRepository
          .createQueryBuilder('role')
          .leftJoinAndSelect('role.permission', 'permission')
          .leftJoinAndSelect('permission.sidebar', 'sidebar')
          .leftJoinAndSelect('permission.action', 'action')
          .loadRelationCountAndMap('role.staffCount', 'role.staff', 'staff')
          .where('role.id =:id', { id })
          .getOne();
      if (!role) {
        return this._getNotFoundError(RESPONSE_MESSAGES.ROLE.ROLE_ID_IS_NOT_VALID);
      }
      return role;
    } catch (err) {
      return this._getInternalServerError(err.message);
    }
  }

  async delete(id) {
    try {
      const IsExist = await this.find({ id: id });
      if (!IsExist) {
        return this._getNotFoundError(RESPONSE_MESSAGES.ROLE.ROLE_ID_IS_NOT_VALID);
      }
      const result = await this.roleRepository.delete(id);
      if (result?.affected > 0) {
        return {message: RESPONSE_MESSAGES.ROLE.ROLE_DELETED_SUCCESSFULLY};
      } else {
        this._getBadRequestError(RESPONSE_MESSAGES.COMMON.SOMETHING_WENT_WRONG);
      }
    } catch (error) {
      return this._getInternalServerError(error.message);
    }
  }
}
