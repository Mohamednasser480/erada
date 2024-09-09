import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseService } from '../abstract';
import { IStaff } from '../types';
import * as bcrypt from 'bcrypt';
import { RESPONSE_MESSAGES } from '../types/responseMessages';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
export const allowedFieldsToSort = ['phone', 'status', 'name'];
@Injectable({ scope: Scope.REQUEST })
export class StaffService extends BaseService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {
    super();
  }
  /**
   * @param id
   * @returns {dataObject}
   * @description :This function is used to create staff
   */
  async create(data: Partial<IStaff>) {
    const { staffId, password } = data;
    console.log("data",data);

    try {
      const IsExist = await this.find({ staffId: staffId });
      console.log("IsExist",IsExist);
      if (IsExist) {
        console.log("IsExist is mean NUll = true",IsExist);
        
      }
      if (IsExist) {
        console.log("IsExist",IsExist);
        
        return this._getNotFoundError(
          RESPONSE_MESSAGES.STAFF.Staff_ID_IS_ALREADY_EXIST,
        );
      }
      // create password //
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      data.password = hashedPassword;
      console.log("data 2 ",data);

      
      const saved = await this.staffRepository.save(data);
      //send SMS to staff //
      const mailDetails = {
        from: process.env.SYSTEM_SMS,
        to: staffId,
        subject: 'Login Details',
        html: `<span> Your staffId :${staffId} <br> Your Password is: ${password}  <br> Please don't share with any one your Details </span>`,
      };
    //  await this.sendMail(mailDetails);
      delete saved?.password;
      return saved;
    } catch (error) {
      console.log(error);
      
      this.customErrorHandle(error);
    }
  }

  /**
   * @param id
   * @returns {dataObject}
   * @description :This function is used to update staff
   */
  async update(id: string, data: Partial<IStaff>) {
    try {
      const IsExist = await this.find({ id: id });
      
      if (!IsExist) {
        return this._getNotFoundError(RESPONSE_MESSAGES.STAFF.STAFF_ID_NOT_VALID);
      }
      data.id = id;
      const staff = await this.staffRepository.preload(data);
      const saved = await this.staffRepository.save(staff);
      return saved;
    } catch (error) {
      this.customErrorHandle(error);
    }
  }

  /**
   * @param {object}
   * @returns {dataObject}
   * @description : This function is used to check staff  already Exist or not with object data
   */
  async find(dataObject: object) {
    try {
      console.log("dataObject",dataObject);
      
      return await this.staffRepository.findOne({
        where: dataObject,
      });
    } catch (err) {
      console.log("err",err);
      
      return this._getInternalServerError(err.message);
    }
  }

  /**
   * @param {object}
   * @returns {}
   * @description : This function is used to check staff  already Exist or not with object data
   */
  async findByStaffId(staffId: string) {
    try {
      const staff = await this.staffRepository
        .createQueryBuilder('staff')
        .leftJoinAndSelect('staff.role', 'role')
        .andWhere('staff.staffId = :staffId', {
          staffId,
        })
        .getOne();
      return staff;
    } catch (err) {
      return this._getInternalServerError(err.message);
    }
  }
  /**
   * @param {object}
   * @returns {dataObject}
   * @description : This function is used to get staff by id
   */
  async findById(id: string) {
    try {
      const cacheStaff = await this.cacheService.get(`staff_${id}`);
      if (cacheStaff) {
        return cacheStaff;
      }
      const IsExist = await this.find({ id: id });
      if (!IsExist) {
        return this._getNotFoundError(RESPONSE_MESSAGES.STAFF.STAFF_ID_NOT_VALID);
      }
      const staff = await this.staffRepository.findOne({
        where: {
          id: id,
        },
      });
      if (staff) {
        await this.cacheService.set(`staff_${id}`, staff);
        const cachedData = await this.cacheService.get(id.toString());
        console.log('data set to cache', cachedData);
      }

      return staff;
    } catch (err) {
      return this._getInternalServerError(err.message);
    }
  }
  /**
   * @param {object}
   * @returns {dataObject}
   * @description : This function is used to get staffs data
   */
  async findAll(data: any) {
    try {
      const { search, sort, phone } = data;
      const qr = this.staffRepository.createQueryBuilder('staff');
      qr.leftJoinAndSelect('staff.role', 'role');
      qr.select([
        'staff.id',
        'staff.name',
        'role.id',
        'role.name',
        'staff.staffId',
        'staff.phone',
        'staff.status',
      ]);
      if (sort) {
        const param = this.buildSortParams<{
          name: string;
          staffId: string;
          phone: number;
        }>(sort); //check if param is one of keys
        if (allowedFieldsToSort.includes(param[0])) {
          if (param[0] === 'phone') {
            qr.orderBy(`staff.${param[0]}`, param[1]);
          }
          if (param[0] === 'name') {
            qr.orderBy(`staff.${param[0]}`, param[1]);
          }
        }
      }
      if (phone) {
        qr.andWhere('staff.phone LIKE :phone', {
          phone: '%' + phone + '%',
        });
      }
      if (search) {
        qr.andWhere(
          'staff.name LIKE :search OR staff.phone LIKE :search OR staff.staffId LIKE :search',
          {
            search: '%' + search + '%',
          },
        );
      }
      return await this._paginate<IStaff>(qr, {
        limit: data.limit || 10,
        page: data.page || 1,
      });
    } catch (err) {
      this._getInternalServerError(err.message);
    }
  }

  /**
   *
   * @param SMSDetails
   * @description :this function is used to send mail to provider
   */
  async sendMail(SMSDetails) {
    try {
      // will create p-proxy to connect with third party and integrate with e& sms
    
    } catch (error) {

    }
  }

  async  getAllEmployeesUnderManager(managerId: string): Promise<any> {

    // Get direct reports of the manager
    const directReports = await this.staffRepository.find({
        where: { manager: {id: String( managerId )} },
        relations: ['employees'], // Load the employees relation
    });

    // Initialize an array to hold all employees
    let allEmployees: any = [];

    // Recursive function to gather all employees
    const gatherEmployees = (employees: any[]) => {
        for (const employee of employees) {
            allEmployees.push(employee); // Add the employee to the list
            gatherEmployees(employee.employees); // Recursively gather their direct reports
        }
    };

    // Start the gathering process
    gatherEmployees(directReports);

    return allEmployees;
}


}
