import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Scope, Inject, forwardRef } from '@nestjs/common';
import { BaseService } from '../abstract';
import { IGroup } from '../types';
import { RESPONSE_MESSAGES } from '../types/responseMessages';
import { AuthService } from 'src/auth/auth.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Staff } from '../staff/staff.entity';
import {Group} from "./group.entity";
export const allowedFieldsToSort = ['name'];

@Injectable({ scope: Scope.REQUEST })
export class GroupService extends BaseService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {
    super();
  }

  async create(data: Partial<IGroup>) {
    const { name } = data;
    try {
      const IsExist = await this.find({ name });
      if (IsExist) {
        return this._getNotFoundError(RESPONSE_MESSAGES.GROUP.GROUP_IS_ALREADY_EXIST);
      }

      const created = this.groupRepository.create(data);
      return this.groupRepository.save(created);
    } catch (error) {
      console.log(error);
      return this._getBadRequestError(error.message);
    }
  }

  async update(id: string, data: Partial<IGroup>) {
    try {
      const { name } = data;
      const IsExist = await this.find({ id });
      if (!IsExist) {
        return this._getNotFoundError(RESPONSE_MESSAGES.GROUP.GROUP_ID_IS_NOT_VALID);
      }
      if (name !== IsExist?.name) {
        const isNameExist = await this.find({ name });
        if (isNameExist) {
          return this._getNotFoundError(RESPONSE_MESSAGES.GROUP.GROUP_NAME_IS_ALREADY_EXIST);
        }
      }
      const updatedGroup = await this.groupRepository.update(id, data);
      return {
        message: RESPONSE_MESSAGES.GROUP.GROUP_UPDATED_SUCCESSFULLY,
        data: updatedGroup,
      };
    } catch (error) {
      return this._getBadRequestError(error.message);
    }
  }

  async updateStatus(id: string, data: Partial<IGroup>) {
    try {
      const IsExist = await this.find({ id });
      if (!IsExist) {
        return this._getNotFoundError(RESPONSE_MESSAGES.GROUP.GROUP_ID_IS_NOT_VALID);
      }

      await this.groupRepository.update(id, data);
      return {
        message: RESPONSE_MESSAGES.GROUP.GROUP_STATUS_UPDATED,
      };
    } catch (error) {
      return this._getBadRequestError(error.message);
    }
  }

  async findAll(data: any) {
    try {
      const { search, group, sort, limit = 10, page = 1 } = data;

      const qr = this.groupRepository.createQueryBuilder('group').select([
            'group.id',
            'group.name',
            'group.isActive',
            'group.createdAt'
          ])
      if (sort) {
        const [sortField, sortOrder] = this.buildSortParams<{ name: string }>(sort);
        if (allowedFieldsToSort.includes(sortField)) {
          qr.orderBy(`group.${sortField}`, sortOrder);
        }
      }

      // Filter by group name
      if (group) {
        qr.andWhere('group.name LIKE :group', { group: `%${group}%` });
      }

      // Search functionality
      if (search) {
        qr.andWhere('group.name LIKE :search', { search: `%${search}%` });
      }
      const groups = await this._paginate<IGroup>(qr, { limit, page });
      const staffCountsForEachGroup = await this.staffRepository
          .createQueryBuilder('staff')
          .select('group.name', 'groupName')
          .addSelect('COUNT(staff.id)', 'staffCount')
          .leftJoin('staff.group', 'group')
          .groupBy('group.name')
          .getRawMany();
      groups.items.forEach( (group: any) => {
        const index = staffCountsForEachGroup.findIndex(record => record.groupName == group.name);
        if(index !== -1)
          group.staffCount = staffCountsForEachGroup[index].staffCount;
      })
      return groups;
    } catch (err) {
      console.error('Error finding groups:', err);
      return this._getInternalServerError(err.message);
    }
  }

  async findById(id: string) {
    try {
      const exists = await this.find({ id });
      if (!exists) {
        return this._getInternalServerError(RESPONSE_MESSAGES.GROUP.GROUP_ID_IS_NOT_VALID);
      }
      return exists;
    } catch (err) {
      return this._getInternalServerError(err.message);
    }
  }

  async delete(id: string) {
    try {
      const IsExist = await this.find({ id });
      if (!IsExist) {
        return this._getNotFoundError(RESPONSE_MESSAGES.GROUP.GROUP_ID_IS_NOT_VALID);
      }
      await this.groupRepository.delete(id);
      return {
        message: RESPONSE_MESSAGES.GROUP.GROUP_DELETED_SUCCESSFULLY,
      };
    } catch (error) {
      return this._getInternalServerError(error.message);
    }
  }

  async find(dataObject: object) {
    try {
      return await this.groupRepository.findOne({
        where: dataObject,
      });
    } catch (err) {
      return this._getInternalServerError(err.message);
    }
  }
}
