import { BaseEntityWithId } from "src/abstract";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Branch } from "./branch.entity";


@Entity()
export class Employee extends BaseEntityWithId {

    @ManyToOne(() => Branch, (brach) => brach.staffs, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
      @JoinColumn()
      branch: Branch;
    

      @Column({ type: 'varchar', length: 100, nullable: false })
      staffId: string;
    
  
}
