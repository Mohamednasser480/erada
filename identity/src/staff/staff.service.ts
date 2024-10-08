import { InjectRepository } from '@nestjs/typeorm';
import { Repository,TreeRepository,getConnection } from 'typeorm';
import { Staff } from './staff.entity';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { BaseService } from '../abstract';
import { IBranch, IStaff } from '../types';
import * as bcrypt from 'bcrypt';
import { RESPONSE_MESSAGES } from '../types/responseMessages';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Branch } from './branch/branch.entity';
import { StaffUtil } from './staff-util';
export const allowedFieldsToSort = ['phone', 'status', 'name','branchId'];
@Injectable({ scope: Scope.REQUEST })
export class StaffService extends BaseService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: TreeRepository<Staff>,
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
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
    const { staffId, password,branchs } = data;
    console.log("data",data);

    try {
      const IsExist = await this.find({ staffId: staffId });
      console.log("IsExist",IsExist);
   
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
      const creatStaff =  this.staffRepository.create(data);

      const saved = await this.staffRepository.save(creatStaff);
      
      
      if (branchs) {
        console.log("saved 2 ",saved);

       let instertion:IBranch[]=[]
        for (const branch of branchs) {
          if (saved.id !==null) {
            console.log(branch);
            
            instertion.push({staff:saved,branchId:branch})
          }
        }
         const branchsResult =  await this.branchRepository.save(instertion);
      
      }
     
         
      //send SMS to staff //
      const mailDetails = {
        from: process.env.SYSTEM_SMS,
        to: staffId,
        subject: 'Login Details',
        html: `<span> Your staffId :${staffId} <br> Your Password is: ${password}  <br> Please don't share with any one your Details </span>`,
      };
    //  await this.sendMail(mailDetails);
      delete saved?.password;
      saved.branchs=branchs
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
      // data.id = id;
      console.log("IsExist",data.branchs);
      const {branchs} =data
      delete data.branchs
      console.log("data",data);

      let result = await this.staffRepository.update(id,data );
      console.log("result",result);
      

      if (branchs) {
        console.log("branchs",branchs);
        
        let instertion:IBranch[]=[]
         for (const branch of branchs) {
           if (result.affected) {
             console.log(branch);
             
             instertion.push({staff:id,branchId:branch})
           }
         }
         console.log("instertion branchs",instertion);

      //   const connection = getConnection();
         console.log("---------127-------");
         
       //  await connection.transaction(async transactionalEntityManager => {
          //   const branchRepository =  transactionalEntityManager.getRepository(Branch);
             console.log("---------131-------");

        // Find all data by staff
        const branchsToDelete = await this.branchRepository.find({ where: { staff:{'id':id } }});
                     console.log("---------135-------");

        console.log("branchsToDelete",branchsToDelete);
         

         // Delete the found data
        await this.branchRepository.remove(branchsToDelete);

        // // Insert new data
    
        await this.branchRepository.save(instertion);
      
       
    //  });
       
       }
       if (result.affected > 0) {
        return {
          message: RESPONSE_MESSAGES.STAFF.STAFF_UPDATED_SUCCESSFULLY,
        };
      // return result;
    }
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
   
   * @returns {dataObject}
   * @description :This function is used to update staff
   */
  async assiginTobranch (data){

    try{
      const {staffId:staff,branchId}=data
      console.log(data);
      
      const IsExist = await this.find({ id: staff });
      console.log("IsExist",IsExist);
   
      if (!IsExist) {
        
        return this._getNotFoundError(
          RESPONSE_MESSAGES.STAFF.Staff_ID_IS_ALREADY_EXIST,
        );
      }
      console.log("staffId",staff);
      
   const branchstaff = await this.branchRepository.findOne({ where: { staff:{'id':staff }, branchId }});
    console.log("branchstaff",branchstaff);
    
   if (branchstaff) {
    return branchstaff

   }
// // Insert new data

let result =await  this.branchRepository.save({staff,branchId});
console.log(result);


if (result) {
return {
message: RESPONSE_MESSAGES.STAFF.UPDATE_STAFF_BY_ID,
};
// return result;
}
} catch (error) {
this.customErrorHandle(error);
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
      
      const { search, sort, phone,branchId } = data;
      const qr = this.staffRepository.createQueryBuilder('staff');
      qr.leftJoinAndSelect('staff.role', 'role');
      qr.leftJoin('staff.branchs', 'branchs');

      qr.select([
        'staff.id',
        'staff.name',
        'role.id',
        'role.name',
        'staff.staffId',
        'staff.phone',
        'staff.status',
         'branchs'
      
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
        if (branchId) {
                // qr.where('role.id =:id', { id: roleId });

        qr.andWhere('branchs.branchId LIKE :branchId', {
          branchId: '%' + branchId + '%',
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
      console.log(err);
      
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

    const manager = await this.staffRepository.findOne({ where: { id: managerId } });
        if (!manager) {
            throw new Error(`Manager with ID ${managerId} not found.`);
        }
console.log(manager);

        // Use TypeORM's built-in tree functionality
        let employees = await this.staffRepository.findDescendantsTree( manager, { relations: ['employees']});
         let employeesTree:Staff[] =  StaffUtil.employeeTree(employees)
        return employeesTree;
}


}
