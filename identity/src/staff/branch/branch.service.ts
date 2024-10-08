import { Injectable, Scope } from '@nestjs/common';
import { Branch } from './branch.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchDto } from './branch.dto';
import { StaffService } from '../staff.service';
import { RESPONSE_MESSAGES } from 'src/types/responseMessages';
import { BaseService } from 'src/abstract';

@Injectable({ scope: Scope.REQUEST })
export class BranchService extends BaseService{

constructor( @InjectRepository(Branch) private readonly branchRepository: Repository<Branch> ,private readonly staffService: StaffService){
super()
}

 async create(data: BranchDto) {
    try{
      const {staff,branchId}=data
      console.log(data);
      
      const IsExist = await this.staffService.find({ id: staff });
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

let result =await  this.branchRepository.save({branchstaff,branchId});
console.log(result);


if (result) {
return {
message: RESPONSE_MESSAGES.STAFF.UPDATE_STAFF_BY_ID,
};
// return result;
}
} catch (error) {
this.customErrorHandle(error);
}  }


 
}
